import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./style.css";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
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

// Fullscreen
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Scene
const scene = new THREE.Scene();

// SPHERE NOIRE
const geometry = new THREE.BufferGeometry();
const count = 200;
const positionsArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i += 3) {
  // Génère un point aléatoire en coordonnées sphériques
  const theta = Math.random() * 2 * Math.PI; // Angle autour de l'axe Y
  const phi = Math.acos(2 * Math.random() - 1); // Angle autour de l'axe XZ

  // Rayon de la sphère
  const radius = 1;

  // Convertir en coordonnées cartésiennes
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  positionsArray[i] = x;
  positionsArray[i + 1] = y;
  positionsArray[i + 2] = z;
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0x171717,
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// SPHERE BLEU
const geometry2 = new THREE.BufferGeometry();
const count2 = 200;
const positionsArray2 = new Float32Array(count2 * 3 * 3);

for (let i = 0; i < count2 * 3 * 3; i += 3) {
  // Génère un point aléatoire en coordonnées sphériques
  const theta = Math.random() * 2 * Math.PI; // Angle autour de l'axe Y
  const phi = Math.acos(2 * Math.random() - 1); // Angle autour de l'axe XZ

  // Rayon de la sphère
  const radius = 1;

  // Convertir en coordonnées cartésiennes
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  positionsArray2[i] = x;
  positionsArray2[i + 1] = y;
  positionsArray2[i + 2] = z;
}

const positionsAttribute2 = new THREE.BufferAttribute(positionsArray2, 3);
geometry2.setAttribute("position", positionsAttribute2);

const material2 = new THREE.MeshBasicMaterial({
  color: 0x0081c7,
  wireframe: true,
});

const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.x = -2;
scene.add(mesh2);

// SPHERE ROUGE
const geometry3 = new THREE.BufferGeometry();
const count3 = 200;
const positionsArray3 = new Float32Array(count3 * 3 * 3);

for (let i = 0; i < count3 * 3 * 3; i += 3) {
  // Génère un point aléatoire en coordonnées sphériques
  const theta = Math.random() * 2 * Math.PI; // Angle autour de l'axe Y
  const phi = Math.acos(2 * Math.random() - 1); // Angle autour de l'axe XZ

  // Rayon de la sphère
  const radius = 1;

  // Convertir en coordonnées cartésiennes
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  positionsArray3[i] = x;
  positionsArray3[i + 1] = y;
  positionsArray3[i + 2] = z;
}

const positionsAttribute3 = new THREE.BufferAttribute(positionsArray3, 3);
geometry3.setAttribute("position", positionsAttribute3);

const material3 = new THREE.MeshBasicMaterial({
  color: 0xeb3b57,
  wireframe: true,
});

const mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.x = 2;

scene.add(mesh3);

// SPHERE JAUNE
const geometry4 = new THREE.BufferGeometry();
const count4 = 200;
const positionsArray4 = new Float32Array(count4 * 3 * 3);

for (let i = 0; i < count4 * 3 * 3; i += 3) {
  // Génère un point aléatoire en coordonnées sphériques
  const theta = Math.random() * 2 * Math.PI; // Angle autour de l'axe Y
  const phi = Math.acos(2 * Math.random() - 1); // Angle autour de l'axe XZ

  // Rayon de la sphère
  const radius = 1;

  // Convertir en coordonnées cartésiennes
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  positionsArray4[i] = x;
  positionsArray4[i + 1] = y;
  positionsArray4[i + 2] = z;
}

const positionsAttribute4 = new THREE.BufferAttribute(positionsArray4, 3);
geometry4.setAttribute("position", positionsAttribute4);

const material4 = new THREE.MeshBasicMaterial({
  color: 0xf7b731,
  wireframe: true,
});

const mesh4 = new THREE.Mesh(geometry4, material4);
mesh4.position.y = -1;
mesh4.position.x = -1;

scene.add(mesh4);

// SPHERE VERT
const geometry5 = new THREE.BufferGeometry();
const count5 = 200;
const positionsArray5 = new Float32Array(count5 * 3 * 3);

for (let i = 0; i < count5 * 3 * 3; i += 3) {
  // Génère un point aléatoire en coordonnées sphériques
  const theta = Math.random() * 2 * Math.PI; // Angle autour de l'axe Y
  const phi = Math.acos(2 * Math.random() - 1); // Angle autour de l'axe XZ

  // Rayon de la sphère
  const radius = 1;

  // Convertir en coordonnées cartésiennes
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  positionsArray5[i] = x;
  positionsArray5[i + 1] = y;
  positionsArray5[i + 2] = z;
}

const positionsAttribute5 = new THREE.BufferAttribute(positionsArray5, 3);
geometry5.setAttribute("position", positionsAttribute5);

const material5 = new THREE.MeshBasicMaterial({
  color: 0x20bf6b,
  wireframe: true,
});

const mesh5 = new THREE.Mesh(geometry5, material5);
mesh5.position.y = -1;
mesh5.position.x = 1;

scene.add(mesh5);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xfaf9f6);

// Animate

const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
