import { Vector2 } from "three/webgpu";
import { clamp } from "../../utils";
import type Experience from "../Experience";
import { EventEmitter } from "../utils/EventEmitter";

export default class InputHandler extends EventEmitter {
  private experience: Experience;
  private canvas: HTMLCanvasElement;
  private easing: number;

  private minWheelSpeed: number;
  private wheelDirection: number;
  private wheelDeltaY: number;
  private targetWheelDeltaY: number;
  public scrollOffset: number;

  public normalizedMouse: Vector2;

  private isPaused: boolean = false;

  constructor(experience: Experience) {
    super();
    this.experience = experience;
    this.canvas = this.experience.canvas;
    this.easing = 0.1;

    // Wheel
    this.wheelDeltaY = 0;
    this.targetWheelDeltaY = 0;
    this.minWheelSpeed = 0.002;
    this.wheelDirection = 1;
    this.scrollOffset = 0;

    // Mouse
    this.normalizedMouse = new Vector2(0, 0);

    this.onWheel = this.onWheel.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onClick = this.onClick.bind(this);
    // this.onTouchMove = this.onTouchMove.bind(this);
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.canvas.addEventListener("wheel", this.onWheel, { passive: true });
    this.canvas.addEventListener("click", this.onClick);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
  }

  private removeEventListeners(): void {
    this.canvas.removeEventListener("wheel", this.onWheel);
    this.canvas.removeEventListener("click", this.onClick);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
  }

  private onWheel(event: WheelEvent): void {
    if (this.isPaused) return;
    this.targetWheelDeltaY += event.deltaY * 0.00015;
    this.targetWheelDeltaY = clamp(this.targetWheelDeltaY, -2, 2);
    this.wheelDirection = event.deltaY > 0 ? 1 : -1;
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.isPaused) return;
    this.normalizedMouse.x =
      (event.clientX / this.experience.viewport.width) * 2 - 1;
    this.normalizedMouse.y =
      -(event.clientY / this.experience.viewport.height) * 2 + 1;
  }

  private onClick(event: MouseEvent): void {
    if (this.isPaused) return;
    this.trigger("click", [event]);
  }

  public pause(): void {
    this.isPaused = true;
  }

  public resume(): void {
    this.isPaused = false;
  }

  public update(): void {
    this.wheelDeltaY +=
      (this.targetWheelDeltaY - this.wheelDeltaY) * this.easing;
    this.scrollOffset += this.wheelDeltaY;

    if (Math.abs(this.targetWheelDeltaY) < this.minWheelSpeed) {
      this.targetWheelDeltaY = this.wheelDirection * this.minWheelSpeed;
    }

    this.targetWheelDeltaY *= 0.9;
  }

  public destroy(): void {
    this.removeEventListeners();
  }
}
