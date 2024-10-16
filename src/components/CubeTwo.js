// src/components/CubeTwo.js
import React from "react";
import { Canvas } from "@react-three/fiber";

const CubeTwo = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default CubeTwo;
