import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  CylinderCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

export default function Experience() {
  // MODEL
  const hamburger = useGLTF("/hamburger.glb");

  // STATES
  const [hitSound] = useState(() => new Audio("/hit.mp3"));

  // REFS
  const cube = useRef();
  const twister = useRef();

  const cubeJump = () => {
    console.log("Jump!");

    const cubeMass = cube.current.mass();
    cube.current.applyImpulse({ x: 0, y: 5 * cubeMass, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  const cubeCollision = () => {
    console.log("Cube collided");
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(0, time * 4, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);

    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current.setNextKinematicTranslation({ x, y: 0.5, z: z });
  });

  // STRESS TEST
  const cubeCount = 100;
  // const cubes = useRef();

  // useEffect(() => {
  //   for (let i = 0; i < cubeCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 2, 0),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     );
  //     cubes.current.setMatrixAt(i, matrix);
  //   }
  // }, []);
  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < cubeCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }

    return instances;
  }, []);

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
      <Physics debug={false} gravity={[0, -9.08, 0]}>
        <RigidBody colliders="ball">
          <mesh castShadow position={[-2, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          gravityScale={1}
          restitution={0.5}
          friction={0.7}
          colliders={false}
          onCollisionEnter={cubeCollision}
          onCollisionExit={() => console.log("Cube exited")}
          onSleep={() => console.log("Cube slept")}
          onWake={() => console.log("Cube woke")}
        >
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={twister}
          position={[0, 0.8, 0]}
          friction={0}
          type="kinematicPosition"
        >
          <mesh castShadow scale={[0.4, 0.5, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        {/* FLOOR */}
        <RigidBody type="fixed" restitution={0.5} friction={0.7}>
          <mesh receiveShadow>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        {/* INVISIBLE WALLS */}
        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>

        {/* HAMBURGER */}
        <RigidBody colliders={false} position={[0, 4, 0]}>
          <CylinderCollider mass={1} args={[0.5, 1.25]} />
          <primitive object={hamburger.scene} scale={0.25} />
        </RigidBody>

        {/* STRESS TEST */}
        <InstancedRigidBodies instances={instances}>
          <instancedMesh
            //ref={cubes}
            args={[null, null, cubeCount]}
            castShadow
          >
            <boxGeometry />
            <meshStandardMaterial color={"tomato"} />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
