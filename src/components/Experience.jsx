import {
  OrbitControls,
  PivotControls,
  TransformControls,
} from "@react-three/drei";
import { useRef } from "react";

const Experience = () => {
  // REFS
  const cubeRef = useRef();

  return (
    <>
      {/* CONTROLS */}
      <OrbitControls makeDefault />

      {/* LIGHTS */}
      <directionalLight position={[5, 5, 5]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* MESHES */}
      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </PivotControls>

      <mesh
        ref={cubeRef}
        rotation-y={Math.PI * 0.25}
        position-x={2}
        scale={1.5}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cubeRef} />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
};

export default Experience;
