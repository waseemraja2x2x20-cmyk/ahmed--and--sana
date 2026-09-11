// GIRL.psd builder - run in Photoshop with File > Scripts > Browse.
var doc = app.documents.add(2500, 3500, 72, "GIRL", NewDocumentMode.RGB, DocumentFill.TRANSPARENT);

function createGroup(name, parent) {
    var group = parent.layerSets.add();
    group.name = name;
    return group;
}

var girl = createGroup("+GIRL", doc);
var hairBackOuter = createGroup("+Hair_Back", girl);
var head = createGroup("+Head", girl);
createGroup("Face", head);
createGroup("Left Eyebrow", head);
createGroup("Right Eyebrow", head);
createGroup("Nose", head);
createGroup("Ear_L", head);
createGroup("Ear_R", head);
createGroup("Earrings", head);

var hairFront = createGroup("+Hair_Front", head);
createGroup("Front_Left_Strand", hairFront);
createGroup("Front_Right_Strand", hairFront);

var leftEye = createGroup("+Left Eye", head);
createGroup("Left Eyeball", leftEye);
createGroup("Left Pupil", leftEye);
createGroup("Left Blink", leftEye);

var rightEye = createGroup("+Right Eye", head);
createGroup("Right Eyeball", rightEye);
createGroup("Right Pupil", rightEye);
createGroup("Right Blink", rightEye);

var mouth = createGroup("+Mouth", head);
["Neutral", "Ah", "D", "Ee", "F", "L", "M", "Oh", "R", "S", "Uh", "W-Oo"].forEach(function (shape) {
    createGroup(shape, mouth);
});

createGroup("+Neck", girl);
var body = createGroup("+Body", girl);
var leftArm = createGroup("+Left Arm", body);
createGroup("Left Shoulder", leftArm);
createGroup("Left Upper Arm", leftArm);
createGroup("Left Lower Arm", leftArm);
var leftHand = createGroup("+Left Hand", leftArm);
["Normal", "FaceSupport", "Point", "Wave", "HoldObject"].forEach(function (pose) {
    createGroup(pose, leftHand);
});

createGroup("Top", body);

var rightArm = createGroup("+Right Arm", body);
createGroup("Right Shoulder", rightArm);
createGroup("Right Upper Arm", rightArm);
createGroup("Right Lower Arm", rightArm);
var rightHand = createGroup("+Right Hand", rightArm);
["Normal", "FaceSupport", "Point", "Wave", "HoldObject"].forEach(function (pose) {
    createGroup(pose, rightHand);
});

createGroup("Waist", body);
var leftLeg = createGroup("+Left Leg", girl);
createGroup("Left Thigh", leftLeg);
createGroup("Left Shin", leftLeg);
createGroup("Left Foot", leftLeg);
var rightLeg = createGroup("+Right Leg", girl);
createGroup("Right Thigh", rightLeg);
createGroup("Right Shin", rightLeg);
createGroup("Right Foot", rightLeg);

var accessories = createGroup("+Accessories", girl);
createGroup("Bag", accessories);
createGroup("Book", accessories);

alert("GIRL.psd structure created. Hair_Back is behind the body and Hair_Front frames the face.");
