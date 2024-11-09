import {
  ContactShadows,
  OrbitControls,
  Sky,
  useHelper,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";

const Experience = () => {
  // REFS
  const cubeRef = useRef();
  const sphereRef = useRef();
  const dirLightRef = useRef();

  useHelper(dirLightRef, THREE.DirectionalLightHelper, 2, "red");

  // ANIMATION
  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta * 0.2;
  });

  // CONTROLS
  const { sunPosition } = useControls("Sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  return (
    <>
      {/* BACKGROUND COLOR */}
      <color attach={"background"} args={["ivory"]} />

      {/* CONTROLS */}
      <OrbitControls makeDefault />

      {/* HELPERS */}
      {/* <BakeShadows /> */}
      {/* <SoftShadows size={25} samples={10} focus={0} /> */}
      {/* <AccumulativeShadows
        position-y={-0.99}
        color="#316D39"
        opacity={0.8}
        frames={Infinity}
        blend={100}
        temporal
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={3}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      <ContactShadows
        position-y={-0.99}
        resolution={512}
        far={5}
        scale={10}
        blur={2}
        // frames={1}
      />

      {/* LIGHTS */}
      <directionalLight
        ref={dirLightRef}
        position={sunPosition}
        intensity={3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-right={5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={1.5} />

      {/* SKY */}
      <Sky sunPosition={sunPosition} />

      {/* MESHES */}
      <mesh castShadow ref={sphereRef} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color={"orange"} />
      </mesh>

      <mesh
        castShadow
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
