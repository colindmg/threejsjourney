varying vec2 vUv;

void main()
{
  csm_Metalness = step(0.0, sin(vUv.x * 100.0 + 0.5));
  csm_Roughness = 1.0 - csm_Metalness;
}