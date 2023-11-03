import * as THREE from '../lib/three.module.js';
import { GLTFLoader } from '../lib/GLTFLoader.module.js';
import { OrbitControls } from "../lib/OrbitControls.module.js"
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);


const geometry = new THREE.BufferGeometry();
// Definir las dimensiones
const altura = 19;
const largo = 20;
const base = 4;

// Definir los vértices del prisma rectangular
const vertices = new Float32Array([
    // Cara frontal
    0, 0, 0,
    0, altura, 0,
    largo, 0, 0,
    largo, altura, 0,

    // Cara trasera
    0, 0, -base/2.5,
    0, altura, -base,
    largo, 0, -base/2.5,
    largo, altura, -base,

    // Caras laterales
    0, 0, 0,
    0, altura, 0,
    0, 0, -base,
    0, altura, -base,

    largo, 0, 0,
    largo, altura, 0,
    largo, 0, -base,
    largo, altura, -base,
]);

// Definir las caras del prisma rectangular
const indices = new Uint16Array([
    0, 2, 1,
    1, 2, 3,
    4, 5, 6,
    5, 7, 6,
    0, 1, 5,
    0, 5, 4,
    2, 6, 3,
    3, 6, 7,
    0, 4, 2,
    2, 4, 6,
    1, 3, 5,
    3, 7, 5,
]);

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setIndex(new THREE.BufferAttribute(indices, 1));
const materialWireframe = new THREE.MeshBasicMaterial({color:'red',wireframe:true});
const normalMaterial = new THREE.MeshNormalMaterial({wireframe: true/false, flatShading: true/false})
const finger = new THREE.Mesh(geometry, materialWireframe);
const cubeGeometry = new THREE.BoxGeometry( 19, 20, 4 ); 
const cube = new THREE.Mesh( cubeGeometry, materialWireframe ); 
finger.rotation.z = 1.5708;
finger.position.set(28.5,-10,2);
cube.add(finger);
const pinza = new THREE.Object3D();
pinza.add(cube);


scene.add(pinza);
camera.position.z = 5;

const animate = function () {
    requestAnimationFrame(animate);

    // Agrega aquí cualquier animación o actualización que desees

    renderer.render(scene, camera);
};

animate();
