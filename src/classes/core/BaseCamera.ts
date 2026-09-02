import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as THREE from "three/webgpu";
import Experience from "../Experience";

interface BaseCameraProps {
  type?: "perspective" | "orthographic";
}

export default class BaseCamera {
  private viewport: Experience["viewport"];
  private scene: Experience["scene"];
  private canvas: Experience["canvas"];
  private type: "perspective" | "orthographic" = "perspective";

  declare private controls: OrbitControls;
  declare public instance: THREE.PerspectiveCamera | THREE.OrthographicCamera;

  constructor({ type }: BaseCameraProps = {}) {
    const { viewport, scene, canvas } = Experience.getInstance();
    this.viewport = viewport;
    this.scene = scene;
    this.canvas = canvas;
    this.type = type || "perspective";

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    if (this.type === "perspective") {
      this.instance = new THREE.PerspectiveCamera(
        35,
        this.viewport.width / this.viewport.height,
        0.1,
        100,
      );
    } else {
      this.instance = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 100);
    }

    this.instance.position.set(0, 0, 5);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    if (this.instance instanceof THREE.PerspectiveCamera) {
      this.instance.aspect = this.viewport.width / this.viewport.height;
    }
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }

  destroy() {
    this.controls.dispose();
    this.scene.remove(this.instance);
  }
}
