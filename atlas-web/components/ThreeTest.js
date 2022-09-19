import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import Sphere from "./Sphere";
import { OrbitControls, Stars } from "@react-three/drei";
import Model from "./Model";

import { TextureLoader } from "three/src/loaders/TextureLoader";

export const ThreeTest = () => {
  return (
    <Canvas>
      <color attach="background" args={["#008080"]} />
      <Suspense fallback={null}>
        <mesh>
          <Model />
          <meshBasicMaterial attach="material" color="yellow" />
        </mesh>
      </Suspense>

      <ambientLight />
      <OrbitControls autoRotate />
      <Stars />
    </Canvas>
  );
};

export default ThreeTest;
