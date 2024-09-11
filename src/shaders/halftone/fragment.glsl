uniform vec3 uColor;
uniform vec2 uResolution;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl

void main()
{
	vec3 viewDirection = normalize(vPosition - cameraPosition);
	vec3 normal = normalize(vNormal);
	vec3 color = uColor;

	// Lights
	vec3 light = vec3(0.0);

	light += ambientLight(
		vec3(1.0), // Light color
		1.0        // Light intensity
	);

	light += directionalLight(
		vec3(1.0),            // Light color
		1.0,                  // Light intensity
		normal,               // Normal
		vec3(1.0, 1.0, 0.0),  // Light position
		viewDirection,        // View direction
		1.0                   // Specular power
	);

	color *= light;

	// Halftone
	float repetitions = 50.0;

	vec2 uv = gl_FragCoord.xy / uResolution.y;
	uv *= repetitions;
	uv = mod(uv, 1.0);

	float point = distance(uv, vec2(0.5));
	point = 1. - step(0.5 * 0.3, point);
	

	// Final color
	gl_FragColor = vec4(point, point, point, 1.0);
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}