// Put the Fragment Shader code here

// varying vec2 vUv;

// void main() {
  
//   gl_FragColor = vec4(1, 1, 0, 1);

// }

uniform vec4 mycolor;

void main() {
  gl_FragColor = mycolor;
}