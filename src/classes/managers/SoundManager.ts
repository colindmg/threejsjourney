// SoundManager.ts
import { Howl, Howler } from "howler";
import type { SoundName } from "../../constants/sounds";
import type { SoundSource } from "../../types/sounds";
import { EventEmitter } from "../utils/EventEmitter";

type SoundItems = [SoundName] extends [never]
  ? Record<string, Howl>
  : Record<SoundName, Howl>;
export default class SoundManager extends EventEmitter {
  declare sources: readonly SoundSource[];
  declare items: Partial<SoundItems>;
  declare toLoad: number;
  declare loaded: number;

  constructor(sources: readonly SoundSource[]) {
    super();

    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    if (this.toLoad === 0) {
      this.trigger("ready");
      return;
    }

    this.startLoading();
  }

  startLoading() {
    for (const source of this.sources) {
      const originalOnLoad = source.options?.onload;
      const originalOnLoadError = source.options?.onloaderror;

      const sound = new Howl({
        src: source.path,
        ...source.options,

        onload: (soundId) => {
          originalOnLoad?.(soundId);
          this.soundLoaded();
        },

        onloaderror: (soundId, error) => {
          originalOnLoadError?.(soundId, error);
          console.warn(
            `[SoundManager] Failed to load sound "${source.name}"`,
            error,
          );
          this.soundLoaded();
        },
      });

      const name = source.name as SoundName;
      this.items[name] = sound;
    }
  }

  soundLoaded() {
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }

  play(name: SoundName): number | null {
    const sound = this.items[name];

    if (!sound) {
      console.warn(`[SoundManager] Sound "${name}" not found.`);
      return null;
    }
    return sound.play();
  }

  playRate(name: SoundName, rate: number): number | null {
    const sound = this.items[name];

    if (!sound) {
      console.warn(`[SoundManager] Sound "${name}" not found.`);
      return null;
    }

    sound.rate(rate);
    return sound.play();
  }

  pause(name: SoundName) {
    const sound = this.items[name];

    if (!sound) {
      console.warn(`[SoundManager] Sound "${name}" not found.`);
      return;
    }

    sound.pause();
  }

  stop(name: SoundName) {
    const sound = this.items[name];

    if (!sound) {
      console.warn(`[SoundManager] Sound "${name}" not found.`);
      return;
    }

    sound.stop();
  }

  mute(name: SoundName, muted = true) {
    const sound = this.items[name];

    if (!sound) {
      console.warn(`[SoundManager] Sound "${name}" not found.`);
      return;
    }

    sound.mute(muted);
  }

  reset(name: SoundName) {
    const sound = this.items[name];

    if (!sound) {
      console.warn(`[SoundManager] Sound "${name}" not found.`);
      return;
    }

    sound.stop();
    sound.seek(0);
  }

  setVolume(name: SoundName, volume: number) {
    const sound = this.items[name];

    if (!sound) {
      console.warn(`[SoundManager] Sound "${name}" not found.`);
      return;
    }

    sound.volume(volume);
  }

  setGlobalVolume(volume: number) {
    Howler.volume(volume);
  }

  muteAll(muted = true) {
    Howler.mute(muted);
  }

  stopAll() {
    Howler.stop();
  }

  destroy() {
    for (const name in this.items) {
      const sound = this.items[name as SoundName];
      sound?.unload();
    }
    this.items = {};
  }
}
