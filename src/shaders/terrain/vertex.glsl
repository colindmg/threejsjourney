uniform float uPositionFrequency;
uniform float uStrength;
uniform float uWarpFrequency;
uniform float uWarpStrength;

#include ../includes/simplexNoise2d.glsl

float getElevation(vec2 position)
{
  vec2 warpedPosition = position;
  warpedPosition += simplexNoise2d(position * uPositionFrequency * uWarpFrequency) * uWarpStrength;

  float elevation = 0.0;
  elevation += simplexNoise2d(warpedPosition * uPositionFrequency) / 2.;
  elevation += simplexNoise2d(warpedPosition * uPositionFrequency * 2.0) / 4.;
  elevation += simplexNoise2d(warpedPosition * uPositionFrequency * 4.0) / 8.;

  float elevationSign = sign(elevation);
  elevation = pow(abs(elevation), 2.0) * elevationSign;

  elevation *= uStrength;

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
  positionA.y += getElevation(positionA.xz);
  positionB.y += getElevation(positionB.xz);

  // Compute normal
  vec3 toA = normalize(positionA - csm_Position);
  vec3 toB = normalize(positionB - csm_Position);
  csm_Normal = cross(toA, toB);

}