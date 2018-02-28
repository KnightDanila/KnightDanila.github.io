/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var keysCode = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    PAUSE: 19,
    CAPS: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    INSERT: 45,
    DELETE: 46,
    KEY_0: 48, // Because I cannot start from digit - 0_KEY - it is not correct :)
    KEY_1: 49,
    KEY_2: 50,
    KEY_3: 51,
    KEY_4: 52,
    KEY_5: 53,
    KEY_6: 54,
    KEY_7: 55,
    KEY_8: 56,
    KEY_9: 57,
    KEY_A: 65,
    KEY_B: 66,
    KEY_C: 67,
    KEY_D: 68,
    KEY_E: 69,
    KEY_F: 70,
    KEY_G: 71,
    KEY_H: 72,
    KEY_I: 73,
    KEY_J: 74,
    KEY_K: 75,
    KEY_L: 76,
    KEY_M: 77,
    KEY_N: 78,
    KEY_O: 79,
    KEY_P: 80,
    KEY_Q: 81,
    KEY_R: 82,
    KEY_S: 83,
    KEY_T: 84,
    KEY_U: 85,
    KEY_V: 86,
    KEY_W: 87,
    KEY_X: 88,
    KEY_Y: 89,
    KEY_Z: 90,
    NUMPAD_0: 96,
    NUMPAD_1: 97,
    NUMPAD_2: 98,
    NUMPAD_3: 99,
    NUMPAD_4: 100,
    NUMPAD_5: 101,
    NUMPAD_6: 102,
    NUMPAD_7: 103,
    NUMPAD_8: 104,
    NUMPAD_9: 105,
    MULTIPLY: 106,
    ADD: 107,
    SUBSTRACT: 109,
    DECIMAL: 110,
    DIVIDE: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PLUS: 187,
    COMMA: 188,
    MINUS: 189,
    PERIOD: 190,
    BACK_TICK: 192,
    LEFT_BRACKET: 219,
    RIGHT_BRACKET: 221
};
var keys = {};

$(document).keydown(function (e) {
    keys[e.keyCode] = 1;
    console.log("e.keyCode: " + e.keyCode);
    if (keys[keysCode.ENTER]) {
        changePanorama360();
    }
    if (keys[keysCode.KEY_P]) {
        //console.log("P_KEY PRESSED");
    }
    if (keys[keysCode.KEY_G]) {
        FPM3DFrameSmallFull();
    }
    if (keys[keysCode.UP_ARROW]) {
        moveZ = -1;
        if (birdEyes) {
            birdAI.flyDown();
            birdAI.AIPause = true;
        }
    }
    if (keys[keysCode.DOWN_ARROW]) {
        moveZ = 1;
        if (birdEyes) {
            birdAI.flyUp();
            birdAI.AIPause = true;
        }
    }
    if (keys[keysCode.LEFT_ARROW]) {
        moveX = -1;
        if (birdEyes) {
            birdAI.flyLeft();
            birdAI.AIPause = true;
        }
    }
    if (keys[keysCode.RIGHT_ARROW]) {
        moveX = 1;
        if (birdEyes) {
            birdAI.flyRight();
            birdAI.AIPause = true;
        }
    }
    if (keys[keysCode.KEY_B]) {
        if (birdEyes) {
            birdEyes = false;
        } else {
            birdEyes = true;
        }
    }
    if (keys[keysCode.KEY_A]) {
        if (birdAI.AION) {
            birdAI.AION = false;
        } else {
            birdAI.AION = true;
        }
    }
    if (keys[keysCode.KEY_S]) {
        if (birdAI.stabilizeAutoON) {
            birdAI.stabilizeAutoON = false;
        } else {
            birdAI.stabilizeAutoON = true;
        }
    }
    if (keys[keysCode.KEY_V]) {
        if (!birdAI.visionHide) {
            birdAI.visionHide = true;
            birdAI.hideVision();
        } else {
            birdAI.visionHide = false;
            birdAI.showVision();
        }
    }

    if (keys[keysCode.SHIFT]) {
        birdAI.speedMax += 0.1;
        log.add("birdAI.maxSpeed " + birdAI.speedMax);
    }
    if (keys[keysCode.CTRL]) {
        birdAI.speedMax -= 0.1;
        log.add("birdAI.maxSpeed " + birdAI.speedMax);
    }



});
$(document).keyup(function (e) {
    birdAI.AIPause = false;
    keys[e.keyCode] = 0;
    birdAI.moveStateZero();
    moveZ = 0;
    moveX = 0;
});
