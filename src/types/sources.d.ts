export type TextureSource = {
  name: string;
  type: "texture";
  path: string;
};

export type CubeTextureSource = {
  name: string;
  type: "cubeTexture";
  path: string[];
};

export type GLTFModelSource = {
  name: string;
  type: "gltfModel";
  path: string;
};

export type FileSource = TextureSource | CubeTextureSource | GLTFModelSource;
