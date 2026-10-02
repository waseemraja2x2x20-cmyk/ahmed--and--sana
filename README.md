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

See [`docs/PRODUCTION-READINESS.md`](docs/PRODUCTION-READINESS.md) for the
current completion checklist, validation requirements, and known blockers.

The repository structure is scaffolded for the full production tree. Editable
PSD/AI files, approved individual reference crops, and rendered puppet
previews must be supplied by the art workflow; placeholder files are not
created for binary assets that do not yet exist.

The reusable mouth reference grid is available at
[`assets/mouths/lip-sync-viseme-grid.jpg`](assets/mouths/lip-sync-viseme-grid.jpg).
It covers Neutral, Ah, D, Ee, F, L, M, Oh, R, S, Uh, and W-Oo mouth shapes for
lip-sync preparation.

The individual mouth assets currently include [`assets/mouths/Ah.png`](assets/mouths/Ah.png)
(open-wide Ah), [`assets/mouths/D.png`](assets/mouths/D.png) (teeth showing),
[`assets/mouths/Ee.png`](assets/mouths/Ee.png) (stretched smile), and
[`assets/mouths/F.png`](assets/mouths/F.png) (bottom lip under top teeth). Add
the remaining production visemes alongside them after they are drawn and
approved against the canonical character artwork.

The hand-pose reference sheet is available at
[`assets/hands/hand-reference-sheet.jpg`](assets/hands/hand-reference-sheet.jpg).
It covers relaxed, face-support, pointing, waving, and holding-object poses
for reusable hand swaps and gesture preparation.

The eye and eyebrow reference sheet is available at
[`assets/eyes/eye-eyebrow-reference-sheet.jpg`](assets/eyes/eye-eyebrow-reference-sheet.jpg).
It covers open, half-closed/blink, fully closed, neutral, angry, surprised,
sad, worried, and confident states for Character Animator preparation.

The Photoshop boy-puppet layer builder is available at
[`scripts/photoshop/build-boy-puppet.jsx`](scripts/photoshop/build-boy-puppet.jsx).
Run it in Photoshop with **File > Scripts > Browse**, then place the supplied
artwork into the generated groups and save the result as `BOY.psd`.

The matching Sana/Girl builder is available at
[`scripts/photoshop/build-girl-puppet.jsx`](scripts/photoshop/build-girl-puppet.jsx).
Use it the same way and save the generated document as `GIRL.psd`.

The Blender boy-rig builder is available at
[`scripts/blender/build-boy-rig.py`](scripts/blender/build-boy-rig.py). Run it
from Blender's Text Editor, then import cut artwork as planes and parent each
piece to the corresponding bone.

## EP01 rough animatic

A playable rough animatic of WANDERLAND EP01 is available at
[`animation/animatic/EP01-rough-animatic.html`](animation/animatic/EP01-rough-animatic.html).
Open it in a browser to watch all 75 shots (SC01–SC11 plus end card, ~4:58).
Each story shot is timed to [`docs/EP01-TIMING-SHEET-v1.0.md`](docs/EP01-TIMING-SHEET-v1.0.md)
(SC01–SC11 end at 04:50.5, as in the sheet). The end card is shortened to 8s
instead of the sheet's 30s credits placeholder, so the review runtime is 4:58.5
rather than 5:20.5.
The characters are vector placeholders of Ahmed and Sana, drawn from the
canonical palette and silhouettes. They are not production art. They have
glossy anime-style eyes, tapered brows, soft heart-shaped faces, shaded skin,
hair and clothes, and hands with fingers (open, relaxed, fist and point).
Their feet are profile sneakers. Movement is spring-driven: poses blend
instead of snapping, characters breathe, sway and nod while talking, and head
turns rotate in 3D through edge-on.

The presentation is cinematic. It uses a ~2.2:1 scope letterbox with
subtitles in the bar, and a multiplane parallax camera that pushes and drifts
slowly on every shot. Backgrounds get depth of field scaled by shot size.
Each location has its own colour grade with sun bloom, plus a vignette, film
grain, motion-blurred whip pans and true cross-dissolves. Name cards, thought
bubbles, sound-effect words, the scoreboard and the extruded 3D title spring
in with physics similar to Framer Motion's.

The player includes:

- temp VO through browser speech synthesis, with a different pitch per character
- synthesized SFX (record scratch, buzzer, clang, crickets, drumroll, cheers)
- subtitles, a shot HUD, and the SC04–SC06 scoreboard lower-third
- the protected 2-second silence beat in SC11-10
- timeline marks for the nine animatic review checkpoints
- a clickable shot list

To render a silent MP4 with the subtitles and HUD burned in (Playwright and
ffmpeg required), run:

```sh
node scripts/animatic/render-ep01.mjs            # exports/previews/EP01-rough-animatic.mp4
node scripts/animatic/render-ep01.mjs --no-hud   # without the shot HUD
```

Story timing is the only thing to judge in this animatic. Replace the
placeholder art with the approved puppets once they pass the checks in
[`docs/PRODUCTION-READINESS.md`](docs/PRODUCTION-READINESS.md).
