# AHMED — LAYER SLICING SPECIFICATION
## 54-Layer Anatomical Hierarchy & Mesh Origin Map

**Source Artwork:** Ahmed v1.1 Character Model Sheet (Premium 2D cel animation)  
**Output File:** `/puppets/Ahmed/Ahmed.psd` (Layered PSD, 2000 × 3000 px, 8-bit RGB, transparent background)  
**Animation Software:** Adobe Character Animator (primary) | Moho Pro 14 | Toon Boom Harmony | After Effects (Duik) | Blender 2D  
**Slicing Method:** Photopea (free, web-based) or Adobe Photoshop — Pen Tool cutouts from front-facing canonical pose

---

## AHMED CHARACTER SPECIFICATIONS (v1.1)

**Height Scale:** 173 cm (teenage male)  
**Build:** Relaxed slouched conversational posture  
**Complexion:** Fair warm peachy-tan (#D4A574)  
**Hair:** Dark brown (#2B1810) tousled wavy curls with volumetric character weight  
**Eyes:** Warm brown (#6B4423) with stylized lash definition  
**Outfit:** Dark charcoal hoodie (#3A3A3A) + white crewneck (#F5F5F0) + indigo cuffed jeans (#2C3E50) + vintage sneakers (#1A1A1A) + brown leather watch (#8B6F47)  
**Key Traits:** Smart, Lazy, Big Dreams, Overthinks, Good Heart

---

## 54-LAYER HIERARCHY (Complete Anatomical Breakdown)

### MASTER STRUCTURE
```
+Ahmed (Root Master Group)
├── 01_HEAD_RIG (Pivot Point: Base of Chin)
├── 02_TORSO_RIG (Pivot Point: Pelvis Center)
├── 03_ARMS_RIG (IK Chain: Shoulder ➔ Elbow ➔ Wrist)
└── 04_LEGS_RIG (IK Chain: Hip ➔ Knee ➔ Ankle ➔ Toe)
```

---

### 01_HEAD_RIG (17 Layers)

**Pivot Point:** Base of Chin (C3 vertebra position)  
**Purpose:** All head rotations, eye tracking, facial expressions, lip-sync

#### Hair System (5 Layers)

| Layer Name | Description | Overlap Rule | Physics Tags | Notes |
|-----------|-------------|--------------|---------------|-------|
| `+Hair_Back` | Voluminous dark curls behind collar, shoulder-length fall | 20% rounded cap behind neck | `dangle:0.8` (spring mass) | Moves independently when head rotates; no rubber-band distortion |
| `Hair_Strays_Physics_L` | Left side wisps falling below shoulder | 15% overlap cap | `dangle:1.2, friction:0.3` | Hair strand physics for wind/movement |
| `Hair_Strays_Physics_R` | Right side wisps | 15% overlap cap | `dangle:1.2, friction:0.3` | Mirror duplicate of left strand |
| `Hair_Strays_Back_Center` | Center back loose curls | 10% overlap | `dangle:1.0` | Subtle dangle for naturalistic movement |
| `+Hair_Front_Asymmetrical` | Tousled fringe falling across forehead (asymmetrical overthinking tell) | No overlap needed (front-facing) | `dangle:0.5` | Minimal movement; emphasizes character personality |

**Rendering Order:** Hair_Back (deepest) → Hair_Strays_Back_Center → Jaw_Ears_Base (middle) → Hair_Front_Asymmetrical (topmost)

#### Facial Structure (6 Layers)

| Layer Name | Description | Parent Constraint | Pivot Point | Notes |
|-----------|-------------|------------------|-------------|-------|
| `Neck` | Base column (skin + shadow) connecting head to torso | Child of Torso | Base of neck | Standard fill (no independent rotation) |
| `Jaw_Ears_Base` | Jaw outline + ear shapes + fair skin tone | Child of Head | Jaw hinge position | Supports mouth movement; ears don't rotate independently |
| `+Nose` | Small stylized nose shape (fair skin, fine detail) | Independent from jaw | Nose root (bridge) | Must be independent to prevent jaw distortion on mouth open |
| `+Left_Eye_Group` | Complete left eye unit (see Eye Subsystem below) | Independent | Eye center (pupil) | Separate group for tracking/gaze |
| `+Right_Eye_Group` | Complete right eye unit | Independent | Eye center (pupil) | Mirror-duplicate hierarchy of Left_Eye_Group |
| `+Mouth_LipSync_Master` | Mouth swap control group (13 visemes + triggers) | Independent | Mouth center (lip line) | See Mouth Subsystem below |

#### Left Eye Subsystem (5 Layers)

| Layer Name | Description | Swap Type | Trigger Key | Notes |
|-----------|-------------|-----------|------------|-------|
| `+Left_Eyebrow` | Arched eyebrow (asymmetrical overthinking tell) | Shape swap | None | Moves with eye direction; subtle arch for emotion |
| `Left_Eyelid_Top` | Upper eyelid (white sclera shadow) | Static | None | Non-independent (parent-constrained to eyeball) |
| `+Left_Pupil` | Pupil + iris (warm brown #6B4423) | Shape swap | None | Tracks gaze direction independently |
| `Left_Eyeball_White` | Sclera (white) + subtle shadow | Static | None | Background layer for pupil |
| `+Left_Blink_Frame_01..04` | 4-frame blink cycle (closed → open) | Multi-swap | Auto-trigger on audio silence | Lip-sync engine detects pauses for natural blinks |

**Pupil Tracking:** Left_Pupil contains `Pupil_Range` sub-layer (invisible guide) limiting eye movement to 20° in all directions (prevents unnatural eye bug-out)

#### Right Eye Subsystem (5 Layers)

Mirror-duplicate of Left_Eye_Group with identical naming convention (_L replaced with _R)

#### Mouth Lip-Sync Subsystem (9 Layers)

**Master Group:** `+Mouth_LipSync_Master`

| Viseme | Mouth Shape | Trigger | Example Dialogue | Blink Sync |
|--------|------------|---------|------------------|-----------|
| `Mouth_Rest` | Closed neutral (default) | Auto-default | (silence) | Auto-blink on silence |
| `Mouth_Ah` | Open with rounded O shape | Audio vowel "a" | "Ahmed", "want" | No auto-blink |
| `Mouth_D` | Tongue touching teeth | Consonant "d" | "this", "idea" | No auto-blink |
| `Mouth_Ee` | Wide grin, teeth showing | Vowel "e" | "Keep dreaming" | Smile blink (Duchenne) |
| `Mouth_F` | Lower lip under upper teeth | Consonant "f" | "from" | No auto-blink |
| `Mouth_L` | Tongue on ridge | Consonant "l" | "like" | No auto-blink |
| `Mouth_M` | Closed lips, puffed | Consonant "m" | "my", "moment" | No auto-blink |
| `Mouth_Oh` | Open circle shape | Vowel "o" | "overthinking", "okay" | No auto-blink |
| `Mouth_R` | Slightly open, rounded | Consonant "r" | "research", "right" | No auto-blink |
| `Mouth_S` | Thin line, teeth slightly showing | Consonant "s" | "scenic", "so" | No auto-blink |
| `Mouth_Uh` | Small open shape | Vowel "uh" | "uh-oh" | No auto-blink |
| `Mouth_W_Oo` | Rounded O (W/OO sound) | Diphthong "w-oo" | "watch", "would" | No auto-blink |

**Expression Trigger Swaps (Character-Specific):**

| Trigger | Layer Swap | Keyboard Shortcut | Scene Use | Notes |
|---------|-----------|------------------|-----------|-------|
| `+Smile_Open_Smug` | Mouth_Ee + Teeth_Show + Eye_Crinkle_Subtle | None (auto-detect "smirk" emotion) | SC03, SC04, SC06, SC11 | Playful smirk; teeth slightly showing |
| `+Smile_Open_GoodHeart` | Mouth_Ee + Teeth_Show + Eye_Crinkle_Deep + Brow_Relax | None (critical for SC11-10) | **SC11-10 rooftop (CRITICAL)** | Genuine Duchenne smile with eye crinkles; warmth evident |
| `+Overthinking_ChinRest` | Mouth_Rest + Brow_Furrow + Eye_Focus_Inward | None (emotion state) | SC05, SC07, SC09 | Paired with hand-on-chin pose (rigged separately) |
| `+Panic_WideEye` | Mouth_Oh + Eyes_Wide + Brow_Raised | None (auto-detect panic emotion) | SC04, SC08, SC10 | Crisis moment; eyes open 1.5× normal width |

**Viseme Priority (Adobe Character Animator):**
Ee, W-Oo, Oh, F (highest recognition accuracy for English dialogue)

---

### 02_TORSO_RIG (9 Layers)

**Pivot Point:** Pelvis Center (sacrum position)  
**Purpose:** Torso rotation, clothing drape, messenger bag movement, torso bend/squash

| Layer Name | Description | Parent | Rendering Order | Notes |
|-----------|-------------|--------|-----------------|-------|
| `Messenger_Strap_Back` | Tan/brown strap behind torso | Torso | Deepest | Moves with torso; strap overlaps behind shoulders |
| `Torso_Hoodie_Back` | Dark charcoal hoodie back panel | Torso | 2nd | 15% overlap cap at shoulders |
| `Torso_White_Tee` | White crewneck undershirt (visible at neckline + sleeves) | Torso | 3rd | Neutral fill (no independent rotation) |
| `Torso_Hoodie_Front` | Dark charcoal hoodie front panel (zip opening) | Torso | 4th | 15% overlap cap at shoulders (mirror of back) |
| `Hoodie_Drawstrings` | Two drawstring cords (left + right) | Torso | 5th | Subtle sway on torso bend (physics: `dangle:0.4`) |
| `Messenger_Bag_Front` | Tan crossbody bag hanging on right side (front view) | Torso | 6th | Slight swing on torso rotation (physics: `rotation:±5°`) |
| `Belt_Waistband` | Belt/waistband detail (dark charcoal) | Torso | 7th | Moves with pelvis; minimal deformation |
| `+Torso_Bend_Mesh_Optional` | Optional: Envelope deformer for squash/stretch | Torso | All layers | For advanced animation (jump landings, laugh bounces) — use in After Effects/Moho, not Character Animator |
| `Shadow_Torso_Underside` | Subtle shadow layer underneath torso (on canvas for depth) | Torso | Rendered beneath Torso_Hoodie_Back | Atmosphere/depth; non-animated |

**Torso Bend Constraint (Moho/Harmony/Blender):**
Maximum bend angle: ±20° forward/backward (realistic teenage posture, prevents over-deformation)  
Squash/Stretch: 1.1× scale on downward landing, 0.95× on lift (for walk cycles)

---

### 03_ARMS_RIG (22 Layers)

**Architecture:** IK Chain (Inverse Kinematics)  
**IK Targets:** Wrist (end effector) anchors entire arm chain  
**FK Fallback:** Each joint can rotate independently if IK solver disabled

#### LEFT ARM (+Upper_Arm_L ➔ +Forearm_L ➔ +Wrist_L ➔ Hand Swaps)

| Layer Name | Parent | Pivot Point | Overlap Cap | IK Role |
|-----------|--------|------------|------------|---------|
| `+Upper_Arm_L` | Shoulder joint (Torso) | Shoulder ball socket | 20% rounded elbow cap behind segment | IK Upper Limb |
| `+Forearm_L` | Upper_Arm_L (elbow hinge) | Elbow joint | 20% rounded wrist cap behind segment | IK Lower Limb |
| `+Wrist_L` | Forearm_L (wrist hinge) | Wrist center | 15% rounded hand cap behind segment | IK End Effector (anchor point) |
| `+Wrist_Watch_L` | Wrist_L | Watch center (on wrist) | No overlap (prop attachment) | Prop attachment to wrist |
| `+Hand_L_Normal` | Wrist_L | Palm center | 10% overlap with forearm | **Swap 1 (Default):** Relaxed natural hand |
| `+Hand_L_Point_[P]` | Wrist_L | Palm center | 10% overlap with forearm | **Swap 2 (Key P):** Index finger extended for accusation |
| `+Hand_L_FaceSupport_[O]` | Wrist_L | Palm center | 10% overlap with forearm | **Swap 3 (Key O):** Hand supporting chin (overthinking pose) |
| `+Hand_L_Fist_[F]` | Wrist_L | Palm center | 10% overlap with forearm | **Swap 4 (Key F):** Closed fist for emphasis |
| `+Hand_L_Pencil_Hold` | Wrist_L | Palm center | 10% overlap with forearm | **Swap 5:** Holding pencil/stylus (optional, for future scenes) |
| `Forearm_L_Rolled_Cuff` | Forearm_L | Cuff position | No overlap (detail on clothing) | Sleeve rolled-up detail (animated with forearm rotation) |

#### RIGHT ARM (+Upper_Arm_R ➔ +Forearm_R ➔ +Wrist_R ➔ Hand Swaps)

Mirror-duplicate of Left ARM with identical structure (_L replaced with _R):

| Layer Name | Swap Purpose | Keyboard Shortcut |
|-----------|-------------|------------------|
| `+Hand_R_Normal` | Relaxed natural hand | Default |
| `+Hand_R_Point_[P]` | Index finger extended | Key P |
| `+Hand_R_FaceSupport_[O]` | Hand on face (crying, thinking) | Key O |
| `+Hand_R_Fist_[F]` | Closed fist | Key F |
| `+Hand_R_Drink_Hold` | Holding drink/cup | D |

**IK Chain Settings (Adobe Character Animator):**
- Elbow Bend Limit: 120° (realistic teenage arm movement)
- Hand Rotation Limit: ±45° (prevents wrist breakage at extreme angles)
- Pole Vector: Elbow position maintained throughout animation (prevents elbow flipping)

---

### 04_LEGS_RIG (12 Layers)

**Architecture:** IK Chain (Inverse Kinematics)  
**IK Targets:** Ankle (end effector) anchors leg chain  
**Walk Cycle Foundation:** Both legs use same hierarchy for mirror-flip cycles

#### PELVIS (Parent of Both Legs)

| Layer Name | Description | Pivot Point | Overlap Cap | Notes |
|-----------|-------------|------------|------------|-------|
| `Pelvis_Jeans` | Waistband + hip structure (navy denim) | Pelvis center | 20% rounded thigh cap | Parent anchor for both leg IK chains |

#### LEFT LEG (+Thigh_L ➔ +Shin_L ➔ +Foot_L)

| Layer Name | Parent | Pivot Point | Overlap Cap | IK Role |
|-----------|--------|------------|------------|---------|
| `+Thigh_L` | Pelvis (hip socket) | Hip joint center | 20% rounded knee cap behind segment | IK Upper Limb |
| `+Shin_L` | Thigh_L (knee hinge) | Knee joint | 20% rounded ankle cap behind segment | IK Lower Limb |
| `+Foot_L` | Shin_L (ankle hinge) | Ankle center | 15% rounded sole cap | IK End Effector |
| `Shin_L_Cuff_Rolled` | Shin_L | Cuff position (just above ankle) | No overlap | Jeans cuff roll (animated with shin rotation) |
| `+Foot_L_Sneaker` | Foot_L | Heel-toe axis | No overlap | Retro amber/orange vintage sneaker (color: #D4A574 warm tone) |

#### RIGHT LEG (+Thigh_R ➔ +Shin_R ➔ +Foot_R)

Mirror-duplicate of Left Leg structure (_L replaced with _R)

**IK Chain Settings (Adobe Character Animator):**
- Knee Bend Limit: 140° (realistic teenage leg movement)
- Ankle Rotation Limit: ±35° (prevents foot breakage)
- Sole Contact: Foot_L_Sneaker + Foot_R_Sneaker layers aligned for ground contact in walk cycles

---

## SLICING WORKFLOW (Photopea / Photoshop)

### Step 1: Create Master PSD Document
```
File → New Document
Dimensions: 2000 × 3000 px
Resolution: 150 DPI
Color Mode: RGB 8-bit
Background: Transparent
Save As: /puppets/Ahmed/Ahmed.psd
```

### Step 2: Import Reference Artwork
- Open Ahmed v1.1 model sheet image (canonical front pose)
- File → Place Embedded → Select front turnaround image
- Paste into Ahmed.psd on layer named `_Reference_CanvasArt`
- Layer → Lock All (prevents accidental editing)
- Opacity: 50% (for visual reference while slicing)

### Step 3: Slice Hair System (5 Layers)
Using Pen Tool (P):
1. Outline `Hair_Back` (all curls behind collar line)
   - Create new layer, name `+Hair_Back`
   - Paint rounded 20% cap at neck base (prevents gap when head rotates)
   - Fill with dark brown (#2B1810) + 1-layer shadow
   
2. Outline `Hair_Front_Asymmetrical` (fringe falling across forehead)
   - Create new layer, name `+Hair_Front_Asymmetrical`
   - Paint fine lines with dark brown
   - Apply subtle asymmetry (overthinking tell)

3. Create 3× `Hair_Strays_Physics` layers (left, right, center back)
   - Name: `Hair_Strays_Physics_L`, `Hair_Strays_Physics_R`, `Hair_Strays_Back_Center`
   - Outline individual loose curls
   - Add 15% overlap caps at attachment points
   - Tag with physics: `dangle:0.8–1.2`

### Step 4: Slice Facial Structure (6 Layers)
1. **Neck:** Outline base column connecting head to torso (light skin tone)
2. **Jaw_Ears_Base:** Outline jaw outline + ear shapes (fair skin #D4A574)
3. **+Nose:** Small stylized nose (fine detail, independent layer)
4. **+Left_Eye_Group:** Outline entire left eye area (white + brown iris + shadow)
   - Subdivide into sub-layers: +Left_Eyebrow, Left_Eyelid, +Left_Pupil, Left_Eyeball_White
5. **+Right_Eye_Group:** Mirror duplicate of left eye
6. **+Mouth_LipSync_Master:** Create 13 mouth swap shapes (see Viseme table above)
   - Layer naming: `Mouth_Rest`, `Mouth_Ah`, `Mouth_Ee`, etc.
   - All layers share same X/Y position (mouth anchor point)
   - Set layer opacity: 0% (all invisible except active swap)

### Step 5: Slice Torso (9 Layers)
1. **Messenger_Strap_Back:** Tan strap (deepest layer, behind torso)
2. **Torso_Hoodie_Back:** Dark charcoal back panel (20% overlap cap at shoulders)
3. **Torso_White_Tee:** White shirt (visible at neckline, sleeves)
4. **Torso_Hoodie_Front:** Charcoal front panel (mirror of back)
5. **Hoodie_Drawstrings:** Two cord lines (physics tag: `dangle:0.4`)
6. **Messenger_Bag_Front:** Tan bag on right side (physics: `rotation:±5°`)
7. **Belt_Waistband:** Dark detail at hip line
8. **Optional:** `+Torso_Bend_Mesh_Optional` (advanced deformers in Moho/Harmony)
9. **Shadow_Torso_Underside:** Subtle shadow for depth

### Step 6: Slice Arms (22 Layers)
**Left Arm:**
1. Outline `+Upper_Arm_L` from shoulder to elbow (charcoal hoodie color)
   - Paint 20% rounded cap at elbow joint (behind forearm)
2. Outline `+Forearm_L` from elbow to wrist (white crewneck visible)
   - Paint 20% rounded cap at wrist joint
3. Outline `+Wrist_L` (hand base)
   - Paint 15% rounded cap
4. Attach `+Wrist_Watch_L` (brown leather watch detail)
5. Create 5× hand swaps: `+Hand_L_Normal`, `+Hand_L_Point_[P]`, `+Hand_L_FaceSupport_[O]`, `+Hand_L_Fist_[F]`, `+Hand_L_Pencil_Hold`
   - All hand swaps share same pivot point (palm center)
   - Set opacity: 0% (all invisible except active swap)
6. Add `Forearm_L_Rolled_Cuff` (sleeve detail, animated with forearm)

**Right Arm:** Mirror duplicate of left arm (_L → _R)

### Step 7: Slice Legs (12 Layers)
**Pelvis:**
1. Outline `Pelvis_Jeans` (waistband + hip structure, navy denim)
   - Paint 20% rounded cap at both hip joints

**Left Leg:**
1. Outline `+Thigh_L` from hip to knee (navy jeans)
   - Paint 20% rounded cap at knee joint
2. Outline `+Shin_L` from knee to ankle (navy jeans, cuffed)
   - Paint 20% rounded cap at ankle joint
3. Outline `+Foot_L` from ankle to toe (amber/orange sneaker)
   - Paint 15% rounded sole cap
4. Add `Shin_L_Cuff_Rolled` (rolled denim detail, animated with shin)
5. Attach `+Foot_L_Sneaker` (vintage sneaker, warm tone)

**Right Leg:** Mirror duplicate of left leg (_L → _R)

### Step 8: Organize Hierarchy
Create folder groups matching 01_HEAD_RIG structure:
```
+Ahmed/
├─ 01_HEAD_RIG/
│  ├─ +Hair_Back
│  ├─ Hair_Strays_Physics_*
│  ├─ Neck
│  ├─ Jaw_Ears_Base
│  ├─ +Nose
│  ├─ +Left_Eye_Group/
│  ├─ +Right_Eye_Group/
│  └─ +Mouth_LipSync_Master/
│
├─ 02_TORSO_RIG/
│  ├─ Messenger_Strap_Back
│  ├─ Torso_Hoodie_Back
│  ├─ Torso_White_Tee
│  ├─ Torso_Hoodie_Front
│  ├─ Hoodie_Drawstrings
│  ├─ Messenger_Bag_Front
│  ├─ Belt_Waistband
│  └─ Shadow_Torso_Underside
│
├─ 03_ARMS_RIG/
│  ├─ +Left_Arm/
│  │  ├─ +Upper_Arm_L
│  │  ├─ +Forearm_L
│  │  ├─ +Wrist_L
│  │  ├─ +Wrist_Watch_L
│  │  └─ +Hand_L_Swaps/
│  │
│  └─ +Right_Arm/ (mirror)
│
└─ 04_LEGS_RIG/
   ├─ Pelvis_Jeans
   ├─ +Left_Leg/
   │  ├─ +Thigh_L
   │  ├─ +Shin_L
   │  └─ +Foot_L
   │
   └─ +Right_Leg/ (mirror)
```

### Step 9: Quality Checklist Before Saving
- [ ] All layers named with `+` prefix where applicable (pivot-independent)
- [ ] All layers follow anatomical naming convention (_L = character left, _R = character right)
- [ ] All joints have 15–20% rounded overlap caps (no gaps at 90° rotation)
- [ ] Layer hierarchy organized in 4 main groups (HEAD, TORSO, ARMS, LEGS)
- [ ] Transparent background (PNG-32 compatible)
- [ ] No gradients or textures (flat color fills only)
- [ ] All layers are rasterized (no vector or smart objects)
- [ ] No clipping masks (breaks in rigging software)
- [ ] Reference layer locked and hidden
- [ ] Saved as PSD (`.psd` format, not PSB or PDF)
- [ ] 2000 × 3000 px dimensions maintained

### Step 10: Save & Export
```
File → Save As: /puppets/Ahmed/Ahmed.psd (PSD format)
File → Export As: /puppets/Ahmed/Ahmed_composite.png (PNG-32 backup)
```

---

## RIGGING VALIDATION (Post-Slicing)

**Before importing into animation software:**

1. **Visibility Test:** Toggle each layer on/off. Does the character appear/disappear correctly?
2. **Overlap Test:** Rotate forearm layer 90°. Do elbows show no transparency gaps?
3. **Naming Test:** Verify all layer names match specification exactly (case-sensitive in Moho/Harmony)
4. **Hierarchy Test:** Expand all groups. Verify parent-child relationships are correct.
5. **Color Test:** Verify all color fills are flat (no gradients). Spot-check hex values match design sheet.

---

**Slicing Specification by:** Waseem Raja  
**Reference Design:** Ahmed v1.1 Character Model Sheet  
**Output Destination:** `/puppets/Ahmed/Ahmed.psd`  
**Status:** ✅ Ready for Photopea / Photoshop Slicing
