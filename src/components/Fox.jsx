import { useAnimations, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";

const Fox = () => {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  const { animationName } = useControls("Fox animations", {
    animationName: { options: animations.names },
  });

  useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [animationName, animations.actions]);

  // useEffect(() => {
  //   animations.actions.Run.play();

  //   window.setTimeout(() => {
  //     animations.actions.Walk.play();
  //     animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
  //   }, 2000);
  // }, [animations.actions]);

  return (
    <>
      <primitive object={fox.scene} scale={0.03} position={[-3, -1, 2]} />
    </>
  );
};

export default Fox;
