import { useKeyboardControls } from "@react-three/drei";
import { addEffect } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import useGame from "../stores/useGame";

const Interface = () => {
  // REF
  const time = useRef();

  // RETRIEVING CONTROLS
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;
      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }

      if (time.current)
        time.current.textContent = (elapsedTime / 1000).toFixed(2);
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      {/* TIME */}
      <div
        ref={time}
        className="absolute top-[15%] left-0 w-full text-white text-4xl bg-black/30 pt-1 text-center"
      >
        0.00
      </div>

      {/* RESTART */}
      {phase === "ended" && (
        <div className="flex justify-center items-center  absolute top-[40%] left-0 w-full text-white text-7xl bg-black/30 p-4 pointer-events-auto cursor-pointer">
          <button onClick={restart}>RESTART</button>
        </div>
      )}

      {/* CONTROLS */}
      <div className="absolute bottom-10 left-0 w-full">
        <div className="flex justify-center">
          <div
            className={`w-10 h-10 m-1 border-2 border-white bg-white/25 ${
              forward && "bg-white/90"
            }`}
          ></div>
        </div>
        <div className="flex justify-center">
          <div
            className={`w-10 h-10 m-1 border-2 border-white bg-white/25 ${
              leftward && "bg-white/90"
            }`}
          ></div>
          <div
            className={`w-10 h-10 m-1 border-2 border-white bg-white/25 ${
              backward && "bg-white/90"
            }`}
          ></div>
          <div
            className={`w-10 h-10 m-1 border-2 border-white bg-white/25 ${
              rightward && "bg-white/90"
            }`}
          ></div>
        </div>
        <div className="flex justify-center">
          <div
            className={`w-[135px] h-10 m-1 border-2 border-white bg-white/25 ${
              jump && "bg-white/90"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
