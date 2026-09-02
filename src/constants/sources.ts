import type { FileSource } from "../types/sources";

const sources = [
  // {
  //   name: "environmentMapTexture",
  //   type: "cubeTexture",
  //   path: [
  //     "textures/environmentMap/px.jpg",
  //     "textures/environmentMap/nx.jpg",
  //     "textures/environmentMap/py.jpg",
  //     "textures/environmentMap/ny.jpg",
  //     "textures/environmentMap/pz.jpg",
  //     "textures/environmentMap/nz.jpg",
  //   ],
  // },
  // {
  //   name: "grassColorTexture",
  //   type: "texture",
  //   path: "textures/dirt/color.jpg",
  // },
  // {
  //   name: "grassNormalTexture",
  //   type: "texture",
  //   path: "textures/dirt/normal.jpg",
  // },
  // {
  //   name: "foxModel",
  //   type: "gltfModel",
  //   path: "models/Fox/glTF/Fox.gltf",
  // },
] as const satisfies readonly FileSource[];

export type FileName = (typeof sources)[number]["name"];

export default sources;
