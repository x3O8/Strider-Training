"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { preloadProtocolModelBuffer } from "@/lib/protocolModelAsset";

let protocolScenePromise: Promise<GLTF> | null = null;
let protocolRenderReady = false;
let resolveProtocolRenderReady: (() => void) | null = null;
let protocolRenderReadyPromise = new Promise<void>((resolve) => {
  resolveProtocolRenderReady = resolve;
});

export function waitForProtocolRenderReady() {
  return protocolRenderReady ? Promise.resolve() : protocolRenderReadyPromise;
}

function signalProtocolRenderReady() {
  if (protocolRenderReady) return;
  protocolRenderReady = true;
  resolveProtocolRenderReady?.();
  resolveProtocolRenderReady = null;
}

function resetProtocolRenderReady() {
  protocolRenderReady = false;
  protocolRenderReadyPromise = new Promise<void>((resolve) => {
    resolveProtocolRenderReady = resolve;
  });
}

export function preloadProtocolScene() {
  if (protocolScenePromise) return protocolScenePromise;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  dracoLoader.setWorkerLimit(1);

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  protocolScenePromise = preloadProtocolModelBuffer()
    .then((buffer) => loader.parseAsync(buffer, "/"))
    .finally(() => dracoLoader.dispose())
    .catch((error) => {
      protocolScenePromise = null;
      throw error;
    });

  return protocolScenePromise;
}

function clearProtocolSceneCache() {
  protocolScenePromise = null;
}

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

    const compactViewport = window.matchMedia("(max-width: 768px)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio, compactViewport ? 1 : 1.25);
    const renderer = new THREE.WebGLRenderer({
      antialias: !compactViewport && window.devicePixelRatio <= 1.25,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = cinematic ? 0.78 : 0.7;
    renderer.domElement.setAttribute(
      "aria-label",
      cinematic
        ? "Strider protocol model viewed by an orbiting camera controlled by page scroll"
        : "Strider protocol model rotating with page scroll"
    );
    mount.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnvironment = new RoomEnvironment();
    const studioEnvironment = pmremGenerator.fromScene(roomEnvironment, 0.04).texture;
    scene.environment = studioEnvironment;
    roomEnvironment.dispose();
    pmremGenerator.dispose();

    const modelPivot = new THREE.Group();
    scene.add(modelPivot);

    scene.add(new THREE.HemisphereLight(0x8f99aa, 0x000000, cinematic ? 0.3 : 0.24));

    const keyLight = new THREE.DirectionalLight(0xf4f6fa, cinematic ? 2.15 : 1.85);
    keyLight.position.set(3.5, 4.5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7189bd, cinematic ? 1.75 : 1.35);
    rimLight.position.set(-4, 1.5, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xaab4c6, cinematic ? 0.5 : 0.4, 10);
    fillLight.position.set(0, -2.5, 3);
    scene.add(fillLight);

    let disposed = false;
    let modelRoot: THREE.Object3D | null = null;
    let normalizedHeight = 1.7;

    const disposeModelResources = (root: THREE.Object3D) => {
      const disposedMaterials = new Set<THREE.Material>();
      root.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        child.geometry?.dispose();
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => {
          if (disposedMaterials.has(material)) return;
          disposedMaterials.add(material);
          Object.values(material).forEach((value) => {
            if (value instanceof THREE.Texture) value.dispose();
          });
          material.dispose();
        });
      });
    };

    const handleModelLoaded = (gltf: GLTF) => {
        if (disposed) {
          disposeModelResources(gltf.scene);
          clearProtocolSceneCache();
          return;
        }

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

        const adjustedMaterials = new Set<THREE.Material>();
        modelRoot.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material) => {
            if (adjustedMaterials.has(material)) return;
            adjustedMaterials.add(material);
            if (material instanceof THREE.MeshStandardMaterial) {
              material.color.set(cinematic ? 0x05070a : 0x030405);
              material.metalness = cinematic ? 0.76 : 0.68;
              material.roughness = cinematic ? 0.16 : 0.2;
              material.envMapIntensity = cinematic ? 1.18 : 0.95;
              material.emissive.set(0x000000);
              material.needsUpdate = true;
            }
          });
        });

        modelPivot.add(modelRoot);

        // Compile the single model material while the canvas is still
        // offscreen, avoiding a shader-compilation hitch on first reveal.
        renderer.compileAsync(scene, camera).catch(() => undefined).finally(() => {
          if (disposed) return;
          if (animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = 0;
          }
          render(performance.now());
          setLoaded(true);
          signalProtocolRenderReady();
        });
    };
    const handleModelError = () => {
      if (!disposed) {
        setFailed(true);
        signalProtocolRenderReady();
      }
    };

    preloadProtocolScene()
      .then(handleModelLoaded)
      .catch(handleModelError);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
      camera.aspect = Math.max(width, 1) / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      requestRender();
    });
    resizeObserver.observe(mount);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cameraTarget = new THREE.Vector3();
    let smoothedProgress = scrollProgress.get();
    let idleRotation = 0;
    let animationFrame = 0;
    let lastFrameTime = performance.now();

    function requestRender() {
      if (disposed || animationFrame) return;
      animationFrame = window.requestAnimationFrame(render);
    }

    function render(frameTime: number) {
      animationFrame = 0;
      const delta = Math.min((frameTime - lastFrameTime) / 1000, 0.05);
      lastFrameTime = frameTime;
      const targetProgress = scrollProgress.get();
      smoothedProgress = cinematic
        ? targetProgress
        : THREE.MathUtils.damp(smoothedProgress, targetProgress, 7, delta);

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

      // The cinematic camera only renders when scroll progress changes. Keep
      // the standalone variant alive for its requested subtle idle rotation.
      if (!cinematic && !reducedMotion) requestRender();
    }

    const unsubscribeFromProgress = scrollProgress.on("change", requestRender);
    requestRender();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      unsubscribeFromProgress();
      resizeObserver.disconnect();
      studioEnvironment.dispose();

      if (modelRoot) {
        disposeModelResources(modelRoot);
        clearProtocolSceneCache();
      }

      renderer.dispose();
      renderer.domElement.remove();
      resetProtocolRenderReady();
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
