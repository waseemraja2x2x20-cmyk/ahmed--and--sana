// Render the EP01 rough animatic HTML to a silent MP4 (subtitles + shot HUD burned in).
//
// Usage: node scripts/animatic/render-ep01.mjs [--fps 24] [--no-hud] [--out exports/EP01-rough-animatic.mp4]
// Requires Playwright (Chromium) and ffmpeg on PATH. Output goes to exports/,
// which is not tracked by git.
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
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
const hud = !args.includes('--no-hud');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const out = resolve(root, opt('--out', 'exports/EP01-rough-animatic.mp4'));
const page = pathToFileURL(resolve(root, 'animation/animatic/EP01-rough-animatic.html'));
page.search = hud ? '?render&hud=1' : '?render';

mkdirSync(dirname(out), { recursive: true });
const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await tab.goto(page.href);
await tab.evaluate(() => document.fonts.ready);
const total = await tab.evaluate(() => window.ANIMATIC_TOTAL);
const frames = Math.ceil(total * fps);

const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium', '-movflags', '+faststart', out],
  { stdio: ['pipe', 'inherit', 'inherit'] });
const stage = tab.locator('#stage');
for (let f = 0; f < frames; f++) {
  await tab.evaluate((t) => window.renderAt(t), f / fps);
  const png = await stage.screenshot({ type: 'png' });
  if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once('drain', r));
  if (f % (fps * 30) === 0) console.log(`frame ${f}/${frames}`);
}
ff.stdin.end();
await new Promise((r, j) => ff.on('close', (c) => (c === 0 ? r() : j(new Error(`ffmpeg exited ${c}`)))));
await browser.close();
console.log(`wrote ${out} (${total}s @ ${fps}fps)`);
