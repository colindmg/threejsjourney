import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Hamburger from "./Hamburger";
import Placeholder from "./Placeholder";

export default function Experience() {
  return (
    <>
      {/* CONTROLS */}
      <OrbitControls makeDefault />

      {/* LIGHTS */}
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1.5} />

      {/* OBJECTS */}
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Hamburger scale={0.35} />
      </Suspense>
    </>
  );
}
