/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function addLight(scene){
    light = new THREE.PointLight( 0xffffff, 1, 0);
    light.position.set(0, 200, 0);
    scene.add(light);
}