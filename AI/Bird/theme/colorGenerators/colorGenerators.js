/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * ColorsGenerator
 * 
 * INFO
 * 
 * https://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript
 * https://github.com/bit101/clrs/blob/master/clrs.js
 * https://stackoverflow.com/questions/1484506/random-color-generator
 * https://stackoverflow.com/questions/22692588/random-hex-generator-only-grey-colors/22692743
 *  
 */
//if (16777215 === 0xFFFFFF) { alert("16777215 === 0xFFFFFF - true");}
// If you use floor - it will never return absolute black 0xFFFFFF
// TEST FOR IT
/*
 while (true) {
 
 if (Math.floor(Math.random() * 16777215) === 0xFFFFFF) {
 alert("FLOOR - is true");
 }
 if (Math.floor(Math.random() * (16777215+1)) === 0xFFFFFF) {
 alert("FLOOR+1 - is true");
 }
 if (Math.round(Math.random() * 16777215) === 0xFFFFFF) {
 alert("ROUND - is true");
 }
 if (((Math.random() * 0xFFFFFF) | 0) === 0xFFFFFF) {
 alert(" | OR - is true");
 }
 }
 */
function colorRandomHexN() {
    return '#' + Math.floor(Math.random() * 16777215 + 1).toString(16);
}
function colorRandomHex0x() {
    //return parseInt('0x' + Math.floor(Math.random() * 16777215).toString(16));
    return Math.floor(Math.random() * 16777215 + 1); // 16777215 = 0xFFFFFF
}
function colorRandomHex0xGrayscale() {
    var value = Math.floor(Math.random() * 255 + 1); // 256 = 0xFF
    return (value << 16) | (value << 8) | value;
}