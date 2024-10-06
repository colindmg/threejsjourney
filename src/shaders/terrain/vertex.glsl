
#include ../includes/simplexNoise2d.glsl

float getElevation(vec2 position)
{
  float elevation = 0.0;
  elevation += simplexNoise2d(position);

  return elevation;
}

void main()
{
  // Neighbours positions
  float shift = 0.01;
  vec3 positionA = position + vec3(shift, 0.0, 0.0);
  vec3 positionB = position + vec3(0.0, 0.0, -shift);

  // Elevation
  float elevation = getElevation(csm_Position.xz);
  csm_Position.y += elevation;

}