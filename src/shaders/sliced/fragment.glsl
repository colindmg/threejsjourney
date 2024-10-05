uniform float uSliceStart;
uniform float uSliceArc;

varying vec3 vPosition;

void main()
{
  float angle = atan(vPosition.y, vPosition.x);
  angle -= uSliceStart;
  angle = mod(angle, PI2);

  if(angle > 0.0 && angle < uSliceArc)
  {
    discard;
  }

  float csm_Slice;
}