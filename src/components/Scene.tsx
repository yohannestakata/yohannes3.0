"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
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

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;

    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.z = t * 0.06;

    // Smooth mouse following
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      pointer.x * 0.8,
      0.03
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      pointer.y * 0.5,
      0.03
    );
  });

  return (
    <mesh ref={meshRef} scale={2.4}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color="#c8ee44"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.9}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-accent/20 blur-3xl animate-pulse" />
    </div>
  );
}

export default function Scene() {
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
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -2, 2]} intensity={0.5} color="#c8ee44" />
        <Blob />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
