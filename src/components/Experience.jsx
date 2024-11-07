import {
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  PivotControls,
  TransformControls,
} from "@react-three/drei";
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
      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh ref={sphereRef} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          {/* <Html
            position={[1, 1, 0]}
            wrapperClass="label"
            center
            distanceFactor={8}
            occlude={[cubeRef, sphereRef]}
          >
            That&apos;s a sphere 👍
          </Html> */}
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
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial
          color={"greenyellow"}
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.75}
        />
      </mesh>

      {/* FLOATING ELEMENT */}
      <Float speed={5} floatIntensity={2}>
        <mesh position={[0, 0, 0]} scale={0.5}>
          <torusGeometry args={[1, 0.2, 16, 100]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Float>
    </>
  );
};

export default Experience;
