import * as THREE from '../lib/three.module.js';
import { GLTFLoader } from '../lib/GLTFLoader.module.js';
import { OrbitControls } from "../lib/OrbitControls.module.js"
import { TWEEN } from "../lib/tween.module.min.js";
import { GUI } from "../lib/lil-gui.module.min.js";

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
    /*const uvs = new Float32Array([
        0, 0,  // Corresponds to the bottom-left corner of the texture
        0, 1,  // Corresponds to the top-left corner of the texture
        1, 0,  // Corresponds to the bottom-right corner of the texture
        1, 1,  // Corresponds to the top-right corner of the texture
    
        // Continue defining UVs for the remaining vertices as needed
    ]);
    
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));*/
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeVertexNormals();
    const normalMaterial = new THREE.MeshNormalMaterial({wireframe: true/false, flatShading: true/false})

    const finger = new THREE.Mesh(geometry,normalMaterial);
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

let effectController;
const scene = new THREE.Scene();
const camera  = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const orthoCamera = new THREE.OrthographicCamera(
    window.innerWidth / - 4, 
    window.innerWidth / 4, 
    window.innerHeight / 4, 
    window.innerHeight / -4, 
    0.1, 
    1000
  );
orthoCamera.position.y = 220; // posicionar encima del robot
orthoCamera.lookAt(scene.position);

const controls = new OrbitControls(camera, renderer.domElement);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
/*
camera.position.z = 5;
camera.position.y = 2;
*/
camera.position.set(150,270,200);
camera.lookAt(0,0,0)
window.addEventListener('resize', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    
    // Ajusta los límites de la cámara ortográfica según el tamaño de la ventana
    orthoCamera.left = -width / 8;
    orthoCamera.right = width / 8;
    orthoCamera.top = height / 8;
    orthoCamera.bottom = -height / 8;
    orthoCamera.updateProjectionMatrix();
  });
const normalMaterial = new THREE.MeshNormalMaterial();

const floor = new THREE.Mesh(new THREE.PlaneGeometry(1000,1000,10,10), normalMaterial);
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
const robotBase = new THREE.Mesh( baseGeometry, normalMaterial ); 


const ejeGeometry = new THREE.CylinderGeometry( 20, 20, 18, 32 );
const ejeRobot = new THREE.Mesh(ejeGeometry,normalMaterial);
ejeRobot.rotation.x = 80.12;

brazo.add(ejeRobot);

const esparragoGeometry = new THREE.BoxGeometry(18,120,12);
const esparragoRobot = new THREE.Mesh(esparragoGeometry,normalMaterial);
esparragoRobot.position.y = 60;
brazo.add(esparragoRobot);

const rotulaGeometry = new THREE.SphereGeometry( 20, 45, 25 ); 
const rotulaRobot = new THREE.Mesh(rotulaGeometry,normalMaterial);
rotulaRobot.position.set(0,120,0);
brazo.add(rotulaRobot);

const discoGeometry = new THREE.CylinderGeometry( 22, 22, 6, 32 );
const discoAntebrazo = new THREE.Mesh( discoGeometry, normalMaterial ); 

const nervioGeometry = new THREE.BoxGeometry(4,80,4);
const nervioRobot1 = new THREE.Mesh(nervioGeometry,normalMaterial);
nervioRobot1.position.set(10,40,10);
const nervioRobot2 = new THREE.Mesh(nervioGeometry,normalMaterial);
nervioRobot2.position.set(10,40,-10);
const nervioRobot3 = new THREE.Mesh(nervioGeometry,normalMaterial);
nervioRobot3.position.set(-10,40,10);
const nervioRobot4 = new THREE.Mesh(nervioGeometry,normalMaterial);
nervioRobot4.position.set(-10,40,-10);

let nerviosRobot = new THREE.Object3D();
nerviosRobot.add(nervioRobot1);
nerviosRobot.add(nervioRobot2);
nerviosRobot.add(nervioRobot3);
nerviosRobot.add(nervioRobot4);

