import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <>
      <Canvas style={{ height: "100dvh", width: "100vw" }}>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;
