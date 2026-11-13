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
    path: '/services/creative-studio',
  },
  {
    number: '02',
    label: 'WEBSITES · SOFTWARE · PRODUCTS',
    title: 'Make every interaction work.',
    body: 'Thoughtful websites, custom platforms and business software designed around the way people actually work.',
    details: ['Websites & web apps', 'CRM & dashboards', 'Custom software'],
    action: 'Explore development',
    path: '/services/digital-development',
  },
  {
    number: '03',
    label: 'AI · AGENTS · AUTOMATION',
    title: 'Make room for smarter work.',
    body: 'Practical AI assistants, connected workflows and automation that take repetitive work off your team’s plate.',
    details: ['AI chatbots & agents', 'Voice experiences', 'Business automation'],
    action: 'Explore AI solutions',
    path: '/services/ai-automation',
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
  group.add(mesh);
  return mesh;
}

function roundedPlate(
  group: THREE.Group,
  width: number,
  height: number,
  depth: number,
  radius: number,
  material: THREE.Material,
  position: [number, number, number],
  rotation: [number, number, number] = [0, 0, 0],
) {
  const shape = new THREE.Shape();
  const left = -width / 2;
  const right = width / 2;
  const bottom = -height / 2;
  const top = height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  shape.moveTo(left + r, bottom);
  shape.lineTo(right - r, bottom);
  shape.quadraticCurveTo(right, bottom, right, bottom + r);
  shape.lineTo(right, top - r);
  shape.quadraticCurveTo(right, top, right - r, top);
  shape.lineTo(left + r, top);
  shape.quadraticCurveTo(left, top, left, top - r);
  shape.lineTo(left, bottom + r);
  shape.quadraticCurveTo(left, bottom, left + r, bottom);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: Math.min(0.025, depth * 0.18),
    bevelThickness: Math.min(0.025, depth * 0.18),
    curveSegments: 8,
  });
  geometry.translate(0, 0, -depth / 2);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  group.add(mesh);
  return mesh;
}

function lineCurve(group: THREE.Group, points: [number, number, number][], material: THREE.Material, radius = 0.012) {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, radius, 8, false), material);
  group.add(mesh);
  return mesh;
}

