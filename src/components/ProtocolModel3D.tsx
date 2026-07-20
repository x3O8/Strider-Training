"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function ProtocolModel3D({
  scrollProgress,
  cinematic = false,
}: {
  scrollProgress: MotionValue<number>;
  cinematic?: boolean;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(cinematic ? 28 : 32, 1, 0.01, 100);
    camera.position.set(0, 0.1, cinematic ? 2.6 : 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = cinematic ? 0.66 : 0.6;
    renderer.domElement.setAttribute(
      "aria-label",
      cinematic
        ? "Strider protocol model viewed by an orbiting camera controlled by page scroll"
        : "Strider protocol model rotating with page scroll"
    );
    mount.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const studioEnvironment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = studioEnvironment;
    pmremGenerator.dispose();

    const modelPivot = new THREE.Group();
    scene.add(modelPivot);

    scene.add(new THREE.HemisphereLight(0xc7cfdd, 0x020202, cinematic ? 0.48 : 0.38));

    const keyLight = new THREE.DirectionalLight(0xe8ebf0, cinematic ? 1.55 : 1.35);
    keyLight.position.set(3.5, 4.5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x64769e, cinematic ? 1.05 : 0.8);
    rimLight.position.set(-4, 1.5, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xcbd3df, cinematic ? 0.9 : 0.7, 10);
    fillLight.position.set(0, -2.5, 3);
    scene.add(fillLight);

    let disposed = false;
    let modelRoot: THREE.Object3D | null = null;
    let normalizedHeight = 1.7;

    const loader = new GLTFLoader();
    loader.load(
      "/protocol.glb",
      (gltf) => {
        if (disposed) return;

        modelRoot = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(modelRoot);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z) || 1;
        const normalizedScale = (cinematic ? 2.95 : 2.65) / maxDimension;

        modelRoot.scale.setScalar(normalizedScale);
        modelRoot.position.copy(center).multiplyScalar(-normalizedScale);
        modelRoot.rotation.x = -0.04;
        normalizedHeight = size.y * normalizedScale;

        modelRoot.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.color.multiplyScalar(cinematic ? 0.76 : 0.68);
              material.roughness = Math.min(material.roughness, cinematic ? 0.32 : 0.36);
              material.envMapIntensity = cinematic ? 0.52 : 0.42;
              material.needsUpdate = true;
            }
          });
        });

        modelPivot.add(modelRoot);
        setLoaded(true);
      },
      undefined,
      () => {
        if (!disposed) setFailed(true);
      }
    );

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
      camera.aspect = Math.max(width, 1) / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    const cameraTarget = new THREE.Vector3();
    let smoothedProgress = scrollProgress.get();
    let idleRotation = 0;
    let animationFrame = 0;

    const render = () => {
      animationFrame = window.requestAnimationFrame(render);
      const delta = Math.min(clock.getDelta(), 0.05);
      const targetProgress = scrollProgress.get();
      smoothedProgress = THREE.MathUtils.damp(smoothedProgress, targetProgress, cinematic ? 5.2 : 7, delta);

      if (!reducedMotion && !cinematic) idleRotation += delta * 0.025;

      if (cinematic) {
        const easedProgress = THREE.MathUtils.smoothstep(smoothedProgress, 0, 1);
        const topFocus = normalizedHeight * 0.34;
        const bottomFocus = normalizedHeight * -0.34;
        const focusY = THREE.MathUtils.lerp(topFocus, bottomFocus, easedProgress);
        const orbitAngle = -0.42 + easedProgress * Math.PI * 2.16;
        const pullBack = THREE.MathUtils.smoothstep(easedProgress, 0, 0.2);
        const radius = THREE.MathUtils.lerp(2.5, 3.25, pullBack);
        const cameraY = focusY + THREE.MathUtils.lerp(0.16, -0.1, easedProgress);

        camera.position.set(
          Math.sin(orbitAngle) * radius,
          cameraY,
          Math.cos(orbitAngle) * radius
        );
        cameraTarget.set(0, focusY, 0);
        camera.lookAt(cameraTarget);
        modelPivot.rotation.y = 0;
      } else {
        modelPivot.rotation.y = reducedMotion ? 0 : idleRotation + smoothedProgress * Math.PI * 1.5;
      }

      renderer.render(scene, camera);
    };
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      studioEnvironment.dispose();

      if (modelRoot) {
        modelRoot.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;
          child.geometry?.dispose();
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material) => {
            Object.values(material).forEach((value) => {
              if (value instanceof THREE.Texture) value.dispose();
            });
            material.dispose();
          });
        });
      }

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [cinematic, scrollProgress]);

  return (
    <div ref={mountRef} className="absolute inset-0">
      {!loaded && !failed && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.35em] text-white/35">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />
            Loading model
          </div>
        </div>
      )}
      {failed && (
        <div className="absolute inset-0 z-10 flex items-center justify-center text-[9px] uppercase tracking-[0.3em] text-white/35">
          Model unavailable
        </div>
      )}
    </div>
  );
}
