import * as THREE from 'three';

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

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    

    var animate = function () {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render( scene, camera );
    };

    animate();
}