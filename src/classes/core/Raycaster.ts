import * as THREE from "three/webgpu";
import Experience from "../Experience";
import type BaseCamera from "./BaseCamera";

export default class Raycaster extends THREE.Raycaster {
  public camera: BaseCamera["instance"];
  public mouse: THREE.Vector2;

  constructor() {
    super();
    this.camera = Experience.getInstance().camera.instance;
    this.mouse = Experience.getInstance().inputHandler.normalizedMouse;
    console.log("Raycaster class instantiated");
  }

  public update() {
    this.setFromCamera(this.mouse, this.camera);
  }
}
