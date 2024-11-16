import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import useGame from "../stores/useGame.js";
import { Level } from "./Level.jsx";
import Lights from "./Lights.jsx";
import Player from "./Player.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      {/* PERFORMANCE MONITOR */}
      <Perf position={"top-left"} />

      <Physics debug={false}>
        {/* LIGHTS */}
        <Lights />

        {/* LEVEL */}
        <Level count={blocksCount} seed={blocksSeed} />

        {/* PLAYER (MARBLE) */}
        <Player />
      </Physics>
    </>
  );
}
