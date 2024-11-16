import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { Level } from "./Level.jsx";
import Lights from "./Lights.jsx";

export default function Experience() {
  return (
    <>
      {/* PERFORMANCE MONITOR */}
      <Perf position={"top-left"} />

      {/* CONTROLS */}
      <OrbitControls makeDefault />

      <Physics debug>
        {/* LIGHTS */}
        <Lights />

        {/* LEVEL */}
        <Level />
      </Physics>
    </>
  );
}
