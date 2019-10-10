import * as THREE from 'three';
import MeshGen from '../../meshgen';
import Three from '.';

export default (id) => {
    console.log("init");
    const _canvas = document.querySelector(`#${id}`);
    if (!_canvas) {
        return;
    }

    var three = document.getElementById('three');

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, three.clientWidth /  three.clientHeight, 0.1, 1000 );
    
    console.log(_canvas.innerWidth);
    var renderer = new THREE.WebGLRenderer( {
        canvas: _canvas,
        preserveDrawingBuffer: true
    } );
    
    renderer.setSize(three.clientWidth, three.clientHeight);

    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    var point = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(point);

    scene.background = new THREE.Color(0x8FbCD4);

    var geometry = MeshGen();
    var material = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide
    });
    material.vertexColors = THREE.FaceColors;
    
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    

    var animate = function () {
        requestAnimationFrame( animate );


        renderer.render( scene, camera );
    };

    animate();
}