import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** A custom, brand-led folded ribbon sculpture. No demo geometry or external model. */
function createRibbonGeometry(
  curve: THREE.CatmullRomCurve3,
  segments: number,
  width: number,
  thickness: number,
): THREE.BufferGeometry {
  const radialSegments = 20;
  const frames = curve.computeFrenetFrames(segments, false);
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i += 1) {
    const point = curve.getPointAt(i / segments);
    const normal = frames.normals[i];
    const binormal = frames.binormals[i];

    for (let j = 0; j <= radialSegments; j += 1) {
      const angle = (j / radialSegments) * Math.PI * 2;
      const vertex = point.clone()
        .addScaledVector(binormal, Math.cos(angle) * width * 0.5)
        .addScaledVector(normal, Math.sin(angle) * thickness * 0.5);
      positions.push(vertex.x, vertex.y, vertex.z);
      uvs.push(i / segments, j / radialSegments);
    }
  }

  for (let i = 0; i < segments; i += 1) {
    for (let j = 0; j < radialSegments; j += 1) {
      const a = i * (radialSegments + 1) + j;
      const b = a + radialSegments + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function createMonogramCurve() {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.72, -1.18, 0.2),
    new THREE.Vector3(-0.74, -0.48, 0.12),
    new THREE.Vector3(-0.74, 0.7, -0.06),
    new THREE.Vector3(-0.28, 1.05, 0.04),
    new THREE.Vector3(0.42, 0.98, 0.24),
    new THREE.Vector3(0.82, 0.55, 0.18),
    new THREE.Vector3(0.72, 0.12, -0.18),
    new THREE.Vector3(0.22, -0.08, -0.28),
    new THREE.Vector3(-0.4, -0.1, 0.12),
    new THREE.Vector3(0.02, -0.63, 0.52),
    new THREE.Vector3(0.74, -1.12, 0.14),
  ], false, 'centripetal', 0.42);
}

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
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 40);
    camera.position.set(0, 0, 4.65);

    const sculpture = new THREE.Group();
    scene.add(sculpture);

    const ribbonCurve = createMonogramCurve();
    const ribbonMaterial = new THREE.MeshPhysicalMaterial({
      color: '#d51f16',
      metalness: 0.74,
      roughness: 0.19,
      clearcoat: 1,
      clearcoatRoughness: 0.11,
      side: THREE.DoubleSide,
    });
    const ribbon = new THREE.Mesh(createRibbonGeometry(ribbonCurve, 180, 0.38, 0.15), ribbonMaterial);
    ribbon.castShadow = true;
    sculpture.add(ribbon);

    const chrome = new THREE.MeshPhysicalMaterial({ color: '#d8dce1', metalness: 0.96, roughness: 0.17, clearcoat: 1 });
    const seam = new THREE.Mesh(new THREE.TubeGeometry(ribbonCurve, 180, 0.016, 8, false), chrome);
    seam.position.z += 0.07;
    sculpture.add(seam);

    const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.012, 10, 150), chrome);
    orbit.scale.set(1, 0.78, 0.9);
    orbit.rotation.set(1.12, 0.2, -0.34);
    sculpture.add(orbit);

    const orbitBack = new THREE.Mesh(
      new THREE.TorusGeometry(1.78, 0.006, 8, 150),
      new THREE.MeshStandardMaterial({ color: '#5d6269', metalness: 0.9, roughness: 0.24 }),
    );
    orbitBack.scale.set(1, 0.58, 0.8);
    orbitBack.rotation.set(0.36, 1.05, 0.55);
    sculpture.add(orbitBack);

    const satellite = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 24, 18),
      new THREE.MeshPhysicalMaterial({ color: '#f2eee8', metalness: 0.88, roughness: 0.14, clearcoat: 1 }),
    );
    sculpture.add(satellite);

    scene.add(new THREE.AmbientLight('#ffffff', 0.68));
    const keyLight = new THREE.DirectionalLight('#fff8f4', 4.2);
    keyLight.position.set(3.2, 4.6, 5.4);
    scene.add(keyLight);
    const redLight = new THREE.PointLight('#d51f16', 30, 8);
    redLight.position.set(-2.5, -1.6, 2.8);
    scene.add(redLight);
    const rimLight = new THREE.PointLight('#d5d9e0', 18, 8);
    rimLight.position.set(2.2, 2.8, -2.2);
    scene.add(rimLight);

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: 'low-power',
      });
      renderer.setClearColor('#080808', 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      mount.appendChild(renderer.domElement);
    } catch {
      mount.dataset.webgl = 'unavailable';
      mount.parentElement?.setAttribute('data-webgl', 'unavailable');
      return () => {
        sculpture.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
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
      targetX = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 0.34;
      targetY = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * -0.25;
    };
    const pointerLeave = () => { targetX = 0; targetY = 0; };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = new THREE.Timer();
    timer.connect(document);

    const draw = () => {
      frameId = 0;
      if (!renderer || disposed || !visible) return;

      timer.update();
      const elapsed = timer.getElapsed();
      const entrance = 1 - Math.exp(-elapsed * 1.7);
      pointerX = THREE.MathUtils.damp(pointerX, targetX, 3.6, 1 / 60);
      pointerY = THREE.MathUtils.damp(pointerY, targetY, 3.6, 1 / 60);
      sculpture.scale.setScalar(0.9 + entrance * 0.1);
      sculpture.position.y = (1 - entrance) * -0.12;
      sculpture.rotation.x = pointerY + (reducedMotion ? 0 : Math.sin(elapsed * 0.26) * 0.025);
      sculpture.rotation.y = pointerX + (reducedMotion ? 0 : Math.sin(elapsed * 0.22) * 0.13);
      sculpture.rotation.z = reducedMotion ? 0 : Math.sin(elapsed * 0.19) * 0.016;
      orbit.rotation.z = -0.34 + (reducedMotion ? 0 : elapsed * 0.026);
      orbitBack.rotation.x = 0.36 + (reducedMotion ? 0 : elapsed * 0.018);
      const satelliteAngle = elapsed * (reducedMotion ? 0 : 0.22);
      satellite.position.set(Math.cos(satelliteAngle) * 1.55, Math.sin(satelliteAngle) * 1.2, 0.04);
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
      timer.dispose();
      sculpture.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer?.dispose();
      if (renderer?.domElement && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="minimal-hero-visual relative mx-auto h-[clamp(240px,41vh,390px)] w-full sm:h-[clamp(280px,43vh,420px)]" role="img" aria-label="Sculpted red and chrome Raphics ribbon form">
      <div className="hero-sculpture-aura pointer-events-none absolute inset-[7%] rounded-full" />
      <div ref={mountRef} className="relative z-10 h-full w-full" />
      <div className="hero-static-sculpture pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <svg viewBox="0 0 360 360" className="h-full w-full" role="presentation">
          <path d="M82 294V62h96c78 0 97 107 19 124l83 108h-79l-75-99h-1v99z" fill="none" stroke="url(#ribbonFill)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="31" />
          <defs><linearGradient id="ribbonFill" x1="52" y1="65" x2="285" y2="286" gradientUnits="userSpaceOnUse"><stop stopColor="#ff766d" /><stop offset=".48" stopColor="#d51f16" /><stop offset="1" stopColor="#5d0d0a" /></linearGradient></defs>
          <ellipse cx="180" cy="180" rx="151" ry="92" fill="none" stroke="#e9edf1" strokeOpacity=".5" strokeWidth="2" transform="rotate(-27 180 180)" />
        </svg>
      </div>
    </div>
  );
};

export default MinimalHeroVisual;
