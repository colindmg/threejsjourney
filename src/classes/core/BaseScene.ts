import * as THREE from "three/webgpu";
export default class BaseScene extends THREE.Scene {
  constructor() {
    super();
  }

  destroy() {
    this.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });
  }
}
