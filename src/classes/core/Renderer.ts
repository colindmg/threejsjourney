import * as THREE from "three/webgpu";
import type Experience from "../Experience";

export default class Renderer {
  private experience: Experience;
  private canvas: Experience["canvas"];
  private viewport: Experience["viewport"];
  private scene: Experience["scene"];
  private camera: Experience["camera"];
  declare public instance: THREE.WebGPURenderer;

  constructor(experience: Experience) {
    this.experience = experience;
    this.canvas = this.experience.canvas;
    this.viewport = this.experience.viewport;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  private async setInstance() {
    this.instance = new THREE.WebGPURenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    await this.instance.init();

    this.instance.toneMapping = THREE.NoToneMapping;
    // this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = false;
    // this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor(0x0a0a0a, 1);
    this.instance.setSize(this.viewport.width, this.viewport.height);
    this.instance.setPixelRatio(this.viewport.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.viewport.width, this.viewport.height);
    this.instance.setPixelRatio(this.viewport.pixelRatio);
  }

  update() {
    if (!this.instance || !this.instance.initialized) return;
    this.instance.render(this.scene, this.camera.instance);
  }

  destroy() {
    this.instance.dispose();
  }
}
