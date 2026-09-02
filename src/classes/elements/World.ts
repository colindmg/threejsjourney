import * as THREE from "three/webgpu";
import type Experience from "../Experience";

export default class World {
  private experience: Experience;
  private scene: Experience["scene"];
  private fileManager: Experience["fileManager"];

  constructor(experience: Experience) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.fileManager = this.experience.fileManager;

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xf3f3f3,
      }),
    );
    testMesh.castShadow = true;
    this.scene.add(testMesh);

    this.fileManager.on("ready", () => {
      console.log("File manager is ready");
    });
  }
}
