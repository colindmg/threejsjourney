import {
  Center,
  OrbitControls,
  shaderMaterial,
  Sparkles,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import portalFragmentShader from "../shaders/portal/fragment.glsl";
import portalVertexShader from "../shaders/portal/vertex.glsl";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#251f1d"),
    uColorEnd: new THREE.Color("#EDEDED"),
  },
  portalVertexShader,
  portalFragmentShader,
  (self) => {
    self.side = THREE.DoubleSide;
  }
);

extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF("/model/portal.glb");

  const bakedTexture = useTexture("/model/baked.jpg");
  bakedTexture.flipY = false;

  const portalMaterial = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    portalMaterial.current.uTime = elapsedTime;
  });

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
          <portalMaterial ref={portalMaterial} />
        </mesh>

        <Sparkles
          size={5}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={30}
        />
      </Center>
    </>
  );
}
