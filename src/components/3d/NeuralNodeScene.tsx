/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Interactive 3D Neural Network & Data Graph for Raphics AI & Automation Lab.
 * Renders glowing vector nodes, interconnected synaptic pathways, and data impulses.
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Activity, Zap } from 'lucide-react';

export const NeuralNodeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePipeline, setActivePipeline] = useState<'rag' | 'agent' | 'voice'>('rag');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080808, 0.05);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Generate neural nodes in 3D spherical / layered structure
    const nodeCount = 38;
    const nodes: THREE.Vector3[] = [];
    const nodeColors: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 1.8 + (Math.random() - 0.5) * 0.4;

      const pos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      nodes.push(pos);
      nodeColors.push(i % 4 === 0 ? 0xd51f16 : 0xffffff);
    }

    // Node spheres
    const sphereGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const nodeMeshes: THREE.Mesh[] = [];

    nodes.forEach((pos, idx) => {
      const isRed = nodeColors[idx] === 0xd51f16;
      const mat = new THREE.MeshBasicMaterial({
        color: isRed ? 0xd51f16 : 0xcccccc,
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.copy(pos);
      group.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Connecting synaptic lines
    const linePositions: number[] = [];
    const maxDist = 1.35;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < maxDist) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.45,
    });
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lineMesh);

    // Glowing core cluster
    const coreGeo = new THREE.IcosahedronGeometry(0.35, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xd51f16,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Mouse Tracking
    let targetX = 0;
    let targetY = 0;
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.3;
    };
    window.addEventListener('pointermove', handlePointerMove);

    // IntersectionObserver to pause when offscreen
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
      const elapsed = clock.getElapsedTime();

      group.rotation.y += delta * 0.25;
      group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetY, 4.0, delta);
      group.rotation.z = THREE.MathUtils.damp(group.rotation.z, -targetX, 4.0, delta);

      coreMesh.rotation.y = -elapsed * 0.8;
      coreMesh.rotation.x = elapsed * 0.5;

      // Pulse nodes
      nodeMeshes.forEach((mesh, idx) => {
        const pulse = 1 + Math.sin(elapsed * 3 + idx * 0.5) * 0.25;
        mesh.scale.set(pulse, pulse, pulse);
      });

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
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);

      sphereGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] rounded-3xl bg-neutral-950/80 border border-neutral-800/80 overflow-hidden flex flex-col shadow-2xl">
      {/* Three.js Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-crosshair" />

      {/* Top Telemetry Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
          <Cpu className="w-3.5 h-3.5 text-[#D51F16]" />
          <span className="text-xs font-mono text-neutral-300">NEURAL GRAPH ENGINE</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-md text-[11px] font-mono text-emerald-400">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>INFERENCE ACTIVE</span>
        </div>
      </div>

      {/* Bottom Pipeline Selector */}
      <div className="absolute bottom-4 inset-x-4 flex items-center justify-between p-2 rounded-2xl bg-neutral-900/85 border border-neutral-800 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActivePipeline('rag')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all ${
              activePipeline === 'rag'
                ? 'bg-[#D51F16] text-white shadow-[0_0_12px_rgba(213,31,22,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            RAG Pipeline
          </button>
          <button
            onClick={() => setActivePipeline('agent')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all ${
              activePipeline === 'agent'
                ? 'bg-[#D51F16] text-white shadow-[0_0_12px_rgba(213,31,22,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Agent Loop
          </button>
          <button
            onClick={() => setActivePipeline('voice')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all ${
              activePipeline === 'voice'
                ? 'bg-[#D51F16] text-white shadow-[0_0_12px_rgba(213,31,22,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Voice Stream
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
          <Zap className="w-3.5 h-3.5 text-[#D51F16]" />
          <span>Vector Nodes: 38</span>
        </div>
      </div>
    </div>
  );
};

export default NeuralNodeScene;