function createCreativeObject(): THREE.Group {
  const group = new THREE.Group();
  const bottleMaterial = new THREE.MeshPhysicalMaterial({ color: '#741512', metalness: 0.48, roughness: 0.22, clearcoat: 1 });
  const cartonMaterial = new THREE.MeshPhysicalMaterial({ color: '#d9d2c7', metalness: 0.08, roughness: 0.34, clearcoat: 0.48 });
  const paper = new THREE.MeshPhysicalMaterial({ color: '#f5f1e8', metalness: 0.05, roughness: 0.34, clearcoat: 0.38 });
  const redInk = new THREE.MeshStandardMaterial({ color: '#a71c16', metalness: 0.24, roughness: 0.38 });
  const chrome = new THREE.MeshPhysicalMaterial({ color: '#cbd0d6', metalness: 0.94, roughness: 0.18, clearcoat: 0.9 });
  const ink = new THREE.MeshStandardMaterial({ color: '#251d1a', metalness: 0.16, roughness: 0.4 });

  const bottlePoints = [
    new THREE.Vector2(0, -0.92), new THREE.Vector2(0.27, -0.92), new THREE.Vector2(0.33, -0.72),
    new THREE.Vector2(0.34, -0.15), new THREE.Vector2(0.29, 0.28), new THREE.Vector2(0.18, 0.45),
    new THREE.Vector2(0.17, 0.72), new THREE.Vector2(0.24, 0.78), new THREE.Vector2(0.24, 0.91),
    new THREE.Vector2(0, 0.91),
  ];
  const bottleGroup = new THREE.Group();
  bottleGroup.position.set(-0.66, -0.05, 0.12);
  bottleGroup.rotation.z = -0.08;
  group.add(bottleGroup);
  bottleGroup.add(new THREE.Mesh(new THREE.LatheGeometry(bottlePoints, 56), bottleMaterial));
  roundedPlate(bottleGroup, 0.45, 0.52, 0.024, 0.035, paper, [0, 0, 0.4], [0, -0.08, 0]);
  addBox(bottleGroup, [0.23, 0.026, 0.014], [0, 0.12, 0.42], redInk);
  addBox(bottleGroup, [0.16, 0.018, 0.014], [0, 0.03, 0.42], ink);
  addBox(bottleGroup, [0.2, 0.014, 0.014], [0, -0.04, 0.42], ink);
  const bottleCap = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.14, 48), chrome);
  bottleCap.position.set(0, 0.89, 0);
  bottleGroup.add(bottleCap);

  const cartonShape = new THREE.Shape();
  cartonShape.moveTo(-0.42, -0.82);
  cartonShape.lineTo(0.35, -0.82);
  cartonShape.lineTo(0.49, -0.62);
  cartonShape.lineTo(0.49, 0.62);
  cartonShape.lineTo(0.32, 0.83);
  cartonShape.lineTo(-0.42, 0.83);
  cartonShape.closePath();
  const cartonGeometry = new THREE.ExtrudeGeometry(cartonShape, { depth: 0.54, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.025, bevelThickness: 0.025, curveSegments: 8 });
  cartonGeometry.translate(0, 0, -0.27);
  const cartonGroup = new THREE.Group();
  cartonGroup.position.set(0.56, -0.02, -0.12);
  cartonGroup.rotation.set(0.05, -0.25, -0.07);
  group.add(cartonGroup);
  cartonGroup.add(new THREE.Mesh(cartonGeometry, cartonMaterial));
  roundedPlate(cartonGroup, 0.7, 1.08, 0.025, 0.035, paper, [0, 0, 0.31]);
  roundedPlate(cartonGroup, 0.14, 0.9, 0.028, 0.02, redInk, [-0.22, 0, 0.34]);
  addBox(cartonGroup, [0.33, 0.04, 0.016], [0.08, 0.28, 0.35], redInk);
  addBox(cartonGroup, [0.42, 0.02, 0.016], [0.08, 0.14, 0.35], ink);
  addBox(cartonGroup, [0.31, 0.016, 0.016], [0.025, 0.06, 0.35], ink);

  const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.53, 0.014, 8, 120), chrome);
  orbit.rotation.set(1.05, 0.23, -0.32);
  group.add(orbit);
  return group;
}

function createDigitalObject(): THREE.Group {
  const group = new THREE.Group();
  const graphite = new THREE.MeshPhysicalMaterial({ color: '#16181b', metalness: 0.72, roughness: 0.23, clearcoat: 0.8 });
  const screen = new THREE.MeshPhysicalMaterial({ color: '#e7e5df', metalness: 0.08, roughness: 0.32, clearcoat: 0.25 });
  const shade = new THREE.MeshStandardMaterial({ color: '#c8c5be', metalness: 0.2, roughness: 0.44 });
  const red = new THREE.MeshPhysicalMaterial({ color: '#d51f16', metalness: 0.48, roughness: 0.24, clearcoat: 0.9 });
  const pale = new THREE.MeshStandardMaterial({ color: '#f7f4ed', metalness: 0.08, roughness: 0.36 });

  roundedPlate(group, 2.0, 1.48, 0.16, 0.1, graphite, [0.04, 0.03, 0.12], [-0.1, -0.2, -0.04]);
  roundedPlate(group, 1.78, 1.25, 0.025, 0.04, screen, [0.04, 0.03, 0.22], [-0.1, -0.2, -0.04]);
  roundedPlate(group, 1.78, 0.14, 0.034, 0.035, graphite, [0.04, 0.56, 0.25], [-0.1, -0.2, -0.04]);
  addBox(group, [0.28, 0.035, 0.02], [-0.52, 0.55, 0.29], red, [-0.1, -0.2, -0.04]);
  addBox(group, [0.52, 0.035, 0.024], [-0.49, 0.27, 0.27], shade, [-0.1, -0.2, -0.04]);
  addBox(group, [0.69, 0.035, 0.024], [-0.4, 0.1, 0.27], shade, [-0.1, -0.2, -0.04]);
  addBox(group, [0.44, 0.035, 0.024], [-0.53, -0.07, 0.27], shade, [-0.1, -0.2, -0.04]);
  roundedPlate(group, 0.54, 0.55, 0.025, 0.035, pale, [0.58, 0.06, 0.27], [-0.1, -0.2, -0.04]);
  addBox(group, [0.31, 0.03, 0.022], [0.58, -0.15, 0.29], red, [-0.1, -0.2, -0.04]);

  const backPanel = roundedPlate(group, 1.35, 0.92, 0.08, 0.08, red, [-0.58, -0.18, -0.58], [0.08, 0.28, 0.11]);
  backPanel.material = new THREE.MeshPhysicalMaterial({ color: '#721512', metalness: 0.68, roughness: 0.24, clearcoat: 0.9 });
  const frame = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(2.08, 1.56, 0.18)),
    new THREE.LineBasicMaterial({ color: '#e5e7eb', transparent: true, opacity: 0.46 }),
  );
  frame.position.set(0.04, 0.03, 0.12);
  frame.rotation.set(-0.1, -0.2, -0.04);
  group.add(frame);
  return group;
}

