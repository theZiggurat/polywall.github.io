import * as THREE from 'three';
import MeshGen from '../meshgen';
import Maps from './maps';
import Constants from '../constants';
import { PointLight } from 'three';
import Three from '../components/three';

class _ThreeContext {
    constructor() {

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

        this.scene = new THREE.Scene();
        this.raycaster = new THREE.Raycaster();
        this.scene.background = new THREE.Color(0x8FbCD4);
        this.material = new THREE.MeshStandardMaterial({});
        this.loader = new THREE.TextureLoader().setCrossOrigin(true);

        this.lastX = 0.0;
        this.lastY = 0.0;
        this.dx = 0.0;
        this.dy = 0.0;
        this.dragging = false;

        this.ndc = new THREE.Vector2();
    }

    registerCanvas(id) {
        this.canvas = document.getElementById(id);
        this.camera = new THREE.PerspectiveCamera( 75, this.canvas.clientWidth /  this.canvas.clientHeight, 0.1, 1000 );
        this.camera.position.z = 2.5;

        this.renderer = new THREE.WebGLRenderer( {
            canvas: this.canvas,
            preserveDrawingBuffer: true,
            antialias: true
        } );
        
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        this.canvas.addEventListener("mousedown", (e) => {
            e.preventDefault();
            this.setDrag(true);
        });
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

    registerLight(type, name) {
        console.log(type, name);
        let newlight;
        switch (type) {
            case 'point':
                newlight = new THREE.PointLight(Constants.DEFAULT_COLOR);
                break;
            case 'directional':
                newlight = new THREE.DirectionalLight(Constants.DEFAULT_COLOR);
                break;
            case 'ambient':
                newlight = new THREE.AmbientLight(Constants.DEFAULT_COLOR);
                break;
            default:
                return;
            
        }
        newlight.name = name;
        this.scene.add(newlight);
    }

    updateLight(name, color){
        let light = this.scene.getObjectByName(name);
        if(light === undefined) return;
        light.color = new THREE.Color(color.hex);
        light.intensity = color.rgb.a;
    }

    genModel(basecolor) {
        
        this.mesh = MeshGen.generate(basecolor);
        this.scene.remove(this.model);
        this.model = new THREE.Mesh(this.mesh, this.material);
        this.model.name = 'wallpaper';
        this.scene.add(this.model);
    }

    updateMaterial() {
        if(this.materialSettings.roughnessMap && this.materialSettings.roughnessMapChanged) {
            
            this.loader.load(this.materialSettings.roughnessMap, (tex) => {
                console.log(tex);
                tex.repeat = new THREE.Vector2(4,4);
                tex.wrapS = THREE.RepeatWrapping;
                tex.wrapT = THREE.RepeatWrapping;
                tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
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
        this.ndc.x = ( e.clientX / window.innerWidth ) * 2 - 1;
		this.ndc.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    }

    render = () => {
        requestAnimationFrame(this.render );
        

        if  (this.dragging) {
            //this.raycaster.setFromCamera(this.ndc, this.camera);
            //var intersects = this.raycaster.intersectObjects( this.scene.children, true);
            
            // if(intersects.includes(this.light1)) {
            //     console.log(intersects);
            //     this.light1.position.set(this.ndc.x, this.ndc.y, 2);
            // } else {
                //this.dirlight.position.set(this.dx / 200, -this.dy / 200, 0);
            //}
        }

        //this.cube.rotateY(0.01);

        this.renderer.render( this.scene, this.camera );
    }
}

const ThreeContext = new _ThreeContext();
export default ThreeContext;