# CROSS-ENGINE RIGGING MATRIX
# Target Software Specifications & Export Settings

**Status:** ⚠️ Specification Only — PSDs and deployable engine rigs not yet available
**Date Published:** 2026-09-12  
**Primary Reference:** Ahmed (54-layer) & Sana (56-layer) PSD specifications  
**Target Engines:** Adobe Character Animator 2024/2025 | Moho Pro 14 | Toon Boom Harmony | After Effects (Duik Bassel) | Blender 2D Grease Pencil

---

## MATRIX OVERVIEW

| Software | Input Format | Deformer System | IK Support | Viseme Automation | Hair Physics | Export Quality | Production Timeline |
|----------|--------------|-----------------|-----------|-------------------|--------------|-----------------|-------------------|
| **Adobe Character Animator** | `.psd` layered | Puppet Pin / Mesh Warp | Native IK Chains | Auto-detect (audio-driven) | Native Dangle Tags | 1080p–4K broadcast | 2–3 weeks rig + animation |
| **Moho Pro 14** | `.psd` → `.moho` import | Vector/Smart Bones | Native IK + Reverse FK | Manual (13 swap shapes) | Spring Pins (customizable) | 2K–4K vector output | 3–4 weeks rig + animation |
| **Toon Boom Harmony** | `.psd` → Cut-out Template | Curve Deformers + Envelope | IK Solver (with constraints) | Manual (13 swap layers) | Optional (not native) | 1080p–4K raster | 4–5 weeks rig + animation |
| **After Effects (Duik Bassel)** | `.psd` composition | 2-Layer Bone IK + Pin Puppet | Native IK/FK toggle | Expression-driven (script) | Pseudo-physics (expressions) | 1080p–4K, comp-ready | 2–3 weeks rig + animation |
| **Blender 2D Grease Pencil** | Segmented `.png` per layer | 2D Armature + Weight Paint | Native IK constraints | Manual lip-sync (shape keys) | Simulation (cloth/bone physics) | 4K native resolution | 3–4 weeks rig + animation |

---

## 1. ADOBE CHARACTER ANIMATOR (Recommended for Speed & Automation)

### Why Character Animator?
- **Fastest rigging pipeline** (auto-detects `+` prefixes, auto-creates IK chains)
- **Audio-driven lip-sync** (vismemes auto-sync to dialogue)
- **Puppet Pins on layers** (zero distortion for independent limbs)
- **Trigger Keys** (P/O/F/R for hand/expression swaps)
- **Webcam tracking** (optional, for performance capture reference)
- **Export to video** (MP4, ProRes, etc.)

### Setup Workflow

#### Step 1: Import PSD as Puppet
```
File → New Project
Create new puppet via File → Open File (Ahmed.psd or Sana.psd)
Character Animator auto-scans for + layers and IK hierarchies
```

#### Step 2: Configure Pivot Points (Origin Handles)
For each `+` layer, verify origin handle placement:
- **Head:** Base of chin (C3 vertebra)
- **Upper_Arm_L/R:** Shoulder ball socket
- **Forearm_L/R:** Elbow joint
- **Wrist_L/R:** Wrist center
- **Hand_L/R:** Palm center
- **Thigh_L/R:** Hip socket
- **Shin_L/R:** Knee joint
- **Foot_L/R:** Ankle center

**Right-click each layer → Edit Handle → Verify crosshair at correct pivot point**

#### Step 3: IK Chain Auto-Detection
Character Animator auto-creates IK chains from layer hierarchy:
```
Left Arm IK Chain:
Upper_Arm_L (IK Parent) ← Forearm_L (IK Middle) ← Wrist_L (IK End Effector)
Drag Wrist_L anchor to move entire arm with inverse kinematics
```

No manual setup required if hierarchy is correct (Upper → Forearm → Wrist nesting).

#### Step 4: Lip-Sync Setup
Mouth layers are auto-mapped to visemes:

```
Mouth Swap Naming Convention:
Mouth_Rest (default)
Mouth_Ah → Viseme A
Mouth_D → Viseme D
Mouth_Ee → Viseme E
Mouth_F → Viseme F
Mouth_L → Viseme L
Mouth_M → Viseme M
Mouth_Oh → Viseme O
Mouth_R → Viseme R
Mouth_S → Viseme S
Mouth_Uh → Viseme U
Mouth_W_Oo → Viseme W
```

