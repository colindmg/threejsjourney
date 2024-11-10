import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

function App() {
  return (
    <>
      <Canvas shadows style={{ height: "100dvh", width: "100vw" }}>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
