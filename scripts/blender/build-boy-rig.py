"""Wanderland boy rig builder for Blender 3.6+ / 4.0+.

Run from Blender's Text Editor. Import cut artwork as planes and parent each
piece to the matching bone after the armature is created.
"""

import os
from pathlib import Path

import bpy


CUTS_DIR = Path(bpy.path.abspath("//")) / "WANDERLAND_CARTOON" / "CUTS" / "BOY_PARTS"
if not CUTS_DIR.exists():
    CUTS_DIR = Path("/mnt/data/WANDERLAND_CARTOON/CUTS/BOY_PARTS")


def ensure_collection(name, parent):
    collection = bpy.data.collections.get(name)
    if collection is None:
        collection = bpy.data.collections.new(name)
    if collection.name not in parent.children:
        parent.children.link(collection)
    return collection


def import_plane(name, image_path, collection):
    if not os.path.exists(image_path):
        print(f"Missing {image_path} - creating empty plane")
        bpy.ops.mesh.primitive_plane_add(size=1)
    else:
        bpy.ops.import_image.to_plane(
            files=[{"name": os.path.basename(image_path)}],
            directory=str(Path(image_path).parent),
            shader="SHADELESS",
        )
    obj = bpy.context.active_object
    obj.name = name
    for linked_collection in list(obj.users_collection):
        linked_collection.objects.unlink(obj)
    collection.objects.link(obj)
    return obj


main_collection = ensure_collection("BOY", bpy.context.scene.collection)
for suffix in [
    "Hair_Back",
    "Head",
    "Body",
    "Left_Arm",
    "Right_Arm",
    "Left_Leg",
    "Right_Leg",
    "Accessories",
    "Hand_Swaps",
]:
    ensure_collection(f"BOY_{suffix}", main_collection)

bpy.ops.object.armature_add(enter_editmode=True, location=(0, 0, 0))
armature = bpy.context.active_object
armature.name = "BOY_RIG"
armature.data.name = "BOY_RIG_Data"

bpy.ops.armature.select_all(action="SELECT")
bpy.ops.armature.delete()

bones = {}


def add_bone(name, head, tail, parent=None):
    bone = armature.data.edit_bones.new(name)
    bone.head = head
    bone.tail = tail
    if parent:
        bone.parent = bones[parent]
    bones[name] = bone
    return bone


add_bone("WAIST", (0, 0, 1.0), (0, 0, 1.2))
add_bone("TORSO", (0, 0, 1.2), (0, 0, 1.8), "WAIST")
add_bone("NECK", (0, 0, 1.8), (0, 0, 2.0), "TORSO")
add_bone("HEAD", (0, 0, 2.0), (0, 0, 2.4), "NECK")

add_bone("L_Shoulder", (0, 0, 1.7), (-0.2, 0, 1.7), "TORSO")
add_bone("L_UpperArm", (-0.2, 0, 1.7), (-0.5, 0, 1.5), "L_Shoulder")
add_bone("L_LowerArm", (-0.5, 0, 1.5), (-0.7, 0, 1.2), "L_UpperArm")
add_bone("L_Hand", (-0.7, 0, 1.2), (-0.8, 0, 1.1), "L_LowerArm")

add_bone("R_Shoulder", (0, 0, 1.7), (0.2, 0, 1.7), "TORSO")
add_bone("R_UpperArm", (0.2, 0, 1.7), (0.5, 0, 1.5), "R_Shoulder")
add_bone("R_LowerArm", (0.5, 0, 1.5), (0.7, 0, 1.2), "R_UpperArm")
add_bone("R_Hand", (0.7, 0, 1.2), (0.8, 0, 1.1), "R_LowerArm")

add_bone("L_Thigh", (-0.1, 0, 1.0), (-0.15, 0, 0.5), "WAIST")
add_bone("L_Shin", (-0.15, 0, 0.5), (-0.15, 0, 0.1), "L_Thigh")
add_bone("L_Foot", (-0.15, 0, 0.1), (-0.15, 0.2, 0.05), "L_Shin")
add_bone("R_Thigh", (0.1, 0, 1.0), (0.15, 0, 0.5), "WAIST")
add_bone("R_Shin", (0.15, 0, 0.5), (0.15, 0, 0.1), "R_Thigh")
add_bone("R_Foot", (0.15, 0, 0.1), (0.15, 0.2, 0.05), "R_Shin")

add_bone("Hair_Back", (0, 0.05, 2.2), (0, 0.15, 2.0), "HEAD")
add_bone("Hair_Front", (0, -0.05, 2.3), (0, -0.1, 2.1), "HEAD")

bpy.ops.object.mode_set(mode="OBJECT")

armature["Hand_L"] = 1
armature["Hand_R"] = 1
armature["Expression"] = 0

print("BOY_RIG created.")
print("Hand_L/Hand_R: 1=Normal, 2=FaceSupport, 3=Point, 4=Fist, 5=HoldObject")
print(f"Import cut artwork from {CUTS_DIR} as planes and parent it to bones.")
