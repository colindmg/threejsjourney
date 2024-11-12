import {
  Environment,
  Float,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";

export default function Experience() {
  const computer = useGLTF("/macbook.gltf");

  return (
    <>
      {/* BACKGROUND COLOR */}
      <color attach="background" args={["#241A1A"]} />

      {/* ENVIRONMENT */}
      <Environment preset="city" />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        {/* OBJECT */}
        <Float rotationIntensity={0.4}>
          <primitive position-y={-1.2} object={computer.scene} />
        </Float>
      </PresentationControls>
    </>
  );
}
