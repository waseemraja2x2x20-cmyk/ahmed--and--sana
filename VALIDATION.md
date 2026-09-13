# Validation Checklist

Use this pre-flight checklist before opening or merging a PR.

## Metadata checks

- [ ] `project.json` is valid JSON.
- [ ] File references in `project.json` exist or are explicitly `null`.
- [ ] Directory path entries in `project.json` exist.
- [ ] `scenes.current_scenes` entries exist in `animation/scenes/`.

## Structure checks

- [ ] Required scaffold folders remain present.
- [ ] Empty but required folders keep `.gitkeep`.
- [ ] Export placeholders (`exports/previews/.gitkeep`, `exports/final/.gitkeep`) are present.

## Content policy checks

- [ ] Canonical reference remains `references/character-sheet.png` until approved replacements exist.
- [ ] Untracked production binaries remain `null` in `project.json`.
- [ ] Rendered output binaries are not committed.

## Local quick check

```bash
python3 - <<'PY'
import json, pathlib
root = pathlib.Path('.').resolve()
project = json.loads((root / 'project.json').read_text(encoding='utf-8'))

def must_exist(path):
    p = root / path
    if not p.exists():
        raise SystemExit(f"Missing path: {path}")

for key in [
    project['assets']['mouths']['path'],
    project['assets']['eyes']['path'],
    project['assets']['eyebrows']['path'],
    project['assets']['hands']['path'],
    project['scenes']['path'],
    project['audio']['dialogue_path'],
    project['audio']['music_path'],
    project['audio']['sfx_path'],
    project['scripts']['path'],
    project['exports']['preview'],
    project['exports']['final'],
]:
    must_exist(key)

for file_ref in [
    project['characters']['ahmed']['source']['preview'],
    project['characters']['sana']['source']['preview'],
    project['characters']['ahmed']['reference'],
    project['characters']['sana']['reference'],
]:
    if file_ref is not None:
        must_exist(file_ref)

for scene in project['scenes']['current_scenes']:
    must_exist(project['scenes']['path'] + scene)

print('Validation passed')
PY
```
