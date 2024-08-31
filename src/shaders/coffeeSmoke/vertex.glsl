
varying vec2 vUv;

void main() 
{
  // Final position
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  // Pass UV to fragment shader
  vUv = uv;
}