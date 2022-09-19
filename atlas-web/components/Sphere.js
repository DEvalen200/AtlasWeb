import React from "react";
import { Mesh } from "three";

function Sphere() {
  return (
    <mesh>
      <sphereGeometry />
      <meshStandardMaterial color={"#78ffff"} wireframe />
    </mesh>
  );
}

export default Sphere;
