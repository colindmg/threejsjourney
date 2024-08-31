import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import artistList from "./data/artistList";
import spiralFragmentShader from "./shaders/coffeeSmoke/fragment.glsl";
import spiralVertexShader from "./shaders/coffeeSmoke/vertex.glsl";
import "./style.css";

// GESTION DE LA LISTE DES ARTISTES

let selectedArtistIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const artistListContainer = document.getElementById("artist-list");

  // Function to create a div for each artist
  artistList.forEach((artist, index) => {
    const artistDiv = document.createElement("div");
    artistDiv.classList.add(
      "artist-item",
      "cursor-pointer",
      "hover:opacity-100"
    );
    artistDiv.style.opacity = 0.5;
    artistDiv.onpointerenter = () => {
      artistDiv.style.opacity = 1;
    };
    artistDiv.onpointerleave = () => {
      if (parseInt(artistDiv.dataset.index) !== selectedArtistIndex) {
        artistDiv.style.opacity = 0.5;
      }
    };
    artistDiv.innerText = `${artist.name} (${artist.twitterAccount})`;
    artistDiv.dataset.index = index;

    if (index === selectedArtistIndex) {
      artistDiv.style.opacity = 1;
      artistDiv.classList.add("selected");
    }

    artistDiv.addEventListener("click", () => {
      document.querySelectorAll(".artist-item").forEach((item) => {
        item.style.opacity = 0.5;
        item.classList.remove("selected");
      });

      artistDiv.style.opacity = 1;
      artistDiv.classList.add("selected");
      selectedArtistIndex = parseInt(artistDiv.dataset.index);
    });

    artistListContainer.appendChild(artistDiv);
  });
});

// ----------------------------------------------------

// GESTION DE LA SCENE THREE.JS

/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf6faf9);

// Loaders
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

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
  25,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = -1;
camera.position.y = 0;
camera.position.z = 8;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Post-processing
 */
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const afterimagePass = new AfterimagePass();
const outputPass = new OutputPass();

composer.addPass(renderPass);
composer.addPass(afterimagePass);
composer.addPass(outputPass);

/**
 * Image spiral
 */

// Geometry
const spiralGeometry = new THREE.PlaneGeometry(1, 1, 16, 64);
// smokeGeometry.translate(0, 0.25, 0);
spiralGeometry.scale(1.5, 6, 1.5);

// Test texture
const testTexture = textureLoader.load("/textures/7Fringz.png");
testTexture.wrapS = THREE.RepeatWrapping;
testTexture.wrapT = THREE.RepeatWrapping;

// Material
const spiralMaterial = new THREE.ShaderMaterial({
  // wireframe: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  transparent: true,
  vertexShader: spiralVertexShader,
  fragmentShader: spiralFragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uPerlinTexture: new THREE.Uniform(artistList[selectedArtistIndex].texture),
  },
});

// Mesh
const spiral = new THREE.Mesh(spiralGeometry, spiralMaterial);
// spiral.position.y = -0.5;
scene.add(spiral);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update spiral
  spiral.material.uniforms.uTime.value = elapsedTime;

  // Update texture
  if (
    artistList[selectedArtistIndex].texture !==
    spiral.material.uniforms.uPerlinTexture.value
  ) {
    spiral.material.uniforms.uPerlinTexture.value =
      artistList[selectedArtistIndex].texture;
  }

  // Render
  renderer.render(scene, camera);
  composer.render();

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
