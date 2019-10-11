import * as THREE from 'three';
import MeshGen from '../../meshgen';
import Maps from './maps';

export default class ThreeContext {
    constructor(id) {

        this.materialSettings = {
            roughness: 1.0,
            roughnessMap: Maps.rough1,
            roughnessMapChanged: true,
            vertexColors: THREE.FaceColors
        };

        this.sceneSettings = {
            ambientColor: '#0055AA',
            ambientIntensity: 0.5,
            dirColor: '#FFFFFF',
            dirIntensity: 0.9,
        }

        this.canvas = document.getElementById(id);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, this.canvas.clientWidth /  this.canvas.clientHeight, 0.1, 1000 );
        this.camera.position.z = 2.5;

        this.renderer = new THREE.WebGLRenderer( {
            canvas: this.canvas,
            preserveDrawingBuffer: true,
            antialias: true
        } );
        
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        

        this.scene.background = new THREE.Color(0x8FbCD4);
        this.material = new THREE.MeshStandardMaterial({});
        this.loader = new THREE.TextureLoader().setCrossOrigin(true);

        

        this.lastX = 0.0;
        this.lastY = 0.0;
        this.dx = 0.0;
        this.dy = 0.0;
        this.dragging = false;

        this.canvas.addEventListener("mousedown", (e) => this.setDrag(true));
        this.canvas.addEventListener("mouseup", (e) => this.setDrag(false));
        this.canvas.addEventListener("mousemove", this.updateMouse);
        this.canvas.addEventListener("mouseleave", (e) => this.setDrag(false));
        this.canvas.addEventListener("wheel", (e) => {
            this.camera.position.z = Math.min(10, Math.max(2, this.camera.position.z + e.deltaY * 0.002));
            e.preventDefault();
        });

        window.addEventListener('resize', (e) => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize( window.innerWidth, window.innerHeight );
        });
        
    }

    genModel(basecolor) {
        
        this.mesh = MeshGen(basecolor);
        this.scene.remove(this.model);
        this.model = new THREE.Mesh(this.mesh, this.material);
        this.scene.add(this.model);
    }

    genLights() {
        this.scene.remove(this.ambientlight, this.dirlight);
        this.ambientlight = new THREE.AmbientLight(
            this.sceneSettings.ambientColor, this.sceneSettings.ambientIntensity);
        this.dirlight = new THREE.DirectionalLight(
            this.sceneSettings.dirColor, this.sceneSettings.dirIntensity
        );
        this.scene.add(this.dirlight, this.ambientlight);
    }

    updateMaterial() {
        if(this.materialSettings.roughnessMap && this.materialSettings.roughnessMapChanged) {
            
            this.loader.load(this.materialSettings.roughnessMap, (tex) => {
                console.log(tex);
                tex.repeat = new THREE.Vector2(1,1);
                tex.wrapS = THREE.RepeatWrapping;
                tex.wrapT = THREE.RepeatWrapping;
                this.material.roughnessMap = tex;
            })
            this.materialSettings.roughnessMapChanged = false;
        }
        this.material.vertexColors = THREE.FaceColors;
        this.material.roughness = this.materialSettings.roughness;
        this.material.needsUpdate = true;
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
            this.dirlight.position.set(this.dx / 200, -this.dy / 200, 0);
        }

        //this.cube.rotateY(0.01);

        this.renderer.render( this.scene, this.camera );
    }
}