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
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};
// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};
clock = new THREE.Clock();
clock.start();
var birdAI = {
    /* При повороте вектора направления, должна изменяться вся ось, то есть
     * вместе с фигурой должна поворачиваться вся её ось координат и только её ось, то есть
     * у других фигур ось остаётся таже.
     * Только так можно симулировать управление самолётом-птицей
     */
    birdSize: new THREE.Vector3(10, 10, 10),
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
    speed: 0.0,
    speedMax: 0.2,
    boost: 0.01, //

    stabilizeAutoON: false,
    maxHeight: 4, //maxHeight of flying
    minHeight: -40, //

    barriers: [], //Array or List of barriers


    birdEyesL1: [], // Level 1
    birdEyesL2: [], // Level 1
    birdEyesL3: [], // Level 1

    //Only graphic
    init: function (scene) {
        //
        // Bird Body
        var geometry = new THREE.BoxGeometry(10, 10, 10);
        //var material = new THREE.MeshBasicMaterial({color: 0xffff00});
        var material = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});
        this.birdMesh = new THREE.Mesh(geometry, material);
        this.birdMesh.position.copy(this.flyingPosition);
        //scene.add(this.birdMesh);
        var Axis = new THREE.AxisHelper(20);
        this.birdMesh.add(Axis); // The X axis is red. The Y axis is green. The Z axis is blue.
        //
        // birdSize
        this.birdSize = new THREE.Box3().setFromObject(this.birdMesh);
        console.log(this.birdSize.getSize());
        //
        // FlyingDirection Box
        var geometry = new THREE.BoxGeometry(3, 3, 3);
        var material = new THREE.MeshBasicMaterial({color: 0xFFFF00, wireframe: true});
        this.flyingDirectionBox = new THREE.Mesh(geometry, material);
        this.flyingDirectionBox.position.copy(this.flyingDirection.multiplyScalar(5));
        //scene.add(this.flyingDirectionBox);
        var Axis = new THREE.AxisHelper(20);
        this.flyingDirectionBox.add(Axis); // The X axis is red. The Y axis is green. The Z axis is blue.
        //
        // keelBox
        this.keelPosition = new THREE.Vector3(
                this.flyingPosition.x,
                this.flyingPosition.y - (this.birdSize.getSize().y) / 2 - 3,
                this.flyingPosition.z);
        var geometry = new THREE.BoxGeometry(3, 3, 3);
        var material = new THREE.MeshBasicMaterial({color: 0xFFFF00, wireframe: true});
        this.keelBox = new THREE.Mesh(geometry, material);
        this.keelBox.position.copy(this.keelPosition);
        //
        // BirdMesh + flyingDirectionBox + keelBox
        //this.birdMesh.add(this.flyingDirectionBox);
        this.birdMeshGroup.add(this.birdMesh);
        this.birdMeshGroup.add(this.flyingDirectionBox);
        this.birdMeshGroup.add(this.keelBox);
        scene.add(this.birdMeshGroup);
        this.flyingPosition.copy(this.birdMeshGroup.position);
        //this.flyingDirectionBox.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(box.getSize().x / 2, 0, 0));
        //
        //flyingDownBox
        var geometry = new THREE.BoxGeometry(3, 3, 3);
        var material = new THREE.MeshBasicMaterial({color: 0xFFFF00, wireframe: true});
        this.flyingDownBox = new THREE.Mesh(geometry, material);
        this.flyingDownBox.position.set(
                this.flyingPosition.x,
                this.minHeight - 3 / 2,
                this.flyingPosition.z
                );
        scene.add(this.flyingDownBox);
        //
        //flyingUpBox
        var geometry = new THREE.BoxGeometry(3, 3, 3);
        var material = new THREE.MeshBasicMaterial({color: 0xFFFF00, wireframe: true});
        this.flyingUpBox = new THREE.Mesh(geometry, material);
        this.flyingUpBox.position.set(
                this.flyingPosition.x,
                this.maxHeight - 3 / 2,
                this.flyingPosition.z
                );
        scene.add(this.flyingUpBox);
    },
    // Animation
    animation: function () {
        
    },
    stabilize: function () {
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
         */
        /**/
        if (this.stabilizeAutoON) {
            if (Math.abs(Math.round(xAxis.y * 10) / 10) > 0.01 || yAxis.y < 0) {
                if (xAxis.y > 0) {
                    this.moveState.rollRight = 1;
                } else {
                    this.moveState.rollLeft = 1;
                }
            } else {
                this.moveState.rollRight = 0;
                this.moveState.rollLeft = 0;
                this.stabilizeAutoON = false;
            }
        }
    },
    updateFlyingDirection: function () {
        this.update();
        //this.flyingDirection = this.getFace(this.birdMesh);
        this.flyingDirection.setFromMatrixPosition(this.flyingDirectionBox.matrixWorld);
        this.flyingPosition.copy(this.birdMeshGroup.position);
        this.keelPosition.setFromMatrixPosition(this.keelBox.matrixWorld);
        this.flyingDownBox.position.set(this.flyingPosition.x, this.minHeight - 3 / 2, this.flyingPosition.z);
        this.flyingUpBox.position.set(this.flyingPosition.x, this.maxHeight - 3 / 2, this.flyingPosition.z);
        this.stabilize();
    },
    flyLeftRight: function (deg) {
        //this.flyingDirection.x = Math.cos(Math.acos(this.flyingDirection.x) + THREE.Math.degToRad(deg));
        //this.flyingDirection.z = Math.sin(Math.asin(this.flyingDirection.z) + THREE.Math.degToRad(deg));

        //this.birdMesh.rotateY(THREE.Math.degToRad(deg));
        log.add("this.flyingDirectionBox.position: " + this.flyingDirectionBox.position.x +
                " " + this.flyingDirectionBox.position.y +
                " " + this.flyingDirectionBox.position.z
                );
    },
    flyUpDown: function (deg) {
        //this.flyingDirection.x = Math.cos(Math.acos(this.flyingDirection.x) + THREE.Math.degToRad(deg));
        //this.flyingDirection.y = Math.sin(Math.asin(this.flyingDirection.y) + THREE.Math.degToRad(deg));1

        //this.birdMesh.rotateX(THREE.Math.degToRad(deg));
        log.add("this.flyingDirectionBox.position: " + this.flyingDirectionBox.position.x +
                " " + this.flyingDirectionBox.position.y +
                " " + this.flyingDirectionBox.position.z
                );
    },
    //flyingMainAi
    fly: function () {
        this.updateFlyingDirection();
        this.animation();

        if (this.speed != this.speedMax) {
            if (this.speed < this.speedMax) {
                this.speed += this.boost;
            } else {
                this.speed = this.speedMax;
            }
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
        this.barriers.push(barrier);
    },
    barriersClear: function () {
        this.barriers = [];
    },
    //////////////////////////////////////////////////////////////////////////////////
    // API

    movementSpeed: 0.1,
    rollSpeed: THREE.Math.degToRad(1),
    autoForward: false,
    clock: new THREE.Clock(),
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
        this.movementSpeed = this.speed;
        this.moveState.forward = 1;
        this.updateMovementVector();
        this.updateRotationVector();
        var delta = 1;
        var moveMult = delta * this.movementSpeed;
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