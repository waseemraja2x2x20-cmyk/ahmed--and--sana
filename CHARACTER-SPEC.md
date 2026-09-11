# Ahmed and Sana character specification

This document defines the visual consistency rules for Ahmed and Sana. The
supplied character artwork is the canonical source for all new assets.

## Character assets

| Character | Canonical reference | Source artwork | Production puppet |
| --- | --- | --- | --- |
| Ahmed | `references/ahmed-reference.png` | `characters/boy/BOY.psd` | `puppets/Ahmed/Ahmed.psd` |
| Sana | `references/sana-reference.png` | `characters/girl/GIRL.psd` | `puppets/Sana/Sana.psd` |

Until individual reference crops are supplied, use
`references/character-sheet.png` as the shared canonical reference. Do not
create synthetic reference images or overwrite the original artwork to fill
the per-character paths.

## Visual consistency

Every new asset must preserve the original character identity.

### Face

- Face shape
- Eye spacing and size
- Nose placement
- Mouth placement
- Facial proportions

### Hair

- Hair silhouette
- Hair volume
- Hair direction
- Hair style

Hair may be separated into foreground and background layers for animation.

### Body and clothing

Maintain shoulder, torso, arm, leg, and overall silhouette proportions.
Clothing must remain visually consistent with the canonical reference.

## Animation exceptions

Controlled deformation is allowed for arm, leg, and head rotation; eye
blinking; mouth deformation; facial expressions; walking; and gesture poses.
These changes must not permanently alter the canonical design.

## Asset creation and approval

When creating a missing body part:

1. Inspect the canonical reference.
2. Match the existing artwork's line weight, colors, and proportions.
3. Reconstruct hidden areas where necessary.
4. Test the asset in the puppet.
5. Compare it against the canonical reference.
6. Approve it before using it in final scenes.

## Character identity test

An asset passes when the character remains immediately recognizable as the same
character while standing, talking, walking, turning, gesturing, and expressing
emotion.

Do not optimize artwork at the expense of character identity. Consistency is
more important than visual complexity.
