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
