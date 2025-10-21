import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three-stdlib";

/** Center and scale so the longest side == target (smaller target => looks more zoomed out) */
function centerAndUnitScale(object3d, target = 1.05) {
  const box = new THREE.Box3().setFromObject(object3d);
  const size = new THREE.Vector3(), center = new THREE.Vector3();
  box.getSize(size); box.getCenter(center);
  object3d.position.sub(center);
  const s = target / Math.max(size.x, size.y, size.z || 1);
  object3d.scale.setScalar(s);
  return object3d;
}

function ThinWireModel() {
  const obj = useLoader(OBJLoader, "/models/face.obj"); // file in /public/models/face.obj
  const emerald = new THREE.Color("#10b981");
  const dragging = useRef(false);

  // Build a group of LineSegments from WireframeGeometry (thinner look)
  const wireGroup = useMemo(() => {
    // clone + normalize first
    const base = obj.clone(true);
    centerAndUnitScale(base, 1.0);

    const group = new THREE.Group();

    base.traverse((child) => {
      // accept both meshes and raw BufferGeometry nodes
      const geom =
        child.isMesh && child.geometry
          ? child.geometry
          : child.isBufferGeometry
          ? child
          : child.geometry?.isBufferGeometry
          ? child.geometry
          : null;

      if (!geom) return;

      // Ensure normals exist (helps edge calc & culling)
      if (!geom.attributes.normal) geom.computeVertexNormals();

      // WireframeGeometry produces triangle edges (screen-space thinner)
      const wf = new THREE.WireframeGeometry(geom);

      const mat = new THREE.LineBasicMaterial({
        color: emerald,
        transparent: true,
        opacity: 0.1,
        depthTest: true,          // hide back lines behind front faces
        polygonOffset: true,      // avoid z-fighting if you later add fills
        polygonOffsetFactor: -1,
      });
      // NOTE: linewidth is ignored in most browsers; this combo looks thinner.

      const seg = new THREE.LineSegments(wf, mat);
      seg.position.copy(child.position);
      seg.rotation.copy(child.rotation);
      seg.scale.copy(child.scale);
      group.add(seg);
    });

    // Slight upscale (visual trick: makes wires appear thinner)
    group.scale.multiplyScalar(1.5);

    return group;
  }, [obj]);

  // Gentle idle motion (paused while dragging)
  const root = useRef();
  useFrame(({ clock }) => {
    if (!root.current || dragging.current) return;
    const t = clock.getElapsedTime();
    root.current.rotation.y = Math.sin(t * 0.18) * 0.18;
    root.current.rotation.x = Math.cos(t * 0.12) * 0.06;
  });

  return (
    <group ref={root} rotation={[0, 0.25, 0]} position={[0, -0.12, 0]}>
      <primitive object={wireGroup} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        onStart={() => (dragging.current = true)}
        onEnd={() => (dragging.current = false)}
      />
    </group>
  );
}

export default function HeroFaceWireOBJ() {
  return (
    <div className="h-64 sm:h-80 md:h-[26rem] rounded-xl border border-emerald-400/30 bg-black/40 cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.15, 2.6], fov: 35 }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <color attach="background" args={["#020817"]} />
        <ThinWireModel />
      </Canvas>
    </div>
  );
}
