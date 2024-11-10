import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";

export default function Experience() {
  const [matcapTexture] = useMatcapTexture("8B892C_D4E856_475E2D_47360A", 256);
  console.log(matcapTexture);

  return (
    <>
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
        >
          Hello, World!
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>
    </>
  );
}
