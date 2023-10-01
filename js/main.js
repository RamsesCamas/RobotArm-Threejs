import * as THREE from '../lib/three.module.js';
import { GLTFLoader } from '../lib/GLTFLoader.module.js';
import { OrbitControls } from "../lib/OrbitControls.module.js"

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);
document.getElementById('container').appendChild(renderer.domElement);


const scene = new THREE.Scene();
const camera  = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
/*
camera.position.z = 5;
camera.position.y = 2;
*/
camera.position.set(0,2,5);
renderer.render(scene, camera);