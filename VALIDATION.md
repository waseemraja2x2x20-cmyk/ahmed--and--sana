# Validation Checklist

Use this pre-flight checklist before opening or merging a PR.

## Metadata checks

- [ ] `project.json` is valid JSON.
- [ ] File references in `project.json` exist or are explicitly `null`.
- [ ] Directory path entries in `project.json` exist.
- [ ] `scenes.current_scenes` has no duplicates, each listed scene exists in `animation/scenes/`, and every scene directory on disk is listed in `scenes.current_scenes`.

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
import json, pathlib, re
from collections import Counter
root = pathlib.Path('.').resolve()
project = json.loads((root / 'project.json').read_text(encoding='utf-8'))
scene_dir_pattern = re.compile(r'^scene-\d{2}(?:-[a-z0-9-]+)?$')

def resolve_repo_path(path):
    p = (root / pathlib.Path(path)).resolve()
    try:
        p.relative_to(root)
    except ValueError:
        raise SystemExit(f"Path escapes repository root: {path}")
    return p

def must_exist(path):
    p = resolve_repo_path(path)
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
    scene_entry = pathlib.Path(scene)
    if scene_entry.is_absolute() or len(scene_entry.parts) != 1 or scene in {'.', '..'}:
        raise SystemExit(
            f"scenes.current_scenes[{scene}]: must be a single directory name"
        )
    if not scene_dir_pattern.match(scene):
        raise SystemExit(
            f"scenes.current_scenes[{scene}]: must match scene-NN or scene-NN-suffix format"
        )
    must_exist(pathlib.Path(project['scenes']['path']) / scene)

scene_root = resolve_repo_path(project['scenes']['path'])
listed_scenes = set(scene_list)
all_scene_dirs = {entry.name for entry in scene_root.iterdir() if entry.is_dir()}
invalid_scene_dirs = sorted(name for name in all_scene_dirs if not scene_dir_pattern.match(name))
if invalid_scene_dirs:
    raise SystemExit(
        "animation/scenes contains directories with invalid names: "
        + ", ".join(invalid_scene_dirs)
    )

actual_scenes = {name for name in all_scene_dirs if scene_dir_pattern.match(name)}
unexpected = sorted(actual_scenes - listed_scenes)
if unexpected:
    raise SystemExit(
        "animation/scenes contains directories not listed in scenes.current_scenes: "
        + ", ".join(unexpected)
    )

print('Validation passed')
PY
```
