import * as THREE from "three/webgpu";

export default class PostProcessing extends THREE.RenderPipeline {
  constructor(renderer: THREE.WebGPURenderer) {
    super(renderer);

    // Add effects and passes here, e.g.:

    console.log("[PostProcessing] class instantiated");
  }

  public update() {
    this.render();
  }

  public destroy() {
    console.log("[PostProcessing] class destroyed");
  }
}
