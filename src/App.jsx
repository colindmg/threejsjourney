import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
