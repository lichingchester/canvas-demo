import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import AxisGridHelper from '@/components/helper/AxisGridHelper.js';
import * as dat from 'dat.gui';

console.log('start line script testing', THREE);

const fov = 75;
const aspect = 2; // the canvas default
const near = 0.1;
const far = 10;

let scene;
let camera;
let renderer;
// let cube;
let cubes;

if (!WEBGL.isWebGLAvailable()) {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);
}

function init() {
  // init canvas renderer
  const canvas = document.getElementById('main');
  renderer = new THREE.WebGLRenderer({ canvas });

  // init scene
  scene = new THREE.Scene();

  // init camera
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 5;
}

// eslint-disable-next-line no-unused-vars
function drawLine() {
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  const points = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);

  scene.add(line);
}

function drawCube() {
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, 1.5),
    makeInstance(geometry, 0xaa8844, -1.5)
  ];

  cubes[1].scale.set(0.5, 0.5, 0.5);
  cubes[0].add(cubes[1]);

  cubes[2].scale.set(0.2, 0.2, 0.2);
  cubes[1].add(cubes[2]);

  makeAxisGrid(cubes[0], 'cubes[0]', 26);
  makeAxisGrid(cubes[1], 'cubes[1]');
  makeAxisGrid(cubes[2], 'cubes[0]');

  // init light
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}

function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({ color });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x;

  return cube;
}

// check the canvas and window size
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (window.innerWidth * pixelRatio) | 0;
  const height = (window.innerHeight * pixelRatio) | 0;
  const needResize =
    canvas.clientWidth !== width || canvas.clientHeight !== height;

  if (needResize) {
    renderer.setSize(width, height, false);

    return needResize;
  }
}

function animate(time) {
  time *= 0.001; // convert time to seconds

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  cubes.forEach((cube, index) => {
    const rotate = time * (1 + index * 0.1);
    cube.rotation.x = rotate;
    cube.rotation.y = rotate;
  });

  render();
  requestAnimationFrame(animate);
}

function render() {
  renderer.render(scene, camera);
}

const gui = new dat.GUI();

function makeAxisGrid(node, label, units) {
  const helper = new AxisGridHelper(node, units);
  gui.add(helper, 'visible').name(label);
}

init();

// drawLine();
drawCube();

requestAnimationFrame(animate);
// render();
