import * as THREE from 'three';
import { Base, init, render } from '@/components/base/three.js';
import vertexShader from '@/components/circle-wave/vertex.frag';
import fragmentShader from '@/components/circle-wave/fragment.frag';

console.log('start line script testing', THREE);

init(document.getElementById('main'));

// draw

// define material
const material = function(delay) {
  return new THREE.ShaderMaterial({
    wireframe: true,
    uniforms: {
      // mycolor: { type: 'v3', value: new THREE.Vector4(1, 0, 0, 1) },
      mycolor: { type: 'v3', value: new THREE.Vector4(1, delay / 10, 0, 1) },
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
// const geometry = [];
// let mesh;

for (let i = 0; i < 20; i++) {
  // const geometry = new THREE.CircleGeometry(5, 10);
  const geometry = new THREE.CylinderGeometry(20, 20, 0.05, 100, 1, true);

  // const material2 = new THREE.LineBasicMaterial({
  //   color: 0xffffff,
  //   linewidth: 1,
  //   linecap: 'round', // ignored by WebGLRenderer
  //   linejoin: 'round' // ignored by WebGLRenderer
  // });

  const mesh = new THREE.Mesh(
    geometry,
    // new THREE.IcosahedronGeometry( 20, 4 ),
    material(i)
  );

  mesh.position.y = i / 1;
  mesh.scale.x = 1 + i / 1000;
  mesh.scale.z = 1 + i / 1000;
  mesh.rotation.y = Math.random(0, i) / 100;

  Base.scene.add(mesh);

  // const wireframeGeometry = new THREE.WireframeGeometry(geometry);
  // const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  // const wireframe = new THREE.LineSegments(
  //   wireframeGeometry,
  //   wireframeMaterial
  // );
  // mesh.add(wireframe);
}

// console.log(Base.scene);

render(time => {
  for (let i = 0; i < Base.scene.children.length; i++) {
    Base.scene.children[i].material.uniforms.time.value = 0.1 * time + i / 100;
  }

  // console.log(time);
});
