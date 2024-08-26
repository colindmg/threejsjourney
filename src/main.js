import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import testFragmentShader from "./shaders/test/fragment.glsl";
import testVertexShader from "./shaders/test/vertex.glsl";
import "./style.css";

/**
 * Base
 */
// Debug
// const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x141414);

/**
 * Test mesh
 */
// Geometry
// const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5, 32, 32, 32);
const sphereGeometry = new THREE.SphereGeometry(0.25, 32, 32);

// Material
const material = new THREE.ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  // side: THREE.DoubleSide,
  uniforms: {
    uTime: { value: 0 },
  },
});

// Mesh
const mesh1 = new THREE.Mesh(geometry, material);
mesh1.position.x = -0.75;

const mesh2 = new THREE.Mesh(sphereGeometry, material);
mesh2.position.x = 0;

const mesh3 = new THREE.Mesh(geometry, material);
mesh3.position.x = 0.75;

const mesh4 = new THREE.Mesh(sphereGeometry, material);
mesh4.position.x = 0.75;
mesh4.position.y = 0.75;

const mesh5 = new THREE.Mesh(geometry, material);
mesh5.position.x = 0;
mesh5.position.y = 0.75;

const mesh6 = new THREE.Mesh(sphereGeometry, material);
mesh6.position.x = -0.75;
mesh6.position.y = -0.75;

const mesh7 = new THREE.Mesh(geometry, material);
mesh7.position.x = 0;
mesh7.position.y = -0.75;

const mesh8 = new THREE.Mesh(sphereGeometry, material);
mesh8.position.x = 0.75;
mesh8.position.y = -0.75;

const mesh9 = new THREE.Mesh(sphereGeometry, material);
mesh9.position.x = -0.75;
mesh9.position.y = 0.75;

scene.add(mesh1, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8, mesh9);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// camera.position.set(0.25, -0.25, 1);
camera.position.set(0, 0, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Update material
  material.uniforms.uTime.value = elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
