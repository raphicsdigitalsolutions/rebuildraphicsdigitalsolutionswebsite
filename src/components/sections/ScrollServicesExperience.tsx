import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowUpRight } from 'lucide-react';
import { getStoryOpacities, getStoryProgress, getStoryStage } from '../../utils/scroll-motion';

interface ScrollServicesExperienceProps {
  onOpenService: (path: string) => void;
}

const STORY_STAGES = [
  {
    number: '01',
    label: 'BRAND · PACKAGING · VISUALS',
    title: 'Make the first impression count.',
    body: 'Distinctive identities, considered packaging and visual systems that make a brand feel unmistakably yours.',
    details: ['Brand identity', 'Label & packaging', 'Campaign design'],
    action: 'Explore creative',
    path: '/creative',
  },
  {
    number: '02',
    label: 'WEBSITES · SOFTWARE · PRODUCTS',
    title: 'Make every interaction work.',
    body: 'Thoughtful websites, custom platforms and business software designed around the way people actually work.',
    details: ['Websites & web apps', 'CRM & dashboards', 'Custom software'],
    action: 'Explore development',
    path: '/development',
  },
  {
    number: '03',
    label: 'AI · AGENTS · AUTOMATION',
    title: 'Make room for smarter work.',
    body: 'Practical AI assistants, connected workflows and automation that take repetitive work off your team’s plate.',
    details: ['AI chatbots & agents', 'Voice experiences', 'Business automation'],
    action: 'Explore AI solutions',
    path: '/ai-lab',
  },
];

function addBox(
  group: THREE.Group,
  size: [number, number, number],
  position: [number, number, number],
  material: THREE.Material,
  rotation: [number, number, number] = [0, 0, 0],
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function createCreativeObject(): THREE.Group {
  const group = new THREE.Group();
  const red = new THREE.MeshPhysicalMaterial({
    color: '#c91e16', metalness: 0.48, roughness: 0.24, clearcoat: 0.9, clearcoatRoughness: 0.15, transparent: true,
  });
  const deepRed = new THREE.MeshStandardMaterial({ color: '#72130f', metalness: 0.65, roughness: 0.34, transparent: true });
  const porcelain = new THREE.MeshPhysicalMaterial({ color: '#f0eeee', metalness: 0.18, roughness: 0.27, clearcoat: 0.7, transparent: true });
  const chrome = new THREE.MeshStandardMaterial({ color: '#c7cbd0', metalness: 0.92, roughness: 0.17, transparent: true });

  const body = addBox(group, [1.42, 1.82, 0.72], [0, -0.02, 0], red, [0.04, -0.16, -0.08]);
  addBox(group, [1.06, 1.26, 0.035], [0.03, -0.06, 0.38], porcelain, [0.04, -0.16, -0.08]);
  addBox(group, [0.78, 0.055, 0.055], [0.03, 0.31, 0.414], deepRed, [0.04, -0.16, -0.08]);
  addBox(group, [0.56, 0.035, 0.055], [0.03, -0.1, 0.414], red, [0.04, -0.16, -0.08]);
  addBox(group, [0.82, 0.025, 0.055], [0.03, -0.28, 0.414], chrome, [0.04, -0.16, -0.08]);
  addBox(group, [1.46, 0.08, 0.75], [0, 0.92, 0], deepRed, [0.04, -0.16, -0.08]);

  const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.018, 8, 96), chrome);
  orbit.rotation.set(1.08, 0.2, -0.28);
  group.add(orbit);
  body.position.y = -0.02;
  return group;
}

function createDigitalObject(): THREE.Group {
  const group = new THREE.Group();
  const dark = new THREE.MeshPhysicalMaterial({ color: '#17191d', metalness: 0.72, roughness: 0.25, clearcoat: 0.65, transparent: true });
  const chrome = new THREE.MeshStandardMaterial({ color: '#cbd0d5', metalness: 0.9, roughness: 0.2, transparent: true });
  const red = new THREE.MeshStandardMaterial({ color: '#d51f16', metalness: 0.45, roughness: 0.28, transparent: true });
  const soft = new THREE.MeshStandardMaterial({ color: '#e9e9e9', metalness: 0.25, roughness: 0.34, transparent: true });

  const main = addBox(group, [2.05, 1.36, 0.12], [0, 0, 0], dark, [-0.12, -0.22, -0.08]);
  addBox(group, [1.87, 1.18, 0.025], [0, 0, 0.073], soft, [-0.12, -0.22, -0.08]);
  addBox(group, [1.87, 0.13, 0.035], [0, 0.52, 0.095], dark, [-0.12, -0.22, -0.08]);
  addBox(group, [0.2, 0.035, 0.045], [-0.72, 0.52, 0.12], red, [-0.12, -0.22, -0.08]);
  addBox(group, [0.72, 0.045, 0.04], [-0.42, 0.19, 0.12], chrome);
  addBox(group, [0.92, 0.045, 0.04], [-0.32, -0.02, 0.12], chrome);
  addBox(group, [0.58, 0.045, 0.04], [-0.49, -0.23, 0.12], chrome);
  addBox(group, [0.45, 0.45, 0.05], [0.62, -0.1, 0.12], red);

  const frame = new THREE.LineSegments(
    new THREE.EdgesGeometry(main.geometry),
    new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.55 }),
  );
  frame.position.copy(main.position);
  frame.rotation.copy(main.rotation);
  group.add(frame);
  return group;
}

