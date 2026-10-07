"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { Studio } from "./Studio";
import { WatchModel } from "./WatchModel";
import { watches } from "@/data/watches";

function FloatingWatch() {
  const ref = useRef<THREE.Group>(null);
  const intro = useRef(0);
  const narrow = useThree((s) => s.size.width < 768);

  useFrame((state, delta) => {
    if (!ref.current) return;
    intro.current = Math.min(1, intro.current + delta * 0.35);
    const e = 1 - Math.pow(1 - intro.current, 3);
    const { x, y } = state.pointer;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, -0.45 + x * 0.35 + (1 - e) * 2.2, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0.15 - y * 0.2, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(-1.2, 0, e);
  });

  return (
    <group ref={ref}>
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
        <WatchModel look={watches[0].look} scale={narrow ? 0.62 : 0.88} position={[0, narrow ? 0.55 : 0, 0]} rotation={[0.1, 0, -0.18]} />
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 7.5], fov: 30 }}>
      <Studio />
      <FloatingWatch />
      <Sparkles count={60} scale={[8, 6, 3]} size={2} speed={0.25} opacity={0.5} color="#e6d3a3" />
    </SceneCanvas>
  );
}
