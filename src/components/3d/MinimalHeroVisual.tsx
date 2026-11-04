import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Small, quiet hero sculpture — one render loop, paused when off screen. */
export const MinimalHeroVisual: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let frameId = 0;
    let visible = false;
    let disposed = false;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(0, 0, 5.6);

    const sculpture = new THREE.Group();
    scene.add(sculpture);

    const red = new THREE.MeshPhysicalMaterial({
      color: '#d51f16',
      metalness: 0.52,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const chrome = new THREE.MeshStandardMaterial({ color: '#c7cbd0', metalness: 0.94, roughness: 0.16 });
    const dark = new THREE.MeshStandardMaterial({ color: '#17191d', metalness: 0.78, roughness: 0.24 });

    const core = new THREE.Mesh(new THREE.TorusKnotGeometry(0.84, 0.25, 170, 24, 2, 3), red);
    core.rotation.set(0.5, 0.2, -0.25);
    sculpture.add(core);

    const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.012, 8, 140), chrome);
    ringA.rotation.set(1.05, 0.2, -0.35);
    sculpture.add(ringA);

    const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.008, 8, 140), dark);
    ringB.rotation.set(0.25, 1.2, 0.45);
    sculpture.add(ringB);

    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.095, 24, 16), chrome);
    bead.position.set(1.58, 0.35, 0.12);
    sculpture.add(bead);

    scene.add(new THREE.AmbientLight('#ffffff', 1.15));
    const key = new THREE.DirectionalLight('#ffffff', 3.6);
    key.position.set(3, 4, 5);
    scene.add(key);
    const redLight = new THREE.PointLight('#d51f16', 24, 7);
    redLight.position.set(-2.5, -1.3, 2.7);
    scene.add(redLight);

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: window.devicePixelRatio < 2, powerPreference: 'low-power' });
      renderer.setClearColor('#080808', 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      mount.appendChild(renderer.domElement);
    } catch {
      mount.dataset.webgl = 'unavailable';
      return () => {
        core.geometry.dispose();
        ringA.geometry.dispose();
        ringB.geometry.dispose();
        bead.geometry.dispose();
        red.dispose();
        chrome.dispose();
        dark.dispose();
      };
    }

    const resize = () => {
      if (!renderer) return;
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const pointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 0.32;
      targetY = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * -0.24;
    };
    const pointerLeave = () => { targetX = 0; targetY = 0; };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();
    const draw = () => {
      frameId = 0;
      if (!renderer || disposed || !visible) return;
      const elapsed = clock.getElapsedTime();
      pointerX = THREE.MathUtils.damp(pointerX, targetX, 3.5, 1 / 60);
      pointerY = THREE.MathUtils.damp(pointerY, targetY, 3.5, 1 / 60);
      sculpture.rotation.x = pointerY + (reducedMotion ? 0 : Math.sin(elapsed * 0.3) * 0.035);
      sculpture.rotation.y = pointerX + (reducedMotion ? 0 : elapsed * 0.1);
      sculpture.rotation.z = reducedMotion ? 0 : Math.sin(elapsed * 0.2) * 0.02;
      ringA.rotation.z = reducedMotion ? -0.35 : -0.35 + elapsed * 0.05;
      ringB.rotation.x = reducedMotion ? 0.25 : 0.25 + elapsed * 0.035;
      bead.position.set(Math.cos(elapsed * (reducedMotion ? 0 : 0.18)) * 1.58, 0.35 + Math.sin(elapsed * (reducedMotion ? 0 : 0.18)) * 0.12, 0.12);
      renderer.render(scene, camera);
      if (!reducedMotion) frameId = window.requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frameId) frameId = window.requestAnimationFrame(draw);
      if (!visible && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    }, { threshold: 0.02 });

    resize();
    observer.observe(mount);
    window.addEventListener('resize', resize, { passive: true });
    mount.addEventListener('pointermove', pointerMove, { passive: true });
    mount.addEventListener('pointerleave', pointerLeave, { passive: true });

    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener('resize', resize);
      mount.removeEventListener('pointermove', pointerMove);
      mount.removeEventListener('pointerleave', pointerLeave);
      if (frameId) window.cancelAnimationFrame(frameId);
      sculpture.traverse((object) => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
      });
      red.dispose();
      chrome.dispose();
      dark.dispose();
      renderer?.dispose();
      if (renderer?.domElement && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="minimal-hero-visual relative mx-auto aspect-square w-full max-w-[520px]" aria-label="Abstract red and chrome 3D sculpture">
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(213,31,22,0.18),transparent_68%)] blur-3xl" />
      <div ref={mountRef} className="relative z-10 h-full w-full" />
      <div className="absolute bottom-[14%] left-[12%] h-px w-[76%] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute right-[8%] top-[15%] h-2 w-2 rounded-full bg-[#d51f16] shadow-[0_0_18px_rgba(213,31,22,0.9)]" />
      <div className="absolute bottom-[8%] left-[8%] text-[9px] font-mono uppercase tracking-[0.22em] text-neutral-600">RDS / Digital form study</div>
    </div>
  );
};

export default MinimalHeroVisual;
