import * as CANNON from "cannon-es";
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import movies from "./movies";

/**
 * Debug
 */
const gui = new GUI();
gui.hide();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#0C0C0C");

/**
 * Sound
 */
const hitSound = new Audio("/sounds/hit.mp3");

const playHitSound = (collision) => {
  const impactStrength = collision.contact.getImpactVelocityAlongNormal();
  if (impactStrength > 1.5) {
    hitSound.volume = Math.random();
    hitSound.currentTime = 0;
    hitSound.play();
  }
};

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.png",
  "/textures/environmentMaps/0/nx.png",
  "/textures/environmentMaps/0/py.png",
  "/textures/environmentMaps/0/ny.png",
  "/textures/environmentMaps/0/pz.png",
  "/textures/environmentMaps/0/nz.png",
]);

const floorAlphamapTexture = textureLoader.load("/textures/floor/alpha.webp");

// Test texture de cover de film
const coverTexture = textureLoader.load(
  "/textures/movieCovers/interstellar.webp"
);
coverTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Physics
 */

// World
const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;
world.gravity.set(0, -9.82, 0);

// Materials
const defaultMaterial = new CANNON.Material("default");

const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.2,
  }
);
world.addContactMaterial(defaultContactMaterial);
world.defaultContactMaterial = defaultContactMaterial;

// Floor
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body();
// floorBody.mass = 0;
floorBody.addShape(floorShape);
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
floorBody.material = defaultMaterial;
world.addBody(floorBody);

/**
 * Three.js
 */

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#121212",
    metalness: 0.3,
    roughness: 0.4,
    transparent: true,
    alphaMap: floorAlphamapTexture,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

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
camera.position.set(-3, 3, -3);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minPolarAngle = Math.PI * 0.15;
controls.maxPolarAngle = Math.PI * 0.45;
controls.maxDistance = 6;
controls.minDistance = 3;
controls.enablePan = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Utils
 */
const objectsToUpdate = [];

// Create a box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const boxMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.5,
  roughness: 0.4,
  envMap: environmentMapTexture,
  color: 0x171717,
});

const boxMaterials = [
  boxMaterial,
  boxMaterial,
  boxMaterial,
  boxMaterial,
  // boxCoverMaterial,
  // boxCoverMaterial,
];

const createBox = (width, height, depth, position, rotation) => {
  // Three.js
  const boxCoverMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.5,
    roughness: 0.1,
    envMap: environmentMapTexture,
    map: movies[objectsToUpdate.length % movies.length].coverTexture,
  });

  const mesh = new THREE.Mesh(boxGeometry, [
    ...boxMaterials,
    boxCoverMaterial,
    boxCoverMaterial,
  ]);
  mesh.scale.set(width, height, depth);
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

  // Cannon.js
  const shape = new CANNON.Box(
    new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5)
  );
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3().copy(position),
    shape,
    material: defaultMaterial,
  });
  world.addBody(body);
  body.addEventListener("collide", (event) => {
    playHitSound(event);
  });

  // Save in objectsToUpdate
  objectsToUpdate.push({
    mesh,
    body,
    title: movies[objectsToUpdate.length % movies.length].title,
    year: movies[objectsToUpdate.length % movies.length].year,
    director: movies[objectsToUpdate.length % movies.length].director,
    coverImage: movies[objectsToUpdate.length % movies.length].coverImage,
  });
};

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  // Update physics world
  world.step(1 / 60, deltaTime, 3);

  // Update objects
  for (const object of objectsToUpdate) {
    object.mesh.position.copy(object.body.position);
    object.mesh.quaternion.copy(object.body.quaternion);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/**
 * Raycaster et click event
 */

let selectedObject = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  // Convertir les coordonnées de la souris en espace normalisé
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Mettre à jour le raycaster avec la position actuelle de la caméra et les coordonnées de la souris
  raycaster.setFromCamera(mouse, camera);

  // Calculer les objets qui intersectent avec le rayon
  const intersects = raycaster.intersectObjects(
    objectsToUpdate.map((obj) => obj.mesh)
  );

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;

    // Trouver l'objet associé
    const objectData = objectsToUpdate.find(
      (obj) => obj.mesh === intersectedObject
    );
    if (objectData) {
      // console.log("Clicked on : ", objectData);
      selectedObject = objectData;
      showMovieDetails(objectData);
    }
  }
});

/**
 * GUI
 */
const dropMovieButton = document.getElementById("drop-movie");
const resetMoviesButton = document.getElementById("reset-movies");

dropMovieButton.addEventListener("click", () => {
  createBox(0.45, 0.7, 0.07, {
    x: (Math.random() - 0.5) * 2,
    y: 3,
    z: (Math.random() - 0.5) * 2,
  });
});

resetMoviesButton.addEventListener("click", () => {
  for (const object of objectsToUpdate) {
    setTimeout(() => {
      object.body.removeEventListener("collide", playHitSound);
      world.removeBody(object.body);
      scene.remove(object.mesh);
    }, objectsToUpdate.indexOf(object) * 50);
  }

  objectsToUpdate.splice(0, objectsToUpdate.length);
});

/**
 * Movie details
 */
function showMovieDetails(movie) {
  // Mettre à jour le contenu de l'overlay avec les informations du film
  document.getElementById("movie-title").textContent = movie.title;
  document.getElementById("movie-year").textContent = `Year: ${movie.year}`;
  document.getElementById(
    "movie-director"
  ).textContent = `Director: ${movie.director}`;
  document.getElementById("movie-cover").src = movie.coverImage;

  // Afficher l'overlay
  const overlay = document.getElementById("details-overlay");
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "auto";
}

// Fermer l'overlay en cliquant sur le bouton de fermeture
document.getElementById("close-overlay").addEventListener("click", () => {
  const overlay = document.getElementById("details-overlay");
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";
});
