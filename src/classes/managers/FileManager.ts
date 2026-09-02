import { type GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three/webgpu";
import type { FileName } from "../../constants/sources";
import type { FileSource } from "../../types/sources";
import { EventEmitter } from "../utils/EventEmitter";

type FileItems = [FileName] extends [never]
  ? Record<string, GLTF | THREE.Texture | THREE.CubeTexture>
  : Record<FileName, GLTF | THREE.Texture | THREE.CubeTexture>;

export default class FileManager extends EventEmitter {
  private sources: readonly FileSource[];
  public items: Partial<FileItems>;
  private toLoad: number;
  private loaded: number;
  declare private loaders: {
    gltfLoader?: GLTFLoader;
    textureLoader?: THREE.TextureLoader;
    cubeTextureLoader?: THREE.CubeTextureLoader;
  };

  constructor(sources: readonly FileSource[]) {
    super();

    // Options
    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    if (this.toLoad === 0) {
      this.trigger("ready");
      return;
    }

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "gltfModel" && this.loaders.gltfLoader) {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture" && this.loaders.textureLoader) {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (
        source.type === "cubeTexture" &&
        this.loaders.cubeTextureLoader
      ) {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(
    source: FileSource,
    file: GLTF | THREE.Texture | THREE.CubeTexture,
  ) {
    const name = source.name as FileName;
    this.items[name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }

  destroy() {
    Object.keys(this.items).map((name) => {
      const item = this.items[name];
      if (item instanceof THREE.Texture) {
        item.dispose();
      } else if (item instanceof THREE.CubeTexture) {
        item.dispose();
      }
    });
  }
}
