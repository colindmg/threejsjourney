import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

function App() {
  return (
    <>
      <Canvas style={{ height: "100dvh", width: "100vw", touchAction: "none" }}>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
