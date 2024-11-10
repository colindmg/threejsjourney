import { Clone, useGLTF } from "@react-three/drei";

const Model = () => {
  // Load GLTF model
  const model = useGLTF("./hamburger-draco.glb");

  return (
    <>
      <Clone scale={0.35} object={model.scene} />
      <Clone scale={0.35} position-x={-4} object={model.scene} />
      <Clone scale={0.35} position-x={4} object={model.scene} />
    </>
  );
};

useGLTF.preload("./hamburger-draco.glb");

export default Model;
