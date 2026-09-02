import type { HowlOptions } from "howler";

export type SoundSource = {
  name: string;
  path: HowlOptions["src"];
  options?: Omit<HowlOptions, "src">;
};
