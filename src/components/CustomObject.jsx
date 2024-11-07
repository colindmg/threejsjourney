import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const CustomObject = () => {
  // CONSTANTS
  const verticesCount = 10 * 3;

  // REF
  const geometryRef = useRef();

  // MEMOIZED VALUES
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);
    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 4;
    }

    return positions;
  }, [verticesCount]);

  // USEEFFECT
  useEffect(() => {
    if (!geometryRef.current) return;
    geometryRef.current.computeVertexNormals();
  }, []);

  return (
    <>
      <mesh>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach={"attributes-position"}
            count={verticesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <meshStandardMaterial side={THREE.DoubleSide} color="red" />
      </mesh>
    </>
  );
};

export default CustomObject;
