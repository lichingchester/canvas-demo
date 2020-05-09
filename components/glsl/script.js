import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';

console.log('start glsl script testing', THREE);

let scene;
let camera;
let renderer;

if (!WEBGL.isWebGLAvailable()) {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);
}

function init() {
  // init scene
  scene = new THREE.Scene();

  // init camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  // init renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // init dom
  document.body.appendChild(renderer.domElement);
}

function draw() {
  // const planeGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);
  // const plane = new THREE.Mesh(planeGeometry, material);
  // const scene = new THREE.Scene();

  // scene.add(plane);
  // camera.position.set(10, 10, 10);
  // camera.lookAt(plane.position);

  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  const points = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);

  scene.add(line);
}

function render() {
  renderer.render(scene, camera);
}

init();

draw();

render();