function createIntelligenceObject(): THREE.Group {
  const group = new THREE.Group();
  const red = new THREE.MeshPhysicalMaterial({ color: '#d51f16', metalness: 0.62, roughness: 0.2, clearcoat: 0.9, transparent: true });
  const wire = new THREE.MeshBasicMaterial({ color: '#f1dedd', wireframe: true, transparent: true });
  const chrome = new THREE.MeshStandardMaterial({ color: '#d1d5db', metalness: 0.88, roughness: 0.2, transparent: true });

  group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 2), red));
  group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.08, 1), wire));

  const points: THREE.Vector3[] = [];
  const count = 18;
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius).multiplyScalar(1.35));
  }

  const nodeGeometry = new THREE.SphereGeometry(0.055, 12, 12);
  points.forEach((point, index) => {
    const node = new THREE.Mesh(nodeGeometry, index % 4 === 0 ? red : chrome);
    node.position.copy(point);
    group.add(node);
  });

  const linePositions: number[] = [];
  points.forEach((point, index) => {
    [index + 2, index + 5].forEach((nextIndex) => {
      if (nextIndex >= points.length) return;
      linePositions.push(point.x, point.y, point.z, points[nextIndex].x, points[nextIndex].y, points[nextIndex].z);
    });
  });
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  group.add(new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: '#a9adb4', transparent: true, opacity: 0.42 })));

  const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.012, 8, 100), chrome);
  orbit.rotation.set(0.8, 0.25, -0.45);
  group.add(orbit);
  return group;
}

function setGroupOpacity(group: THREE.Group, opacity: number) {
  group.visible = opacity > 0.01;
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Line)) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      material.transparent = true;
      material.opacity = opacity;
      material.depthWrite = opacity > 0.92;
    });
  });
}

