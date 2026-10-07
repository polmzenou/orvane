"use client";

import { OrbitControls, ContactShadows } from "@react-three/drei";
import { SceneCanvas } from "./SceneCanvas";
import { Studio } from "./Studio";
import { WatchModel } from "./WatchModel";
import type { WatchLook } from "@/data/watches";

export default function ProductViewer({ look, scale = 1 }: { look: WatchLook; scale?: number }) {
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 0.4, 7], fov: 32 }}>
      <Studio />
      <group position={[0, 0.15, 0]}>
        <WatchModel look={look} scale={0.82 * scale} rotation={[0.25, -0.35, 0]} />
      </group>
      <ContactShadows position={[0, -2.6, 0]} opacity={0.5} scale={8} blur={2.6} far={4} color="#000" />
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={4}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.6}
        enableDamping
      />
    </SceneCanvas>
  );
}
