# Validation Checklist

Use this pre-flight checklist before opening or merging a PR.

## Metadata checks

- [ ] `project.json` is valid JSON.
- [ ] File references in `project.json` exist or are explicitly `null`.
- [ ] Directory path entries in `project.json` exist.
- [ ] `scenes.current_scenes` has no duplicates, entries exist in `animation/scenes/`, and there are no unexpected scene folders missing from the manifest list.

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
from collections import Counter
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
    project['characters']['ahmed']['source']['psd'],
    project['characters']['ahmed']['source']['ai'],
    project['characters']['sana']['source']['psd'],
    project['characters']['sana']['source']['ai'],
    project['characters']['ahmed']['puppet']['psd'],
    project['characters']['ahmed']['puppet']['preview'],
    project['characters']['sana']['puppet']['psd'],
    project['characters']['sana']['puppet']['preview'],
]:
    if file_ref is not None:
        must_exist(file_ref)

scene_list = project['scenes']['current_scenes']
duplicates = sorted(name for name, count in Counter(scene_list).items() if count > 1)
if duplicates:
    raise SystemExit(
        "scenes.current_scenes contains duplicate entries: "
        + ", ".join(duplicates)
    )

for scene in scene_list:
    must_exist(pathlib.Path(project['scenes']['path']) / scene)

scene_root = root / pathlib.Path(project['scenes']['path'])
listed_scenes = set(scene_list)
actual_scenes = {entry.name for entry in scene_root.iterdir() if entry.is_dir()}
unexpected = sorted(actual_scenes - listed_scenes)
if unexpected:
    raise SystemExit(
        "scenes.current_scenes is missing scene directories: "
        + ", ".join(unexpected)
    )

print('Validation passed')
PY
```