export const ScrollServicesExperience: React.FC<ScrollServicesExperienceProps> = ({ onOpenService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const mount = canvasRef.current;
    if (!section || !mount) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let frameId = 0;
    let scrollFrameId = 0;
    let visible = true;
    let scrollProgress = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let isDisposed = false;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reducedMotion = reducedMotionQuery.matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
    camera.position.set(0, 0, 6.7);

    const groups = [createCreativeObject(), createDigitalObject(), createIntelligenceObject()];
    groups.forEach((group) => {
      group.visible = false;
      scene.add(group);
    });

    scene.add(new THREE.AmbientLight('#ffffff', 1.05));
    const keyLight = new THREE.DirectionalLight('#ffffff', 3.2);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);
    const redLight = new THREE.PointLight('#d51f16', 34, 9);
    redLight.position.set(-3, -1.4, 3.2);
    scene.add(redLight);
    const rimLight = new THREE.PointLight('#9da8bc', 14, 8);
    rimLight.position.set(3, 2, -2.4);
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
      return () => {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Line) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
      };
    }

    const resize = () => {
      if (!renderer || !mount) return;
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const updateScroll = () => {
      scrollFrameId = 0;
      if (isDisposed) return;
      const rect = section.getBoundingClientRect();
      scrollProgress = getStoryProgress(rect.top, section.offsetHeight, window.innerHeight);
      const nextStage = getStoryStage(scrollProgress);
      setActiveStage((current) => current === nextStage ? current : nextStage);
      // Reduced-motion users still get scroll-linked chapter changes, rendered once per scroll frame.
      if (reducedMotion && visible && !frameId) frameId = window.requestAnimationFrame(animate);
    };

    const scheduleScroll = () => {
      if (scrollFrameId) return;
      scrollFrameId = window.requestAnimationFrame(updateScroll);
    };

    const pointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      targetPointerX = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 0.42;
      targetPointerY = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * -0.3;
    };
    const pointerLeave = () => { targetPointerX = 0; targetPointerY = 0; };

    const clock = new THREE.Clock();
    const animate = () => {
      frameId = 0;
      if (!renderer || isDisposed || !visible) return;

      const elapsed = clock.getElapsedTime();
      pointerX = THREE.MathUtils.damp(pointerX, targetPointerX, 4.5, 1 / 60);
      pointerY = THREE.MathUtils.damp(pointerY, targetPointerY, 4.5, 1 / 60);

      const opacities = getStoryOpacities(scrollProgress);
      groups.forEach((group, index) => {
        const opacity = opacities[index];
        setGroupOpacity(group, opacity);
        group.scale.setScalar(0.86 + opacity * 0.14);
        group.rotation.x = pointerY + Math.sin(elapsed * 0.32 + index) * (reducedMotion ? 0 : 0.025);
        group.rotation.y = pointerX + scrollProgress * 0.34 + elapsed * (reducedMotion ? 0 : 0.055);
        group.rotation.z = Math.sin(elapsed * 0.22 + index) * (reducedMotion ? 0 : 0.018);
        group.position.y = Math.sin(elapsed * 0.36 + index) * (reducedMotion ? 0 : 0.035);
      });

      camera.position.x = THREE.MathUtils.damp(camera.position.x, pointerX * 0.3, 3, 1 / 60);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, pointerY * 0.2, 3, 1 / 60);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);

      if (!reducedMotion) frameId = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reducedMotion && !frameId) frameId = window.requestAnimationFrame(animate);
      if (!visible && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    }, { threshold: 0.05 });

    resize();
    updateScroll();
    observer.observe(section);
    window.addEventListener('scroll', scheduleScroll, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    mount.addEventListener('pointermove', pointerMove, { passive: true });
    mount.addEventListener('pointerleave', pointerLeave, { passive: true });
    frameId = window.requestAnimationFrame(animate);

    return () => {
      isDisposed = true;
      observer.disconnect();
      window.removeEventListener('scroll', scheduleScroll);
      window.removeEventListener('resize', resize);
      mount.removeEventListener('pointermove', pointerMove);
      mount.removeEventListener('pointerleave', pointerLeave);
      if (frameId) window.cancelAnimationFrame(frameId);
      if (scrollFrameId) window.cancelAnimationFrame(scrollFrameId);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Line) {
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
    <section id="services" ref={sectionRef} className="relative bg-[#080808] border-t border-white/[0.06]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="sticky top-20 z-10 flex h-[31vh] min-h-[220px] flex-col justify-center bg-[#080808]/90 lg:top-[11vh] lg:h-[78vh] lg:bg-transparent">
          <div className="relative h-full w-full">
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(213,31,22,0.12),transparent_68%)] blur-2xl" />
            <div ref={canvasRef} className="scroll-story-visual relative z-10 h-full w-full" aria-hidden="true" />
            <div className="absolute bottom-1 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              <span className="h-px w-6 bg-[#D51F16]" /> Scroll to transform <span className="h-px w-6 bg-[#D51F16]" />
            </div>
            <div className="absolute right-0 top-5 z-20 text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-600">
              0{activeStage + 1} / 03
            </div>
          </div>
          <div className="hidden items-center justify-between border-t border-white/[0.08] py-5 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 lg:flex">
            <span>One studio. Three disciplines.</span>
            <span>Scroll-linked 3D</span>
          </div>
        </div>

        <div className="relative">
          <div className="py-16 lg:min-h-[54vh] lg:flex lg:flex-col lg:justify-center lg:py-0">
            <p className="mb-5 text-[10px] font-mono uppercase tracking-[0.24em] text-[#d9534c]">What we bring together</p>
            <h2 className="max-w-xl text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl">
              One partner for the whole digital picture.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-400">
              The right combination of creativity, technology and intelligent systems — shaped around what your business actually needs.
            </p>
          </div>

          {STORY_STAGES.map((stage) => (
            <article key={stage.number} className="flex min-h-[58vh] flex-col justify-center border-t border-white/[0.08] py-12 lg:min-h-[72vh]">
              <div className="mb-7 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                <span className="text-[#d9534c]">{stage.number}</span>
                <span className="h-px w-8 bg-neutral-700" />
                {stage.label}
              </div>
              <h3 className="max-w-xl text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl xl:text-5xl">
                {stage.title}
              </h3>
              <p className="mt-6 max-w-md text-sm leading-7 text-neutral-400 sm:text-base">{stage.body}</p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-300">
                {stage.details.map((detail) => <span key={detail}>{detail}</span>)}
              </div>
              <button type="button" onClick={() => onOpenService(stage.path)} className="mt-9 inline-flex w-fit items-center gap-2 text-sm font-medium text-white transition-colors hover:text-[#e15a52]">
                {stage.action}<ArrowUpRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollServicesExperience;
