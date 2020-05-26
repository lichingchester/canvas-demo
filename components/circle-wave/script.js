import * as THREE from 'three';
import {
  Base,
  init,
  render,
  // rgbToVec,
  hexToVec
} from '@/components/base/three.js';
import vertexShader from '@/components/circle-wave/vertex.frag';
import fragmentShader from '@/components/circle-wave/fragment.frag';

console.log('start line script testing', THREE);

// colors
const colors = [
  '#fbbecc',
  '#c17ade',
  '#e48fd7',
  '#b4ecd0',
  '#e8e0ca',
  '#f4ceca',
  '#ccc2db',
  '#f5abce',
  '#8bd7e3',
  '#9c80ea',
  '#9fc4e6',
  '#d0e9ca',
  '#889aee',
  '#9ee7d7',
  '#82baeb'
];
console.log(hexToVec(colors[0]));
console.log('colors length', colors.length);

init(document.getElementById('main'));

// draw

// define material
const material = function(delay, color) {
  return new THREE.ShaderMaterial({
    wireframe: true,
    uniforms: {
      // mycolor: { type: 'v3', value: new THREE.Vector4(1, 0, 0, 1) },
      // mycolor: { type: 'v3', value: new THREE.Vector4(1, delay / 10, 0, 1) },
      mycolor: {
        type: 'v3',
        value: color
      },
      time: {
        type: 'f',
        value: 0.0 + delay
      }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });
};

// create geometry
let color_key = 0;
for (let i = 0; i < 50; i++) {
  if (color_key >= colors.length - 1) {
    color_key = 0;
  } else {
    color_key++;
  }
  console.log(i, colors.length - 1, colors[color_key]);

  const geometry = new THREE.CylinderGeometry(20, 20, 0.05, 150, 1, true);

  const mesh = new THREE.Mesh(
    geometry,
    material(i, hexToVec(colors[color_key]))
  );

  mesh.position.y = i / 1.2;
  mesh.scale.x = 1 + i / 1000;
  mesh.scale.z = 1 + i / 1000;
  mesh.rotation.y = Math.random(0, i) / 100;

  Base.scene.add(mesh);
}

render(time => {
  for (let i = 0; i < Base.scene.children.length; i++) {
    Base.scene.children[i].material.uniforms.time.value = 0.1 * time + i / 100;
  }

  // console.log(time);
});
