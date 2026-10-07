"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import * as THREE from "three";
import { SceneCanvas } from "./SceneCanvas";
import { Studio } from "./Studio";

function gearGeometry(radius: number, teeth: number, depth: number, spokes = 4, hole = 0.06) {
  const shape = new THREE.Shape();
  const toothDepth = Math.min(0.06, radius * 0.12);
  const inner = radius - toothDepth;
  const steps = teeth * 4;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = i % 4 === 1 || i % 4 === 2 ? radius : inner;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  // spoke windows
  if (spokes > 0 && radius > 0.2) {
    const rimIn = inner * 0.78;
    const hubOut = radius * 0.28;
    for (let s = 0; s < spokes; s++) {
      const a0 = (s / spokes) * Math.PI * 2 + 0.22;
      const a1 = ((s + 1) / spokes) * Math.PI * 2 - 0.22;
      const p = new THREE.Path();
      p.absarc(0, 0, rimIn, a0, a1, false);
      p.lineTo(Math.cos(a1) * hubOut, Math.sin(a1) * hubOut);
      p.absarc(0, 0, hubOut, a1, a0, true);
      p.closePath();
      shape.holes.push(p);
    }
  }
  const h = new THREE.Path();
  h.absarc(0, 0, hole, 0, Math.PI * 2, true);
  shape.holes.push(h);
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSize: 0.006,
    bevelThickness: 0.006,
    bevelSegments: 1,
    curveSegments: 24,
  });
  g.translate(0, 0, -depth / 2);
  return g;
}

function perlageTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#8d8f93";
  ctx.fillRect(0, 0, size, size);
  const step = 26;
  for (let y = 0; y < size + step; y += step * 0.8) {
    for (let x = 0; x < size + step; x += step * 0.8) {
      const g = ctx.createRadialGradient(x - 5, y - 5, 1, x, y, step * 0.7);
      g.addColorStop(0, "rgba(255,255,255,0.55)");
      g.addColorStop(0.5, "rgba(160,162,166,0.4)");
      g.addColorStop(1, "rgba(60,62,66,0.5)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, step * 0.62, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

type GearDef = { x: number; y: number; r: number; teeth: number; speed: number; layer: number };

const GEARS: GearDef[] = [
  { x: -0.62, y: 0.45, r: 0.62, teeth: 72, speed: 0.08, layer: 1 },
  { x: 0.08, y: 0.02, r: 0.42, teeth: 60, speed: -0.32, layer: 1 },
  { x: 0.66, y: 0.42, r: 0.3, teeth: 48, speed: 0.6, layer: 1 },
  { x: 0.78, y: -0.28, r: 0.26, teeth: 40, speed: -1.1, layer: 1 },
  { x: 0.42, y: -0.78, r: 0.18, teeth: 20, speed: 2.4, layer: 1 },
];

function Movement({ progress }: { progress?: MotionValue<number> }) {
  const root = useRef<THREE.Group>(null);
  const layers = useRef<(THREE.Group | null)[]>([]);
  const gears = useRef<(THREE.Mesh | null)[]>([]);
  const balance = useRef<THREE.Group>(null);
  const rotor = useRef<THREE.Group>(null);
  const rotorWrap = useRef<THREE.Group>(null);

  const geos = useMemo(() => GEARS.map((g) => gearGeometry(g.r, g.teeth, 0.05, g.r > 0.25 ? 5 : 0)), []);
  const perlage = useMemo(() => perlageTexture(), []);
  const mats = useMemo(
    () => ({
      gold: new THREE.MeshPhysicalMaterial({ color: "#d8b06a", metalness: 1, roughness: 0.22, clearcoat: 0.6 }),
      steel: new THREE.MeshPhysicalMaterial({ color: "#cfd2d6", metalness: 1, roughness: 0.16, clearcoat: 0.8 }),
      plate: new THREE.MeshStandardMaterial({ map: perlage, metalness: 0.85, roughness: 0.35 }),
      ruby: new THREE.MeshPhysicalMaterial({ color: "#b0102c", roughness: 0.05, metalness: 0.1, clearcoat: 1, sheen: 1 }),
      blued: new THREE.MeshPhysicalMaterial({ color: "#1f3fa0", metalness: 1, roughness: 0.2 }),
    }),
    [perlage],
  );

  const bridgeGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.2, 0.95);
    s.quadraticCurveTo(-1.45, 0.4, -1.1, -0.05);
    s.lineTo(0.2, 0.25);
    s.quadraticCurveTo(0.5, 0.35, 0.4, 0.75);
    s.quadraticCurveTo(-0.3, 1.25, -1.2, 0.95);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.02, bevelSegments: 3 });
    return g;
  }, []);
  const trainBridgeGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0.0, 0.2);
    s.quadraticCurveTo(0.6, 0.85, 1.15, 0.35);
    s.quadraticCurveTo(1.25, -0.2, 0.9, -0.55);
    s.lineTo(0.62, -0.32);
    s.quadraticCurveTo(0.75, 0.15, 0.5, 0.3);
    s.quadraticCurveTo(0.25, 0.32, 0.12, -0.05);
    s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 3 });
  }, []);
  const rotorGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.absarc(0, 0, 1.55, 0, Math.PI, false);
    s.lineTo(-0.25, 0);
    s.absarc(0, 0, 0.25, Math.PI, 0, true);
    s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 0.06, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.015, bevelSegments: 2, curveSegments: 64 });
  }, []);

  useEffect(
    () => () => {
      geos.forEach((g) => g.dispose());
      Object.values(mats).forEach((m) => m.dispose());
      perlage.dispose();
      bridgeGeo.dispose();
      trainBridgeGeo.dispose();
      rotorGeo.dispose();
    },
    [geos, mats, perlage, bridgeGeo, trainBridgeGeo, rotorGeo],
  );

  useFrame((state, delta) => {
    const p = progress ? progress.get() : (Math.sin(state.clock.elapsedTime * 0.4) + 1) / 2;
    const spread = THREE.MathUtils.smoothstep(p, 0.05, 0.85);
    layers.current.forEach((l, i) => {
      if (l) l.position.z = THREE.MathUtils.lerp(l.position.z, i * 0.06 + spread * i * 0.9, 0.12);
    });
    gears.current.forEach((g, i) => {
      if (g) g.rotation.z += delta * GEARS[i].speed;
    });
    if (balance.current) balance.current.rotation.z = Math.sin(state.clock.elapsedTime * Math.PI * 2 * 1.5) * 1.6;
    if (rotor.current) rotor.current.rotation.z += delta * 0.4;
    if (rotorWrap.current) {
      // The oscillating weight only joins at the end of the story, so it never hides the train.
      const r = THREE.MathUtils.smoothstep(p, 0.72, 0.95);
      rotorWrap.current.scale.setScalar(THREE.MathUtils.lerp(rotorWrap.current.scale.x, Math.max(0.001, r), 0.15));
      rotorWrap.current.visible = rotorWrap.current.scale.x > 0.01;
    }
    if (root.current) {
      root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -0.25 - spread * 0.75, 0.08);
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, 0.35 - spread * 0.9, 0.08);
      root.current.rotation.z = THREE.MathUtils.lerp(root.current.rotation.z, spread * 0.3, 0.08);
    }
  });

  const setLayer = (i: number) => (el: THREE.Group | null) => {
    layers.current[i] = el;
  };

  return (
    <group ref={root} scale={1.05}>
      {/* Layer 0: mainplate */}
      <group ref={setLayer(0)}>
        <mesh material={mats.plate} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 0.1, 96]} />
        </mesh>
      </group>
      {/* Layer 1: gear train */}
      <group ref={setLayer(1)}>
        {GEARS.map((g, i) => (
          <group key={i} position={[g.x, g.y, 0.1]}>
            <mesh
              ref={(el) => {
                gears.current[i] = el;
              }}
              geometry={geos[i]}
              material={mats.gold}
            />
            <mesh material={mats.steel} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.16, 16]} />
            </mesh>
          </group>
        ))}
        {/* Balance wheel */}
        <group position={[-0.5, -0.72, 0.12]}>
          <group ref={balance}>
            <mesh material={mats.gold}>
              <torusGeometry args={[0.38, 0.035, 12, 64]} />
            </mesh>
            {[0, 1, 2].map((k) => (
              <mesh key={k} material={mats.gold} rotation={[0, 0, (k / 3) * Math.PI * 2]}>
                <boxGeometry args={[0.76, 0.03, 0.03]} />
              </mesh>
            ))}
            {Array.from({ length: 8 }).map((_, k) => {
              const a = (k / 8) * Math.PI * 2;
              return (
                <mesh key={k} material={mats.steel} position={[Math.cos(a) * 0.38, Math.sin(a) * 0.38, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.03, 0.03, 0.05, 12]} />
                </mesh>
              );
            })}
          </group>
          <mesh material={mats.blued}>
            <torusGeometry args={[0.16, 0.006, 6, 64]} />
          </mesh>
          <mesh material={mats.blued}>
            <torusGeometry args={[0.11, 0.006, 6, 64]} />
          </mesh>
        </group>
      </group>
      {/* Layer 2: bridges with jewels */}
      <group ref={setLayer(2)}>
        <mesh geometry={bridgeGeo} material={mats.steel} position={[0, 0, 0.18]} />
        <mesh geometry={trainBridgeGeo} material={mats.steel} position={[0, 0, 0.18]} />
        {[
          [-0.62, 0.45],
          [0.66, 0.42],
          [0.78, -0.28],
          [0.08, 0.02],
        ].map(([x, y], i) => (
          <group key={i} position={[x, y, 0.3]}>
            <mesh material={mats.steel} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.02, 24]} />
            </mesh>
            <mesh material={mats.ruby} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.012]}>
              <cylinderGeometry args={[0.04, 0.04, 0.02, 24]} />
            </mesh>
          </group>
        ))}
        <mesh material={mats.steel} position={[-0.5, -0.72, 0.24]} rotation={[0, 0, 0.6]}>
          <boxGeometry args={[1.0, 0.16, 0.06]} />
        </mesh>
      </group>
      {/* Layer 3: rotor */}
      <group ref={setLayer(3)}>
        <group ref={rotorWrap} scale={0.001}>
        <group ref={rotor} position={[0, 0, 0.42]}>
          <mesh geometry={rotorGeo} material={mats.gold} />
        </group>
        <mesh material={mats.ruby} position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 24]} />
        </mesh>
        </group>
      </group>
    </group>
  );
}

export default function MovementScene({ progress }: { progress?: MotionValue<number> }) {
  return (
    <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 7.6], fov: 35 }}>
      <Studio intensity={1.1} />
      <Movement progress={progress} />
    </SceneCanvas>
  );
}
