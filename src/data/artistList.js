import * as THREE from "three";

// Textures loading
const textureLoader = new THREE.TextureLoader();

const osjdhdhhdvdvdv = textureLoader.load("textures/osjdhdhhdvdvdv.png");
osjdhdhhdvdvdv.wrapS = THREE.RepeatWrapping;
osjdhdhhdvdvdv.wrapT = THREE.RepeatWrapping;

const fringz = textureLoader.load("textures/7Fringz.png");
fringz.wrapS = THREE.RepeatWrapping;
fringz.wrapT = THREE.RepeatWrapping;

const iskream = textureLoader.load("textures/iskream5.png");
iskream.wrapS = THREE.RepeatWrapping;
iskream.wrapT = THREE.RepeatWrapping;

const senssylee = textureLoader.load("textures/senssylee.png");
senssylee.wrapS = THREE.RepeatWrapping;
senssylee.wrapT = THREE.RepeatWrapping;

// Artists list
const artistList = [
  {
    name: "omg???",
    twitterAccount: "@osjdhdhhdvdvdv",
    texture: osjdhdhhdvdvdv,
  },
  {
    name: "Fringz",
    twitterAccount: "@7Fringz",
    texture: fringz,
  },
  {
    name: "ISKREAM",
    twitterAccount: "@iskream5",
    texture: iskream,
  },
  {
    name: "Senssy Lee",
    twitterAccount: "@senssylee",
    texture: senssylee,
  },
];

export default artistList;
