import { float, Fn, hash, instanceIndex, min, vec2 } from "three/tsl";
import type { Node } from "three/webgpu";

export const coverUv = /*@__PURE__*/ Fn(
  ({
    uv,
    planeSize,
    imageSize,
  }: {
    uv: Node<"vec2">;
    planeSize: Node<"vec2">;
    imageSize: Node<"vec2">;
  }) => {
    const ratio = vec2(
      min(
        planeSize.x.div(planeSize.y).div(imageSize.x.div(imageSize.y)),
        float(1.0),
      ),
      min(
        planeSize.y.div(planeSize.x).div(imageSize.y.div(imageSize.x)),
        float(1.0),
      ),
    );
    const remappedUv = vec2(
      uv.x.mul(ratio.x).add(float(1.0).sub(ratio.x).mul(0.5)),
      uv.y.mul(ratio.y).add(float(1.0).sub(ratio.y).mul(0.5)),
    );

    return remappedUv;
  },
  { uv: "vec2", planeSize: "vec2", imageSize: "vec2", return: "vec2" },
);

export const randValue = /*#__PURE__*/ Fn(
  ({
    min,
    max,
    seed,
  }: {
    min: Node<"float">;
    max: Node<"float">;
    seed: Node<"float">;
  }) => {
    return hash(instanceIndex.add(seed)).mul(max.sub(min)).add(min);
  },
  { min: "float", max: "float", seed: "float", return: "float" },
);