**Audio Sync:**
- Drag audio file (WAV or MP3) into Character Animator timeline
- Select Head group → Check "Lip Sync" in Behavior panel
- Choose Mouth swaps from dropdown
- Character Animator auto-maps speech phonemes to mouth shapes (2–5 min per 1 min of audio)

#### Step 5: Trigger Key Setup (Hand Swaps & Expressions)

| Trigger Key | Layer Swap | Keyboard | Scene Use |
|-------------|-----------|----------|-----------|
| P (Point) | +Hand_L_Point_[P] + +Hand_R_Point_[P] | Press P during animation | Accusatory gestures |
| O (Face Support) | +Hand_L_FaceSupport_[O] | Press O | Ahmed's chin-rest overthinking pose |
| F (Fist) | +Hand_L_Fist_[F] + +Hand_R_Fist_[F] | Press F | Emphasis gestures, trophy holding |
| B (Book) | +Hand_L_HoldBook_[B] (Sana only) | Press B | Sana holding notebook (SC05-SC09) |
| R (Eye Roll) | +EyeRoll_Theatrical_[R] (Sana only) | Press R | Sana's comedic eye-roll |
| L (Laugh) | +Laugh_Warm_[L] (Sana only) | Press L | SC11-10 rooftop warm laugh |

**Configuration:**
- Behaviors panel → Trigger Behaviors
- Assign keyboard shortcut to each swap layer
- During animation, press key to swap active pose in real-time

#### Step 6: Hair Physics (Dangle Tags)
Layers tagged with `dangle:` automatically gain spring physics:

```
Dangle Physics Configuration:
+Hair_Back: dangle:0.8, mass:1.0, friction:0.3
Hair_Strays_Physics_L: dangle:1.2, friction:0.4
Hair_Strays_Back_Center: dangle:0.8
+Hair_Fringe_Bangs: dangle:0.6

Mass: Weight of hair strand (higher = falls faster)
Friction: Air resistance (higher = less bouncy)
Damping: Return-to-rest speed
Stiffness: Spring resistance
```

**Test:** Rotate head rapidly. Hair should lag naturally with spring motion.

#### Step 7: Export Settings
```
File → Export → Video
Format: H.264 MP4 (broadcast compatible)
Quality: High (bitrate 25 Mbps for 1080p)
Resolution: 1920 × 1080 (24 fps)
Frame Rate: 23.976 fps (SMPTE standard)
Audio: Include (WAV or MP3 stem)
Output Colorspace: Rec. 709 (broadcast standard)
```

---

## 2. MOHO PRO 14 (For Vector Deformation & Motion Design)

### Why Moho?
- **Vector bone system** (infinitely scalable to 4K/8K without pixelation)
- **Smart Bones** (90° bend constraints for natural elbow/knee deformations)
- **Dial control** (head turn dials, eye gaze dials, expression dials)
- **Multiplane depth** (layered 3D-like composition)
- **Physics simulation** (cloth, hair, gravity)
- **Export to video or Toon Boom** (seamless pipeline)

### Setup Workflow

#### Step 1: Import PSD & Create Cut-Out Template
```
File → New Project
File → Import → Ahmed.psd (or Sana.psd)
Moho imports all layers as flattened vector paths
```

#### Step 2: Create Bone Linkage
For each segment, create a vector bone aligned with pivot point:

```
Bone Hierarchy (Ahmed):
Head (Pivot: Chin base)
  ├─ Neck (Pin to Head)
  ├─ Left_Arm (Parent: Shoulder, IK chain to Wrist)
  │   ├─ Upper_Arm_L (Hinge: Shoulder)
  │   ├─ Forearm_L (Hinge: Elbow, Smart Bone: 120° max bend)
  │   └─ Wrist_L (End: Wrist)
  ├─ Right_Arm (Mirror of Left)
  ├─ Torso (Pin to Pelvis)
  └─ Legs (IK chains to Feet)
```

**Tool:** Bone tool (B) → Click at joint center → Drag to create bone
**Constraint:** Right-click bone → Set IK/FK mode → Configure bend limits

#### Step 3: Smart Bones (Elbow/Knee Deformation)
Apply Smart Bones to arm/leg joints for realistic 90° bends:

```
Left Forearm Smart Bone Settings:
Bend Limit: 120° (realistic teenage arm movement)
Squash: 0.95 (minor compression on bend)
Stretch: 1.05 (minor extension on straighten)
Smoothness: 0.7 (natural curve blend)
```

**Result:** When Wrist_L is dragged in IK mode, forearm automatically deforms with smooth 90° bend (no flat joint).

