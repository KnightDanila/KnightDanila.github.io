/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40,
        B_KEY = 66,
        P_KEY = 80,
        G_KEY = 71,
        CTRL = 17,
        SHIFT = 16,
        ENTER = 13;
var keys = {};

$(document).keydown(function (e) {
    keys[e.keyCode] = 1;
    console.log("e.keyCode: " + e.keyCode);
    if (keys[ENTER]) {
        changePanorama360();
    }
    if (keys[P_KEY]) {
        //console.log("P_KEY PRESSED");
    }
    if (keys[G_KEY]) {
        FPM3DFrameSmallFull();
    }
    if (keys[UP]) {
        moveZ = -1;
        if (birdEyes) {
            birdAI.flyUpDown(-3);
            birdAI.moveState.pitchUp = 1;
        }
    }
    if (keys[DOWN]) {
        moveZ = 1;
        if (birdEyes) {
            birdAI.flyUpDown(3);
            birdAI.moveState.pitchDown = 1
        }
    }
    if (keys[LEFT]) {
        moveX = -1;
        if (birdEyes) {
            birdAI.flyLeftRight(3);
            birdAI.moveState.yawLeft = 1;
        }
    }
    if (keys[RIGHT]) {
        moveX = 1;
        if (birdEyes) {
            birdAI.flyLeftRight(-3);
            birdAI.moveState.yawRight = 1;
        }
    }
    if (keys[B_KEY]) {
        if (birdEyes) {
            birdEyes = false;
        } else {
            birdEyes = true;
        }
    }








});
$(document).keyup(function (e) {
    keys[e.keyCode] = 0;
    birdAI.moveStateZero();
    birdAI.stabilizeAutoON = true;
    moveZ = 0;
    moveX = 0;
});

// Actions
function FPM3DFrameSmallFull() {
    if (!document.getElementById("FPM3D_Frame").classList.contains("frame-window-full"))
    {
        document.getElementById("FPM3D_Frame").classList.add("frame-window-full");
    } else {
        document.getElementById("MainPresentation").focus();
        document.getElementById("FPM3D_Frame").classList.remove("frame-window-full");
    }
}