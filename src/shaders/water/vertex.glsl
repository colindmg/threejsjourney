uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;

uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallIterations;

varying float vElevation;

#include ../includes/perlinClassic3D.glsl

void main()
{
	// Base position
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);

	// Elevation
	float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) * 
										sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) * 
										uBigWavesElevation;

	for(float i = 1.0; i <= uSmallIterations; i++)
	{
		elevation -= abs(perlinClassic3D(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
	}
	
	modelPosition.y += elevation;

	// Final position
	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPosition;
	gl_Position = projectedPosition;

	// Varyings
	vElevation = elevation;
}