import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import Interface from "./components/Interface";

function App() {
  return (
    <>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["KeyW", "ArrowUp"] },
          { name: "backward", keys: ["KeyS", "ArrowDown"] },
          { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
          { name: "rightward", keys: ["KeyD", "ArrowRight"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        {/* R3F */}
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [2.5, 4, 6],
          }}
          style={{ height: "100dvh", width: "100vw" }}
        >
          <Experience />
        </Canvas>

        {/* INTERFACE */}
        <Interface />
      </KeyboardControls>
    </>
  );
}

export default App;
