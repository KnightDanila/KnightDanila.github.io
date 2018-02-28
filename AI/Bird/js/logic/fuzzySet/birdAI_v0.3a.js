/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 5. Bird - like a block
 6. Birds - must have base AI (***) and 
 Vector - flying direction
 int - eyes position ;) 
 1 2 3
 4 5 6
 7 8 9
 2 - looks top
 4 - looks left      5 - looks forward       6 - looks right
 8 - looks down
 
 Speed - if speed is zero - it means that a Bird in trap - it is in small cube
 Acceleration - boost - speed-up - if boost is zero - it means that in front of Bird we have a wall or barrier
 and Bird must look at up, down, left or right, and turn
 */

/*
 Y
 |
 |
 |
 *------------ X
 /
 /
 Z
 */
/*
 var Bird = function () {
 var scope = this;
 THREE.Geometry.call(this);
 
 v(  5,   0,   0);
 v(- 5, - 2,   1);
 v(- 5,   0,   0);
 v(- 5, - 2, - 1);
 
 v(  0,   2, - 6);
 v(  0,   2,   6);
 v(  2,   0,   0);
 v(- 3,   0,   0);
 
 f3(0, 2, 1);
 // f3(0, 3, 2);
 f3(4, 7, 6);
 f3(5, 6, 7);
 
 //this.computeCentroids();
 this.computeFaceNormals();
 
 function v(x, y, z) {
 scope.vertices.push(new THREE.Vertex(new THREE.Vector3(x, y, z)));
 }
 
 function f3(a, b, c) {
 scope.faces.push(new THREE.Face3(a, b, c));
 }
 }
 Bird.prototype = new THREE.Geometry();
 Bird.prototype.constructor = Bird;
 */
var Bird = function () {

    var scope = this;

    THREE.Geometry.call(this);

    v(5, 0, 0);
    v(-5, -2, 1);
    v(-5, 0, 0);
    v(-5, -2, -1);

    v(0, 2, -6);
    v(0, 2, 6);
    v(2, 0, 0);
    v(-3, 0, 0);

    f3(0, 2, 1);
    // f3( 0, 3, 2 );

    f3(4, 7, 6);
    f3(5, 6, 7);

    this.computeFaceNormals();

    function v(x, y, z) {

        scope.vertices.push(new THREE.Vector3(x, y, z));

    }

    function f3(a, b, c) {

        scope.faces.push(new THREE.Face3(a, b, c));

    }

};

Bird.prototype = Object.create(THREE.Geometry.prototype);
Bird.prototype.constructor = Bird;


//####################################



Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};
// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};
function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}
function containsElemID(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === elem.id) {
            return true;
        }
    }
    return false;
}

