import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

console.log('start glsl script testing', THREE);

let scene;
let camera;
let renderer;
let mixer;
let dt;
let lastframe = Date.now();

if (!WEBGL.isWebGLAvailable()) {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);
}

function init() {
  // init scene
  scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff));

  // init camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, -400);
  camera.lookAt(0, 0, 0);

  // init renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x0e3866);

  // init dom
  document.body.appendChild(renderer.domElement);
}

function draw() {
  const loader = new GLTFLoader();

  loader.load(
    '/mech_drone/scene.gltf',
    function(gltf) {
      console.log('Array<THREE.AnimationClip>', gltf.animations);
      console.log('THREE.Group', gltf.scene);
      console.log('Array<THREE.Group>', gltf.scenes);
      console.log('Array<THREE.Camera>', gltf.cameras);
      console.log('Object', gltf.asset);
      console.log('gltf', gltf);

      mixer = new THREE.AnimationMixer(gltf.scene);
      const action = mixer.clipAction(gltf.animations[0]);

      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());

      gltf.scene.position.x += gltf.scene.position.x - center.x;
      gltf.scene.position.y += gltf.scene.position.y - center.y;
      gltf.scene.position.z += gltf.scene.position.z - center.z;

      scene.add(gltf.scene);

      // camera.lookAt(gltf.position);

      action.play();
      // render();
    },
    function(xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function(error) {
      console.error(error);
    }
  );
}

function update() {
  dt = (Date.now() - lastframe) / 1000;

  if (mixer) {
    mixer.update(dt);
  }

  renderer.render(scene, camera);
  lastframe = Date.now();
  requestAnimationFrame(update);
}

// function render() {
//   renderer.render(scene, camera);
// }

init();

draw();

// render();
update();
