uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

#include ../includes/random2D.glsl

void main()
{
  // Position
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Glitch
  float glitchStrengh = uTime - modelPosition.y;
  glitchStrengh = sin(glitchStrengh) + sin(glitchStrengh * 3.45) + sin(glitchStrengh * 8.76);
  glitchStrengh /= 3.0;
  glitchStrengh = smoothstep(0.3, 1.0, glitchStrengh);
  glitchStrengh *= 0.25;
  modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrengh;
  modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrengh;

  // Final position
  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  // Model normal
  vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

  // Varying
  vPosition = modelPosition.xyz;
  vNormal = modelNormal.xyz;
}