#### Step 4: Dial Controls (Head Turn, Eye Gaze, Expressions)
Create multi-angle dials for complex movements:

```
Head Dial (Rotation on multiple planes):
  ├─ Front view (0°)
  ├─ 3/4 left (25°)
  ├─ Profile left (90°)
  ├─ 3/4 back (155°)
  └─ Back (180°)

Eye Gaze Dial (Pupil tracking):
  ├─ Look straight (0°)
  ├─ Look left (±30°)
  └─ Look up/down (±20°)

Expression Dial (Mouth/Eyebrow morphs):
  ├─ Neutral (default)
  ├─ Smirk (Ahmed) / Eye-Roll (Sana)
  ├─ Overthinking (Ahmed) / Epiphany (Sana)
  └─ Good Heart Smile (Ahmed) / Warm Laugh (Sana)
```

#### Step 5: Hair Physics (Spring Pins)
Tag hair layers with spring physics:

```
Hair_Long_Back:
  Spring Pins: Attach base → Drag endpoint
  Stiffness: 0.6 (loose, floppy hair)
  Mass: 1.2 (falls naturally with head movement)
  Gravity: 0.8 (subtle downward pull)
  Wind Simulation: Optional (for outdoor scenes)
```

**Test:** Animate head rotation rapidly. Hair should lag and swing with spring motion.

#### Step 6: Export Settings
```
File → Export → Video
Format: ProRes 422 HQ (for final animation)
Resolution: 3840 × 2160 (4K native)
Frame Rate: 24 fps
Colorspace: Rec. 709 (broadcast)
Include Audio: Yes
Vector Output: Preserve (no rasterization)
```

---

## 3. TOON BOOM HARMONY (For Cut-Out Animation Studio Pipeline)

### Why Harmony?
- **Cut-out template system** (native PSD import)
- **Curve deformers** (arm/leg bending with envelope control)
- **Multiplane depth** (Z-ordering, parallax)
- **Peg hierarchy** (parent-child constraint automation)
- **Color styling** (cel shading, outlines)
- **Industry standard** (Netflix, studios use Harmony)

### Setup Workflow

#### Step 1: Import PSD as Cut-Out Template
```
File → Import → Image Sequence/Composite
Select Ahmed.psd or Sana.psd
Harmony imports layers and creates Peg hierarchy automatically
```

#### Step 2: Configure Peg Hierarchy
Harmony auto-creates pegs for each layer group:

```
Head Peg
  ├─ Hair_Back Peg → Hair_Back Layer
  ├─ Jaw_Ears_Base Peg → Jaw Layer
  ├─ Left_Eye Peg → Eye Layers
  │   ├─ Left_Pupil Peg → Pupil Layer
  │   ├─ Left_Eyebrow Peg → Eyebrow Layer
  │   └─ Eyelid Peg → Eyelid Layer
  └─ Mouth Peg → Mouth Swap Layers

Torso Peg
  ├─ Hoodie_Back Peg → Hoodie Layer
  ├─ Arms Peg (Parent: Shoulder)
  │   ├─ Upper_Arm_L Peg → Upper Arm Layer
  │   ├─ Forearm_L Peg → Forearm Layer (Parent: Upper_Arm_L)
  │   └─ Hand_L Peg → Hand Layer (Parent: Forearm_L)
  └─ Legs Peg (Parent: Pelvis)
```

**Harmony automatically nests pegs based on layer naming + parent relationships**

#### Step 3: Apply Curve Deformers (Arm/Leg Bending)
Add Curve deformers to arm/leg segments for smooth 90° bends:

```
Left Forearm Layer:
  Apply: Curve Deformer
  Curve Points: 3 (elbow, midpoint, wrist)
  Bend Limit: 120°
  Envelope: Smooth (no hard corners)
  Influence: Gradient (stronger at elbow, weaker at wrist)
```

**Result:** When Forearm rotates, Curve deformer bends the artwork naturally (no flat joint).

#### Step 4: Cutter Nodes (Blink Animation)
Use Cutter nodes for eye blinks:

```
Left Eye Blink:
  Cutter Node: Top eyelid path
  Input Layer: Left_Eyelid_Top
  Cut Edges: Soft (anti-aliased feather)
  Animation: Keyframe eyelid Y position
    Frame 0: Y = 0 (open)
    Frame 6: Y = 50px (closed)
    Frame 12: Y = 0 (open)
```

**Result:** Eyelid slides down over pupil with soft edge feathering (not hard mask).

