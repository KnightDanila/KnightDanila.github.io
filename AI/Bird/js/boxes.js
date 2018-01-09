/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * @matrix - must be square
 * @returns {undefined}
 */
function createBoxes(x, y, z, boxes, size, matrix) {
    //matrix - must be square
    boxes = [];
    boxesList = new Array();
    var distance = 0;
    var boxWidthX = size*2, boxHeightY = size, boxDepthZ = size*2;
    /*
     * 0 1 0
     * 3 3 3
     * 0 0 0
     *   |
     * - - -
     *   |
     *   
     */




    //It use x and y like center of Boxes
    var toCenterX = x - (boxWidthX * (matrix.length - 1)) / 2;
    // эквивалентно
    // var toCenterX = x - (    ((boxWidthX * (matrix.length)) / 2) - (boxWidthX/2)   );
    // просто вынесли(внесли) за скобку :)
    var toCenterY = y;
    var toCenterZ = z - (boxDepthZ * (matrix[0].length - 1)) / 2;

    log.add("<br>Matrix<br>");
    for (i = 0; i < matrix.length; i++) {
        boxes[i] = [];
        for (j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] < 1) {
                //boxes[i][j].position.set(toCenterX + boxWidthX * i, toCenterY + (boxHeightY * matrix[i][j]) / 2, toCenterZ + boxDepthZ * j);
                //log.add("" + (toCenterX + boxWidthX * i) + ", " + (toCenterY + (boxHeightY * matrix[i][j]) / 2) + ", " + (toCenterZ + boxDepthZ * j));
            } else {
                matrix[i][j] = Math.round(matrix[i][j]);
                var geometry = new THREE.BoxGeometry(boxWidthX, boxHeightY * matrix[i][j], boxDepthZ);
                //var material = new THREE.MeshBasicMaterial({color: 0xffff00});
                //var material = new THREE.MeshBasicMaterial({color: parseInt(colorRandomHex0x()), wireframe: true});
                //var material = new THREE.MeshDepthMaterial();
                var material = new THREE.MeshPhongMaterial({color: colorRandomHex0xWhitescale()}); // colorRandomHex0x() colorRandomHex0xGrayscale
                //var material = new THREE.MeshLambertMaterial({color: 0xffff00});
                //var material = new THREE.MeshStandardMaterial({color: 0xffff00});

                boxes[i][j] = new THREE.Mesh(geometry, material);
                boxes[i][j].position.set(toCenterX + boxWidthX * i, toCenterY + (boxHeightY * matrix[i][j]) / 2, toCenterZ + boxDepthZ * j);
                scene.add(boxes[i][j]);
                
                boxesList.push(boxes[i][j]);
                
                var boxAxis = new THREE.AxisHelper(20);
                boxes[i][j].add(boxAxis);
                
                log.add("" + (toCenterX + boxWidthX * i) + ", " + (toCenterY + (boxHeightY * matrix[i][j]) / 2) + ", " + (toCenterZ + boxDepthZ * j));
                //log.add(matrix[i][j]);
            }
        }
        log.add("<br>");
    }

    return boxesList;
}