# SANA — LAYER SLICING SPECIFICATION
## 56-Layer Anatomical Hierarchy & Mesh Origin Map

**Source Artwork:** Sana v1.1 Character Model Sheet (Premium 2D cel animation)  
**Output File:** `/puppets/Sana/Sana.psd` (Layered PSD, 2000 × 3000 px, 8-bit RGB, transparent background)  
**Animation Software:** Adobe Character Animator (primary) | Moho Pro 14 | Toon Boom Harmony | After Effects (Duik) | Blender 2D  
**Slicing Method:** Photopea (free, web-based) or Adobe Photoshop — Pen Tool cutouts from front-facing canonical pose

---

## SANA CHARACTER SPECIFICATIONS (v1.1)

**Height Scale:** 168 cm (teenage female)  
**Build:** Athletic upright confident posture  
**Complexion:** Fair warm peachy-tan (#D4A574)  
**Hair:** Long flowing layered dark chestnut brown (#3D2817) with face-framing fringe  
**Eyes:** Sharp observant hazel-brown (#8B6F47) with confident eyeliner wing  
**Outfit:** Dusty rose long-sleeve fitted knit top (#C08090) + ivory wide-leg pleated trousers (#F5F5F0) + tan crossbody bag (#D4A574) + blue A5 hardback notebook (#1E3A8A)  
**Key Traits:** Confident, Caring, Funny, Independent, Emotionally Smart

---

## 56-LAYER HIERARCHY (Complete Anatomical Breakdown)

### MASTER STRUCTURE
```
+Sana (Root Master Group)
├── 01_HEAD_RIG (Pivot Point: Base of Chin)
├── 02_TORSO_RIG (Pivot Point: Pelvis Center)
├── 03_ARMS_RIG (IK Chain: Shoulder ➔ Elbow ➔ Wrist)
├── 04_PROPS_ATTACHED (Prop swap groups for notebook, compass, etc.)
└── 05_LEGS_RIG (IK Chain: Hip ➔ Knee ➔ Ankle ➔ Toe)
```

---

### 01_HEAD_RIG (18 Layers)

**Pivot Point:** Base of Chin (C3 vertebra position)  
**Purpose:** Head rotations, eye tracking, facial expressions, lip-sync, theatrical reactions

#### Hair System (6 Layers)

| Layer Name | Description | Overlap Rule | Physics Tags | Notes |
|-----------|-------------|--------------|---------------|-------|
| `+Hair_Long_Back` | Long layered chestnut length falling below shoulders (primary silhouette) | 20% rounded cap behind neck | `dangle:0.9, mass:1.2` | Central character identifier; moves with head, spring physics for naturalistic sway |
| `Hair_Strays_Physics_L` | Left side layered wisps (face-framing) | 15% overlap cap | `dangle:1.1, friction:0.4` | Responsive to head turns; defines facial frame |
| `Hair_Strays_Physics_R` | Right side layered wisps | 15% overlap cap | `dangle:1.1, friction:0.4` | Mirror duplicate of left |
| `Hair_Strays_Back_Center` | Center back loose layers | 10% overlap | `dangle:0.8` | Subtle dangle; depth element |
| `+Hair_Fringe_Bangs` | Face-framing fringe (distinct design feature) | No overlap (front-facing) | `dangle:0.6` | Moves independently; emphasizes confident personality |
| `Hair_Highlight_Sheen` | Optional: Glossy highlight layer on back length (adds dimension) | No overlap | None | Non-animated; adds production polish |

**Rendering Order:** Hair_Long_Back (deepest) → Hair_Strays_Back_Center → Hair_Highlight_Sheen → Jaw_Ears_Base (middle) → Hair_Fringe_Bangs (topmost)

#### Facial Structure (6 Layers)

| Layer Name | Description | Parent Constraint | Pivot Point | Notes |
|-----------|-------------|------------------|-------------|-------|
| `Neck` | Base column (skin + shadow) connecting head to torso | Child of Torso | Base of neck | Standard fill (no independent rotation) |
| `Jaw_Ears_Base` | Jaw outline + ear shapes + gold hoop earrings + fair skin | Child of Head | Jaw hinge position | Supports mouth movement; earrings add character detail |
| `+Nose` | Small stylized nose shape (fair skin, fine detail) | Independent from jaw | Nose root (bridge) | Must be independent to prevent jaw distortion on mouth open |
| `+Left_Eye_Group` | Complete left eye unit with confident eyeliner wing | Independent | Eye center (pupil) | Separate group for tracking/gaze; eyeliner emphasizes personality |
| `+Right_Eye_Group` | Complete right eye unit | Independent | Eye center (pupil) | Mirror-duplicate hierarchy of Left_Eye_Group |
| `+Mouth_LipSync_Master` | Mouth swap control group (13 visemes + triggers + laugh) | Independent | Mouth center (lip line) | See Mouth Subsystem below |

#### Left Eye Subsystem (5 Layers)

| Layer Name | Description | Swap Type | Trigger Key | Notes |
|-----------|-------------|-----------|------------|-------|
| `+Left_Eyebrow` | Arched confident eyebrow (sharp personality tell) | Shape swap | None | Expressive; reflects emotion range (competitive → epiphany) |
| `Left_Eyelid_Top` | Upper eyelid + eyeliner wing detail | Static | None | Non-independent (parent-constrained to eyeball) |
| `+Left_Pupil` | Pupil + iris (hazel-brown #8B6F47) | Shape swap | None | Tracks gaze direction independently |
| `Left_Eyeball_White` | Sclera (white) + subtle shadow | Static | None | Background layer for pupil |
| `+Left_Blink_Frame_01..04` | 4-frame blink cycle (closed → open) | Multi-swap | Auto-trigger on audio silence | Lip-sync engine detects pauses for natural blinks |

**Pupil Tracking:** Left_Pupil contains `Pupil_Range` sub-layer (invisible guide) limiting eye movement to 20° in all directions

#### Right Eye Subsystem (5 Layers)

Mirror-duplicate of Left_Eye_Group with identical naming convention (_L replaced with _R)

#### Mouth Lip-Sync Subsystem (10 Layers)

**Master Group:** `+Mouth_LipSync_Master`

| Viseme | Mouth Shape | Trigger | Example Dialogue | Blink Sync |
|--------|------------|---------|------------------|-----------|
| `Mouth_Rest` | Closed neutral (default) | Auto-default | (silence) | Auto-blink on silence |
| `Mouth_Ah` | Open with rounded O shape | Audio vowel "a" | "plan", "actually" | No auto-blink |
| `Mouth_D` | Tongue touching teeth | Consonant "d" | "Did", "dreaming" | No auto-blink |
| `Mouth_Ee` | Wide grin, teeth showing | Vowel "e" | "Keep", "system", "Exactly" | Smile blink (Duchenne) |
| `Mouth_F` | Lower lip under upper teeth | Consonant "f" | "from", "footnote" | No auto-blink |
| `Mouth_L` | Tongue on ridge | Consonant "l" | "like", "plan" | No auto-blink |
| `Mouth_M` | Closed lips, puffed | Consonant "m" | "my", "moment" | No auto-blink |
| `Mouth_Oh` | Open circle shape | Vowel "o" | "overthinking", "okay" | No auto-blink |
| `Mouth_R` | Slightly open, rounded | Consonant "r" | "research", "right" | No auto-blink |
| `Mouth_S` | Thin line, teeth slightly showing | Consonant "s" | "system", "so" | No auto-blink |
| `Mouth_Uh` | Small open shape | Vowel "uh" | "uh-huh" | No auto-blink |
| `Mouth_W_Oo` | Rounded O (W/OO sound) | Diphthong "w-oo" | "would", "WE won" | No auto-blink |

**Expression Trigger Swaps (Character-Specific):**

| Trigger | Layer Swap | Keyboard Shortcut | Scene Use | Notes |
|---------|-----------|------------------|-----------|-------|
| `+Smirk_Competitive` | Mouth_Ee + Teeth_Show + Eye_Narrow | None (auto-detect) | SC03, SC04, SC06, SC11 | Witty confidence; competitive gleam in eyes |
| `+EyeRoll_Theatrical_[R]` | Eyes_Rolled_Upward + Brow_Raised_High + Mouth_Rest or Mouth_Uh | Key R | SC02, SC03, SC05, SC07, SC08 | Comedic dismissal; signature comedic delivery |
| `+Laugh_Warm_[L]` | Mouth_Ee + Teeth_Show + Eye_Crinkle_Deep + Head_Tilt_Slight | Key L | SC11-10 rooftop (CRITICAL), SC11 rematch | Genuine Duchenne laugh with eye crinkles; warmth evident, not sarcasm |
| `+Epiphany_Realization` | Eyes_Wide_Open + Brow_Lifted + Mouth_Oh | None (emotion state) | SC06, SC09, SC10 | Moment of intellectual breakthrough; "oh, I understand now" |

**Viseme Priority (Adobe Character Animator):**
Ee, R, F (highest recognition accuracy for Sana's snappy English dialogue delivery)

---

### 02_TORSO_RIG (11 Layers)

**Pivot Point:** Pelvis Center (sacrum position)  
**Purpose:** Torso rotation, clothing drape, crossbody bag movement, notebook attachment

| Layer Name | Description | Parent | Rendering Order | Notes |
|-----------|-------------|--------|-----------------|-------|
| `Crossbody_Strap_Back` | Tan crossbody bag strap behind torso | Torso | Deepest | Moves with torso; strap overlaps behind shoulder |
| `Torso_Jacket_Back` | Dusty rose knit top back panel | Torso | 2nd | 15% overlap cap at shoulders |
| `Torso_Striped_Underlayer` | White/cream striped detail visible at neckline | Torso | 3rd | Neutral fill (no independent rotation) |
| `Torso_Teal_Bomber_Front` | Dusty rose knit top front panel (fitted) | Torso | 4th | 15% overlap cap at shoulders (mirror of back) |
| `Crest_Patches` | Small logo/crest patches on chest (design detail) | Torso | 5th | Moves with torso; minimal deformation |
| `Utility_Suspenders` | Suspender straps (if included in final design) | Torso | 6th | Subtle sway on torso bend |
| `Tactical_Belt` | Waistband detail (worn with pleated trousers) | Torso | 7th | Moves with pelvis; minimal deformation |
| `Crossbody_Bag_Front` | Tan crossbody bag hanging on right side (front view) | Torso | 8th | Slight swing on torso rotation (physics: `rotation:±5°`) |
| `+Notebook_Attachment_Point` | Parent anchor for prop_notebook attachment (independent group) | Torso | 9th | Allows notebook to be held/adjusted independently |
| `+Torso_Bend_Mesh_Optional` | Optional: Envelope deformer for squash/stretch | Torso | All layers | For advanced animation (laugh bounces, jump landings) — use in After Effects/Moho, not Character Animator |
| `Shadow_Torso_Underside` | Subtle shadow layer underneath torso (depth) | Torso | Rendered beneath Torso_Jacket_Back | Atmosphere/depth; non-animated |

**Torso Bend Constraint (Moho/Harmony/Blender):**
Maximum bend angle: ±20° forward/backward (realistic teenage posture, prevents over-deformation)  
Squash/Stretch: 1.1× scale on downward laugh bounce, 0.95× on lift

---

### 03_ARMS_RIG (20 Layers)

**Architecture:** IK Chain (Inverse Kinematics)  
**IK Targets:** Wrist (end effector) anchors entire arm chain  
**Prop Interaction:** Hand swaps include notebook holding pose (critical for SC05-SC09)

#### LEFT ARM (+Upper_Arm_L ➔ +Forearm_L ➔ +Wrist_L ➔ Hand Swaps)

| Layer Name | Parent | Pivot Point | Overlap Cap | IK Role |
|-----------|--------|------------|------------|---------|
| `+Upper_Arm_L` | Shoulder joint (Torso) | Shoulder ball socket | 20% rounded elbow cap behind segment | IK Upper Limb |
| `+Forearm_L` | Upper_Arm_L (elbow hinge) | Elbow joint | 20% rounded wrist cap behind segment | IK Lower Limb |
| `+Wrist_L` | Forearm_L (wrist hinge) | Wrist center | 15% rounded hand cap behind segment | IK End Effector (anchor point) |
| `Fingerless_Glove_L` | Wrist_L | Wrist position | No overlap (glove detail) | Tactical/stylish accessory |
| `+Hand_L_Normal` | Wrist_L | Palm center | 10% overlap with forearm | **Swap 1 (Default):** Relaxed natural hand |
| `+Hand_L_Point_[P]` | Wrist_L | Palm center | 10% overlap with forearm | **Swap 2 (Key P):** Index finger extended for emphasis |
| `+Hand_L_Fist_[F]` | Wrist_L | Palm center | 10% overlap with forearm | **Swap 3 (Key F):** Closed fist for determination |
| `+Hand_L_HoldBook_[B]` | Wrist_L | Palm center (modified grip) | 10% overlap with forearm | **Swap 4 (Key B):** Holding A5 notebook (critical for SC05-SC09) |
| `+Hand_L_Compass_Hold` | Wrist_L | Palm center | 10% overlap with forearm | **Swap 5:** Holding brass pocket compass (optional, future scenes) |
| `+Hand_L_Pliers_Hold` | Wrist_L | Palm center | 10% overlap with forearm | **Swap 6:** Holding pliers/tool (optional, mechanical scenes) |

#### RIGHT ARM (+Upper_Arm_R ➔ +Forearm_R ➔ +Wrist_R ➔ Hand Swaps)

Mirror-duplicate of Left ARM with identical structure (_L replaced with _R):

| Layer Name | Swap Purpose | Keyboard Shortcut |
|-----------|-------------|------------------|
| `+Hand_R_Normal` | Relaxed natural hand | Default |
| `+Hand_R_Point_[P]` | Index finger extended | Key P |
| `+Hand_R_Fist_[F]` | Closed fist | Key F |
| `+Hand_R_HoldBook_[B]` | Holding notebook | Key B |
| `+Hand_R_Compass` | Holding compass | None |

**IK Chain Settings (Adobe Character Animator):**
- Elbow Bend Limit: 120° (realistic teenage arm movement)
- Hand Rotation Limit: ±45° (prevents wrist breakage at extreme angles)
- Pole Vector: Elbow position maintained throughout animation (prevents elbow flipping)

---

### 04_PROPS_ATTACHED (4 Layers)

**Purpose:** Prop attachment points and swap groups (notebook, compass, etc.)

| Layer Name | Description | Parent Constraint | Swap Type | Animation Priority | Notes |
|-----------|-------------|------------------|-----------|-------------------|-------|
| `+Prop_A5_Notebook_Master` | Blue A5 hardback notebook (iconic prop) | Attached to +Hand_L_HoldBook or free-floating | Multi-swap | HIGH | Central story element; visible in SC05-SC09; can be held or resting in bag |
| `Notebook_Closed_Pose` | Notebook in closed flat state (default resting) | Notebook_Master | Shape swap | Medium | When not being held; rests in crossbody bag or on lap |
| `Notebook_Open_Pages` | Notebook with pages visible (for close-up diagram shots) | Notebook_Master | Shape swap | Medium | Reveals character's organized planning (Sana's trait) |
| `+Prop_Compass_Gear` | Optional: Brass pocket compass (for mechanical scenes) | Free-floating or hand attachment | N/A | LOW | Future scenes; mechanical problem-solving prop |

**Notebook Integration (Critical Story Element):**
- SC05: Sana presents organized system (notebook open, showing footnote 42)
- SC06: Scoreboard montage (notebook visible, emphasizes organization trait)
- SC09: Box failure analysis (notebook consulted for systematic approach)
- SC10: Hybrid solution (notebook referenced for specification verification)

---

### 05_LEGS_RIG (12 Layers)

**Architecture:** IK Chain (Inverse Kinematics)  
**IK Targets:** Ankle (end effector) anchors leg chain  
**Walk Cycle Foundation:** Both legs use same hierarchy for mirror-flip cycles

#### PELVIS (Parent of Both Legs)

| Layer Name | Description | Pivot Point | Overlap Cap | Notes |
|-----------|-------------|------------|------------|-------|
| `Pelvis_Trousers` | Waistband + hip structure (ivory pleated) | Pelvis center | 20% rounded thigh cap | Parent anchor for both leg IK chains |

#### LEFT LEG (+Thigh_L ➔ +Shin_L ➔ +Foot_L)

| Layer Name | Parent | Pivot Point | Overlap Cap | IK Role |
|-----------|--------|------------|------------|---------|
| `+Thigh_L` | Pelvis (hip socket) | Hip joint center | 20% rounded knee cap behind segment | IK Upper Limb |
| `+Shin_L` | Thigh_L (knee hinge) | Knee joint | 20% rounded ankle cap behind segment | IK Lower Limb |
| `+Foot_L` | Shin_L (ankle hinge) | Ankle center | 15% rounded sole cap | IK End Effector |
| `Shin_L_Pleated_Detail` | Shin_L | Knee position | No overlap | Pleated trouser detail (animated with shin rotation) |
| `+Foot_L_CombatBoot` | Foot_L | Heel-toe axis | No overlap | Brown combat boot (color: #6B4423 warm tone) |

#### RIGHT LEG (+Thigh_R ➔ +Shin_R ➔ +Foot_R)

Mirror-duplicate of Left Leg structure (_L replaced with _R)

**IK Chain Settings (Adobe Character Animator):**
- Knee Bend Limit: 140° (realistic teenage leg movement)
- Ankle Rotation Limit: ±35° (prevents foot breakage)
- Sole Contact: Foot_L_CombatBoot + Foot_R_CombatBoot layers aligned for ground contact in walk cycles

---

## SLICING WORKFLOW (Photopea / Photoshop)

### Step 1: Create Master PSD Document
```
File → New Document
Dimensions: 2000 × 3000 px
Resolution: 150 DPI
Color Mode: RGB 8-bit
Background: Transparent
Save As: /puppets/Sana/Sana.psd
```

### Step 2: Import Reference Artwork
- Open Sana v1.1 model sheet image (canonical front pose with confident upright posture)
- File → Place Embedded → Select front turnaround image
- Paste into Sana.psd on layer named `_Reference_CanvasArt`
- Layer → Lock All (prevents accidental editing)
- Opacity: 50% (for visual reference while slicing)

### Step 3: Slice Hair System (6 Layers)
Using Pen Tool (P):
1. Outline `+Hair_Long_Back` (all layered length falling below shoulders)
   - Create new layer, name `+Hair_Long_Back`
   - Paint rounded 20% cap at neck base (prevents gap when head rotates)
   - Fill with dark chestnut brown (#3D2817) + 1-layer shadow
   - Tag with physics: `dangle:0.9, mass:1.2`
   
2. Outline `+Hair_Fringe_Bangs` (face-framing fringe, distinct design feature)
   - Create new layer, name `+Hair_Fringe_Bangs`
   - Paint fine lines with dark chestnut brown
   - Apply slight asymmetry (falls across forehead naturally)
   - Physics: `dangle:0.6`

3. Create 3× `Hair_Strays_Physics` layers (left, right, center back)
   - Names: `Hair_Strays_Physics_L`, `Hair_Strays_Physics_R`, `Hair_Strays_Back_Center`
   - Outline individual layered wisps
   - Add 15% overlap caps at attachment points
   - Tag with physics: `dangle:0.8–1.1`

4. Add `Hair_Highlight_Sheen` (optional: glossy highlight for production polish)

### Step 4: Slice Facial Structure (6 Layers)
1. **Neck:** Outline base column connecting head to torso (light skin tone)
2. **Jaw_Ears_Base:** Outline jaw outline + ear shapes + gold hoop earrings (fair skin #D4A574)
3. **+Nose:** Small stylized nose (fine detail, independent layer)
4. **+Left_Eye_Group:** Outline entire left eye area with eyeliner wing (sharp personality detail)
   - Subdivide into sub-layers: +Left_Eyebrow (arched), Left_Eyelid (with eyeliner), +Left_Pupil, Left_Eyeball_White
5. **+Right_Eye_Group:** Mirror duplicate of left eye
6. **+Mouth_LipSync_Master:** Create 13 mouth swap shapes + 1 laugh trigger (see Viseme table above)
   - Layer naming: `Mouth_Rest`, `Mouth_Ah`, `Mouth_Ee`, etc.
   - All layers share same X/Y position (mouth anchor point)
   - Set layer opacity: 0% (all invisible except active swap)

### Step 5: Slice Torso (11 Layers)
1. **Crossbody_Strap_Back:** Tan strap (deepest layer, behind torso)
2. **Torso_Jacket_Back:** Dusty rose knit top back panel (20% overlap cap at shoulders)
3. **Torso_Striped_Underlayer:** White/cream striped detail (visible at neckline, sleeves)
4. **Torso_Teal_Bomber_Front:** Dusty rose fitted front panel (mirror of back)
5. **Crest_Patches:** Small logo details on chest
6. **Utility_Suspenders:** Suspender straps (if included)
7. **Tactical_Belt:** Dark waistband at hip line
8. **Crossbody_Bag_Front:** Tan bag on right side (physics: `rotation:±5°`)
9. **+Notebook_Attachment_Point:** Parent anchor for notebook prop
10. **Optional:** `+Torso_Bend_Mesh_Optional` (advanced deformers in Moho/Harmony)
11. **Shadow_Torso_Underside:** Subtle shadow for depth

### Step 6: Slice Arms (20 Layers)
**Left Arm:**
1. Outline `+Upper_Arm_L` from shoulder to elbow (dusty rose knit color)
   - Paint 20% rounded cap at elbow joint (behind forearm)
2. Outline `+Forearm_L` from elbow to wrist (rose/cream visible)
   - Paint 20% rounded cap at wrist joint
3. Outline `+Wrist_L` (hand base)
   - Paint 15% rounded cap
4. Add `Fingerless_Glove_L` (tactical accessory detail)
5. Create 6× hand swaps: `+Hand_L_Normal`, `+Hand_L_Point_[P]`, `+Hand_L_Fist_[F]`, `+Hand_L_HoldBook_[B]`, `+Hand_L_Compass_Hold`, `+Hand_L_Pliers_Hold`
   - All hand swaps share same pivot point (palm center)
   - **Critical:** `+Hand_L_HoldBook_[B]` pose must match notebook prop dimensions (A5 size reference)
   - Set opacity: 0% (all invisible except active swap)

**Right Arm:** Mirror duplicate of left arm (_L → _R)

### Step 7: Slice Props (4 Layers)
1. **+Prop_A5_Notebook_Master** (blue hardback, A5 dimensions)
   - Create new layer with flat blue fill (#1E3A8A)
   - Outline A5 rectangular shape (~210mm × 148mm proportional scale)
   - Parent to hand or torso depending on animation context

2. **Notebook_Closed_Pose** (flat closed state, default)
3. **Notebook_Open_Pages** (pages revealed, for diagram scenes)
4. **+Prop_Compass_Gear** (optional: brass compass for future scenes)

### Step 8: Slice Legs (12 Layers)
**Pelvis:**
1. Outline `Pelvis_Trousers` (waistband + hip structure, ivory pleated)
   - Paint 20% rounded cap at both hip joints

**Left Leg:**
1. Outline `+Thigh_L` from hip to knee (ivory pleated trousers)
   - Paint 20% rounded cap at knee joint
2. Outline `+Shin_L` from knee to ankle (ivory pleated)
   - Paint 20% rounded cap at ankle joint
3. Outline `+Foot_L` from ankle to toe (brown combat boot)
   - Paint 15% rounded sole cap
4. Add `Shin_L_Pleated_Detail` (pleated trouser design detail, animated with shin)
5. Attach `+Foot_L_CombatBoot` (brown boot, warm tone)

**Right Leg:** Mirror duplicate of left leg (_L → _R)

### Step 9: Organize Hierarchy
Create folder groups matching 01_HEAD_RIG structure:
```
+Sana/
├─ 01_HEAD_RIG/
│  ├─ +Hair_Long_Back
│  ├─ Hair_Strays_Physics_*
│  ├─ Hair_Highlight_Sheen
│  ├─ Neck
│  ├─ Jaw_Ears_Base
│  ├─ +Nose
│  ├─ +Left_Eye_Group/
│  ├─ +Right_Eye_Group/
│  └─ +Mouth_LipSync_Master/
│
├─ 02_TORSO_RIG/
│  ├─ Crossbody_Strap_Back
│  ├─ Torso_Jacket_Back
│  ├─ Torso_Striped_Underlayer
│  ├─ Torso_Teal_Bomber_Front
│  ├─ Crest_Patches
│  ├─ Utility_Suspenders
│  ├─ Tactical_Belt
│  ├─ Crossbody_Bag_Front
│  ├─ +Notebook_Attachment_Point
│  └─ Shadow_Torso_Underside
│
├─ 03_ARMS_RIG/
│  ├─ +Left_Arm/
│  │  ├─ +Upper_Arm_L
│  │  ├─ +Forearm_L
│  │  ├─ +Wrist_L
│  │  ├─ Fingerless_Glove_L
│  │  └─ +Hand_L_Swaps/
│  │
│  └─ +Right_Arm/ (mirror)
│
├─ 04_PROPS_ATTACHED/
│  ├─ +Prop_A5_Notebook_Master
│  ├─ Notebook_Closed_Pose
│  ├─ Notebook_Open_Pages
│  └─ +Prop_Compass_Gear
│
└─ 05_LEGS_RIG/
   ├─ Pelvis_Trousers
   ├─ +Left_Leg/
   │  ├─ +Thigh_L
   │  ├─ +Shin_L
   │  ├─ Shin_L_Pleated_Detail
   │  └─ +Foot_L
   │
   └─ +Right_Leg/ (mirror)
```

### Step 10: Quality Checklist Before Saving
- [ ] All layers named with `+` prefix where applicable (pivot-independent)
- [ ] All layers follow anatomical naming convention (_L = character left, _R = character right)
- [ ] All joints have 15–20% rounded overlap caps (no gaps at 90° rotation)
- [ ] Layer hierarchy organized in 5 main groups (HEAD, TORSO, ARMS, PROPS, LEGS)
- [ ] Notebook prop dimensions (A5) match hand swap pose sizing
- [ ] Transparent background (PNG-32 compatible)
- [ ] No gradients or textures (flat color fills only)
- [ ] All layers are rasterized (no vector or smart objects)
- [ ] No clipping masks (breaks in rigging software)
- [ ] Reference layer locked and hidden
- [ ] Saved as PSD (`.psd` format, not PSB or PDF)
- [ ] 2000 × 3000 px dimensions maintained

### Step 11: Save & Export
```
File → Save As: /puppets/Sana/Sana.psd (PSD format)
File → Export As: /puppets/Sana/Sana_composite.png (PNG-32 backup)
```

---

## RIGGING VALIDATION (Post-Slicing)

**Before importing into animation software:**

1. **Visibility Test:** Toggle each layer on/off. Does the character appear/disappear correctly?
2. **Overlap Test:** Rotate forearm layer 90°. Do elbows show no transparency gaps?
3. **Naming Test:** Verify all layer names match specification exactly (case-sensitive in Moho/Harmony)
4. **Hierarchy Test:** Expand all groups. Verify parent-child relationships are correct.
5. **Color Test:** Verify all color fills are flat (no gradients). Spot-check hex values match design sheet.
6. **Notebook Test:** Verify A5 notebook prop fits naturally in +Hand_L_HoldBook_[B] and +Hand_R_HoldBook_[B] poses

---

**Slicing Specification by:** Waseem Raja  
**Reference Design:** Sana v1.1 Character Model Sheet  
**Output Destination:** `/puppets/Sana/Sana.psd`  
**Status:** ✅ Ready for Photopea / Photoshop Slicing
