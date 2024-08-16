// import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
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
scene.background = new THREE.Color(0x171717);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/8.png");

const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load("/fonts/Rosamila_Regular.json", (font) => {
  const textGeometry = new TextGeometry("Creatives", {
    font,
    size: 0.5,
    depth: 0.075,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial();
  material.matcap = matcapTexture;

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
});

/**
 * Particles
 */

// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 1000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;

  // Faire en sorte que les couleurs soit toujours entre 0.9 et 1
  colors[i] = Math.random() * 0.1 + 0.9;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  alphaMap: particleTexture,
  transparent: true,
  // alphaTest: 0.001,
  // depthTest: false,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
});

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

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
camera.position.z = 3;
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
 * Fog
 */
// scene.fog = new THREE.Fog("#262837", 1, 13);
scene.fog = new THREE.FogExp2("#171717", 0.2);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
