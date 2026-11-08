"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

const nodes = [
  [-4.8, 1.8, -0.5],
  [-3.2, 0.5, 0.3],
  [-1.6, 1.7, -0.2],
  [0, 0.4, 0.4],
  [1.7, 1.8, -0.4],
  [3.3, 0.5, 0.2],
  [4.8, 1.7, -0.3],
  [-4.8, -1.5, 0.2],
  [-3.2, -0.1, -0.4],
  [-1.6, -1.7, 0.3],
  [0, -0.8, -0.3],
  [1.7, -1.6, 0.4],
  [3.3, -0.1, -0.3],
  [4.8, -1.5, 0.2],
] as const;

const connections = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [12, 13],
  [0, 7],
  [1, 8],
  [2, 9],
  [3, 10],
  [4, 11],
  [5, 12],
  [6, 13],
] as const;

function Network() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.025;
      group.current.rotation.x = Math.sin(Date.now() * 0.00015) * 0.025;
    }
  });

  return (
    <group ref={group}>
      {connections.map(([start, end]) => (
        <Line
          key={`${start}-${end}`}
          points={[nodes[start], nodes[end]]}
          color="#1e3a8a"
          lineWidth={0.7}
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      ))}
      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          {index % 3 === 0 ? (
            <icosahedronGeometry args={[0.11, 1]} />
          ) : (
            <sphereGeometry args={[0.075, 16, 16]} />
          )}
          <meshStandardMaterial
            color="#1e3a8a"
            roughness={0.4}
            metalness={0.12}
            transparent
            opacity={0.42}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function BackgroundNodes() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 9], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} />
      <Network />
    </Canvas>
  );
}