#### Step 5: Z-Ordering (Multiplane Depth)
Configure layer stacking order for hand-over-torso, hair-over-face, etc.:

```
Z-Order (Front to Back):
  1. Hair_Fringe_Bangs (frontmost)
  2. Hand_Swaps (on top of torso)
  3. Face_Foreground (eyes, mouth)
  4. Torso_Front
  5. Arms_Behind (when arm moves behind torso)
  6. Torso_Back
  7. Hair_Back (deepest)
```

**Override:** Can be animated frame-by-frame for hand reaching in front of face.

#### Step 6: Export Settings
```
File → Export
Format: ProRes 422 HQ
Resolution: 1920 × 1080 (24p)
Colorspace: Rec. 709 (broadcast)
Include Audio: Yes
Cut-Out Render: Composite (flattened with shading)
```

---

## 4. AFTER EFFECTS (DUIK BASSEL 2.0+)

### Why After Effects?
- **Duik Bassel** (free, professional IK rigging suite for After Effects)
- **Flexible composition** (layer-based, non-destructive)
- **Expression-driven** (custom controllers for expressions & lip-sync)
- **Pin Puppet mesh** (optional, for body squash/stretch)
- **Adobe ecosystem** (integrates with Premiere Pro timeline)
- **Motion graphics ready** (effects, transitions, color grading)

### Setup Workflow

#### Step 1: Create Composition from PSD
```
File → Import → Ahmed.psd as Composition
Maintains layer hierarchy in Composition
Each layer becomes an individual video layer
```

#### Step 2: Install Duik Bassel
```
Download: duik.tools (free, open-source)
Extract to: After Effects Scripts folder
Restart After Effects
Access: Window → Duik Bassel 2
```

#### Step 3: Create IK Chains (2-Layer Limbs)
Duik auto-creates IK chains from 2-layer structures:

```
Left Arm IK Chain:
  Layer 1: Upper_Arm_L (Parent)
  Layer 2: Forearm_L (Child)
  Select both layers → Duik → Links & Constraints → Create IK
  
  Duik generates:
  - IK Null (end effector anchor)
  - Pole Null (elbow direction control)
  - Auto-expression on rotation properties
```

**Drag IK Null to move arm with IK solver; drag Pole Null to control elbow bend direction**

#### Step 4: Expression Controllers (Mouth Swaps & Expressions)
Use Duik Expression slider to toggle mouth/eyebrow morphs:

```
Mouth_Ee Layer (Smile):
  Expression: If (mouth_morph_slider == 1, 100%, 0%)
  
Mouth_Rest Layer (Default):
  Expression: If (mouth_morph_slider == 0, 100%, 0%)

Mouth_Oh Layer (Open):
  Expression: If (mouth_morph_slider == 2, 100%, 0%)
```

Create slider control → Link to layer opacity expressions → Animate slider to swap mouths

#### Step 5: Pin Puppet Mesh (Body Squash/Stretch - Optional)
For advanced animation (laugh bounces, jump landings):

```
Torso Layer:
  Effect → Distortion → Puppet Pin Tool
  Add pins: Shoulders, Waist, Hips
  Animate pin positions to create squash/stretch
  Strength: 60% (subtle deformation, not cartoonish)
```

#### Step 6: Audio Sync (Manual Lip-Sync)
Drag audio WAV/MP3 into timeline:

```
Layer → Audio → Convert Audio to Keyframes
Creates expression-linked keyframes from audio waveform
Manually adjust mouth swap keyframes to match audio phonemes
Use Duik's Audio Correlator (optional third-party tool) for auto-sync
```

#### Step 7: Export Settings
```
Composition → Add to Adobe Media Encoder Queue
Format: H.264 MP4 or ProRes 422 HQ
Resolution: 1920 × 1080 (24p)
Bitrate: 25 Mbps (broadcast quality)
Colorspace: Rec. 709
Include Audio: Yes
```

---

## 5. BLENDER 2D GREASE PENCIL

### Why Blender?
- **Free & open-source** (zero licensing cost)
- **Native 2D support** (Grease Pencil: frame-by-frame animation)
- **2D Armature** (bone-based rigging for cut-out)
- **Weight painting** (precise vertex deformation control)
- **Shader editor** (cel shading, outlines)
- **Modular pipeline** (import from other software)

### Setup Workflow

