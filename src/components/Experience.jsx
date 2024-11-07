import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import CustomObject from "./CustomObject";

const Experience = () => {
  // REFS
  const groupRef = useRef();
  const cubeRef = useRef();

  // ANIMATIONS
  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta;
  });

  return (
    <>
      {/* CONTROLS */}
      <OrbitControls />

      {/* LIGHTS */}
      <directionalLight position={[5, 5, 5]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* MESHES */}
      <group ref={groupRef}>
        <mesh position-x={-2}>
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
      </group>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      {/* CUSTOM OBJECT */}
      <CustomObject />
    </>
  );
};

export default Experience;
