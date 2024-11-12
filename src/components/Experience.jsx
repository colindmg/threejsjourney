import { OrbitControls, useGLTF } from "@react-three/drei";

export default function Experience() {
  const computer = useGLTF("/macbook.gltf");

  return (
    <>
      {/* BACKGROUND COLOR */}
      <color attach="background" args={["#241A1A"]} />

      <OrbitControls makeDefault />

      <primitive object={computer.scene} />
    </>
  );
}