const manoGeometry = new THREE.CylinderGeometry( 15, 15, 40, 32 );
const manoRobot = new THREE.Mesh(manoGeometry,normalMaterial);
manoRobot.rotation.x = 1.5708;
manoRobot.position.set(0,80,0);

const pinzaIzq = createPizna(normalMaterial);
pinzaIzq.add(axesHelper)
pinzaIzq.rotateX(1.5708);
pinzaIzq.position.set(10,15,0);
manoRobot.add(pinzaIzq);

const pinzaDer = createPizna(normalMaterial);
pinzaDer.add(axesHelper)
pinzaDer.rotateX(-1.5708);
pinzaDer.position.set(10,-15,0);
manoRobot.add(pinzaDer);

anteBrazo.position.set(0,120,0);
anteBrazo.add(discoAntebrazo);
anteBrazo.add(nerviosRobot);
anteBrazo.add(manoRobot);

brazo.add(anteBrazo);
robotBase.add(brazo);
robotArm.add(robotBase);

robotArm.name = "Robot"
scene.add( robotArm );



const initialPosition = { x: pinzaIzq.position.x, y: pinzaIzq.position.y, z: pinzaIzq.position.z };

const tweenForward = new TWEEN.Tween(pinzaIzq.position)
  .to({ x: 10, y: 4, z: 0 }, 2000)
  .easing(TWEEN.Easing.Quadratic.Out);

const tweenBackward = new TWEEN.Tween(pinzaIzq.position)
  .to({ x: initialPosition.x, y: initialPosition.y, z: initialPosition.z }, 2000)
  .easing(TWEEN.Easing.Quadratic.Out);

tweenForward.chain(tweenBackward);

const initialPosition2 = { x: pinzaDer.position.x, y: pinzaDer.position.y, z: pinzaDer.position.z };

const tweenForward2 = new TWEEN.Tween(pinzaDer.position)
  .to({ x: 10, y: -4, z: 0 }, 2000)
  .easing(TWEEN.Easing.Quadratic.Out);
const tweenBackward2 = new TWEEN.Tween(pinzaDer.position)
  .to({ x: initialPosition2.x, y: initialPosition2.y, z: initialPosition2.z }, 2000)
  .easing(TWEEN.Easing.Quadratic.Out);
tweenForward2.chain(tweenBackward2);


const initialBrazo = { x: anteBrazo.rotation.x, y: anteBrazo.rotation.y, z: anteBrazo.rotation.z };

const tweenForwardBrazo = new TWEEN.Tween(anteBrazo.rotation)
   .to({ x: -1.3, y: 0.1, z: -1.88 }, 2000).easing(TWEEN.Easing.Sinusoidal.Out);
const tweenBackwardBrazo = new TWEEN.Tween(anteBrazo.rotation)
   .to({x:initialBrazo.x, y: initialBrazo.y, z: initialBrazo.z}).easing(TWEEN.Easing.Sinusoidal.Out);
tweenForwardBrazo.chain(tweenBackwardBrazo);

const initialBase = { x: robotBase.rotation.x, y: robotBase.rotation.y, z: robotBase.rotation.z };

const tweenForwardBase =  new TWEEN.Tween(robotBase.rotation)
.to({x:0,y:-1,z:0},2000).easing(TWEEN.Easing.Sinusoidal.Out);
const tweenBackwardBase = new TWEEN.Tween(robotBase.rotation)
.to({x:initialBase.x,y:initialBase.y, z:initialBase.z}).easing(TWEEN.Easing.Sinusoidal.Out);

tweenForwardBase.chain(tweenBackwardBase);

effectController = {
    mensaje: "Brazo Robot",
    giro_Base_Y: 0.0,
    giro_Eje: 0.0,
    giro_Antebrazo_Y: 0.0,
    giro_Antebrazo_Z: 0.0,
    giro_Pinza: 0.0,
    separacion_Pinza: 0.0,
    alambrico: false,
    animacion: function(){
        pinzaIzq.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
        pinzaDer.position.set(initialPosition2.x, initialPosition2.y, initialPosition2.z);
        anteBrazo.rotation.set(initialBrazo.x, initialBrazo.y, initialBrazo.z);
        robotBase.rotation.set(initialBase.x,initialBase.y, initialBase.z);
        tweenForward.start();
        tweenForward2.start();
        tweenForwardBrazo.start();
        tweenForwardBase.start();
    }
}
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

