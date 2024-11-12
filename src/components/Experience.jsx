import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";

export default function Experience() {
  const computer = useGLTF("/macbook.gltf");

  return (
    <>
      {/* BACKGROUND COLOR */}
      <color attach="background" args={["#241A1A"]} />

      {/* CONTROLS */}
      <OrbitControls makeDefault />

      {/* ENVIRONMENT */}
      <Environment preset="city" />

      {/* OBJECT */}
      <Float rotationIntensity={0.4}>
        <primitive position-y={-1.2} object={computer.scene} />
      </Float>
    </>
  );
}
