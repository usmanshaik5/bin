import React, { useRef } from "react";
import { PerspectiveCamera, RenderTexture, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Cube = () => {
  const textRef = useRef();

  // Animation effect for the text inside the cube
  useFrame(
    (state) =>
      (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 1)
  );

  return (
    <mesh>
      {/* Increase the size of the cube */}
      <boxGeometry args={[5, 1, 4]} />  {/* Cube size changed to 10x10x10 */}
      <meshStandardMaterial>
        <RenderTexture attach="map">
          {/* Perspective camera to view the texture */}
          <PerspectiveCamera makeDefault position={[1, 0, 15]} />
          <color attach="background" args={["#dc9dcd"]} />
          {/* Increase the font size of the text */}
          <Text ref={textRef} fontSize={5} color="#555">  {/* Increased font size */}
            .jsx
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  );
};

export default Cube;
