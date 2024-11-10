import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const matcapMaterial = new THREE.MeshMatcapMaterial();

export default function Experience() {
  // STORING GEOMETRY AND MATERIAL
  // const [torusGeometry, setTorusGeometry] = useState();
  // const [matcapMaterial, setMatcapMaterial] = useState();

  // REFS
  const donuts = useRef([]);

  // MATCAP TEXTURE
  const [matcapTexture] = useMatcapTexture("8B892C_D4E856_475E2D_47360A", 256);
  console.log(matcapTexture);

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;
    matcapMaterial.matcap = matcapTexture;
    matcapMaterial.needsUpdate = true;
  }, [matcapTexture]);

  useFrame(
    (state, delta) => {
      donuts.current.forEach((donut) => {
        donut.rotation.x += delta * 0.5;
        donut.rotation.y += delta * 0.5;
      });
    },
    [donuts]
  );

  return (
    <>
      {/* <torusGeometry ref={setTorusGeometry} />
      <meshMatcapMaterial ref={setMatcapMaterial} matcap={matcapTexture} /> */}

      {/* CONTROLS */}
      <OrbitControls makeDefault />

      {/* TEXT */}
      <Center>
        <Text3D
          font={"/fonts/helvetiker_regular.typeface.json"}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={matcapMaterial}
        >
          Thibaut Lecrazy
        </Text3D>
      </Center>

      {/* DONUTS */}
      {[...Array(100)].map((value, index) => (
        <mesh
          key={"Donut number " + index}
          ref={(element) => (donuts.current[index] = element)}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          geometry={torusGeometry}
          material={matcapMaterial}
        ></mesh>
      ))}
    </>
  );
}
