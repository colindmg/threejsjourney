import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./style.css";

/**
 * Loaders
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const cubeTextureLoader = new THREE.CubeTextureLoader();

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Environment map
 */

scene.environmentIntensity = 1; // Permet de régler l'intensité de l'environnement
scene.backgroundBlurriness = 0; // Permet de régler le flou de l'arrière plan
scene.backgroundIntensity = 1; // Permet de régler l'intensité de l'arrière plan
// scene.backgroundRotation.x = 1; // Permet de régler la rotation de l'arrière plan
// scene.environmentRotation.x = 1; // Permet de régler la rotation de l'environnement

gui
  .add(scene, "environmentIntensity")
  .min(0)
  .max(10)
  .step(0.01)
  .name("Environment Intensity");

gui
  .add(scene, "backgroundBlurriness")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Background Blurriness");

gui
  .add(scene, "backgroundIntensity")
  .min(0)
  .max(10)
  .step(0.01)
  .name("Background Intensity");

gui
  .add(scene.backgroundRotation, "y")
  .min(0)
  .max(Math.PI * 2)
  .step(0.01)
  .name("Background Rotation Y");

gui
  .add(scene.environmentRotation, "y")
  .min(0)
  .max(Math.PI * 2)
  .step(0.01)
  .name("Environment Rotation Y");

// LDR cube texture
const environmentMapLDR = cubeTextureLoader.load([
  "/environmentMaps/0/px.png",
  "/environmentMaps/0/nx.png",
  "/environmentMaps/0/py.png",
  "/environmentMaps/0/ny.png",
  "/environmentMaps/0/pz.png",
  "/environmentMaps/0/nz.png",
]);

scene.environment = environmentMapLDR;
scene.background = environmentMapLDR;

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 1,
    color: 0xaaaaaa,
  })
);
// torusKnot.material.envMap = environmentMapLDR;
torusKnot.position.x = -4;
torusKnot.position.y = 4;
scene.add(torusKnot);

/**
 * Models
 */
gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);
});

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
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
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
  // Time
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
