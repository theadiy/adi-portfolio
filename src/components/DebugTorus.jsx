import React from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

export default function DebugTorus() {
  return (
    <div className="h-64 sm:h-80 md:h-[26rem] rounded-xl border border-emerald-400/30 bg-black/40">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <color attach="background" args={["#020817"]} />
        <mesh>
          <torusKnotGeometry args={[1, 0.35, 120, 16]} />
          <meshBasicMaterial wireframe color={"#10b981"} />
        </mesh>
      </Canvas>
    </div>
  );
}
