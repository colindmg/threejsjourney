import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Experience = () => {
  // REFS
  const cubeRef = useRef();
  const sphereRef = useRef();
  const dirLightRef = useRef();

  useHelper(dirLightRef, THREE.DirectionalLightHelper, 2);

  // ANIMATION
  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      {/* BACKGROUND COLOR */}
      <color attach={"background"} args={["ivory"]} />

      {/* CONTROLS */}
      <OrbitControls makeDefault />

      {/* LIGHTS */}
      <directionalLight ref={dirLightRef} position={[1, 2, 3]} intensity={3} />
      <ambientLight intensity={1.5} />

      {/* MESHES */}
      <mesh ref={sphereRef} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color={"orange"} />
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
