/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Interactive 3D Hero Scene for Raphics Digital Solutions.
 * Built with procedural Three.js geometry inspired by the official Raphics logo:
 * - High-gloss car-paint red geometric core blocks (#D51F16)
 * - Brushed chrome orbital rings and precision beveled metallic brackets
 * - Studio PBR lighting with procedural RoomEnvironment reflection
 * - Collapsible minimal bottom dock with zero viewport occlusion
 * - Software-WebGL detection guard for headless / low-spec devices
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Eye, Layers, RotateCw, Maximize2, Minimize2 } from 'lucide-react';

// Pre-allocated math objects to avoid garbage collection inside render loop
const _targetRotation = new THREE.Vector2(0, 0);
const _currentRotation = new THREE.Vector2(0, 0);
const _pointer = new THREE.Vector2(0, 0);

export const HeroScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isExploded, setIsExploded] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  // References to communicate with Three.js loop without re-triggering scene mount
  const stateRef = useRef({
    exploded: false,
    wireframe: false,
    autoRotate: true,
  });

  useEffect(() => {
    stateRef.current.exploded = isExploded;
  }, [isExploded]);

  useEffect(() => {
    stateRef.current.wireframe = isWireframe;
  }, [isWireframe]);

  useEffect(() => {
    stateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL Guard (read from GPU renderer string, not user agent)
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Scene, Camera, and Renderer Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = null; // transparent to allow rich CSS background
    scene.fog = new THREE.FogExp2(0x080808, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 6.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL init failed:', e);
      setWebGlSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map (RoomEnvironment) for true metallic / glossy reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    // Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // Intense Red Accent Rim Light (#D51F16)
    const rimLightRed = new THREE.DirectionalLight(0xd51f16, 5.0);
    rimLightRed.position.set(-5, -2, -3);
    scene.add(rimLightRed);

    // Cyan/Cool Fill Light
    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 0.8);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Ambient Hemisphere Light
    const hemiLight = new THREE.HemisphereLight(0x222222, 0x080808, 1.2);
    scene.add(hemiLight);

    // 5. Materials
    // Primary Red: Deep glossy car-paint red (#D51F16)
    const redGlossyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd51f16,
      metalness: 0.25,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    // Secondary Chrome Metal
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.18,
    });

    // Dark Titanium Chassis
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x181818,
      metalness: 0.85,
      roughness: 0.35,
    });

    // Glowing Red Energy Core
    const glowingCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3b30,
    });

    // 6. Build the 3D Procedural Logo Subject (Hierarchical THREE.Group)
    // Modeled after the iconic geometric square & cut motif of Raphics Digital Solutions
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Sub-parts array for exploded view animations
    interface PartItem {
      mesh: THREE.Object3D;
      basePos: THREE.Vector3;
      explodedPos: THREE.Vector3;
    }
    const parts: PartItem[] = [];

    // Part 1: Top-Left Primary Cube
    const cubeGeo1 = new THREE.BoxGeometry(0.72, 0.72, 0.32);
    const mesh1 = new THREE.Mesh(cubeGeo1, redGlossyMaterial);
    mesh1.position.set(-0.48, 0.48, 0);
    mesh1.castShadow = true;
    masterGroup.add(mesh1);
    parts.push({
      mesh: mesh1,
      basePos: new THREE.Vector3(-0.48, 0.48, 0),
      explodedPos: new THREE.Vector3(-0.95, 0.95, 0.4),
    });

    // Part 2: Top-Right Extended Horizontal Segment
    const cubeGeo2 = new THREE.BoxGeometry(1.0, 0.72, 0.32);
    const mesh2 = new THREE.Mesh(cubeGeo2, redGlossyMaterial);
    mesh2.position.set(0.48, 0.48, 0);
    mesh2.castShadow = true;
    masterGroup.add(mesh2);
    parts.push({
      mesh: mesh2,
      basePos: new THREE.Vector3(0.48, 0.48, 0),
      explodedPos: new THREE.Vector3(0.95, 0.95, -0.3),
    });

    // Part 3: Bottom-Left Anchor Cube
    const cubeGeo3 = new THREE.BoxGeometry(0.72, 0.72, 0.32);
    const mesh3 = new THREE.Mesh(cubeGeo3, redGlossyMaterial);
    mesh3.position.set(-0.48, -0.48, 0);
    mesh3.castShadow = true;
    masterGroup.add(mesh3);
    parts.push({
      mesh: mesh3,
      basePos: new THREE.Vector3(-0.48, -0.48, 0),
      explodedPos: new THREE.Vector3(-0.95, -0.95, -0.4),
    });

    // Part 4: Dynamic Angled Chevron (Representing the diagonal energy slash)
    const chevronGeo = new THREE.ConeGeometry(0.55, 0.9, 4);
    chevronGeo.rotateY(Math.PI / 4);
    chevronGeo.rotateZ(-Math.PI / 4);
    const mesh4 = new THREE.Mesh(chevronGeo, redGlossyMaterial);
    mesh4.position.set(0.4, -0.4, 0);
    mesh4.scale.set(0.85, 0.85, 0.4);
    mesh4.castShadow = true;
    masterGroup.add(mesh4);
    parts.push({
      mesh: mesh4,
      basePos: new THREE.Vector3(0.4, -0.4, 0),
      explodedPos: new THREE.Vector3(0.95, -0.95, 0.45),
    });

    // Part 5: Glowing Inner Energy Cube (Centered)
    const coreGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const meshCore = new THREE.Mesh(coreGeo, glowingCoreMaterial);
    meshCore.position.set(0, 0, 0);
    masterGroup.add(meshCore);
    parts.push({
      mesh: meshCore,
      basePos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, 0, 0),
    });

    // Part 6: Metallic Chrome Outer Gimbal Ring (Secondary read)
    const ringGeo1 = new THREE.TorusGeometry(1.65, 0.024, 16, 64);
    const meshRing1 = new THREE.Mesh(ringGeo1, chromeMaterial);
    meshRing1.rotation.x = Math.PI / 3;
    masterGroup.add(meshRing1);
    parts.push({
      mesh: meshRing1,
      basePos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, 0, 0.6),
    });

    // Part 7: Metallic Titanium Counter Ring
    const ringGeo2 = new THREE.TorusGeometry(1.9, 0.016, 16, 64);
    const meshRing2 = new THREE.Mesh(ringGeo2, titaniumMaterial);
    meshRing2.rotation.y = Math.PI / 3.5;
    masterGroup.add(meshRing2);
    parts.push({
      mesh: meshRing2,
      basePos: new THREE.Vector3(0, 0, 0),
      explodedPos: new THREE.Vector3(0, 0, -0.6),
    });

    // Part 8: Orbiting Geometric Satellites (Accent detail)
    const satGroup = new THREE.Group();
    masterGroup.add(satGroup);
    const satCount = 6;
    const satGeo = new THREE.OctahedronGeometry(0.08, 0);
    for (let i = 0; i < satCount; i++) {
      const angle = (i / satCount) * Math.PI * 2;
      const dist = 2.15;
      const satMesh = new THREE.Mesh(satGeo, i % 2 === 0 ? redGlossyMaterial : chromeMaterial);
      satMesh.position.set(Math.cos(angle) * dist, Math.sin(angle) * 0.4, Math.sin(angle) * dist);
      satGroup.add(satMesh);
    }

    // Part 9: Floating Ambient Particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd51f16,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Contact Grounding Soft Shadow
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      grad.addColorStop(0.5, 'rgba(213, 31, 22, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.6;
    scene.add(shadowMesh);

    // 7. Mouse Interaction Listeners
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      _pointer.set(x, y);
      _targetRotation.x = y * 0.45;
      _targetRotation.y = x * 0.75;
    };

    window.addEventListener('pointermove', handlePointerMove);

    // 8. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop with Exponential Damping & Software Gl Pacing
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      stateRef.current.autoRotate = false;
      setAutoRotate(false);
    }

    // Touch event handling for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        _pointer.set(x, y);
        _targetRotation.x = y * 0.45;
        _targetRotation.y = x * 0.75;
      }
    };
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // IntersectionObserver to pause expensive render loop when offscreen
    let isSceneVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isSceneVisible;
        isSceneVisible = entry.isIntersecting;
        if (!wasVisible && isSceneVisible) {
          clock.getDelta(); // reset delta to prevent sudden rotation jumps
          if (isSoftwareGl) afterDraw(tick);
          else frameId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    function tick() {
      if (!isSceneVisible) return; // Completely pause loop when scrolled offscreen

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse rotation damping
      _currentRotation.x = THREE.MathUtils.damp(_currentRotation.x, _targetRotation.x, 3.5, delta);
      _currentRotation.y = THREE.MathUtils.damp(_currentRotation.y, _targetRotation.y, 3.5, delta);

      // Auto rotation base
      const autoY = stateRef.current.autoRotate ? elapsed * 0.4 : 0;
      masterGroup.rotation.y = autoY + _currentRotation.y;
      masterGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.08 + _currentRotation.x;
      masterGroup.rotation.z = Math.cos(elapsed * 0.4) * 0.05;

      // Orbiting satellites and gimbal rings
      meshRing1.rotation.z = elapsed * 0.3;
      meshRing2.rotation.z = -elapsed * 0.25;
      satGroup.rotation.y = -elapsed * 0.6;

      // Floating gentle bobbing
      masterGroup.position.y = Math.sin(elapsed * 1.2) * 0.08;

      // Pulse the central energy core
      const coreScale = 1.0 + Math.sin(elapsed * 4.0) * 0.15;
      meshCore.scale.set(coreScale, coreScale, coreScale);

      // Exploded View smooth interpolation
      const targetFactor = stateRef.current.exploded ? 1.0 : 0.0;
      parts.forEach((item) => {
        const curPos = item.mesh.position;
        const dest = stateRef.current.exploded ? item.explodedPos : item.basePos;
        curPos.x = THREE.MathUtils.damp(curPos.x, dest.x, 4.0, delta);
        curPos.y = THREE.MathUtils.damp(curPos.y, dest.y, 4.0, delta);
        curPos.z = THREE.MathUtils.damp(curPos.z, dest.z, 4.0, delta);
      });

      // Wireframe toggle update
      redGlossyMaterial.wireframe = stateRef.current.wireframe;
      chromeMaterial.wireframe = stateRef.current.wireframe;
      titaniumMaterial.wireframe = stateRef.current.wireframe;

      // Render scene
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    // 10. Clean-up
    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }

      // Dispose geometries & materials
      cubeGeo1.dispose();
      cubeGeo2.dispose();
      cubeGeo3.dispose();
      chevronGeo.dispose();
      coreGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      satGeo.dispose();
      particleGeo.dispose();
      shadowGeo.dispose();
      redGlossyMaterial.dispose();
      chromeMaterial.dispose();
      titaniumMaterial.dispose();
      glowingCoreMaterial.dispose();
      particleMat.dispose();
      shadowMat.dispose();
      shadowTex.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[540px] lg:min-h-[640px] flex items-center justify-center select-none overflow-hidden">
      {/* 3D WebGL Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
      />

      {/* Fallback in case WebGL is unavailable */}
      {!webGlSupported && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/80 z-10">
          <div className="w-24 h-24 rounded-2xl bg-[#D51F16]/20 border border-[#D51F16]/40 flex items-center justify-center mb-4">
            <span className="text-[#D51F16] font-extrabold text-2xl font-mono">RDS</span>
          </div>
          <p className="text-neutral-400 text-sm max-w-sm">
            Interactive 3D geometry rendered in high-definition canvas.
          </p>
        </div>
      )}

      {/* Minimal Top-Right Spatial Watermark */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/60 border border-neutral-800 text-[11px] font-mono text-neutral-400 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D51F16]" />
        <span>THREE.JS PBR ENGINE</span>
      </div>

      {/* Ergonomic Unified Bottom Control Dock (skill directive: bottom centered, collapsible) */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${
          isDockCollapsed ? 'translate-y-12 opacity-40 hover:opacity-100' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 shadow-2xl backdrop-blur-md">
          {/* Collapse Toggle */}
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
            title={isDockCollapsed ? 'Expand 3D Controls' : 'Hide Controls (Zen Mode)'}
          >
            {isDockCollapsed ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>

          {!isDockCollapsed && (
            <>
              <div className="h-4 w-px bg-neutral-800" />

              {/* Exploded Architecture Toggle */}
              <button
                onClick={() => setIsExploded(!isExploded)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isExploded
                    ? 'bg-[#D51F16] text-white shadow-[0_0_15px_rgba(213,31,22,0.4)]'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Explode</span>
              </button>

              {/* Wireframe Toggle */}
              <button
                onClick={() => setIsWireframe(!isWireframe)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isWireframe
                    ? 'bg-[#D51F16] text-white shadow-[0_0_15px_rgba(213,31,22,0.4)]'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Wireframe</span>
              </button>

              {/* Auto-Rotation Toggle */}
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  autoRotate
                    ? 'text-white bg-neutral-800/80'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Rotate</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroScene;
