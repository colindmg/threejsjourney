import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 7,
      blocksSeed: 0,

      // TIME
      startTime: 0,
      endTime: 0,

      // PHASES OF THE GAME
      phase: "ready",

      // FUNCTIONS TO CHANGE BETWEEN PHASES
      start: () => {
        set((state) => {
          if (state.phase === "ready") {
            return { phase: "playing", startTime: Date.now() };
          }
          return {};
        });
      },
      restart: () => {
        set((state) => {
          if (state.phase === "ended" || state.phase === "playing") {
            return { phase: "ready", blocksSeed: Math.random() };
          }
          return {};
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === "playing") {
            return { phase: "ended", endTime: Date.now() };
          }
          return {};
        });
      },
    };
  })
);