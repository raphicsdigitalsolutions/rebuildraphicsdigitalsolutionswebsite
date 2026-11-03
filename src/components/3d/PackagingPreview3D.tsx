/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Interactive 3D Packaging & Bottle Visualizer for Raphics Creative Studio.
 * Allows users to inspect product packaging in real-time 3D, rotate the container,
 * and switch luxury finishes (Amber Glass, Frosted Matte, Glossy Obsidian, Clinical White).
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sparkles, RefreshCw } from 'lucide-react';

type BottleFinish = 'amber' | 'matte-black' | 'frosted' | 'clinical-white';

interface FinishOption {
  id: BottleFinish;
  label: string;
  colorHex: number;
  roughness: number;
  metalness: number;
  transmission: number;
  clearcoat: number;
  swatchClass: string;
}

const FINISHES: FinishOption[] = [
  {
    id: 'amber',
    label: 'Amber Apothecary',
    colorHex: 0x854d0e,
    roughness: 0.15,
    metalness: 0.1,
    transmission: 0.85,
    clearcoat: 1.0,
    swatchClass: 'bg-amber-600',
  },
  {
    id: 'matte-black',
    label: 'Obsidian Matte',
    colorHex: 0x171717,
    roughness: 0.65,
    metalness: 0.2,
    transmission: 0.0,
    clearcoat: 0.0,
    swatchClass: 'bg-neutral-900 border border-neutral-700',
  },
  {
    id: 'frosted',
    label: 'Frosted Glass',
    colorHex: 0xe2e8f0,
    roughness: 0.35,
    metalness: 0.05,
    transmission: 0.75,
    clearcoat: 0.5,
    swatchClass: 'bg-slate-200',
  },
  {
    id: 'clinical-white',
    label: 'Clinical Pearl',
    colorHex: 0xf8fafc,
    roughness: 0.18,
    metalness: 0.3,
    transmission: 0.0,
    clearcoat: 0.9,
    swatchClass: 'bg-white',
  },
];

