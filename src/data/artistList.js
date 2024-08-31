import * as THREE from "three";

// Textures loading
const textureLoader = new THREE.TextureLoader();

const osjdhdhhdvdvdv = textureLoader.load("textures/osjdhdhhdvdvdv.png");
osjdhdhhdvdvdv.wrapS = THREE.RepeatWrapping;
osjdhdhhdvdvdv.wrapT = THREE.RepeatWrapping;

const fringz = textureLoader.load("textures/7Fringz.png");
fringz.wrapS = THREE.RepeatWrapping;
fringz.wrapT = THREE.RepeatWrapping;

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
];

export default artistList;
