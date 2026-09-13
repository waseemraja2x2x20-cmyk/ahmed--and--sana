# Setup

## Prerequisites

- Git
- Python 3 (for local metadata validation)
- Adobe Photoshop and Adobe Character Animator for production authoring

## Initial repository setup

1. Clone the repository.
2. Ensure these core folders exist (they are scaffolded in Git):
   - `characters/`, `puppets/`, `animation/`, `animation/scenes/`, `animation/expressions/`, `assets/`, `audio/`, `exports/`, `scripts/`, `references/`, `docs/`
3. Keep `project.json` aligned with any directory/path changes.

## Optional local pre-commit hook (recommended)

Create `.git/hooks/pre-commit`:

```bash
#!/usr/bin/env bash
set -euo pipefail
python3 - <<'PY'
import json, pathlib
root = pathlib.Path('.').resolve()
project = root / 'project.json'
json.loads(project.read_text(encoding='utf-8'))
print('project.json parse check passed')
PY
```

Then make it executable:

```bash
chmod +x .git/hooks/pre-commit
```

This is optional but helps catch malformed `project.json` before pushing.
