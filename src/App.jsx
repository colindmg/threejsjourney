import { Bvh } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

function App() {
  return (
    <>
      <Canvas style={{ height: "100dvh", width: "100vw" }}>
        <Bvh>
          <Experience />
        </Bvh>
      </Canvas>
    </>
  );
}

export default App;
