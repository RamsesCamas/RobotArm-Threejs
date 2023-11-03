import * as THREE from '../lib/three.module.js';
import { GLTFLoader } from '../lib/GLTFLoader.module.js';
import { OrbitControls } from "../lib/OrbitControls.module.js"

function createPizna(material){
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
    const finger = new THREE.Mesh(geometry, material);
    const cubeGeometry = new THREE.BoxGeometry( 19, 20, 4 ); 
    const cube = new THREE.Mesh( cubeGeometry, material); 
    finger.rotation.z = 1.5708;
    finger.position.set(28.5,-10,2);
    cube.add(finger);
    const pinza = new THREE.Object3D();
    pinza.add(cube);

    return pinza
}

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

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
/*
camera.position.z = 5;
camera.position.y = 2;
*/
camera.position.set(90,200,150);
camera.lookAt(0,0,0)
const materialWireframe = new THREE.MeshBasicMaterial({color:'red',wireframe:true});
const normalMaterial = new THREE.MeshNormalMaterial();

const floor = new THREE.Mesh(new THREE.PlaneGeometry(1000,1000,10,10), materialWireframe);
floor.rotation.x = -Math.PI/2;
floor.position.y = -0.2;
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry();
const box = new THREE.Mesh( boxGeometry,normalMaterial);
box.position.y = 2;
//scene.add(box);

let robotArm = new THREE.Object3D();
let brazo = new THREE.Object3D();
let anteBrazo = new THREE.Object3D();
let mano = new THREE.Object3D();

const baseGeometry = new THREE.CylinderGeometry( 50, 50, 15, 32 );
const robotBase = new THREE.Mesh( baseGeometry, materialWireframe ); 


const ejeGeometry = new THREE.CylinderGeometry( 20, 20, 18, 32 );
const ejeRobot = new THREE.Mesh(ejeGeometry,materialWireframe);
ejeRobot.rotation.x = 80.12;

brazo.add(ejeRobot)

const esparragoGeometry = new THREE.BoxGeometry(18,120,12);
const esparragoRobot = new THREE.Mesh(esparragoGeometry,materialWireframe);
esparragoRobot.position.y = 60;
brazo.add(esparragoRobot);

const rotulaGeometry = new THREE.SphereGeometry( 20, 45, 25 ); 
const rotulaRobot = new THREE.Mesh(rotulaGeometry,materialWireframe);
rotulaRobot.position.set(0,120,0);
brazo.add(rotulaRobot);

const discoGeometry = new THREE.CylinderGeometry( 22, 22, 6, 32 );
const discoAntebrazo = new THREE.Mesh( discoGeometry, materialWireframe ); 

const nervioGeometry = new THREE.BoxGeometry(4,80,4);
const nervioRobot1 = new THREE.Mesh(nervioGeometry,materialWireframe);
nervioRobot1.position.set(10,40,10);
const nervioRobot2 = new THREE.Mesh(nervioGeometry,materialWireframe);
nervioRobot2.position.set(10,40,-10);
const nervioRobot3 = new THREE.Mesh(nervioGeometry,materialWireframe);
nervioRobot3.position.set(-10,40,10);
const nervioRobot4 = new THREE.Mesh(nervioGeometry,materialWireframe);
nervioRobot4.position.set(-10,40,-10);

let nerviosRobot = new THREE.Object3D();
nerviosRobot.add(nervioRobot1);
nerviosRobot.add(nervioRobot2);
nerviosRobot.add(nervioRobot3);
nerviosRobot.add(nervioRobot4);

const manoGeometry = new THREE.CylinderGeometry( 15, 15, 40, 32 );
const manoRobot = new THREE.Mesh(manoGeometry,materialWireframe);
manoRobot.rotation.x = 80.12;
manoRobot.position.set(0,80,0);


const pinzaIzq = createPizna(materialWireframe);
pinzaIzq.add(axesHelper)
pinzaIzq.rotateX(1.5708);
pinzaIzq.position.set(10,12,0);
manoRobot.add(pinzaIzq);

const pinzaDer = createPizna(materialWireframe);
pinzaDer.add(axesHelper)
pinzaDer.rotateX(-1.5708);
pinzaDer.position.set(10,-12,0);
manoRobot.add(pinzaDer);

anteBrazo.position.set(0,120,0);
anteBrazo.add(discoAntebrazo);
anteBrazo.add(nerviosRobot);
anteBrazo.add(manoRobot);

brazo.add(anteBrazo);
robotBase.add(brazo);
robotArm.add(robotBase);

robotArm.name = "Robot"
scene.add( robotBase );

function animate(){
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate)