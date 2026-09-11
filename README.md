# Cartoon Character Animation

An original 2D cartoon character animation project featuring Boy and Girl
characters. The assets are designed for Adobe Photoshop and Adobe Character
Animator, with support for facial expressions, lip-sync, talking, body
movement, walking, and storytelling.

## Project layout

```text
characters/   Layered Photoshop character source files and documentation
puppets/      Production Adobe Character Animator puppet workspaces
expressions/  Character-specific expression assets
references/   Character sheets and visual references
project.json  Project metadata, asset paths, rigging features, and QC rules
CHARACTER-SPEC.md  Ahmed and Sana visual consistency rules
scenes/       Scene assets grouped by location
audio/        Voice, music, and sound-effect source files
exports/      Rendered deliverables (not tracked by default)
```

## Getting started

1. Add the layered Photoshop source files to `characters/boy/` and
   `characters/girl/`.
2. Build production puppets under `puppets/Ahmed/` and `puppets/Sana/`
   without overwriting the source files.
3. Keep expression artwork in the matching directory under `expressions/`.
4. Organize scene artwork by location under `scenes/`.
5. Store source audio in `audio/` and place final renders in `exports/`.

Large binary assets such as `.psd`, audio, and rendered video files are
intentionally excluded from version control. See the character and reference
directory documentation for the expected contents and naming conventions.

See [`docs/PROJECT-OVERVIEW.md`](docs/PROJECT-OVERVIEW.md) for the complete
production workflow, naming conventions, puppet requirements, scene layout,
audio conventions, and quality-control checklist.

The repository structure is scaffolded for the full production tree. Editable
PSD/AI files, approved individual reference crops, and rendered puppet
previews must be supplied by the art workflow; placeholder files are not
created for binary assets that do not yet exist.

The Photoshop boy-puppet layer builder is available at
[`scripts/photoshop/build-boy-puppet.jsx`](scripts/photoshop/build-boy-puppet.jsx).
Run it in Photoshop with **File > Scripts > Browse**, then place the supplied
artwork into the generated groups and save the result as `BOY.psd`.
