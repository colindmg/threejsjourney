import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

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
      </KeyboardControls>
    </>
  );
}

export default App;