clock = new THREE.Clock();
clock.start();
var birdAI = {
    /* При повороте вектора направления, должна изменяться вся ось, то есть
     * вместе с фигурой должна поворачиваться вся её ось координат и только её ось, то есть
     * у других фигур ось остаётся таже.
     * Только так можно симулировать управление самолётом-птицей
     */
    // BIRD
    birdSize: new THREE.Vector3(5, 5, 5),
    birdMesh: null,
    birdMeshGroup: new THREE.Group(),
    flyingPosition: new THREE.Vector3(0, 0, 0),
    flyingDirection: new THREE.Vector3(0.0, 0.0, 1.0), // vector3D // X Y Z
    flyingDirectionBox: null,
    keelPosition: null, // vector3D // X Y Z
    keelBox: null,
    flyingDownBox: null, // Min height and also Shadow
    flyingUpBox: null, // Max height and also Shadow

    eyesPos: 5, // int

    //SPEED
    speed: 0.0,
    speedMax: 0.7,
    boost: 0.01, //
    boostDefault: 0.01, //
    birdUnderControlNow: false, // true - if somebody controlled a bird

    //STABILIZE
    stabilizeAutoON: true,
    stabilizePause: true,
    stabilizeUpdate: false, //

    //HEIGHT
    maxHeight: 100, //maxHeight of flying
    minHeight: -40, //

    barriers: [], //Array or List of barriers

    clock: new THREE.Clock(),
    birdVisionL0Box: [], // Level 1
    birdVisionL1Box: [], // Level 1
    birdVisionL2Box: [], // Level 1
    birdVisionL3Box: [], // Level 1

    bird: null,
    //Only graphic
    init: function (scene) {
        //
        // Bird Body
        {
            var geometry = new THREE.BoxGeometry(this.birdSize.x, this.birdSize.y, this.birdSize.z);
            //var material = new THREE.MeshBasicMaterial({color: 0xffff00});
            var material = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});
            this.birdMesh = new THREE.Mesh(geometry, material);
            this.birdMesh.position.copy(this.flyingPosition);
            // birdSize
            this.birdSize = new THREE.Box3().setFromObject(this.birdMesh);
            console.log(this.birdSize.getSize());
            //scene.add(this.birdMesh);
            var Axis = new THREE.AxisHelper(20);
            this.birdMesh.add(Axis); // The X axis is red. The Y axis is green. The Z axis is blue.
        }
        //
        // FlyingDirection Box
        {
            var geometry = new THREE.BoxGeometry(3, 3, 3);
            var material = new THREE.MeshBasicMaterial({color: 0xFFFF00, wireframe: true});
            this.flyingDirectionBox = new THREE.Mesh(geometry, material);
            this.flyingDirectionBox.position.copy(this.flyingDirection.multiplyScalar(5));
            //scene.add(this.flyingDirectionBox);
            var Axis = new THREE.AxisHelper(20);
            this.flyingDirectionBox.add(Axis); // The X axis is red. The Y axis is green. The Z axis is blue.
        }
        //
        // keelBox
        {
            this.keelPosition = new THREE.Vector3(
                    this.flyingPosition.x,
                    this.flyingPosition.y - (this.birdSize.getSize().y) / 2 - 3,
                    this.flyingPosition.z);
            var geometry = new THREE.BoxGeometry(3, 3, 3);
            var material = new THREE.MeshBasicMaterial({color: 0xFFFF00, wireframe: true});
            this.keelBox = new THREE.Mesh(geometry, material);
            this.keelBox.position.copy(this.keelPosition);
        }
        //
        // BirdMesh + flyingDirectionBox + keelBox + Vision
        {
            //this.birdMesh.add(this.flyingDirectionBox);
            this.birdMeshGroup.add(this.birdMesh);
            this.birdMeshGroup.add(this.flyingDirectionBox);
            this.birdMeshGroup.add(this.keelBox);
            this.initVision(this.birdMeshGroup);
            scene.add(this.birdMeshGroup);
            this.flyingPosition.copy(this.birdMeshGroup.position);
            //this.flyingDirectionBox.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(box.getSize().x / 2, 0, 0));
        }
        //
        //flyingDownBox
        {
            var geometry = new THREE.BoxGeometry(50, 3, 50);
            var material = new THREE.MeshBasicMaterial({color: 0xFFFF00, wireframe: true});
            this.flyingDownBox = new THREE.Mesh(geometry, material);
            this.flyingDownBox.position.set(
                    this.flyingPosition.x,
                    this.minHeight - 3 / 2,
                    this.flyingPosition.z
                    );
            scene.add(this.flyingDownBox);
        }
        //
        //flyingUpBox
        {
            var geometry = new THREE.BoxGeometry(50, 3, 50);
            var material = new THREE.MeshBasicMaterial({color: 0xFFFF00, wireframe: true});
            this.flyingUpBox = new THREE.Mesh(geometry, material);
            this.flyingUpBox.position.set(
                    this.flyingPosition.x,
                    this.maxHeight - 3 / 2,
                    this.flyingPosition.z
                    );
            scene.add(this.flyingUpBox);

            this.barriersAdd(this.flyingUpBox);
            this.barriersAdd(this.flyingDownBox);
        }

        //
        this.bird = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff}));
        this.bird.phase = Math.floor(Math.random() * 62.83);
        this.bird.position = this.flyingPosition;
        this.bird.doubleSided = true;
        this.bird.material.side = THREE.DoubleSide;
        this.bird.scale.x = this.bird.scale.y = this.bird.scale.z = 2;//this.birdSize[0];
        //this.bird.verticesNeedUpdate = true;
        scene.add(this.bird);


    },
    visionHide: false,
    hideVision: function () {
        this.birdMeshGroup.visible = false;

    },
    showVision: function () {
//        for (i = 0; i < this.birdVisionL0Box.length; i++) {
//            this.birdVisionL0Box[i].visible = true;
//        }
        this.birdMeshGroup.visible = true;
    },
    // Vision Boxes
    initVision: function (birdMeshGroup) {
        /*
         *     | * * * | 
         *     | * C * |    C - flyingPosition
         *     | * * * |
         */
        /*
         *  Тут нужно учитывать куда летит птица, так 
         *  как от этого зависит начальная форма этих блоков :)
         *  А то прица летит по оси Z, а облоки повернуты в Y
         */
        var birdVisionSize = 7;
        // LEVEL 0
        var distance0 = birdVisionSize;
        this.birdVisionL0Box = Array();
        {
            // Хочу что бы блок был минимум distance0 в даль
            var birdVisionL0BoxSize = new THREE.Vector3(
                    this.birdSize.getSize().x * 3,
                    this.birdSize.getSize().y * 3,
                    this.birdSize.getSize().z * distance0
                    );
            var geometry = new THREE.BoxGeometry(birdVisionL0BoxSize.x, birdVisionL0BoxSize.y, birdVisionL0BoxSize.z);
            var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
            var mesh = new THREE.Mesh(geometry, material);
            // Where axis is the original direction of the cylinder (pointing up).
            var axis = new THREE.Vector3(0, 0, 1); // this.birdSize.getSize().z * distance0 - наибольшая, что бы в даль
            mesh.quaternion.setFromUnitVectors(axis, this.flyingDirection.clone().normalize());
            mesh.position.copy(this.flyingPosition.clone().add(this.flyingDirection.clone().normalize().multiply(birdVisionL0BoxSize).multiplyScalar(0.5)));
            this.birdVisionL0Box.push(mesh.clone());
            birdMeshGroup.add(this.birdVisionL0Box[0]); // delete it soon :D
        }
        // LEVEL 1
        var distance1 = 2.8 * (birdVisionSize / 3);
        this.birdVisionL1Box = Array();
        {
            // Хочу что бы блок был минимум 50 в даль
            var birdVisionL1BoxSize = new THREE.Vector3(this.birdSize.getSize().x, this.birdSize.getSize().y, this.birdSize.getSize().z * distance1);
            var geometry = new THREE.BoxGeometry(birdVisionL1BoxSize.x, birdVisionL1BoxSize.y, birdVisionL1BoxSize.z);
            var material = new THREE.MeshBasicMaterial({color: 0x68FF04, wireframe: true});
            var mesh = new THREE.Mesh(geometry, material);
            // Where axis is the original direction of the cylinder (pointing up).
            var axis = new THREE.Vector3(0, 0, 1); // 1 там где у меня this.birdSize.getSize().z * birdVisionSize
            mesh.quaternion.setFromUnitVectors(axis, this.flyingDirection.clone().normalize());
            mesh.position.copy(this.flyingPosition.clone().add(this.flyingDirection.clone().normalize().multiply(birdVisionL1BoxSize).multiplyScalar(0.5)));
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    mesh.position.copy(this.flyingPosition.clone().add(this.flyingDirection.clone().normalize().multiply(birdVisionL1BoxSize).multiplyScalar(0.5)));
                    mesh.translateX(this.birdSize.getSize().x - j * this.birdSize.getSize().x);
                    mesh.translateY(this.birdSize.getSize().y - i * this.birdSize.getSize().y);
                    this.birdVisionL1Box.push(mesh.clone());
                    birdMeshGroup.add(this.birdVisionL1Box[i * 3 + j]); // delete it soon :D
                }
            }
        }
        // LEVEL 2
        var distance2 = 2 * (birdVisionSize / 3);
        this.birdVisionL2Box = Array();
        {
            // Хочу что бы блок был distance2 в даль
            var birdVisionL2BoxSize = new THREE.Vector3(this.birdSize.getSize().x, this.birdSize.getSize().y, this.birdSize.getSize().z * distance2);
            var geometry = new THREE.BoxGeometry(birdVisionL2BoxSize.x, birdVisionL2BoxSize.y, birdVisionL2BoxSize.z);
            var material = new THREE.MeshBasicMaterial({color: 0xFFF100, wireframe: true});
            var mesh = new THREE.Mesh(geometry, material);
            // Where axis is the original direction of the cylinder (pointing up).
            var axis = new THREE.Vector3(0, 0, 1); // 1 там где у меня this.birdSize.getSize().z * birdVisionSize
            mesh.quaternion.setFromUnitVectors(axis, this.flyingDirection.clone().normalize());
            mesh.position.copy(this.flyingPosition.clone().add(this.flyingDirection.clone().normalize().multiply(birdVisionL2BoxSize).multiplyScalar(0.5)));
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    mesh.position.copy(this.flyingPosition.clone().add(this.flyingDirection.clone().normalize().multiply(birdVisionL2BoxSize).multiplyScalar(0.5)));
                    mesh.translateX(this.birdSize.getSize().x - j * this.birdSize.getSize().x);
                    mesh.translateY(this.birdSize.getSize().y - i * this.birdSize.getSize().y);
                    this.birdVisionL2Box.push(mesh.clone());
                    birdMeshGroup.add(this.birdVisionL2Box[i * 3 + j]); // delete it soon :D
                }
            }
        }
        // LEVEL 3
        var distance3 = 1.5 * (birdVisionSize / 3);
        this.birdVisionL3Box = Array();
        {
            // Хочу что бы блок был distance3 в даль
            var birdVisionL3BoxSize = new THREE.Vector3(this.birdSize.getSize().x, this.birdSize.getSize().y, this.birdSize.getSize().z * distance3);
            var geometry = new THREE.BoxGeometry(birdVisionL3BoxSize.x, birdVisionL3BoxSize.y, birdVisionL3BoxSize.z);
            var material = new THREE.MeshBasicMaterial({color: 0xFF043E, wireframe: true});
            var mesh = new THREE.Mesh(geometry, material);
            // Where axis is the original direction of the cylinder (pointing up).
            var axis = new THREE.Vector3(0, 0, 1); // 1 там где у меня this.birdSize.getSize().z * birdVisionSize
            mesh.quaternion.setFromUnitVectors(axis, this.flyingDirection.clone().normalize());
            mesh.position.copy(this.flyingPosition.clone().add(this.flyingDirection.clone().normalize().multiply(birdVisionL3BoxSize).multiplyScalar(0.5)));
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    mesh.position.copy(this.flyingPosition.clone().add(this.flyingDirection.clone().normalize().multiply(birdVisionL3BoxSize).multiplyScalar(0.5)));
                    mesh.translateX(this.birdSize.getSize().x - j * this.birdSize.getSize().x);
                    mesh.translateY(this.birdSize.getSize().y - i * this.birdSize.getSize().y);
                    this.birdVisionL3Box.push(mesh.clone());
                    birdMeshGroup.add(this.birdVisionL3Box[i * 3 + j]); // delete it soon :D
                }
            }
        }

        //updateTable();


    },
    // Animation
    animation: function () {

        var fd = new THREE.Vector3();
        fd.copy(this.flyingDirection);

        this.bird.position.copy(this.flyingPosition);
        this.bird.rotation.y = Math.atan2(-(this.flyingDirection.z - this.flyingPosition.z), this.flyingDirection.x - this.flyingPosition.x) || 0;
        this.bird.rotation.x = Math.asin((this.flyingDirection.y - this.flyingPosition.y) / fd.sub(this.flyingPosition).length()) || 0;
        //this.bird.rotation.x = Math.atan2(-(this.flyingDirection.x - this.flyingPosition.x), this.flyingDirection.y - this.flyingPosition.y) || 0;
        //Math.asin(this.flyingDirection.z - this.flyingPosition.z / fd.sub(this.flyingPosition).length()) || 0;
        /*
         this.bird.rotation.y = Math.atan2(-fd.z, fd.x) || 0;
         this.bird.rotation.z = Math.asin(fd.y / fd.length()) || 0;
         */
        //this.bird.up.copy( fd );
        //this.bird.lookAt(this.flyingDirection);
        //this.bird.attributes.rotation.needsUpdate = true;
        //log.add("this.bird.rotation.y " + this.bird.rotation.y);
        //log.add("this.bird.rotation.z " + this.bird.rotation.z);
        this.bird.phase = (this.bird.phase + (Math.max(0, this.bird.rotation.z) + 0.1)) % 62.83;
        //log.add("this.bird.phase " + this.bird.phase);
        this.bird.geometry.vertices[5].y = this.bird.geometry.vertices[4].y = Math.sin(this.bird.phase) * 5;
        this.bird.geometry.verticesNeedUpdate = true;
    },
    stabilize: function () {
        if (this.stabilizeAutoON && !this.stabilizePause) {
            log.add("stabilize");
            var matrix = new THREE.Matrix4();
            matrix.extractRotation(this.birdMeshGroup.matrix);
            var xAxis = new THREE.Vector3(0, 0, 0),
                    yAxis = new THREE.Vector3(0, 0, 0),
                    zAxis = new THREE.Vector3(0, 0, 0);
            this.birdMeshGroup.matrix.extractBasis(xAxis, yAxis, zAxis);
            /*
             if (clock.getElapsedTime() > 1) {
             console.log("-----------");
             console.log(xAxis);
             console.log(yAxis);
             console.log(zAxis);
             clock.start();
             }
             /**/


            if (Math.abs(Math.round(xAxis.y * 10) / 10) > 0.05 || yAxis.y < 0) {
                //this.rollSpeed = THREE.Math.degToRad(1.5);
                if (xAxis.y > 0) {
                    this.moveState.rollRight = 1;
                    this.moveState.rollLeft = 0;
                } else {
                    this.moveState.rollRight = 0;
                    this.moveState.rollLeft = 1;
                }
            } else {
                //this.rollSpeed = THREE.Math.degToRad(1);
                this.moveState.rollRight = 0;
                this.moveState.rollLeft = 0;
                this.stabilizePause = true;
            }
        }
    },
    updateFlyingVectors: function () {
        //this.flyingDirection = this.getFace(this.birdMesh);
        this.flyingDirection.setFromMatrixPosition(this.flyingDirectionBox.matrixWorld);
        this.flyingPosition.copy(this.birdMeshGroup.position);
        //this.keelPosition.setFromMatrixPosition(this.keelBox.matrixWorld);
        this.flyingDownBox.position.set(this.flyingPosition.x, this.minHeight - 3 / 2, this.flyingPosition.z);
        this.flyingUpBox.position.set(this.flyingPosition.x, this.maxHeight - 3 / 2, this.flyingPosition.z);


    },
    flyUp: function () {
        /*
         this.flyingDirection.x = Math.cos(Math.acos(this.flyingDirection.x) + THREE.Math.degToRad(deg));
         this.flyingDirection.y = Math.sin(Math.asin(this.flyingDirection.y) + THREE.Math.degToRad(deg));1
         this.birdMesh.rotateX(THREE.Math.degToRad(deg));
         */
        this.moveState.pitchDown = 1;
        //this.stabilizePause = false;
        this.stabilizePause = true;
        this.stabilizeUpdate = true;
        this.birdUnderControlNow = true;
        /*
         log.add("this.flyingDirectionBox.position: " + this.flyingDirectionBox.position.x +
         " " + this.flyingDirectionBox.position.y +
         " " + this.flyingDirectionBox.position.z
         );
         /**/
    },
    flyDown: function () {
        /*
         this.flyingDirection.x = Math.cos(Math.acos(this.flyingDirection.x) + THREE.Math.degToRad(deg));
         this.flyingDirection.y = Math.sin(Math.asin(this.flyingDirection.y) + THREE.Math.degToRad(deg));1
         this.birdMesh.rotateX(THREE.Math.degToRad(deg));
         */

        this.moveState.pitchUp = 1;
        //this.stabilizePause = false;
        this.stabilizePause = true;
        this.stabilizeUpdate = true;
        this.birdUnderControlNow = true;
        /*
         log.add("this.flyingDirectionBox.position: " + this.flyingDirectionBox.position.x +
         " " + this.flyingDirectionBox.position.y +
         " " + this.flyingDirectionBox.position.z
         );
         /**/
    },
    flyLeft: function () {
        /*
         this.flyingDirection.x = Math.cos(Math.acos(this.flyingDirection.x) + THREE.Math.degToRad(deg));
         this.flyingDirection.z = Math.sin(Math.asin(this.flyingDirection.z) + THREE.Math.degToRad(deg));
         this.birdMesh.rotateY(THREE.Math.degToRad(deg));
         */
        this.moveState.yawLeft = 1;
        //this.stabilizePause = false;
        this.stabilizePause = true;
        this.stabilizeUpdate = true;
        this.birdUnderControlNow = true;
        /*
         log.add("this.flyingDirectionBox.position: " + this.flyingDirectionBox.position.x +
         " " + this.flyingDirectionBox.position.y +
         " " + this.flyingDirectionBox.position.z
         );
         /**/
    },
    flyRight: function () {
        /*
         this.flyingDirection.x = Math.cos(Math.acos(this.flyingDirection.x) + THREE.Math.degToRad(deg));
         this.flyingDirection.z = Math.sin(Math.asin(this.flyingDirection.z) + THREE.Math.degToRad(deg));
         this.birdMesh.rotateY(THREE.Math.degToRad(deg));
         */
        this.moveState.yawRight = 1;
        //this.stabilizePause = false;
        this.stabilizePause = true;
        this.stabilizeUpdate = true;
        this.birdUnderControlNow = true;
        /*
         log.add("this.flyingDirectionBox.position: " + this.flyingDirectionBox.position.x +
         " " + this.flyingDirectionBox.position.y +
         " " + this.flyingDirectionBox.position.z
         );
         /**/
    },
    //flyingMainAi
    fly: function () {
        this.update();
        this.updateFlyingVectors();
        this.animation();

        if (this.speed != this.speedMax || this.boost != this.boostDefault) {
            if (this.speed < this.speedMax) {
                this.speed += this.boost;
                if (this.speed < 0) {
                    this.speed = 0;
                }
            } else {
                this.speed = this.speedMax;
            }
        }

        this.stabilize();

        if (clock.getElapsedTime() > 0.2) {
            clock.start();
            this.vision();
            this.AI();

            if (!this.birdUnderControlNow) {
                if (this.stabilizeUpdate) { // It is a lock for stabilizePause - without this "if" it will be always false - and stabilize() will never stop
                    this.stabilizePause = false;
                    this.stabilizeUpdate = false;
                }
                //this.moveStateZero(); - I need to think about it... I don`t need update it always
            }

            this.birdUnderControlNow = false;
        }

    },
    getFace: function (mesh) {
        var matrix = new THREE.Matrix4();
        matrix.extractRotation(mesh.matrix);
        var direction = new THREE.Vector3(0, 0, 1);
        direction.applyMatrix4(matrix);
        return direction;
    },
    /*
     * Как лучше это сделать:
     * Полиморфизм
     * Допустим всего в сцене 1000 объектов
     * из них сейчас на сцене 100 
     * пока человек идёт объекты добавляются и удаляются
     * Что делает полиморфизм 
     * Мы будем постоянно проходить по массиву всех объектов
     * и смотреть принадлежит ли этот объект к классу препятствий
     * 
     * 
     * 
     */
    barriersAdd: function (barrier) {
        if (Array.isArray(barrier)) {
            this.barriers = this.barriers.concat(barrier);
        } else {
            this.barriers.push(barrier);
        }
    },
    barriersClear: function () {
        this.barriers = [];
    },
    // detect the collisions
    /*
     * INFO
     * https://stackoverflow.com/questions/28453895/how-to-detect-collision-between-two-objects-in-javascript-with-three-js
     * https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Collision-Detection.html
     * 
     */
    collisionsDetector: function (object, objectsList) {

        var originPoint = new THREE.Vector3();
        //originPoint.setFromMatrixPosition(object.matrixWorld);
        originPoint = this.flyingPosition;

        var collisionsList = new Array();

        for (var vertexIndex = 0; vertexIndex < object.geometry.vertices.length; vertexIndex++)
        {
            var localVertex = object.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(object.matrixWorld);
            var directionVector = globalVertex.sub(originPoint.clone());
            var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
            var collisionResults = ray.intersectObjects(objectsList);
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                //if (collisionResults.length > 0 && collisionResults[0].distance < 0.5) {
                for (var i = 0; i < collisionResults.length; i++) {
                    // You need unique push
                    //collisionsList.push(collisionResults[i].object);
                    if (!containsElemID(collisionsList, collisionResults[i].object)) {
                        collisionsList.push(collisionResults[i].object);

                    }
                }
            }

        }
        //if (collisionsList.length) {
        //    console.log(collisionsList.length);
        //}
        return collisionsList;
    },
    collisionsMatrix: null,
    vision: function () {
        var LL0;
        var LL1;
        var LL2;
        var LL3;
        //collisionsMatrix;// = listToMatrix();
        var collisionsList = new Array(this.birdVisionL1Box.length).fill(0);

        // LEVEL 0
        LL0 = this.collisionsDetector(this.birdVisionL0Box[0], this.barriers);
        if (LL0.length != 0) {
            tableColor("AITable", colorRandomHexN());
            // LEVEL 1, 2, 3
            for (var i = 0; i < this.birdVisionL1Box.length; i++)
            {
                // LEVEL 1
                LL1 = this.collisionsDetector(this.birdVisionL1Box[i], LL0);
                if (LL1.length != 0) {
                    collisionsList[i]++;
                    // LEVEL 2
                    LL2 = this.collisionsDetector(this.birdVisionL2Box[i], LL1);
                    if (LL2.length != 0) {
                        collisionsList[i]++;
                        // LEVEL 3
                        LL3 = this.collisionsDetector(this.birdVisionL3Box[i], LL2);
                        if (LL3.length != 0) {
                            collisionsList[i]++;
                        }
                    }
                }
            }
        }
        this.collisionsMatrix = listToMatrix(collisionsList, 3);
        tableUpdate("AITable", this.collisionsMatrix);
    },
    AION: false,
    AIPause: false,
    AI: function () {
        if (this.AION && !this.AIPause) {
            {
                /*
                 RU = this.collisionsMatrix[0][1] *
                 this.collisionsMatrix[0][2] *
                 this.collisionsMatrix[1][1] *
                 this.collisionsMatrix[1][2];
                 RU = RU / (3 * 3 * 3 * 3);
                 LU = this.collisionsMatrix[0][0] *
                 this.collisionsMatrix[0][1] *
                 this.collisionsMatrix[1][0] *
                 this.collisionsMatrix[1][1];
                 LU = LU / (3 * 3 * 3 * 3);
                 RD = this.collisionsMatrix[1][1] *
                 this.collisionsMatrix[1][2] *
                 this.collisionsMatrix[2][1] *
                 this.collisionsMatrix[2][2];
                 RD = RD / (3 * 3 * 3 * 3);
                 LD = this.collisionsMatrix[1][0] *
                 this.collisionsMatrix[1][1] *
                 this.collisionsMatrix[2][0] *
                 this.collisionsMatrix[2][1];
                 LD = LD / (3 * 3 * 3 * 3);
                 */
            }

            {
                RU = this.collisionsMatrix[0][1] +
                        this.collisionsMatrix[0][2] +
                        this.collisionsMatrix[1][1] +
                        this.collisionsMatrix[1][2];
                RU = RU / (3 + 3 + 3 + 3);
                LU = this.collisionsMatrix[0][0] +
                        this.collisionsMatrix[0][1] +
                        this.collisionsMatrix[1][0] +
                        this.collisionsMatrix[1][1];
                LU = LU / (3 + 3 + 3 + 3);
                RD = this.collisionsMatrix[1][1] +
                        this.collisionsMatrix[1][2] +
                        this.collisionsMatrix[2][1] +
                        this.collisionsMatrix[2][2];
                RD = RD / (3 + 3 + 3 + 3);
                LD = this.collisionsMatrix[1][0] +
                        this.collisionsMatrix[1][1] +
                        this.collisionsMatrix[2][0] +
                        this.collisionsMatrix[2][1];
                LD = LD / (3 + 3 + 3 + 3);

                CNTR = this.collisionsMatrix[1][1] / 3;
            }

            var AIPause1 = false;
            var AIPause2 = false;
            var Wait = false;
            //log.add(CNTR);
            if (CNTR > 0) {
                if (CNTR >= 1) {    // CNTR [0..1]
                    this.speed = 0;
                } else {
                    this.boost = -CNTR;
                }
                if ((LU + RU == LD + RD) || (LU + LD == RU + RD)) {
                    this.flyRight();
                    Wait = true;
                }

            } else {
                this.boost = this.boostDefault;

                //this.moveState.pitchDown = 0;
                //this.moveState.pitchUp = 0;
                //this.moveState.yawLeft = 0;
                //this.moveState.yawRight = 0;

            }
            if (!Wait) {
                if (LU + RU > LD + RD) {
                    this.rollSpeed = THREE.Math.degToRad((LU + RU) / 2);
                    this.boost = this.boost - this.boostDefault * (LU + RU) / 2;
                    this.flyDown();
                    this.moveState.pitchDown = 0;
                } else if (LU + RU < LD + RD) {
                    this.rollSpeed = THREE.Math.degToRad((LD + RD) / 2);
                    this.boost = this.boost - this.boostDefault * (LD + RD) / 2;
                    this.flyUp();
                    this.moveState.pitchUp = 0;
                } else {
                    AIPause1 = true;
                }

                if (LU + LD > RU + RD) {
                    this.rollSpeed = THREE.Math.degToRad((LU + LD) / 2);
                    this.boost = this.boost - this.boostDefault * (LU + LD) / 2;
                    this.flyRight();
                    this.moveState.yawLeft = 0;
                } else if (LU + LD < RU + RD) {
                    this.rollSpeed = THREE.Math.degToRad((RU + RD) / 2);
                    this.boost = this.boost - this.boostDefault * (RU + RD) / 2;
                    this.flyLeft();
                    this.moveState.yawRight = 0;
                } else {
                    AIPause2 = true;
                }
            }


            if ((AIPause1 && AIPause2) && this.stabilizePause) {
                this.rollSpeed = this.rollSpeedDefault;
                this.boost = this.boostDefault;
                this.moveStateZero();
            }
        }
        //this.rollSpeed = THREE.Math.degToRad(1.5);
    },
    //////////////////////////////////////////////////////////////////////////////////
    // API

    rollSpeedDefault: THREE.Math.degToRad(1),
    rollSpeed: THREE.Math.degToRad(1), // =  rollSpeedDefault
    autoForward: true,
    // disable default target object behavior

    // internals
    tmpQuaternion: new THREE.Quaternion(),
    mouseStatus: 0,
    moveState: {up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0},
    moveVector: new THREE.Vector3(0, 0, 0),
    rotationVector: new THREE.Vector3(0, 0, 0),
    moveStateZero: function () {
        this.moveState = {up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0};
    },
    update: function () {
        //this.moveState.forward = 1;
        this.updateMovementVector();
        this.updateRotationVector();
        var delta = 1;
        var moveMult = delta * this.speed;
        var rotMult = delta * this.rollSpeed;
        this.birdMeshGroup.translateX(this.moveVector.x * moveMult);
        this.birdMeshGroup.translateY(this.moveVector.y * moveMult);
        this.birdMeshGroup.translateZ(this.moveVector.z * moveMult);
        this.tmpQuaternion.set(this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1).normalize();
        this.birdMeshGroup.quaternion.multiply(this.tmpQuaternion);
        // expose the rotation vector for convenience
        this.birdMeshGroup.rotation.setFromQuaternion(this.birdMeshGroup.quaternion, this.birdMeshGroup.rotation.order);
    },
    updateMovementVector: function () {

        var forward = (this.moveState.forward || (this.autoForward && !this.moveState.back)) ? 1 : 0;
        this.moveVector.x = (-this.moveState.left + this.moveState.right);
        this.moveVector.y = (-this.moveState.down + this.moveState.up);
        this.moveVector.z = -(-forward + this.moveState.back);
        //console.log('move:', [this.moveVector.x, this.moveVector.y, this.moveVector.z]);

    },
    updateRotationVector: function () {

        this.rotationVector.x = (-this.moveState.pitchDown + this.moveState.pitchUp);
        this.rotationVector.y = (-this.moveState.yawRight + this.moveState.yawLeft);
        this.rotationVector.z = (-this.moveState.rollRight + this.moveState.rollLeft);
        //console.log('rotate:', [this.rotationVector.x, this.rotationVector.y, this.rotationVector.z]);

    }

};
var birdPaterns = {
    paternsOnFuzzySet: [],
    paterns: [
        /*DC Comics | Batman | Bruce Wayne | Master detective | 188cm | 95kg | man | human | Detective Comics #27 (May 1939) | black | Good*/
        {
            "id": 1,
            "img": "Batman.jpg",
            "name": "Batman",
            "alterEgo": "Bruce Wayne",
            "height": 188,
            "weight": 95,
            "years": 35,
            "gender": "male",
            "hair": {
                "color": "black",
                "length": "short"
            },
            "eyes": "blue",
            "alignment": "good",
            "race": "human"
        }
    ]
};