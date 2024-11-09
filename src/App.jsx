import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

function App() {
  // const created = ({ gl, scene }) => {
  // gl.setClearColor("lightblue", 1);
  // scene.background = new THREE.Color("lightblue");
  // };

  return (
    <>
      <Canvas style={{ height: "100dvh", width: "100vw" }}>
        <color attach={"background"} args={["lightblue"]} />

        <Experience />
      </Canvas>
    </>
  );
}

export default App;
