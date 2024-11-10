import { Center, OrbitControls, useGLTF, useTexture } from "@react-three/drei";

export default function Experience() {
  const { nodes } = useGLTF("/model/portal.glb");

  const bakedTexture = useTexture("/model/baked.jpg");
  bakedTexture.flipY = false;

  return (
    <>
      {/* BACKGROUND COLOR */}
      <color attach="background" args={["#251f1d"]} />

      {/* CONTROLS */}
      <OrbitControls makeDefault />

      {/* MODEL */}

      <Center>
        <mesh
          geometry={nodes.baked.geometry}
          position={nodes.baked.position}
          rotation={nodes.baked.rotation}
          scale={nodes.baked.scale}
        >
          <meshBasicMaterial map={bakedTexture} map-flipY={false} />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
          rotation={nodes.poleLightA.rotation}
          scale={nodes.poleLightA.scale}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
          rotation={nodes.poleLightB.rotation}
          scale={nodes.poleLightB.scale}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
          scale={nodes.portalLight.scale}
        >
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </Center>
    </>
  );
}
