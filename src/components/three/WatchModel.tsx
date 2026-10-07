"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { metals, straps, type WatchLook } from "@/data/watches";
import { createBezelTexture, createDialTexture, isLightColor } from "./dialTexture";

export type HandsMode = "live" | "reverse" | "frozen";

type Props = {
  look: WatchLook;
  mode?: HandsMode;
  strapLength?: number;
} & Omit<ThreeElements["group"], "children">;

const TOP = 0.2;
const DIAL_Y = 0.12;

/** Offset in ms between the browser clock and Geneva wall time. */
function genevaOffset() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Zurich",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const geneva = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second"));
  const local = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  );
  return geneva - local;
}

function handShape(length: number, width: number, tail: number, style: "dauphine" | "baton" | "needle") {
  const s = new THREE.Shape();
  if (style === "dauphine") {
    s.moveTo(0, -tail);
    s.lineTo(width / 2, length * 0.12);
    s.lineTo(0, length);
    s.lineTo(-width / 2, length * 0.12);
    s.closePath();
  } else if (style === "baton") {
    s.moveTo(-width / 2, -tail);
    s.lineTo(width / 2, -tail);
    s.lineTo(width / 2, length - width);
    s.lineTo(0, length);
    s.lineTo(-width / 2, length - width);
    s.closePath();
  } else {
    s.moveTo(-width / 2, -tail);
    s.lineTo(width / 2, -tail);
    s.lineTo(width / 6, length);
    s.lineTo(-width / 6, length);
    s.closePath();
  }
  return s;
}

function Hand({
  shape,
  material,
  y,
  depth = 0.012,
}: {
  shape: THREE.Shape;
  material: THREE.Material;
  y: number;
  depth?: number;
}) {
  const geo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSize: 0.004,
      bevelThickness: 0.004,
      bevelSegments: 2,
    });
    g.rotateX(-Math.PI / 2);
    return g;
  }, [shape, depth]);
  useEffect(() => () => geo.dispose(), [geo]);
  return <mesh geometry={geo} material={material} position={[0, y, 0]} castShadow />;
}

function strapCurve(direction: 1 | -1, length: number) {
  const d = direction;
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.02, d * 1.08),
    new THREE.Vector3(0, -0.04, d * 1.45),
    new THREE.Vector3(0, -0.28, d * (1.45 + length * 0.42)),
    new THREE.Vector3(0, -0.75, d * (1.55 + length * 0.7)),
    new THREE.Vector3(0, -1.35, d * (1.5 + length * 0.85)),
  ]);
}

function Strap({ direction, look, length, metalMat }: { direction: 1 | -1; look: WatchLook; length: number; metalMat: THREE.Material }) {
  const strap = straps[look.strap];
  const curve = useMemo(() => strapCurve(direction, length), [direction, length]);

  const leatherGeo = useMemo(() => {
    if (strap.kind === "metal") return null;
    // With a planar path in YZ, the extrude normal is the X axis: shape.x = width, shape.y = thickness.
    const w = 0.52;
    const t = 0.07;
    const shape = new THREE.Shape();
    shape.moveTo(-w, -t / 2);
    shape.lineTo(w, -t / 2);
    shape.lineTo(w, t / 2);
    shape.lineTo(-w, t / 2);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { steps: 64, bevelEnabled: false, extrudePath: curve });
  }, [curve, strap.kind]);
  useEffect(() => () => leatherGeo?.dispose(), [leatherGeo]);

  const links = useMemo(() => {
    if (strap.kind !== "metal") return [];
    const count = 16;
    const out: { pos: THREE.Vector3; quat: THREE.Quaternion }[] = [];
    const up = new THREE.Vector3(0, 0, 1);
    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count;
      const pos = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);
      const quat = new THREE.Quaternion().setFromUnitVectors(up, tangent);
      out.push({ pos, quat });
    }
    return out;
  }, [curve, strap.kind]);

  const strapMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: strap.color || "#111",
        roughness: strap.kind === "rubber" ? 0.85 : 0.55,
        metalness: 0,
      }),
    [strap.color, strap.kind],
  );
  useEffect(() => () => strapMat.dispose(), [strapMat]);

  if (strap.kind === "metal") {
    return (
      <group>
        {links.map((l, i) => (
          <group key={i} position={l.pos} quaternion={l.quat}>
            <mesh material={metalMat}>
              <boxGeometry args={[0.36, 0.09, 0.15]} />
            </mesh>
            <mesh material={metalMat} position={[0.37, 0, 0]}>
              <boxGeometry args={[0.34, 0.08, 0.14]} />
            </mesh>
            <mesh material={metalMat} position={[-0.37, 0, 0]}>
              <boxGeometry args={[0.34, 0.08, 0.14]} />
            </mesh>
          </group>
        ))}
      </group>
    );
  }
  return <mesh geometry={leatherGeo!} material={strapMat} castShadow />;
}

