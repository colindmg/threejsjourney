import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Experience from "./components/Experience";

function App() {
  const cameraSettings = {
    fov: 45,
    // zoom: 100,
    near: 0.2,
    far: 20,
    position: [3, 2, 6],
  };

  return (
    <>
      <Canvas
        // flat
        // dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{ height: "100dvh", width: "100vw", background: "lightblue" }}
        // orthographic
        camera={cameraSettings}
      >
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
