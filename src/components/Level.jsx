import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import PropTypes from "prop-types";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

// CREATING GEOMETRIES AND MATERIALS
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

// START BLOCK OF THE GAME
const BlockStart = ({ position = [0, 0, 0] }) => {
  return (
    <>
      <group position={position}>
        <mesh
          geometry={boxGeometry}
          material={floor1Material}
          position={[0, -0.1, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
      </group>
    </>
  );
};

BlockStart.propTypes = {
  position: PropTypes.array,
};

// ---------------------------------------

// SPINNING BOX OBSTACLE
export const BlockSpinner = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() > 0.5 ? 1 : -1)
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const rotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, time * speed, 0)
    );
    obstacle.current.setNextKinematicRotation(rotation);
  });

  return (
    <>
      <group position={position}>
        <mesh
          geometry={boxGeometry}
          material={floor2Material}
          position={[0, -0.1, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />

        {/* SPINNING BOX */}
        <RigidBody
          ref={obstacle}
          type="kinematicPosition"
          position={[0, 0.3, 0]}
          restitution={0.2}
          friction={0}
        >
          <mesh
            geometry={boxGeometry}
            material={obstacleMaterial}
            scale={[3.5, 0.3, 0.3]}
            receiveShadow
            castShadow
          />
        </RigidBody>
      </group>
    </>
  );
};

BlockSpinner.propTypes = {
  position: PropTypes.array,
};

// LIMBO OBSTACLE BLOCK
export const BlockLimbo = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <>
      <group position={position}>
        <mesh
          geometry={boxGeometry}
          material={floor2Material}
          position={[0, -0.1, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />

        {/* SPINNING BOX */}
        <RigidBody
          ref={obstacle}
          type="kinematicPosition"
          position={[0, 0.3, 0]}
          restitution={0.2}
          friction={0}
        >
          <mesh
            geometry={boxGeometry}
            material={obstacleMaterial}
            scale={[3.5, 0.3, 0.3]}
            receiveShadow
            castShadow
          />
        </RigidBody>
      </group>
    </>
  );
};

BlockLimbo.propTypes = {
  position: PropTypes.array,
};

// AXE OBSTACLE BLOCK
export const BlockAxe = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time + timeOffset) * 1.25;
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

BlockAxe.propTypes = {
  position: PropTypes.array,
};

// ---------------------------------------

// END BLOCK OF THE GAME
const BlockEnd = ({ position = [0, 0, 0] }) => {
  const hamburger = useGLTF("./hamburger.glb");
  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <>
      <group position={position}>
        <mesh
          geometry={boxGeometry}
          material={floor1Material}
          position={[0, 0, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
        <RigidBody
          type="fixed"
          colliders="hull"
          position={[0, 0.25, 0]}
          restitution={0.2}
          friction={0}
        >
          <primitive object={hamburger.scene} scale={0.2} />
        </RigidBody>
      </group>
    </>
  );
};

BlockEnd.propTypes = {
  position: PropTypes.array,
};

// ---------------------------------------

// BOUNDRY WALLS OF THE GAME
const Bounds = ({ length = 1 }) => {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          position={[2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * length]}
          castShadow
        />
        <mesh
          position={[-2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * length]}
          receiveShadow
        />
        <mesh
          position={[0, 0.75, -(length * 4) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[4, 1.5, 0.3]}
          receiveShadow
        />

        {/* COLLIDER FOR THE WHOLE FLOOR */}
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
};

Bounds.propTypes = {
  length: PropTypes.number,
};

// ---------------------------------------

// FULL LEVEL OF THE GAME
export const Level = ({
  count = 5,
  types = [BlockSpinner, BlockLimbo, BlockAxe],
}) => {
  // CREATING THE LEVEL
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [count, types]);

  return (
    <>
      {/* START OF THE GAME */}
      <BlockStart position={[0, 0, 0]} />

      {/* LEVEL OBSTACLES BLOCKS */}
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}

      {/* END OF THE GAME */}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />

      {/* BOUNDRY WALLS */}
      <Bounds length={count + 2} />
    </>
  );
};

Level.propTypes = {
  count: PropTypes.number,
  types: PropTypes.array,
};
