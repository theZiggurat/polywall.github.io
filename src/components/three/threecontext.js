import * as THREE from 'three';
import MeshGen from '../../meshgen';
import Three from '.';
import { Vector3 } from 'three/build/three.module';

export default class ThreeContext {
    constructor(id) {

        this.canvas = document.getElementById(id);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 65, this.canvas.clientWidth /  this.canvas.clientHeight, 0.1, 1000 );
        
        console.log(this.canvas.innerWidth);
        this.renderer = new THREE.WebGLRenderer( {
            canvas: this.canvas,
            preserveDrawingBuffer: true,
            antialias: true
        } );
        
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        var light = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(light);

        this.dirlight = new THREE.DirectionalLight(0xffffff, 2);
        this.dirlight.castShadow = true;
        this.dirlight.shadowCameraLeft = -10;
        this.dirlight.shadowCameraRight = 10;
        this.dirlight.shadowCameraTop = 10;
        this.dirlight.shadowCameraBottom = -10;
        this.scene.add(this.dirlight);

        this.scene.background = new THREE.Color(0x8FbCD4);

        var geometry = MeshGen();
        var material = new THREE.MeshLambertMaterial({
        });
        material.vertexColors = THREE.FaceColors;
        
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.castShadow = true;
        this.cube.receiveShadow = true;
        this.scene.add( this.cube );

        var helper = new THREE.CameraHelper(this.dirlight.shadow.camera);
        this.scene.add(helper);

        this.camera.position.z = 5;

        this.lastX = 0.0;
        this.lastY = 0.0;
        this.dx = 0.0;
        this.dy = 0.0;
        this.dragging = false;

        console.log(this.dirlight.position);

        this.canvas.addEventListener("mousedown", (e) => this.setDrag(true));
        this.canvas.addEventListener("mouseup", (e) => this.setDrag(false));
        this.canvas.addEventListener("mousemove", this.updateMouse);
        this.canvas.addEventListener("mouseleave", (e) => this.setDrag(false));
        
    }

    setDrag(drag) {
        this.dragging = drag;
    }

    

    updateMouse = (e) => {
        this.dx = e.clientX - this.canvas.clientWidth / 2;
        this.dy = e.clientY - this.canvas.clientHeight / 2;
    }

    

    render = () => {
        requestAnimationFrame(this.render );
        if  (this.dragging) {
            this.dirlight.position.set(-this.dx / 200, -this.dy / 200, 0);
        }

        this.renderer.render( this.scene, this.camera );
    }
}