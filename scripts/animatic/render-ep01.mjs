// Render the EP01 rough animatic HTML to a silent MP4 (subtitles + shot HUD burned in).
//
// Usage: node scripts/animatic/render-ep01.mjs [--fps 24] [--jobs N] [--no-hud] [--out exports/previews/EP01-rough-animatic.mp4]
// Requires Playwright (Chromium) and ffmpeg on PATH. Output goes to exports/previews/
// (the project's preview location), which is not tracked by git.
import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { availableParallelism, tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require(resolve(process.execPath, '../../lib/node_modules/playwright')));
}

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};
const fps = Number(opt('--fps', 24));
const jobs = Math.max(1, Number(opt('--jobs', Math.min(4, availableParallelism()))));
const hud = !args.includes('--no-hud');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const out = resolve(root, opt('--out', 'exports/previews/EP01-rough-animatic.mp4'));
const page = pathToFileURL(resolve(root, 'animation/animatic/EP01-rough-animatic.html'));
page.search = hud ? '?render&hud=1' : '?render';
mkdirSync(dirname(out), { recursive: true });

// Run ffmpeg to completion; resolves on exit 0, rejects on spawn error or non-zero exit.
function ffmpeg(argv, stdin = 'ignore') {
  const proc = spawn('ffmpeg', ['-y', '-loglevel', 'error', ...argv], { stdio: [stdin, 'inherit', 'inherit'] });
  let failed = null;
  const done = new Promise((res, rej) => {
    proc.on('error', (e) => { failed = e; rej(e); });
    proc.on('close', (c) => (c === 0 ? res() : rej((failed = failed || new Error(`ffmpeg exited ${c}`)))));
  });
  done.catch(() => {});
  return { proc, done, failed: () => failed };
}

// Render frames [from, to) in one browser page, piping JPEGs into one ffmpeg segment.
// The whole page + ffmpeg lifecycle is owned here so every failure path closes both.
async function renderSegment(browser, from, to, file, progress) {
  const tab = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  let ff = null;
  let ok = false;
  try {
    await tab.goto(page.href);
    await tab.evaluate(() => document.fonts.ready);
    ff = ffmpeg(['-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', '-',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium', file], 'pipe');
    ff.proc.stdin.on('error', () => {}); // reported through ff.done
    for (let f = from; f < to; f++) {
      if (ff.failed()) throw ff.failed();
      await tab.evaluate((t) => window.renderAt(t), f / fps);
      const jpg = await tab.screenshot({ type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1280, height: 720 } });
      if (!ff.proc.stdin.write(jpg)) await Promise.race([new Promise((r) => ff.proc.stdin.once('drain', r)), ff.done]);
      progress();
    }
    ff.proc.stdin.end();
    await ff.done;
    ok = true;
  } finally {
    if (!ok && ff && ff.proc.exitCode === null) {
      ff.proc.stdin.destroy();
      ff.proc.kill('SIGKILL');
    }
    await tab.close().catch(() => {});
  }
}

const work = mkdtempSync(resolve(tmpdir(), 'ep01-render-'));
const browser = await chromium.launch();
try {
  const probe = await browser.newPage();
  await probe.goto(page.href);
  const total = await probe.evaluate(() => window.ANIMATIC_TOTAL);
  await probe.close();
  const frames = Math.ceil(total * fps);
  const per = Math.ceil(frames / jobs);
  let doneFrames = 0, lastLog = 0;
  const progress = () => {
    doneFrames++;
    if (doneFrames - lastLog >= fps * 30) { lastLog = doneFrames; console.log(`frame ${doneFrames}/${frames}`); }
  };
  const segs = [];
  for (let j = 0; j < jobs; j++) {
    const from = j * per, to = Math.min(frames, from + per);
    if (from < to) segs.push({ from, to, file: resolve(work, `seg${j}.mp4`) });
  }
  // Parallel workers; if one fails the rest are torn down by browser.close() in finally.
  await Promise.all(segs.map((sg) => renderSegment(browser, sg.from, sg.to, sg.file, progress)));
  const list = resolve(work, 'list.txt');
  writeFileSync(list, segs.map((sg) => `file '${sg.file}'`).join('\n'));
  await ffmpeg(['-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', out]).done;
  console.log(`wrote ${out} (${total}s @ ${fps}fps, ${jobs} jobs)`);
} finally {
  await browser.close();
  rmSync(work, { recursive: true, force: true });
}