function createIntelligenceObject(): THREE.Group {
  const group = new THREE.Group();
  const cardMaterial = new THREE.MeshPhysicalMaterial({ color: '#18191b', metalness: 0.62, roughness: 0.24, clearcoat: 0.7 });
  const paper = new THREE.MeshStandardMaterial({ color: '#e8e5df', metalness: 0.08, roughness: 0.32 });
  const red = new THREE.MeshPhysicalMaterial({ color: '#d51f16', metalness: 0.65, roughness: 0.18, clearcoat: 1, emissive: '#2b0705', emissiveIntensity: 0.55 });
  const chrome = new THREE.MeshPhysicalMaterial({ color: '#cbd0d6', metalness: 0.94, roughness: 0.16, clearcoat: 0.9 });
  const wire = new THREE.MeshBasicMaterial({ color: '#d5d9df', transparent: true, opacity: 0.65 });

  const core = new THREE.Mesh(new THREE.SphereGeometry(0.38, 48, 32), red);
  core.position.set(0.12, 0.04, 0.18);
  group.add(core);
  const coreRing = new THREE.Mesh(new THREE.TorusGeometry(0.57, 0.014, 8, 100), chrome);
  coreRing.position.copy(core.position);
  coreRing.rotation.set(0.8, 0.3, -0.45);
  group.add(coreRing);

  const documents = [
    { x: -1.13, y: 0.62, z: 0.08 },
    { x: -1.35, y: -0.02, z: -0.08 },
    { x: -1.1, y: -0.66, z: 0.08 },
  ];
  documents.forEach((point, index) => {
    roundedPlate(group, 0.48, 0.54, 0.055, 0.045, cardMaterial, [point.x, point.y, point.z], [0.02, -0.1, (index - 1) * -0.08]);
    addBox(group, [0.27, 0.022, 0.012], [point.x - 0.015, point.y + 0.1, point.z + 0.04], index === 1 ? red : paper);
    addBox(group, [0.31, 0.014, 0.012], [point.x - 0.01, point.y + 0.015, point.z + 0.04], chrome);
    addBox(group, [0.22, 0.014, 0.012], [point.x - 0.055, point.y - 0.075, point.z + 0.04], chrome);
    lineCurve(group, [[point.x + 0.25, point.y, point.z], [-0.58, point.y * 0.56, 0.1], [-0.19, 0.04, 0.2]], wire, 0.009);
  });

  const outputPoints: [number, number, number][] = [
    [0.94, 0.54, 0.12],
    [1.16, -0.2, -0.04],
  ];
  outputPoints.forEach((point, index) => {
    const node = new THREE.Mesh(new THREE.SphereGeometry(index === 0 ? 0.12 : 0.09, 24, 18), index === 0 ? red : chrome);
    node.position.set(...point);
    group.add(node);
    lineCurve(group, [[0.49, 0.04, 0.18], [0.72, point[1] * 0.42, 0.22], point], wire, 0.012);
  });
  roundedPlate(group, 0.42, 0.24, 0.035, 0.07, cardMaterial, [1.33, 0.57, 0.02], [0, -0.14, 0.08]);
  roundedPlate(group, 0.5, 0.24, 0.035, 0.07, cardMaterial, [1.42, -0.35, -0.08], [0, 0.1, -0.06]);

  return group;
}

