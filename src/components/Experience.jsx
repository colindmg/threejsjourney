import { OrbitControls } from "@react-three/drei";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRef } from "react";

const Experience = () => {
  // REFS
  const cubeRef = useRef();
  const sphereRef = useRef();

  // LEVA CONTROLS
  const { perfVisible } = useControls("Performance Monitor", {
    perfVisible: true,
  });

  const { position, visible, color } = useControls("Sphere", {
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
      joystick: "invertY",
    },
    visible: true,
    color: "orange",
  });

  // Other useful tweaks exemples
  const { interval, buttonTweak, choice } = useControls("Tweaks Exemple", {
    interval: { value: [0, 10], min: 0, max: 100, step: 1 }, // Slider with interval
    buttonTweak: button(() => console.log("Button clicked")), // Button
    choice: { options: ["Option 1", "Option 2"], value: "Option 1" }, // Dropdown
  });
  console.log(interval, buttonTweak, choice);

  return (
    <>
      {/* PERFORMANCE MONITOR */}
      {perfVisible && <Perf position="top-left" />}

      {/* CONTROLS */}
      <OrbitControls makeDefault />

      {/* LIGHTS */}
      <directionalLight position={[5, 5, 5]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* MESHES */}
      <mesh
        visible={visible}
        ref={sphereRef}
        position={[position.x, position.y, 0]}
      >
        <sphereGeometry />
        <meshStandardMaterial color={color} />
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
