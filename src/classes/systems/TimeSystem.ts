import { EventEmitter } from "../utils/EventEmitter";

export default class TimeSystem extends EventEmitter {
  public start: number;
  public current: number;
  public elapsed: number;
  public delta: number;
  public deltaSeconds: number;

  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.deltaSeconds = this.delta / 1000;

    window.requestAnimationFrame(() => this.tick());
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.deltaSeconds = this.delta / 1000;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame(() => this.tick());
  }
}
