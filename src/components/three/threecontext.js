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
        this.model.name = 'wallpaper';
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

        // this.scene.remove(this.light1);
        // this.light1 = new THREE.PointLight('#FF0000', 1, 100);
        // this.light1.position.set(0, 0, 1.5);

        // var sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
        // this.light1model = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial());
        // this.light1.add(this.light1model);
        // this.light1.name = 'pointlight';
        // this.scene.add(this.light1, this.light1helper);
    }

    updateAmbientLight(color) {
        this.ambientlight.color.set(new THREE.Color(color.hex));
        this.ambientlight.intensity.set(color.rgb.a);
    }

    updateDirectionalLight(color) {
        this.dirlight.color.set(new THREE.Color(color.hex));
        this.dirlight.intensity.set(color.rgb.a);
    }

    updatePointLight1(color) {
        // var tc = new THREE.Color(color.hex);
        // this.light1.color.set(tc);
        // this.light1.intensity.set(color.rgb.a);
        // this.light1model.color.set(tc);

    }

    updateMaterial() {
        if(this.materialSettings.roughnessMap && this.materialSettings.roughnessMapChanged) {
            
            this.loader.load(this.materialSettings.roughnessMap, (tex) => {
                console.log(tex);
                tex.repeat = new THREE.Vector2(4,4);
                tex.wrapS = THREE.RepeatWrapping;
                tex.wrapT = THREE.RepeatWrapping;
                tex.anisotropy = this.renderer.getMaxAnisotropy();
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
                this.dirlight.position.set(this.dx / 200, -this.dy / 200, 0);
            //}
        }

        //this.cube.rotateY(0.01);

        this.renderer.render( this.scene, this.camera );
    }
}