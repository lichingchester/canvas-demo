import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { WEBGL } from 'three/examples/jsm/WebGL.js';

console.log('start gltf script testing', THREE);

// eslint-disable-next-line no-unused-vars
let scene;
// eslint-disable-next-line no-unused-vars
let camera;
let renderer;

if (WEBGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  init();
} else {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

const loader = new GLTFLoader();

// Load a glTF resource
loader.load(
  // resource URL
  '/flag.gltf',
  // called when the resource is loaded
  function(gltf) {
    scene.add(gltf.scene);

    // gltf.animations; // Array<THREE.AnimationClip>
    // gltf.scene; // THREE.Group
    // gltf.scenes; // Array<THREE.Group>
    // gltf.cameras; // Array<THREE.Camera>
    // gltf.asset; // Object

    camera.position.z = 10;
    renderer.render(scene, camera);
  },
  // called while loading is progressing
  function(xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  // called when loading has errors
  function(error) {
    console.log('An error happened', error);
  }
);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
