import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { useShop } from '../../context/ShopContext';
import { generateStoreChatUrl } from '../../lib/whatsapp';
import { MessageCircle, ShoppingBag, Compass, Pause, Play, Sparkles, Eye } from 'lucide-react';

interface RealisticFish {
  group: THREE.Group;
  spineSegments: THREE.Object3D[];
  tailFin: THREE.Mesh;
  leftPectoral: THREE.Mesh;
  rightPectoral: THREE.Mesh;
  position: THREE.Vector3;
  target: THREE.Vector3;
  velocity: THREE.Vector3;
  maxSpeed: number;
  swimPhase: number;
  burstTimer: number;
  isGliding: boolean;
  speciesType: 'koi' | 'clownfish' | 'discus' | 'neon' | 'yellowlab';
}

export const AquariumHero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings } = useShop();
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setWebGLSupported(false);
      return;
    }

    // Check WebGL availability
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGLSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02111e);
    scene.fog = new THREE.FogExp2(0x021526, 0.042);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 11);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.devicePixelRatio < 2,
        alpha: false,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);
    } catch (e) {
      setWebGLSupported(false);
      return;
    }

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x0d3e5c, 1.9);
    scene.add(ambientLight);

    // Sunlight caustic spotlight
    const topSunlight = new THREE.SpotLight(0x8ae8ff, 6.0, 32, Math.PI / 3.5, 0.5, 1.2);
    topSunlight.position.set(0, 10, 2);
    topSunlight.target.position.set(0, -2, 0);
    scene.add(topSunlight);
    scene.add(topSunlight.target);

    const rimLight = new THREE.DirectionalLight(0x22d3ee, 2.2);
    rimLight.position.set(5, 4, -4);
    scene.add(rimLight);

    const warmUnderGlow = new THREE.PointLight(0x0ea5e9, 2.2, 16);
    warmUnderGlow.position.set(-3, -3, 2);
    scene.add(warmUnderGlow);

    // GLASS TANK EDGES
    const tankGeo = new THREE.BoxGeometry(16, 8, 7.5);
    const tankWireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(tankGeo),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.22 })
    );
    scene.add(tankWireframe);

    // NATURAL SAND SUBSTRATE
    const sandGeo = new THREE.PlaneGeometry(16.5, 8, 36, 18);
    const posAttr = sandGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      posAttr.setZ(i, Math.sin(x * 0.7) * 0.16 + Math.cos(y * 1.1) * 0.12);
    }
    sandGeo.computeVertexNormals();

    const sandMat = new THREE.MeshStandardMaterial({
      color: 0x0a2d42,
      roughness: 0.9,
      metalness: 0.05
    });
    const sand = new THREE.Mesh(sandGeo, sandMat);
    sand.rotation.x = -Math.PI / 2;
    sand.position.y = -3.95;
    scene.add(sand);

    // NATURAL AQUASCAPING HARDSCAPE ROCKS
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x0b354a,
      roughness: 0.88,
      metalness: 0.12
    });

    const createRock = (x: number, y: number, z: number, scaleX: number, scaleY: number, scaleZ: number) => {
      const rockGeo = new THREE.DodecahedronGeometry(1, 1);
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.position.set(x, y, z);
      rock.scale.set(scaleX, scaleY, scaleZ);
      rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(rock);
    };

    createRock(-4.8, -3.2, -1.2, 1.6, 1.2, 1.4);
    createRock(-3.5, -3.4, -0.6, 1.1, 0.9, 1.0);
    createRock(4.2, -3.2, -1.5, 1.5, 1.3, 1.4);
    createRock(5.3, -3.5, -0.4, 1.0, 0.8, 0.9);
    createRock(0.3, -3.6, -2.0, 1.3, 0.9, 1.2);

    // SWAYING VALLISNERIA / ROTALA AQUATIC PLANTS
    const plants: { mesh: THREE.Mesh; baseRot: number; phase: number }[] = [];
    const plantMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88
    });

    for (let i = 0; i < 26; i++) {
      const heightVal = 1.9 + Math.random() * 2.3;
      const ribbonGeo = new THREE.PlaneGeometry(0.18, heightVal, 1, 7);
      const leaf = new THREE.Mesh(ribbonGeo, plantMat);
      const px = -6.5 + Math.random() * 13;
      const pz = -2.5 + Math.random() * 4.5;
      leaf.position.set(px, -3.9 + heightVal / 2, pz);
      leaf.rotation.y = Math.random() * Math.PI;
      scene.add(leaf);
      plants.push({ mesh: leaf, baseRot: leaf.rotation.z, phase: Math.random() * Math.PI * 2 });
    }

    // ==========================================
    // ANATOMICALLY REALISTIC FISH BUILDER
    // ==========================================
    const realisticFishes: RealisticFish[] = [];

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const eyeRingMat = new THREE.MeshBasicMaterial({ color: 0xd4d4d4 });

    const createRealisticFish = (
      type: 'koi' | 'clownfish' | 'discus' | 'neon' | 'yellowlab',
      scale: number,
      speed: number
    ) => {
      const fishGroup = new THREE.Group();

      // Palette definitions matching authentic species
      let bodyColor = 0xffffff;
      let stripeColor = 0xef4444;
      let finColor = 0xf87171;
      let bodyLength = 1.1;
      let bodyHeight = 0.45;
      let bodyWidth = 0.22;

      if (type === 'koi') {
        bodyColor = 0xf8fafc; // Pearl white
        stripeColor = 0xdc2626; // Hi crimson red
        finColor = 0xfca5a5;
        bodyLength = 1.35;
        bodyHeight = 0.42;
        bodyWidth = 0.26;
      } else if (type === 'clownfish') {
        bodyColor = 0xf97316; // Vivid Orange
        stripeColor = 0xffffff; // White bands
        finColor = 0xf97316;
        bodyLength = 0.95;
        bodyHeight = 0.46;
        bodyWidth = 0.24;
      } else if (type === 'discus') {
        bodyColor = 0x06b6d4; // Diamond Turquoise
        stripeColor = 0x38bdf8;
        finColor = 0x0284c7;
        bodyLength = 0.9;
        bodyHeight = 0.85; // Tall circular disc
        bodyWidth = 0.16;
      } else if (type === 'neon') {
        bodyColor = 0x0284c7; // Electric Blue
        stripeColor = 0xef4444; // Ruby Red
        finColor = 0x38bdf8;
        bodyLength = 0.8;
        bodyHeight = 0.28;
        bodyWidth = 0.14;
      } else if (type === 'yellowlab') {
        bodyColor = 0xeab308; // Canary Yellow
        stripeColor = 0x1e293b; // Black top bar
        finColor = 0xfacc15;
        bodyLength = 1.05;
        bodyHeight = 0.44;
        bodyWidth = 0.22;
      }

      const bodyMat = new THREE.MeshStandardMaterial({
        color: bodyColor,
        roughness: 0.28,
        metalness: 0.35,
        emissive: bodyColor,
        emissiveIntensity: 0.12
      });

      const stripeMat = new THREE.MeshStandardMaterial({
        color: stripeColor,
        roughness: 0.3,
        metalness: 0.25,
        emissive: stripeColor,
        emissiveIntensity: 0.15
      });

      const finMat = new THREE.MeshStandardMaterial({
        color: finColor,
        side: THREE.DoubleSide,
        roughness: 0.2,
        transparent: true,
        opacity: 0.85
      });

      // 1. Spindle-shaped organic torso (Sphere stretched to fish proportions)
      const torsoGeo = new THREE.SphereGeometry(0.5, 16, 12);
      torsoGeo.scale(bodyLength, bodyHeight, bodyWidth);
      const torso = new THREE.Mesh(torsoGeo, bodyMat);
      torso.position.set(0, 0, 0);
      fishGroup.add(torso);

      // 2. Species markings (e.g. Clownfish stripes, Koi patches, Neon abdomen)
      if (type === 'clownfish' || type === 'koi' || type === 'neon') {
        const patternGeo = new THREE.SphereGeometry(0.51, 14, 10);
        patternGeo.scale(bodyLength * 0.6, bodyHeight * 0.92, bodyWidth * 1.03);
        const pattern = new THREE.Mesh(patternGeo, stripeMat);
        pattern.position.set(type === 'clownfish' ? 0.05 : 0.1, 0, 0);
        fishGroup.add(pattern);
      }

      // 3. Realistic Eyes (Right & Left)
      const eyeGeo = new THREE.SphereGeometry(0.045, 8, 8);
      const ringGeo = new THREE.RingGeometry(0.04, 0.065, 8);

      const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
      leftEye.position.set(bodyLength * 0.32, bodyHeight * 0.08, bodyWidth * 0.45);
      fishGroup.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
      rightEye.position.set(bodyLength * 0.32, bodyHeight * 0.08, -bodyWidth * 0.45);
      fishGroup.add(rightEye);

      // 4. Contoured Dorsal Fin (Top)
      const dorsalShape = new THREE.Shape();
      dorsalShape.moveTo(-bodyLength * 0.3, 0);
      dorsalShape.quadraticCurveTo(0, bodyHeight * 0.85, bodyLength * 0.15, 0);
      const dorsalGeo = new THREE.ShapeGeometry(dorsalShape);
      const dorsalFin = new THREE.Mesh(dorsalGeo, finMat);
      dorsalFin.position.set(0, bodyHeight * 0.45, 0);
      fishGroup.add(dorsalFin);

      // 5. Contoured Anal / Pelvic Fin (Bottom)
      const analShape = new THREE.Shape();
      analShape.moveTo(-bodyLength * 0.25, 0);
      analShape.quadraticCurveTo(-bodyLength * 0.05, -bodyHeight * 0.55, bodyLength * 0.05, 0);
      const analGeo = new THREE.ShapeGeometry(analShape);
      const analFin = new THREE.Mesh(analGeo, finMat);
      analFin.position.set(0, -bodyHeight * 0.45, 0);
      fishGroup.add(analFin);

      // 6. Pectoral Fins (Left & Right that fan gently)
      const pecShape = new THREE.Shape();
      pecShape.moveTo(0, 0);
      pecShape.lineTo(-0.25, 0.12);
      pecShape.lineTo(-0.35, 0);
      pecShape.lineTo(-0.25, -0.12);
      pecShape.closePath();
      const pecGeo = new THREE.ShapeGeometry(pecShape);

      const leftPectoral = new THREE.Mesh(pecGeo, finMat);
      leftPectoral.position.set(bodyLength * 0.12, -bodyHeight * 0.1, bodyWidth * 0.45);
      leftPectoral.rotation.y = 0.4;
      fishGroup.add(leftPectoral);

      const rightPectoral = new THREE.Mesh(pecGeo, finMat);
      rightPectoral.position.set(bodyLength * 0.12, -bodyHeight * 0.1, -bodyWidth * 0.45);
      rightPectoral.rotation.y = -0.4;
      fishGroup.add(rightPectoral);

      // 7. Serpentine Caudal Peduncle & Bifurcated Tail Fin
      const tailRoot = new THREE.Group();
      tailRoot.position.set(-bodyLength * 0.45, 0, 0);
      fishGroup.add(tailRoot);

      // Realistic bifurcated / forked tail
      const tailShape = new THREE.Shape();
      tailShape.moveTo(0, 0);
      tailShape.lineTo(-0.45, 0.38); // Upper fin tip
      tailShape.quadraticCurveTo(-0.28, 0, -0.45, -0.38); // Inner forked curve & lower tip
      tailShape.closePath();
      const tailGeo = new THREE.ShapeGeometry(tailShape);

      const tailFin = new THREE.Mesh(tailGeo, finMat);
      tailFin.position.set(-0.15, 0, 0);
      tailRoot.add(tailFin);

      // Spawn coordinates inside tank bounds
      const initialPos = new THREE.Vector3(
        -5 + Math.random() * 10,
        -2.5 + Math.random() * 4.8,
        -2 + Math.random() * 4
      );
      fishGroup.position.copy(initialPos);

      const initialTarget = new THREE.Vector3(
        -5 + Math.random() * 10,
        -2.5 + Math.random() * 4.8,
        -2 + Math.random() * 4
      );

      fishGroup.scale.set(scale, scale, scale);
      scene.add(fishGroup);

      return {
        group: fishGroup,
        spineSegments: [torso, tailRoot],
        tailFin,
        leftPectoral,
        rightPectoral,
        position: initialPos,
        target: initialTarget,
        velocity: new THREE.Vector3(),
        maxSpeed: speed,
        swimPhase: Math.random() * Math.PI * 2,
        burstTimer: Math.random() * 3,
        isGliding: false,
        speciesType: type
      };
    };

    // Instantiate 14 diverse, highly recognizable living species
    const speciesList: Array<{ type: 'koi' | 'clownfish' | 'discus' | 'neon' | 'yellowlab'; scale: number; speed: number }> = [
      { type: 'koi', scale: 0.95, speed: 0.022 },
      { type: 'koi', scale: 0.85, speed: 0.024 },
      { type: 'clownfish', scale: 0.75, speed: 0.018 },
      { type: 'clownfish', scale: 0.7, speed: 0.019 },
      { type: 'discus', scale: 0.88, speed: 0.015 },
      { type: 'discus', scale: 0.8, speed: 0.016 },
      { type: 'neon', scale: 0.65, speed: 0.026 },
      { type: 'neon', scale: 0.62, speed: 0.028 },
      { type: 'neon', scale: 0.64, speed: 0.025 },
      { type: 'yellowlab', scale: 0.78, speed: 0.021 },
      { type: 'yellowlab', scale: 0.74, speed: 0.022 },
      { type: 'clownfish', scale: 0.68, speed: 0.019 },
      { type: 'koi', scale: 0.8, speed: 0.023 },
      { type: 'discus', scale: 0.78, speed: 0.017 }
    ];

    speciesList.forEach((item) => {
      realisticFishes.push(createRealisticFish(item.type, item.scale, item.speed));
    });

    // RISING SHIMMERING BUBBLES
    const bubbleCount = 80;
    const bubbleGeo = new THREE.SphereGeometry(0.045, 6, 6);
    const bubbleMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.55
    });

    const bubbles: { mesh: THREE.Mesh; speed: number; wobbleSpeed: number; startX: number }[] = [];
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
      const startX = -6 + Math.random() * 12;
      bubble.position.set(startX, -3.8 + Math.random() * 7, -2.5 + Math.random() * 5);
      const scale = 0.5 + Math.random() * 1.5;
      bubble.scale.set(scale, scale, scale);
      scene.add(bubble);
      bubbles.push({
        mesh: bubble,
        speed: 0.018 + Math.random() * 0.03,
        wobbleSpeed: 1 + Math.random() * 3,
        startX
      });
    }

    // INTERACTIVE POINTER PARALLAX
    let targetCameraX = 0;
    let targetCameraY = 0.3;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetCameraX = x * 1.1;
      targetCameraY = 0.3 + y * 0.7;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    setIsLoaded(true);

    // ANIMATION LOOP WITH BURST-AND-GLIDE FISH BIOLOGY
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Camera parallax
      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Plant swaying
      plants.forEach((p) => {
        p.mesh.rotation.z = p.baseRot + Math.sin(elapsedTime * 1.5 + p.phase) * 0.11;
      });

      // Shifting caustic light beams
      topSunlight.position.x = Math.sin(elapsedTime * 0.6) * 2.8;
      topSunlight.position.z = 2 + Math.cos(elapsedTime * 0.4) * 1.6;

      // Realistic Fish Movement & Serpentine Swimming
      realisticFishes.forEach((fish) => {
        fish.burstTimer -= 0.016;
        if (fish.burstTimer <= 0) {
          fish.isGliding = !fish.isGliding;
          fish.burstTimer = fish.isGliding ? 0.8 + Math.random() * 1.2 : 1.5 + Math.random() * 2.5;
        }

        const currentSpeed = fish.isGliding ? fish.maxSpeed * 0.45 : fish.maxSpeed;

        const toTarget = new THREE.Vector3().subVectors(fish.target, fish.group.position);
        const dist = toTarget.length();

        if (dist < 0.8) {
          // New target inside tank
          fish.target.set(
            -5.5 + Math.random() * 11,
            -2.8 + Math.random() * 5.2,
            -2.2 + Math.random() * 4.4
          );
        } else {
          toTarget.normalize();
          fish.velocity.lerp(toTarget.multiplyScalar(currentSpeed), 0.05);
          fish.group.position.add(fish.velocity);

          // Smooth turning towards movement direction
          const targetHeading = Math.atan2(-fish.velocity.z, fish.velocity.x);
          let diffHeading = targetHeading - fish.group.rotation.y;
          // Normalize angle
          diffHeading = Math.atan2(Math.sin(diffHeading), Math.cos(diffHeading));
          fish.group.rotation.y += diffHeading * 0.045;

          // Banking into turns (roll)
          const rollAngle = -diffHeading * 0.4;
          fish.group.rotation.x = THREE.MathUtils.lerp(fish.group.rotation.x, rollAngle, 0.08);

          // Pitch (vertical angle)
          const pitchAngle = Math.atan2(fish.velocity.y, Math.sqrt(fish.velocity.x ** 2 + fish.velocity.z ** 2));
          fish.group.rotation.z = THREE.MathUtils.lerp(fish.group.rotation.z, pitchAngle * 0.5, 0.08);
        }

        // Serpentine Spine Wave Simulation
        const swimFreq = fish.isGliding ? 4 : 11;
        const wave = Math.sin(elapsedTime * swimFreq + fish.swimPhase);

        // Tail oscillation
        const tailGroup = fish.spineSegments[1];
        if (tailGroup) {
          tailGroup.rotation.y = wave * (fish.isGliding ? 0.22 : 0.48);
        }

        // Pectoral fin fanning
        const pecWave = Math.sin(elapsedTime * 8 + fish.swimPhase) * 0.25;
        fish.leftPectoral.rotation.y = 0.4 + pecWave;
        fish.rightPectoral.rotation.y = -0.4 - pecWave;
      });

      // Rising bubbles
      bubbles.forEach((b) => {
        b.mesh.position.y += b.speed;
        b.mesh.position.x = b.startX + Math.sin(elapsedTime * b.wobbleSpeed) * 0.12;

        if (b.mesh.position.y > 3.8) {
          b.mesh.position.y = -3.8;
          b.startX = -6 + Math.random() * 12;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  const chatUrl = generateStoreChatUrl(settings).url || '#';

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center overflow-hidden bg-slate-950 text-white">
      {/* 3D Canvas Container */}
      {webGLSupported ? (
        <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
      ) : (
        /* WebGL Fallback Banner */
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-screen"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=80')`
          }}
        />
      )}

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent pointer-events-none w-full md:w-3/4" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

      {/* 3D Scene Controls (Top Right) */}
      {webGLSupported && isLoaded && (
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
          <button
            onClick={toggleAnimation}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg backdrop-blur-md transition-colors"
            title={isPlaying ? 'Pause 3D scene' : 'Resume 3D scene'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-cyan-400" />
                <span>3D Active</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-slate-400" />
                <span>Paused</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="max-w-2xl">
          {/* Quiet Unboxed Kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-4">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Modern Aquarium Showroom &amp; Live Stock</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Direct WhatsApp Ordering</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6">
            Curators of Living Aquatic Art &amp; Nature.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-xl">
            Explore certified ornamental freshwater fish, Japanese champion koi, rimless aquascaping tanks, and avian companions. Every specimen is professionally conditioned, quarantined, and backed by expert guidance.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            <Link
              to="/category/freshwater-fish"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Freshwater Fish</span>
            </Link>

            <Link
              to="/category/aquariums-tanks"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-white font-medium text-sm border border-slate-700/70 backdrop-blur-sm transition-all active:scale-95"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Explore Aquariums</span>
            </Link>

            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-md shadow-emerald-900/30 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Showroom</span>
            </a>
          </div>

          {/* Live Trust Indicators (Quiet metadata without pills) */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
            <div>
              <p className="text-xl font-bold text-white">100%</p>
              <p className="text-xs text-slate-400 mt-0.5">Quarantined Stock</p>
            </div>
            <div>
              <p className="text-xl font-bold text-cyan-400">Zero-Loss</p>
              <p className="text-xs text-slate-400 mt-0.5">Live Arrival Guarantee</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">Instant</p>
              <p className="text-xs text-slate-400 mt-0.5">WhatsApp Confirmation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
