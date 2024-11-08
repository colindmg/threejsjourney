import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

const Experience = () => {
  // REFS
  const cubeRef = useRef();
  const sphereRef = useRef();

  return (
    <>
      {/* CONTROLS */}
      <OrbitControls makeDefault />

      {/* LIGHTS */}
      <directionalLight position={[5, 5, 5]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* MESHES */}
      <mesh ref={sphereRef} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cubeRef}
        rotation-y={Math.PI * 0.25}
        position-x={2}
        scale={1.5}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
};

export default Experience;