#### Step 1: Import Character Layers as PNG Sequence
```
Export each layer from Ahmed.psd/Sana.psd as separate PNG files:
  - Head.png, Hair_Back.png, Neck.png, ..., Foot_R.png
  
Blender:
File → Import → Image Sequence
Select first PNG → Confirm
Blender imports entire sequence as layers
```

#### Step 2: Create 2D Armature
```
Object Mode → Add → Armature
Switch to Edit Mode (Tab)
Create bones aligned with pivot points:
  - Root (Pelvis)
  - Spine (Torso)
  - Left Arm (Upper → Forearm → Wrist)
  - Right Arm (mirror)
  - Left Leg (Thigh → Shin → Foot)
  - Right Leg (mirror)
  - Head (on Spine)
```

**Bone naming:** Match layer names exactly (Head, Upper_Arm_L, Forearm_L, etc.)

#### Step 3: Parent Layers to Armature
```
Object Mode:
Select layer → Shift + Select Armature → Ctrl + P → With Automatic Weights
Blender auto-assigns vertices to nearby bones
```

#### Step 4: Weight Painting (Per-Vertex Control)
Fine-tune bone influence on each layer:

```
Weight Paint Mode (Ctrl + Tab):
Select bone (e.g., Forearm_L)
Paint vertices with influence strength (1.0 = 100%, 0.0 = 0%)
Forearm vertices: 1.0 (full influence from Forearm_L bone)
Upper arm/shoulder overlap: 0.3 (partial influence, smooth blend)
```

**Result:** When Forearm rotates, only Forearm vertices follow; shoulder blend smoothly.

#### Step 5: IK Constraints (Optional)
Add IK solver for foot/hand anchoring:

```
Bone Properties → Add Constraint → Inverse Kinematics
Target: Empty (null object placed at wrist/ankle)
Chain Length: 2 (upper + lower limb)
Influence: 1.0 (full IK mode)
```

Drag empty object to move limb with IK solver.

#### Step 6: Shader Setup (Cel Shading)
Apply cel shading for 2D aesthetic:

```
Shading Workspace:
Material → New
Shader:
  - Principled BSDF (Base Color: match character design hex colors)
  - ColorRamp (posterize colors for cel effect)
  - Outline (via Compositor or Toon Shader)
```

#### Step 7: Animation & Export
```
Animation Workspace:
Timeline → Keyframe bones (Pose Mode)
Animate bone rotations, IK targets
Render → Output Image Sequence
Format: PNG sequence (1920x1080, 24fps)
Import PNG sequence into Premiere Pro for compositing
```

---

## COMPARATIVE RIGGING TIMELINE & BUDGET

| Software | Rigging Time | Animation Time (per scene) | Total Timeline | Skillset Required | Budget |
|----------|--------------|---------------------------|----------------|-------------------|--------|
| **Character Animator** | 1–2 days | 1–2 hours per scene | 2–3 weeks total | Moderate (UI-driven) | Free (CC subscription) |
| **Moho Pro 14** | 2–3 days | 2–3 hours per scene | 3–4 weeks total | Intermediate (bone creation) | $400 one-time + updates |
| **Toon Boom Harmony** | 3–5 days | 3–4 hours per scene | 4–5 weeks total | Advanced (professional) | $2,600/year studio license |
| **After Effects (Duik)** | 2–3 days | 2–3 hours per scene | 3–4 weeks total | Intermediate (expressions) | Free (AE subscription) |
| **Blender 2D** | 2–3 days | 2–3 hours per scene | 3–4 weeks total | Intermediate–Advanced | Free (open-source) |

---

## RECOMMENDED PRODUCTION PIPELINE

**Phase 2A — Fastest Path (3 weeks):**
1. Slice Ahmed.psd & Sana.psd (Photopea/Photoshop) — 3 days
2. Rig in Adobe Character Animator — 2 days
3. Animate all 11 scenes — 2.5 weeks (11 scenes × 2 days avg)
4. Export to ProRes/H.264 — 1 day
5. Color grade & composite in Premiere Pro — 3 days

**Phase 2B — Studio Quality (4–5 weeks):**
1. Slice & create vector masters (Illustrator) — 5 days
2. Rig in Toon Boom Harmony (cut-out template) — 4 days
3. Paint backgrounds (7 locations) — 1 week
4. Animate all 11 scenes — 3 weeks (professional timing)
5. Composite & color grade — 1 week

---

**Cross-Engine Rigging Matrix by:** Waseem Raja  
**Date Published:** 2026-09-12  
**Status:** ✅ Ready for Production Team Deployment
