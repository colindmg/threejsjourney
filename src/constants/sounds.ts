// sounds.ts
import type { SoundSource } from "../types/sounds";

const sounds = [
  // MAIN AMBIENT
  // {
  //   name: "ambient",
  //   path: "sounds/ambient.ogg",
  //   options: {
  //     volume: 3,
  //     loop: true,
  //   },
  // },
] as const satisfies readonly SoundSource[];

export type SoundName = (typeof sounds)[number]["name"];

export default sounds;
