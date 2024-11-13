import { OrbitControls } from "@react-three/drei";
import { BallCollider, Physics, RigidBody } from "@react-three/rapier";
import { Perf } from "r3f-perf";

export default function Experience() {
  return (
    <>
      {/* PERFS */}
      <Perf position="top-left" />

      {/* CONTROLS */}
      <OrbitControls makeDefault />

      {/* LIGHTS */}
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* OBJECTS */}
      <Physics debug>
        <RigidBody colliders="ball">
          <mesh castShadow position={[0, 4, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          colliders={false}
          position={[0, 1, 0]}
          rotation-x={Math.PI * 0.5}
        >
          {/* <CuboidCollider args={[1.5, 1.5, 0.5]} /> */}
          <BallCollider args={[1.5]} />
          <mesh>
            <torusGeometry args={[1, 0.4, 16, 100]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh receiveShadow>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
