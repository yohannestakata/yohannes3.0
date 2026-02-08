"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PointMaterial } from "@react-three/drei";
import {
  useRef,
  useState,
  Suspense,
  type MutableRefObject,
} from "react";
import * as THREE from "three";

function checkWebGL(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return !!gl;
  } catch {
    return false;
  }
}

const PARTICLE_COUNT = 2000;
const SPHERE_RADIUS = 1;
const BURST_FORCE = 3;

// ---- Module-level particle data (generated once on import) ----
const _base = new Float32Array(PARTICLE_COUNT * 3);
const _norm = new Float32Array(PARTICLE_COUNT * 3);
const _rand = new Float32Array(PARTICLE_COUNT * 3);
const _working = new Float32Array(PARTICLE_COUNT * 3);

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);

  const x = SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta);
  const y = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta);
  const z = SPHERE_RADIUS * Math.cos(phi);

  const i3 = i * 3;
  _base[i3] = x;
  _base[i3 + 1] = y;
  _base[i3 + 2] = z;

  _norm[i3] = x;
  _norm[i3 + 1] = y;
  _norm[i3 + 2] = z;

  _rand[i3] = (Math.random() - 0.5) * 2;
  _rand[i3 + 1] = (Math.random() - 0.5) * 2;
  _rand[i3 + 2] = (Math.random() - 0.5) * 2;

  _working[i3] = x;
  _working[i3 + 1] = y;
  _working[i3 + 2] = z;
}

// ----------------------------------------------------------------

function Blob({
  scrollProgress,
}: {
  scrollProgress?: MutableRefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const smoothScroll = useRef(0);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return;

    const targetScroll = scrollProgress?.current ?? 0;
    smoothScroll.current = THREE.MathUtils.lerp(
      smoothScroll.current,
      targetScroll,
      0.06
    );

    const scroll = smoothScroll.current;
    const t = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Organic surface distortion (breathing/wobble when assembled)
      const distortAmount =
        0.15 *
        Math.sin(t * 1.5 + _base[i3] * 4) *
        Math.cos(t * 1.2 + _base[i3 + 1] * 3);

      const sphereX = _base[i3] * (1 + distortAmount);
      const sphereY = _base[i3 + 1] * (1 + distortAmount);
      const sphereZ = _base[i3 + 2] * (1 + distortAmount);

      // Burst: push along normal + random offset
      const burst = scroll * BURST_FORCE;
      const burstX = _norm[i3] * burst + _rand[i3] * burst * 0.4;
      const burstY = _norm[i3 + 1] * burst + _rand[i3 + 1] * burst * 0.4;
      const burstZ = _norm[i3 + 2] * burst + _rand[i3 + 2] * burst * 0.4;

      _working[i3] = sphereX + burstX;
      _working[i3 + 1] = sphereY + burstY;
      _working[i3 + 2] = sphereZ + burstZ;
    }

    (posAttr.array as Float32Array).set(_working);
    posAttr.needsUpdate = true;

    // Smooth rotation (slow)
    pointsRef.current.rotation.x = t * 0.04;
    pointsRef.current.rotation.y = t * 0.025;

    // Subtle mouse following (gentle)
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      pointer.x * 0.35,
      0.02
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      pointer.y * 0.25,
      0.02
    );
  });

  return (
    <points ref={pointsRef} scale={1.8}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(_working), 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#7aa028"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.85}
      />
    </points>
  );
}

function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-accent/20 blur-3xl animate-pulse" />
    </div>
  );
}

interface SceneProps {
  scrollProgress?: MutableRefObject<number>;
}

export default function Scene({ scrollProgress }: SceneProps) {
  const [hasWebGL] = useState(() => checkWebGL());
  const [hasError, setHasError] = useState(false);

  if (!hasWebGL || hasError) {
    return <SceneFallback />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
      }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          setHasError(true);
        });
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#7aa028" />
        <pointLight position={[-3, -2, 4]} intensity={0.3} color="#ffffff" />
        <Blob scrollProgress={scrollProgress} />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
