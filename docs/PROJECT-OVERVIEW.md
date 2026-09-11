# Ahmed & Sana Animation Project

This 2D character animation project is built around the canonical Ahmed and
Sana artwork. It supports Adobe Photoshop puppet preparation, Adobe Character
Animator rigging, talking animation, facial expressions, walking cycles,
gestures, scene production, reusable assets, and consistent character
appearance.

## Canonical characters

| Character | Source | Reference | Production puppet |
| --- | --- | --- | --- |
| Ahmed | `characters/boy/BOY.psd` | `references/ahmed-reference.png` | `puppets/Ahmed/Ahmed.psd` |
| Sana | `characters/girl/GIRL.psd` | `references/sana-reference.png` | `puppets/Sana/Sana.psd` |

The supplied artwork is authoritative. New assets must preserve face and body
proportions, hairstyle, clothing, silhouette, skin tone, eye and mouth styles,
and the overall illustration style. Do not redesign either character unless
explicitly requested. Original artwork remains unchanged; production
modifications belong under `puppets/`.

## Repository structure

```text
characters/       Original Photoshop and character source artwork
references/       Canonical visual references
puppets/          Adobe Character Animator puppet workspaces
assets/           Reusable facial and gesture assets
animation/        Expressions, walks, gestures, and scenes
audio/            Dialogue, music, and sound effects
scripts/          Scene scripts
exports/          Preview and final deliverables
docs/             Project and production documentation
```

## Puppet requirements

Each puppet separates the head, body, hair, eyes, eyebrows, mouth, left and
right arms, hands, legs, and feet. Facial systems support open, blink, closed,
happy, and surprised eye states; neutral, raised, lowered, angry, sad, and
surprised brow states; and neutral, A, E, I, O, U, smile, open, wide,
surprised, and sad mouth states.

Puppets must support face tracking, lip sync, blinking, head turning, arm and
hand animation, leg animation, and walking. Walking cycles use contact, down,
passing, up, and contact phases. Reusable gestures include waving, pointing,
talking, thinking, shrugging, and laughing.

## Production workflow

```text
Canonical Artwork -> Reference Validation -> Photoshop Separation
-> Hidden Area Reconstruction -> Puppet Rigging -> Character Animator Setup
-> Facial Animation -> Body Animation -> Walking / Gestures
-> Scene Assembly -> Audio -> Preview -> Final Export
```

When creating an asset, inspect the canonical reference, match line weight,
colors, proportions, and style, reconstruct hidden areas, test it in the
puppet, compare it against the reference, and approve it before scene use.

## Scene, audio, and script conventions

- Scenes use `animation/scenes/scene-NN/` and may contain `scene.json`,
  background, foreground, audio, and notes.
- Dialogue belongs under `audio/dialogue/` and uses
  `sceneNN_character_NNN.wav`.
- Scripts use `scripts/scene-NN.md` and identify character, dialogue, action,
  expression, camera, and transitions.
- Previews and finals belong under `exports/previews/` and `exports/final/`.
- Use lowercase kebab-case for folders, such as `scene-01` and `ahmed-walk`.

## Quality control

- [ ] Face, hair, body proportions, and clothing match the canonical reference.
- [ ] Eyes, eyebrows, mouth, arms, hands, legs, and hidden artwork are separated.
- [ ] Character Animator recognizes the puppet without gaps or broken joints.
- [ ] Talking, blinking, head movement, walking, and expressions work.
- [ ] Temporary scene assets do not replace reusable or canonical artwork.

## Status

Character references, repository structure, puppet structure, animation
structure, asset structure, and scene structure are ready. Production assets
remain in progress.
