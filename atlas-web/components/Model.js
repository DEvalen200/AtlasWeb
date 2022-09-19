import React from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { DoubleSide } from "three";

const Model = () => {
  const obj = useLoader(OBJLoader, "/AltTankTop.obj");
  const texture = useTexture("/AltTankTop_01.png");
  const geometry = useMemo(() => {
    let g;
    obj.traverse((c) => {
      if (c.type === "Mesh") {
        g = c.geometry;
      }
    });
    return g;
  }, [obj]);

  return (
    <mesh geometry={geometry} scale={1}>
      <meshPhysicalMaterial map={texture} side={DoubleSide} />
    </mesh>
  );
};

export default Model;
