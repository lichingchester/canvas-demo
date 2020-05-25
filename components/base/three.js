import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const fov = 30;
const aspect = window.innerWidth / window.innerHeight;
const near = 1;
const far = 10000;

export const Base = class {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.render = null;
  }
};

export const init = element => {
  if (!WEBGL.isWebGLAvailable()) {
    const warning = WEBGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
  }

  // init canvas renderer
  const canvas = element;
  Base.renderer = new THREE.WebGLRenderer({ canvas });

  // init scene
  Base.scene = new THREE.Scene();

  // init camera
  Base.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  Base.camera.position.z = 100;

  Base.controls = new OrbitControls(Base.camera, Base.renderer.domElement);

  Base.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  Base.controls.dampingFactor = 0.05;

  Base.controls.screenSpacePanning = false;

  animate();
};

export const render = callback => {
  Base.render = callback;
};

export const loadShader = async source => {
  const result = await fetch(source).then(r => r.text());
  return result;
};

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
  if (resizeRendererToDisplaySize(Base.renderer)) {
    const canvas = Base.renderer.domElement;
    Base.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    Base.camera.updateProjectionMatrix();
  }

  time *= 0.001; // convert time to seconds

  if (Base.render) {
    Base.render(time);
  }

  Base.renderer.render(Base.scene, Base.camera);
  Base.controls.update();
  requestAnimationFrame(animate);
}

// helper functions
export const rgbToVec = (r, g, b, a = 1) => {
  const alpha = normalize(0, 1, a);
  let rgb = [normalize(0, 255, r), normalize(0, 255, g), normalize(0, 255, b)];

  rgb = rgb.map(c => Math.round((c / 255) * 10) / 10);
  const vec = [...rgb, alpha];

  return new THREE.Vector4(vec[0], vec[1], vec[2], vec[3]);
};

export const hexToVec = (hex, a = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return rgbToVec(
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
    a
  );
};

function normalize(min, max, value) {
  if (value < min) return min;
  else if (value > max) return max;
  else return value;
}
