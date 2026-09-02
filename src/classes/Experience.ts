import sources from "../constants/sources";
import BaseCamera from "./core/BaseCamera";
import Renderer from "./core/Renderer";
import World from "./elements/World";
import FileManager from "./managers/FileManager";

import sounds from "../constants/sounds";
import BaseScene from "./core/BaseScene";
import InputHandler from "./handlers/InputHandler";
import SoundManager from "./managers/SoundManager";
import TimeSystem from "./systems/TimeSystem";
import ViewportSystem from "./systems/ViewportSystem";

export default class Experience {
  private static _instance: Experience | null = null;

  public viewport: ViewportSystem;
  public time: TimeSystem;

  public fileManager: FileManager;
  public soundManager: SoundManager;

  public inputHandler: InputHandler;

  public canvas: HTMLCanvasElement;
  public scene: BaseScene;
  public camera: BaseCamera;
  public renderer: Renderer;
  public world: World;

  constructor(canvas: HTMLCanvasElement) {
    if (Experience._instance) {
      throw new Error(
        "Experience is a singleton. Use Experience.getInstance()",
      );
    }
    Experience._instance = this;

    // SETUP
    this.canvas = canvas;
    this.viewport = new ViewportSystem();
    this.time = new TimeSystem();
    this.fileManager = new FileManager(sources);
    this.soundManager = new SoundManager(sounds);

    this.inputHandler = new InputHandler(this);

    this.scene = new BaseScene();
    this.camera = new BaseCamera();
    this.renderer = new Renderer(this);
    this.world = new World(this);

    // EVENTS
    this.viewport.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });

    console.log("[Experience] class instantiated");
  }

  public static getInstance(): Experience {
    if (!Experience._instance) {
      throw new Error("Experience has not been instantiated yet.");
    }
    return Experience._instance;
  }

  public resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  public update() {
    this.camera.update();
    this.renderer.update();
    this.inputHandler.update();
  }

  public destroy() {
    this.viewport.off("resize");
    this.time.off("tick");

    this.scene.destroy();
    this.viewport.destroy();
    this.renderer.destroy();
    this.camera.destroy();
    this.inputHandler.destroy();
    this.fileManager.destroy();
    this.soundManager.destroy();

    Experience._instance = null;

    console.log("[Experience] class destroyed");
  }
}
