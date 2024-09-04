uniform vec3 uColor;

varying vec3 vNormal;

#include ../includes/ambientLight.glsl

vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition)
{
	vec3 lightDirection = normalize(lightPosition);

	// Shading
	float shading = dot(normal, lightDirection);

	// return lightColor * lightIntensity;
	return vec3(shading);
}

void main()
{
	vec3 color = uColor;

	// Lights
	vec3 light = vec3(0.0);

	// AMBIENT LIGHT
	// light += ambientLight(
	// 	vec3(1.0), // Light color
	// 	0.03       // Light intensity
	// );

	// DIRECTIONAL LIGHT
	light += directionalLight(
		vec3(0.1, 0.1, 1.0), // Light color
		1.0,                 // Light intensity
		vNormal,             // Normal
		vec3(0.0, 0.0, 3.0)  // Light position
	);

	color *= light;

	// Final color
	gl_FragColor = vec4(color, 1.0);
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}