export function WatchModel({ look, mode = "live", strapLength = 1.2, ...group }: Props) {
  const metal = metals[look.metal];
  const lightDial = isLightColor(look.dial);

  const hourRef = useRef<THREE.Group>(null);
  const minuteRef = useRef<THREE.Group>(null);
  const secondRef = useRef<THREE.Group>(null);
  const subRef = useRef<THREE.Group>(null);
  const gmtRef = useRef<THREE.Group>(null);
  const tourbillonRef = useRef<THREE.Group>(null);
  const offset = useMemo(() => (typeof window === "undefined" ? 0 : genevaOffset()), []);
  const reverseClock = useRef(0);

  const metalMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: metal.color,
        metalness: 1,
        roughness: metal.roughness,
        clearcoat: 0.4,
        clearcoatRoughness: 0.15,
      }),
    [metal.color, metal.roughness],
  );
  // Hands and applied indices glow slightly so they stay legible against dark reflections.
  const handMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: lightDial ? "#1d2b52" : metal.color,
        metalness: lightDial ? 0.6 : 0.85,
        roughness: 0.22,
        clearcoat: 1,
        emissive: lightDial ? "#000000" : metal.color,
        emissiveIntensity: lightDial ? 0 : 0.28,
      }),
    [lightDial, metal.color],
  );
  const secondMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: look.complication === "gmt" ? "#e6d3a3" : look.dialAccent, metalness: 0.7, roughness: 0.3 }),
    [look.dialAccent, look.complication],
  );
  const gmtMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#c96a4a", metalness: 0.5, roughness: 0.35 }), []);
  const dialTex = useMemo(
    () => createDialTexture({ color: look.dial, accent: look.dialAccent, complication: look.complication }),
    [look.dial, look.dialAccent, look.complication],
  );
  const bezelTex = useMemo(
    () => (look.bezel === "diver" ? createBezelTexture(look.complication === "gmt" ? "#0f1f18" : "#0b0b0c", "#e6d3a3") : null),
    [look.bezel, look.complication],
  );

  useEffect(
    () => () => {
      metalMat.dispose();
      handMat.dispose();
      secondMat.dispose();
      gmtMat.dispose();
      dialTex.dispose();
      bezelTex?.dispose();
    },
    [metalMat, handMat, secondMat, gmtMat, dialTex, bezelTex],
  );

  const caseGeo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0, -0.2),
      new THREE.Vector2(0.86, -0.2),
      new THREE.Vector2(0.98, -0.16),
      new THREE.Vector2(1.04, -0.06),
      new THREE.Vector2(1.05, 0.04),
      new THREE.Vector2(1.03, 0.12),
      new THREE.Vector2(0.98, 0.16),
      new THREE.Vector2(0.96, 0.16),
    ];
    return new THREE.LatheGeometry(pts, 96);
  }, []);
  const bezelGeo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.86, 0.13),
      new THREE.Vector2(0.99, 0.15),
      new THREE.Vector2(1.0, TOP - 0.02),
      new THREE.Vector2(0.95, TOP),
      new THREE.Vector2(0.88, TOP - 0.01),
      new THREE.Vector2(0.86, 0.13),
    ];
    return new THREE.LatheGeometry(pts, 96);
  }, []);
  useEffect(() => () => {
    caseGeo.dispose();
    bezelGeo.dispose();
  }, [caseGeo, bezelGeo]);

  const shapes = useMemo(
    () => ({
      hour: handShape(0.5, 0.075, 0.08, lightDial ? "needle" : "dauphine"),
      minute: handShape(0.76, 0.06, 0.1, lightDial ? "needle" : "dauphine"),
      second: handShape(0.82, 0.014, 0.2, "needle"),
      sub: handShape(0.15, 0.016, 0.03, "needle"),
      gmt: handShape(0.7, 0.03, 0.05, "baton"),
    }),
    [lightDial],
  );

  const indices = useMemo(() => {
    const skip = new Set<number>();
    if (["moon", "tourbillon", "small-seconds", "perpetual"].includes(look.complication)) skip.add(6);
    if (look.complication === "chrono" || look.complication === "perpetual") {
      skip.add(3);
      skip.add(9);
    }
    if (look.complication === "date") skip.add(3);
    return Array.from({ length: 12 }, (_, i) => i).filter((i) => !skip.has(i));
  }, [look.complication]);

  const subdialPos: [number, number, number] | null = useMemo(() => {
    if (["moon", "tourbillon", "small-seconds"].includes(look.complication)) return null;
    if (look.complication === "chrono") return [0.365, DIAL_Y + 0.004, 0.044];
    return null;
  }, [look.complication]);
  const showSmallSeconds = look.complication === "small-seconds";

  useFrame((_, delta) => {
    let h: number, m: number, s: number;
    if (mode === "reverse") {
      reverseClock.current -= delta * 900;
      const t = reverseClock.current;
      s = (((t % 60) + 60) % 60);
      m = ((((t / 60) % 60) + 60) % 60);
      h = ((((t / 3600) % 12) + 12) % 12);
    } else if (mode === "frozen") {
      h = 10;
      m = 9;
      s = 36;
    } else {
      const now = Date.now() + offset;
      const d = new Date(now);
      const ms = Math.floor(d.getMilliseconds() / 125) * 125;
      s = d.getSeconds() + ms / 1000;
      m = d.getMinutes() + s / 60;
      h = (d.getHours() % 12) + m / 60;
    }
    const TAU = Math.PI * 2;
    if (hourRef.current) hourRef.current.rotation.y = -(h / 12) * TAU;
    if (minuteRef.current) minuteRef.current.rotation.y = -(m / 60) * TAU;
    if (secondRef.current) secondRef.current.rotation.y = -(s / 60) * TAU;
    if (subRef.current) subRef.current.rotation.y = -(s / 60) * TAU;
    if (gmtRef.current) gmtRef.current.rotation.y = -((h + 5) / 24) * TAU;
    if (tourbillonRef.current) tourbillonRef.current.rotation.y -= delta * 0.6;
  });

  const indexMat = handMat;
  const centralSeconds = !showSmallSeconds && look.complication !== "moon" && look.complication !== "tourbillon" && look.complication !== "perpetual";

  return (
    <group {...group}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        {/* Case */}
        <mesh geometry={caseGeo} material={metalMat} castShadow receiveShadow />
        {look.bezel === "diver" ? (
          <group>
            <mesh geometry={bezelGeo} material={metalMat} />
            <mesh position={[0, TOP - 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.8, 0.975, 128]} />
              <meshPhysicalMaterial map={bezelTex} roughness={0.25} clearcoat={1} metalness={0.1} />
            </mesh>
          </group>
        ) : (
          <mesh geometry={bezelGeo} material={metalMat} />
        )}

        {/* Lugs */}
        {[
          [0.6, 1],
          [-0.6, 1],
          [0.6, -1],
          [-0.6, -1],
        ].map(([x, z], i) => (
          <mesh key={i} material={metalMat} position={[x, -0.02, z * 1.02]} rotation={[z * 0.18, 0, 0]} castShadow>
            <boxGeometry args={[0.13, 0.17, 0.42]} />
          </mesh>
        ))}

        {/* Crown */}
        <group position={[1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={metalMat}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 24]} />
          </mesh>
          <mesh material={metalMat} position={[0, -0.09, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.1, 32]} />
          </mesh>
          {look.complication === "chrono" && (
            <mesh material={metalMat} position={[0, -0.16, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.06, 24]} />
            </mesh>
          )}
        </group>

        {/* Dial */}
        <mesh position={[0, DIAL_Y, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[0.87, 128]} />
          <meshPhysicalMaterial map={dialTex} roughness={lightDial ? 0.35 : 0.42} metalness={lightDial ? 0 : 0.25} clearcoat={lightDial ? 0.9 : 0.3} />
        </mesh>

        {/* Applied indices */}
        {indices.map((i) => {
          const a = (i / 12) * Math.PI * 2;
          const r = 0.7;
          const twelve = i === 0;
          if (lightDial) return null;
          return (
            <group key={i} rotation={[0, -a, 0]}>
              {twelve ? (
                <>
                  <mesh material={indexMat} position={[0.035, DIAL_Y + 0.012, -r]}>
                    <boxGeometry args={[0.035, 0.022, 0.17]} />
                  </mesh>
                  <mesh material={indexMat} position={[-0.035, DIAL_Y + 0.012, -r]}>
                    <boxGeometry args={[0.035, 0.022, 0.17]} />
                  </mesh>
                </>
              ) : (
                <mesh material={indexMat} position={[0, DIAL_Y + 0.012, -r]}>
                  <boxGeometry args={[0.042, 0.022, i % 3 === 0 ? 0.17 : 0.12]} />
                </mesh>
              )}
            </group>
          );
        })}

        {/* Tourbillon cage */}
        {look.complication === "tourbillon" && (
          <group position={[0, DIAL_Y + 0.03, 0.39]}>
            <group ref={tourbillonRef}>
              <mesh material={metalMat} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.15, 0.012, 12, 48]} />
              </mesh>
              {[0, 1, 2].map((k) => (
                <mesh key={k} material={metalMat} rotation={[0, (k / 3) * Math.PI * 2, 0]} position={[0, 0.01, 0]}>
                  <boxGeometry args={[0.3, 0.012, 0.02]} />
                </mesh>
              ))}
              <mesh material={metalMat} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
                <torusGeometry args={[0.1, 0.008, 8, 48]} />
              </mesh>
              <mesh position={[0, 0.02, 0]}>
                <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
                <meshPhysicalMaterial color="#9b1028" roughness={0.1} transmission={0.4} />
              </mesh>
            </group>
          </group>
        )}

        {/* Small seconds */}
        {showSmallSeconds && (
          <group position={[0, DIAL_Y + 0.004, 0.39]} ref={subRef}>
            <Hand shape={shapes.sub} material={secondMat} y={0.005} depth={0.006} />
          </group>
        )}
        {subdialPos && (
          <group position={subdialPos} ref={subRef}>
            <Hand shape={shapes.sub} material={handMat} y={0.005} depth={0.006} />
          </group>
        )}

        {/* Central hands */}
        <group ref={hourRef}>
          <Hand shape={shapes.hour} material={handMat} y={DIAL_Y + 0.03} />
        </group>
        <group ref={minuteRef}>
          <Hand shape={shapes.minute} material={handMat} y={DIAL_Y + 0.05} />
        </group>
        {look.complication === "gmt" && (
          <group ref={gmtRef}>
            <Hand shape={shapes.gmt} material={gmtMat} y={DIAL_Y + 0.04} depth={0.006} />
          </group>
        )}
        {centralSeconds && (
          <group ref={secondRef}>
            <Hand shape={shapes.second} material={secondMat} y={DIAL_Y + 0.07} depth={0.006} />
          </group>
        )}
        <mesh material={metalMat} position={[0, DIAL_Y + 0.08, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.03, 24]} />
        </mesh>

        {/* Crystal */}
        <mesh position={[0, TOP - 0.035, 0]}>
          <cylinderGeometry args={[0.88, 0.88, 0.035, 96]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.08}
            roughness={0}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            reflectivity={1}
            depthWrite={false}
          />
        </mesh>

        {/* Strap */}
        {strapLength > 0 && (
          <>
            <Strap direction={1} look={look} length={strapLength} metalMat={metalMat} />
            <Strap direction={-1} look={look} length={strapLength} metalMat={metalMat} />
          </>
        )}
      </group>
    </group>
  );
}

