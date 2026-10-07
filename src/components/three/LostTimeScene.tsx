"use client";

import { Float } from "@react-three/drei";
import { SceneCanvas } from "./SceneCanvas";
import { Studio } from "./Studio";
import { WatchModel } from "./WatchModel";
import type { WatchLook } from "@/data/watches";

const look: WatchLook = {
  metal: "yellow-gold",
  dial: "#0c0c0d",
  dialAccent: "#c9a86a",
  strap: "alligator-black",
  complication: "small-seconds",
};

/** Watch whose hands spin backwards — used on error pages. */
export default function LostTimeScene({ mode = "reverse" }: { mode?: "reverse" | "frozen" }) {
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 6], fov: 30 }}>
      <Studio />
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
        <WatchModel look={look} mode={mode} strapLength={0} scale={1.25} rotation={[0.25, -0.3, 0.1]} />
      </Float>
    </SceneCanvas>
  );
}