document.addEventListener('keydown', (event) => {
    if (keys[event.key] !== undefined) {
        keys[event.key] = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (keys[event.key] !== undefined) {
        keys[event.key] = false;
    }
});

const gui = new GUI();
let posRightPinza = pinzaDer.position.y;
let posLeftPinza = pinzaIzq.position.y;
const folderControl = gui.addFolder("Control esferaCubo");
folderControl.add(effectController, "mensaje").name("Aplicacion");
folderControl.add(effectController, "giro_Base_Y", -180.0,180.0,0.025).name("Giro Base").onChange((rotationValue)=>{
        robotBase.rotation.y = rotationValue * Math.PI/180;
    });
folderControl.add(effectController, "giro_Eje", -45.0,45.0,0.025).name("Giro Eje").onChange((rotationValue)=>{
        brazo.rotation.z = rotationValue * Math.PI/180;
    });
folderControl.add(effectController, "giro_Antebrazo_Y", -180.0,180.0,0.025).name("Giro Antebrazo Y").onChange((rotationValue)=>{
        anteBrazo.rotation.y = rotationValue * Math.PI/180;
    });
folderControl.add(effectController, "giro_Antebrazo_Z", -90.0,90.0,0.025).name("Giro Antebrazo Z").onChange((rotationValue)=>{
        anteBrazo.rotation.z = rotationValue * Math.PI/180;
    });
folderControl.add(effectController, "giro_Pinza", -40.0,220.0,0.025).name("Giro Pinza").onChange((rotationValue)=>{
        manoRobot.rotation.y = rotationValue * Math.PI/180;
    });
folderControl.add(effectController, "separacion_Pinza", 0,15.0,0.025).name("Sepracion Pinza").onChange((rotationValue)=>{
        pinzaDer.position.y = rotationValue + posRightPinza;
        pinzaIzq.position.y = (rotationValue - posLeftPinza) * -1;
    });

folderControl.add(effectController,"alambrico").onChange((materialValue)=>{
    let wireframeMaterial = new THREE.MeshBasicMaterial({color:'red',wireframe:true});
    let normalMaterial = new THREE.MeshNormalMaterial();
    let robotPartsArray = [robotBase, ejeRobot, esparragoRobot, rotulaRobot, discoAntebrazo, nervioRobot1, nervioRobot2, nervioRobot3, nervioRobot4, manoRobot];
    let pinzas = [pinzaDer, pinzaIzq]
    if (materialValue){
        robotPartsArray.map((element)=>{ element.material = wireframeMaterial; })
        pinzas.map((element)=>{element.traverse((hijo)=>{
            if (hijo instanceof THREE.Mesh) {
                hijo.material = wireframeMaterial;
            }
        })})

    }else{
        robotPartsArray.map((element)=>{ element.material = normalMaterial; })
        pinzas.map((element)=>{element.traverse((hijo)=>{
            if (hijo instanceof THREE.Mesh) {
                hijo.material = normalMaterial;
            }
        })})
       }
});

folderControl.add(effectController,"animacion");

function animate() {
    requestAnimationFrame(animate);
    renderer.clear();
    if (keys.ArrowUp) robotArm.position.z += 0.005;
    if (keys.ArrowDown) robotArm.position.z -= 0.005;
    if (keys.ArrowLeft) robotArm.position.x -= 0.005;
    if (keys.ArrowRight) robotArm.position.x += 0.005;
    renderer.autoClear = false
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    TWEEN.update();
    renderer.render(scene, camera);
    renderer.clearDepth(); 
    const size = Math.min(window.innerWidth, window.innerHeight) / 4; 
    renderer.setViewport(0, window.innerHeight - size, size, size); 
    renderer.render(scene, orthoCamera);
    
    
  }
  

renderer.setAnimationLoop(animate)