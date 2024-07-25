import * as THREE from "three";
import "./style.css";

const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// ---------------------------------------------

// Objects

// Group
const group = new THREE.Group();
scene.add(group);
group.rotateZ(Math.PI * 0.5);

// Cube 1
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xd8d8d8 })
);
group.add(cube1);

// Cube 2
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xa8a8a8 })
);
cube2.position.x = 2;
group.add(cube2);

// Cube 3
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xf4eef5 })
);
cube3.position.x = -2;
group.add(cube3);

// ---------------------------------------------

// Axes Helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// Position camera
camera.position.z = 3;
// camera.position.y = 1;
// camera.position.x = 1;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