function setGroupOpacity(group: THREE.Group, opacity: number) {
  group.visible = opacity > 0.008;
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Line)) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      material.transparent = opacity < 0.999 || material.transparent;
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
    let disposed = false;
    let scrollProgress = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let pointerX = 0;
    let pointerY = 0;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
    camera.position.set(0, 0, 5.65);

    const groups = [createCreativeObject(), createDigitalObject(), createIntelligenceObject()];
    groups.forEach((group) => {
      group.visible = false;
      scene.add(group);
    });

    scene.add(new THREE.AmbientLight('#fffaf6', 0.82));
    const keyLight = new THREE.DirectionalLight('#fff5ea', 4.2);
    keyLight.position.set(3.5, 4.8, 6);
    scene.add(keyLight);
    const redLight = new THREE.PointLight('#d51f16', 32, 9);
    redLight.position.set(-2.7, -1.2, 3);
    scene.add(redLight);
    const rimLight = new THREE.PointLight('#d7dce3', 22, 9);
    rimLight.position.set(3, 2.4, -2.6);
    scene.add(rimLight);

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: 'low-power',
      });
      renderer.setClearColor('#080808', 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
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
      if (!renderer) return;
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const updateScroll = () => {
      scrollFrameId = 0;
      if (disposed) return;
      const rect = section.getBoundingClientRect();
      const endingHeight = section.querySelector<HTMLElement>('[data-story-ending]')?.offsetHeight ?? 0;
      scrollProgress = getStoryProgress(rect.top, section.offsetHeight - endingHeight, window.innerHeight);
      const nextStage = getStoryStage(scrollProgress);
      setActiveStage((current) => current === nextStage ? current : nextStage);
      if (reducedMotion && visible && !frameId) frameId = window.requestAnimationFrame(animate);
    };

    const scheduleScroll = () => {
      if (scrollFrameId) return;
      scrollFrameId = window.requestAnimationFrame(updateScroll);
    };

    const pointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      targetPointerX = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 0.36;
      targetPointerY = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * -0.26;
    };
    const pointerLeave = () => { targetPointerX = 0; targetPointerY = 0; };
    const timer = new THREE.Timer();
    timer.connect(document);

    const animate = () => {
      frameId = 0;
      if (!renderer || disposed || !visible) return;

      timer.update();
      const elapsed = timer.getElapsed();
      pointerX = THREE.MathUtils.damp(pointerX, targetPointerX, 4, 1 / 60);
      pointerY = THREE.MathUtils.damp(pointerY, targetPointerY, 4, 1 / 60);
      const opacities = getStoryOpacities(scrollProgress);

      groups.forEach((group, index) => {
        const opacity = opacities[index];
        const entry = 0.84 + opacity * 0.16;
        setGroupOpacity(group, opacity);
        group.scale.setScalar(entry);
        group.position.x = THREE.MathUtils.lerp(index === 1 ? 0.22 : -0.22, 0, opacity);
        group.position.y = Math.sin(elapsed * 0.42 + index * 1.7) * (reducedMotion ? 0 : 0.035) - (1 - opacity) * 0.06;
        group.rotation.x = pointerY + (reducedMotion ? 0 : Math.sin(elapsed * 0.2 + index) * 0.018);
        group.rotation.y = pointerX + scrollProgress * 0.42 + (reducedMotion ? 0 : elapsed * 0.035);
        group.rotation.z = (index - 1) * 0.028 + (reducedMotion ? 0 : Math.sin(elapsed * 0.16 + index) * 0.012);
      });

      redLight.position.x = -2.4 + scrollProgress * 4.8;
      redLight.position.y = -1.2 + Math.sin(scrollProgress * Math.PI) * 1.8;
      redLight.intensity = 26 + Math.sin(scrollProgress * Math.PI) * 10;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, pointerX * 0.24, 3, 1 / 60);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, pointerY * 0.18, 3, 1 / 60);
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
    }, { threshold: 0.04 });

    resize();
    updateScroll();
    observer.observe(section);
    window.addEventListener('scroll', scheduleScroll, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    mount.addEventListener('pointermove', pointerMove, { passive: true });
    mount.addEventListener('pointerleave', pointerLeave, { passive: true });
    frameId = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener('scroll', scheduleScroll);
      window.removeEventListener('resize', resize);
      mount.removeEventListener('pointermove', pointerMove);
      mount.removeEventListener('pointerleave', pointerLeave);
      if (frameId) window.cancelAnimationFrame(frameId);
      if (scrollFrameId) window.cancelAnimationFrame(scrollFrameId);
      timer.dispose();
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
    <section id="services" ref={sectionRef} className="scroll-story-section relative overflow-clip border-t border-white/[0.06] bg-[#080808]">
      <div className="scroll-story-atmosphere pointer-events-none absolute inset-0" />
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-7 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
        <div className="scroll-story-sticky sticky top-20 z-10 flex h-[33vh] min-h-[250px] flex-col justify-center bg-[#080808]/95 lg:top-0 lg:h-screen lg:bg-transparent">
          <div className="relative h-full w-full">
            <div className="scroll-story-stage-glow pointer-events-none absolute inset-[3%] rounded-full" />
            <div ref={canvasRef} className="scroll-story-visual relative z-10 h-full w-full" aria-hidden="true" />
            <div className="absolute right-1 top-5 z-20 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
              <span>{STORY_STAGES[activeStage].label.split(' · ')[0]}</span>
              <span className="text-white">0{activeStage + 1}<span className="text-neutral-700"> / 03</span></span>
            </div>
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              <span className="h-px w-6 bg-[#d51f16]" /> Scroll to transform <span className="h-px w-6 bg-[#d51f16]" />
            </div>
          </div>
          <div className="hidden items-center justify-between border-t border-white/[0.08] py-5 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500 lg:flex">
            <span>One studio. Three disciplines.</span>
            <div className="flex gap-1.5" aria-label={`Chapter ${activeStage + 1} of 3`}>
              {STORY_STAGES.map((stage, index) => (
                <span key={stage.number} className={`h-px w-9 transition-colors duration-500 ${index === activeStage ? 'bg-[#d51f16]' : 'bg-white/20'}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex min-h-[65vh] flex-col justify-center py-16 lg:min-h-[72vh] lg:py-0">
            <p className="mb-5 text-[10px] font-mono uppercase tracking-[0.24em] text-[#e26a62]">What we bring together</p>
            <h2 className="max-w-xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-6xl">
              One studio.<br /><span className="text-neutral-500">Three disciplines.</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
              Brand, digital product and intelligent systems—connected through one creative and technical team.
            </p>
          </div>

          {STORY_STAGES.map((stage, index) => (
            <article key={stage.number} data-active={activeStage === index} className="scroll-story-chapter flex min-h-[58vh] flex-col justify-center border-t border-white/[0.09] py-12 lg:min-h-screen">
              <div className="mb-7 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
                <span className="scroll-story-number text-[#e26a62]">{stage.number}</span>
                <span className="h-px w-8 bg-neutral-700" />
                {stage.label}
              </div>
              <h3 className="max-w-xl text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-5xl xl:text-6xl">
                {stage.title}
              </h3>
              <p className="mt-6 max-w-md text-sm leading-7 text-neutral-400 sm:text-base">{stage.body}</p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-300">
                {stage.details.map((detail) => <span key={detail}>{detail}</span>)}
              </div>
              <button type="button" onClick={() => onOpenService(stage.path)} className="mt-9 inline-flex w-fit items-center gap-2 border-b border-white/20 pb-2 text-sm font-medium text-white transition-colors hover:border-[#e26a62] hover:text-[#f07870]">
                {stage.action}<ArrowUpRight className="h-4 w-4" />
              </button>
            </article>
          ))}

          <div data-story-ending className="scroll-story-ending flex min-h-[72vh] flex-col justify-center border-t border-white/[0.09] py-16 lg:min-h-screen">
            <p className="mb-5 text-[10px] font-mono uppercase tracking-[0.24em] text-[#e26a62]">One connected team</p>
            <h3 className="max-w-xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-6xl">
              From first sketch<br /><span className="text-neutral-500">to the final build.</span>
            </h3>
            <p className="mt-6 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
              Bring brand, digital product and practical AI together in one working relationship.
            </p>
            <button type="button" onClick={() => onOpenService('/work')} className="mt-9 inline-flex w-fit items-center gap-2 border-b border-white/20 pb-2 text-sm font-medium text-white transition-colors hover:border-[#e26a62] hover:text-[#f07870]">
              See what we make <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollServicesExperience;