export const PackagingPreview3D: React.FC<{ productName?: string }> = ({
  productName = "NutraLife Vitamin Formulation",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeFinish, setActiveFinish] = useState<BottleFinish>('amber');
  const [isRotating, setIsRotating] = useState(true);

  const finishRef = useRef<BottleFinish>(activeFinish);
  finishRef.current = activeFinish;

  const rotateRef = useRef(isRotating);
  rotateRef.current = isRotating;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.06);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.3, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Environment reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const redRim = new THREE.DirectionalLight(0xd51f16, 3.2);
    redRim.position.set(-3, 0, -2);
    scene.add(redRim);

    const softFill = new THREE.HemisphereLight(0x333333, 0x111111, 1.0);
    scene.add(softFill);

    // Group for whole bottle assembly
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);

    // 1. Bottle Body Geometry & Physical Material
    const bodyGeo = new THREE.CylinderGeometry(0.75, 0.75, 1.6, 48);
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: FINISHES[0].colorHex,
      roughness: FINISHES[0].roughness,
      metalness: FINISHES[0].metalness,
      clearcoat: FINISHES[0].clearcoat,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bottleGroup.add(bodyMesh);

    // 2. Bottle Shoulder (beveled taper)
    const shoulderGeo = new THREE.CylinderGeometry(0.42, 0.75, 0.35, 48);
    const shoulderMesh = new THREE.Mesh(shoulderGeo, bodyMat);
    shoulderMesh.position.y = 0.97;
    bottleGroup.add(shoulderMesh);

    // 3. Bottle Neck
    const neckGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.28, 48);
    const neckMesh = new THREE.Mesh(neckGeo, bodyMat);
    neckMesh.position.y = 1.25;
    bottleGroup.add(neckMesh);

    // 4. Luxury Dropper / Cap (Metallic Gold & Matte Rubber)
    const capGoldMat = new THREE.MeshStandardMaterial({
      color: 0xcca04e,
      metalness: 0.9,
      roughness: 0.2,
    });
    const capCollarGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.35, 48);
    const capCollarMesh = new THREE.Mesh(capCollarGeo, capGoldMat);
    capCollarMesh.position.y = 1.48;
    bottleGroup.add(capCollarMesh);

    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f1f,
      roughness: 0.7,
      metalness: 0.1,
    });
    const bulbGeo = new THREE.SphereGeometry(0.3, 32, 24);
    bulbGeo.scale(1, 1.4, 1);
    const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
    bulbMesh.position.y = 1.85;
    bottleGroup.add(bulbMesh);

    // 5. Wrap-around Label with procedural branding graphic
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 1024;
    labelCanvas.height = 512;
    const ctx = labelCanvas.getContext('2d');
    if (ctx) {
      // Dark slate background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 1024, 512);

      // Gold accent border
      ctx.strokeStyle = '#D51F16';
      ctx.lineWidth = 8;
      ctx.strokeRect(30, 30, 964, 452);

      // Brand logo badge
      ctx.fillStyle = '#D51F16';
      ctx.fillRect(80, 80, 50, 50);

      // Label typography
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText('RAPHICS LABS', 150, 120);

      ctx.font = '28px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('NUTRACEUTICAL ESSENCE 500mg', 150, 160);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'italic 24px serif';
      ctx.fillText('Clinical 3D Product Visualization', 80, 240);

      // Supplement facts micro-grid simulation
      ctx.fillStyle = '#334155';
      ctx.fillRect(80, 300, 380, 140);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('SUPPLEMENT FACTS', 100, 335);
      ctx.font = '16px monospace';
      ctx.fillText('Serving Size: 2 Gummies / Daily', 100, 365);
      ctx.fillText('Vitamin C, D3, Zinc, Biotin', 100, 395);
      ctx.fillText('Batch: #RDS-9482 / Exp: 2028', 100, 420);

      // Barcode simulation
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 30; i++) {
        const w = (i % 3 === 0 ? 5 : 2);
        ctx.fillRect(680 + i * 8, 320, w, 80);
      }
    }
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    labelTexture.colorSpace = THREE.SRGBColorSpace;

    const labelGeo = new THREE.CylinderGeometry(0.755, 0.755, 1.25, 48, 1, true, 0, Math.PI * 1.55);
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.35,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.y = -0.05;
    labelMesh.rotation.y = Math.PI / 4;
    bottleGroup.add(labelMesh);

    // Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.85;
    scene.add(shadow);

    bottleGroup.position.y = -0.15;

    // Pointer Drag Interaction
    let isDragging = false;
    let prevMouseX = 0;

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const handlePointerMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      bottleGroup.rotation.y += deltaX * 0.015;
      prevMouseX = e.clientX;
    };
    const handlePointerUp = () => {
      isDragging = false;
    };

    // Touch Drag Interaction
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      bottleGroup.rotation.y += deltaX * 0.015;
      prevMouseX = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // IntersectionObserver to pause loop when scrolled off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          clock.getDelta();
          animId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return; // Pause completely when not visible

      const delta = clock.getDelta();

      // Update finish properties smoothly if user toggled
      const currentFinishData = FINISHES.find((f) => f.id === finishRef.current);
      if (currentFinishData) {
        bodyMat.color.setHex(currentFinishData.colorHex);
        bodyMat.roughness = currentFinishData.roughness;
        bodyMat.metalness = currentFinishData.metalness;
        bodyMat.clearcoat = currentFinishData.clearcoat;
      }

      if (rotateRef.current && !isDragging) {
        bottleGroup.rotation.y += delta * 0.45;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);

      bodyGeo.dispose();
      bodyMat.dispose();
      shoulderGeo.dispose();
      neckGeo.dispose();
      capCollarGeo.dispose();
      capGoldMat.dispose();
      bulbGeo.dispose();
      bulbMat.dispose();
      labelGeo.dispose();
      labelMat.dispose();
      labelTexture.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-3xl bg-neutral-950/90 border border-neutral-800/80 overflow-hidden flex flex-col shadow-2xl">
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate packaging in 3D"
      />

      {/* Top Overlay Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-[#D51F16]" />
        <span className="text-xs font-mono text-neutral-300 uppercase tracking-wider">
          3D Packaging Engine
        </span>
      </div>

      {/* Bottom Material Finishes Switcher Dock */}
      <div className="absolute bottom-4 inset-x-4 flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-2xl bg-neutral-900/85 border border-neutral-800/90 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-neutral-400 uppercase mr-1">Finish:</span>
          {FINISHES.map((finish) => (
            <button
              key={finish.id}
              onClick={() => setActiveFinish(finish.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                activeFinish === finish.id
                  ? 'bg-neutral-800 text-white border border-[#D51F16]/50 shadow-[0_0_10px_rgba(213,31,22,0.3)]'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${finish.swatchClass}`} />
              <span className="hidden sm:inline">{finish.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
            isRotating ? 'text-[#D51F16] bg-[#D51F16]/10' : 'text-neutral-400 hover:text-neutral-200'
          }`}
          title="Toggle Turntable Rotation"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span className="text-[11px] font-mono">Turntable</span>
        </button>
      </div>
    </div>
  );
};

export default PackagingPreview3D;
