uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl

vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection)
{
	vec3 lightDirection = normalize(lightPosition);
	vec3 lightReflection = reflect(- lightDirection, normal);

	// Shading
	float shading = dot(normal, lightDirection);
	shading = max(0.0, shading);

	// Specular
	float specular = - dot(lightReflection, viewDirection);

	return lightColor * lightIntensity * shading + pow(specular, 32.0);
}

void main()
{
	vec3 viewDirection = normalize(vPosition - cameraPosition);
	vec3 color = uColor;

	// Lights
	vec3 light = vec3(0.0);

	// AMBIENT LIGHT
	light += ambientLight(
		vec3(1.0), // Light color
		0.03       // Light intensity
	);

	// DIRECTIONAL LIGHT
	light += directionalLight(
		vec3(0.1, 0.1, 1.0), // Light color
		1.0,                 // Light intensity
		vNormal,             // Normal
		vec3(0.0, 0.0, 3.0), // Light position
		viewDirection        // View direction
	);

	color *= light;

	// Final color
	gl_FragColor = vec4(color, 1.0);
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}