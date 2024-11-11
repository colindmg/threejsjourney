import { OrbitControls } from "@react-three/drei";
import { EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { useControls } from "leva";
import { ToneMappingMode } from "postprocessing";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import Drunk from "../effects/Drunk";

export default function Experience() {
  // REF
  const drunkRef = useRef();

  // LEVA
  const drunkProps = useControls("Drunk Effect", {
    frequency: { value: 2, min: 0, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });

  return (
    <>
      {/* BACKGROUND COLOR */}
      <color attach="background" args={["#FFF"]} />

      {/* POST-PROCESSING */}
      <EffectComposer multisampling={8}>
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        /> */}
        {/* <Glitch
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.4]}
          // mode={GlitchMode.CONSTANT_MILD}
        /> */}
        {/* <Noise premultiply={false} blendFunction={BlendFunction.OVERLAY} /> */}
        {/* <Bloom luminanceThreshold={0} intensity={0.5} mipmapBlur /> */}
        {/* <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        /> */}
        <Drunk
          ref={drunkRef}
          {...drunkProps}
          // blendFunction={BlendFunction.DARKEN}
        />
      </EffectComposer>

      {/* PERFS */}
      <Perf position="top-left" />

      {/* CONTROLS */}
      <OrbitControls makeDefault />

      {/* LIGHTS */}
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* OBJECTS */}
      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
