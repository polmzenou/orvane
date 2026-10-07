"use client";

import { Environment, Lightformer } from "@react-three/drei";

/** Offline studio lighting: no HDR download, reflections come from light panels. */
export function Studio({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <ambientLight intensity={0.25 * intensity} />
      <directionalLight position={[3, 4, 5]} intensity={1.6 * intensity} color="#fff4e0" />
      <directionalLight position={[-4, -2, 3]} intensity={0.5 * intensity} color="#c9a86a" />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#050505"]} />
        <Lightformer form="rect" intensity={4} position={[0, 4, 3]} scale={[10, 2, 1]} color="#fff6e6" />
        <Lightformer form="rect" intensity={2.4} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 1.2, 1]} color="#f3e1b8" />
        <Lightformer form="rect" intensity={2} position={[5, 1, 1]} rotation-y={-Math.PI / 2} scale={[8, 0.8, 1]} color="#ffffff" />
        <Lightformer form="ring" intensity={3} position={[2, 2, 6]} scale={2} color="#ffe9c2" />
        <Lightformer form="rect" intensity={1} position={[0, -4, 2]} rotation-x={-Math.PI / 2} scale={[10, 2, 1]} color="#c9a86a" />
      </Environment>
    </>
  );
}
