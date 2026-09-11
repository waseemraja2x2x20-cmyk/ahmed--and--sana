# Sana puppet

This directory is the production workspace for the Sana puppet. The original
character artwork remains in `characters/girl/`; do not overwrite or flatten
the source artwork while preparing the puppet.

## Expected source

- `characters/girl/GIRL.psd` - layered Photoshop source when available
- `characters/girl/GIRL_standing.png` - current full-body reference
- `expressions/girl/GIRL_expressions.png` - expression reference

## Photoshop layer hierarchy

Create the production file as `Sana.psd` with this top-level structure:

```text
+Sana
├── +Head
│   ├── Face
│   ├── Eyes
│   │   ├── Open
│   │   ├── Blink
│   │   └── Closed
│   ├── Brows
│   │   ├── Neutral
│   │   ├── Raised
│   │   ├── Lowered
│   │   ├── Angry
│   │   ├── Sad
│   │   └── Surprised
│   ├── Mouth
│   │   ├── Neutral
│   │   ├── A
│   │   ├── E
│   │   ├── I
│   │   ├── O
│   │   ├── U
│   │   ├── Smile
│   │   ├── Open
│   │   └── Wide
│   └── Hair
├── Body
├── +LeftArm
│   ├── UpperArm
│   ├── Forearm
│   └── +LeftHand
│       ├── Open
│       ├── Fist
│       ├── Pointing
│       └── Waving
├── +RightArm
│   ├── UpperArm
│   ├── Forearm
│   └── +RightHand
│       ├── Open
│       ├── Fist
│       ├── Pointing
│       └── Waving
├── +LeftLeg
│   ├── Thigh
│   ├── Shin
│   └── Foot
└── +RightLeg
    ├── Thigh
    ├── Shin
    └── Foot
```

Reconstruct hidden pixels behind overlaps so the head, hair, arms, hands,
mouth, eyes, and legs can move without exposing gaps. Keep the face artwork
aligned to the canonical character sheet in `references/character-sheet.png`.

## Rig acceptance checklist

- [ ] Head movement has no gaps or unintended deformation.
- [ ] Eye open, blink, and closed states align correctly.
- [ ] Brow states animate independently.
- [ ] Mouth visemes support lip sync and remain aligned to the face.
- [ ] Arms, hands, legs, and feet move without broken joints.
- [ ] Walking and facial-expression tests pass.
- [ ] `Sana.psd` preserves editable layers and is not flattened.
