import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Sphere, Cylinder, Torus } from '@react-three/drei';
import FallbackHero2D from './FallbackHero2D';

// 3D Model: Smart Projector (Refined Industrial Design)
const ProjectorModel = ({ position, rotation }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Main Projector Chassis */}
      <RoundedBox args={[2.2, 1.1, 2.0]} radius={0.14} smoothness={4} castShadow>
        <meshStandardMaterial color="#232C28" metalness={0.6} roughness={0.35} />
      </RoundedBox>

      {/* Front Optical Bezel */}
      <mesh position={[0, 0, 1.02]}>
        <planeGeometry args={[1.9, 0.8]} />
        <meshStandardMaterial color="#18201C" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Projector Glass Lens */}
      <Cylinder args={[0.38, 0.38, 0.35, 32]} rotation={[Math.PI / 2, 0, 0]} position={[-0.45, 0.05, 1.12]}>
        <meshStandardMaterial
          color="#176B52"
          emissive="#176B52"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.8}
        />
      </Cylinder>

      {/* Subtle Lens Projection Ambient Glow */}
      <Cylinder
        args={[0.38, 1.1, 1.6, 32, 1, true]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-0.45, 0.05, 2.0]}
      >
        <meshBasicMaterial color="#8EAFA0" transparent opacity={0.08} wireframe={false} />
      </Cylinder>

      {/* Terracotta Status Indicator */}
      <Sphere args={[0.04, 16, 16]} position={[0.65, 0.4, 1.02]}>
        <meshStandardMaterial color="#C96F52" emissive="#C96F52" emissiveIntensity={0.8} />
      </Sphere>
    </group>
  );
};

// 3D Model: SLR Camera
const CameraModel = ({ position }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = -Math.cos(state.clock.getElapsedTime() * 0.4) * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Camera Body */}
      <RoundedBox args={[1.5, 1.0, 0.7]} radius={0.08} smoothness={4} castShadow>
        <meshStandardMaterial color="#1C2420" roughness={0.4} metalness={0.5} />
      </RoundedBox>
      {/* Viewfinder Bump */}
      <RoundedBox args={[0.5, 0.35, 0.6]} radius={0.05} position={[0, 0.55, -0.05]}>
        <meshStandardMaterial color="#28332D" roughness={0.3} metalness={0.6} />
      </RoundedBox>
      {/* Pro Lens Cylinder */}
      <Cylinder args={[0.36, 0.36, 0.7, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.6]}>
        <meshStandardMaterial color="#2B3630" metalness={0.7} roughness={0.25} />
      </Cylinder>
      {/* Champagne Gold Ring on Lens */}
      <Torus args={[0.37, 0.02, 16, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.75]}>
        <meshStandardMaterial color="#D4A373" metalness={0.8} roughness={0.3} />
      </Torus>
    </group>
  );
};

// 3D Model: Wireless Gaming Controller (Evergreen Shell)
const ControllerModel = ({ position }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position} rotation={[0.4, -0.4, 0.2]}>
      {/* Main Controller Shell */}
      <RoundedBox args={[1.6, 0.8, 0.4]} radius={0.16} smoothness={4} castShadow>
        <meshStandardMaterial color="#176B52" roughness={0.4} metalness={0.3} />
      </RoundedBox>
      {/* Left Grip */}
      <Cylinder args={[0.2, 0.28, 0.9, 16]} rotation={[0, 0, -0.5]} position={[-0.7, -0.4, 0]}>
        <meshStandardMaterial color="#1B221E" roughness={0.6} />
      </Cylinder>
      {/* Right Grip */}
      <Cylinder args={[0.2, 0.28, 0.9, 16]} rotation={[0, 0, 0.5]} position={[0.7, -0.4, 0]}>
        <meshStandardMaterial color="#1B221E" roughness={0.6} />
      </Cylinder>
      {/* Thumbsticks in Sage */}
      <Cylinder args={[0.12, 0.12, 0.1, 16]} position={[-0.3, -0.05, 0.25]}>
        <meshStandardMaterial color="#8EAFA0" roughness={0.4} />
      </Cylinder>
      <Cylinder args={[0.12, 0.12, 0.1, 16]} position={[0.3, -0.15, 0.25]}>
        <meshStandardMaterial color="#8EAFA0" roughness={0.4} />
      </Cylinder>
    </group>
  );
};

// 3D Model: Studio Headphones
const HeadphonesModel = ({ position }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Headband Arc */}
      <Torus args={[0.65, 0.05, 16, 32, Math.PI]} rotation={[0, 0, 0]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#5E6B65" metalness={0.8} roughness={0.2} />
      </Torus>
      {/* Left Earcup */}
      <Cylinder args={[0.25, 0.25, 0.2, 24]} rotation={[0, 0, Math.PI / 2]} position={[-0.65, 0.1, 0]}>
        <meshStandardMaterial color="#1C2420" roughness={0.5} />
      </Cylinder>
      {/* Right Earcup */}
      <Cylinder args={[0.25, 0.25, 0.2, 24]} rotation={[0, 0, Math.PI / 2]} position={[0.65, 0.1, 0]}>
        <meshStandardMaterial color="#1C2420" roughness={0.5} />
      </Cylinder>
    </group>
  );
};

// Main Scene Composition with Parallax Mouse Movement
const InteractiveScene = ({ mouse }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      // Gentle, smooth interpolation towards mouse position
      groupRef.current.rotation.y += (mouse.current[0] * 0.16 - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (-mouse.current[1] * 0.12 - groupRef.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={groupRef} scale={0.76}>
      {/* Center 4K Projector */}
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.35}>
        <ProjectorModel position={[0, 0, 0]} rotation={[0.1, -0.22, 0]} />
      </Float>

      {/* Floating Camera Top Left */}
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
        <CameraModel position={[-1.6, 1.1, -0.2]} />
      </Float>

      {/* Floating Gaming Controller Right */}
      <Float speed={1.7} rotationIntensity={0.25} floatIntensity={0.4}>
        <ControllerModel position={[1.65, 0.55, -0.2]} />
      </Float>

      {/* Floating Studio Headphones Bottom Left */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.35}>
        <HeadphonesModel position={[-1.5, -0.95, 0.1]} />
      </Float>

      {/* Community Shared Token (Sage Orb) Bottom Right */}
      <Float speed={1.9} floatIntensity={0.4}>
        <Sphere args={[0.15, 16, 16]} position={[1.5, -0.95, 0.3]}>
          <meshStandardMaterial color="#8EAFA0" roughness={0.3} metalness={0.2} />
        </Sphere>
      </Float>

      {/* Subtle Terracotta Accent Pearl */}
      <Float speed={1.6} floatIntensity={0.35}>
        <Sphere args={[0.08, 16, 16]} position={[-0.15, 1.25, -0.3]}>
          <meshStandardMaterial color="#C96F52" roughness={0.4} metalness={0.2} />
        </Sphere>
      </Float>
    </group>
  );
};

const AmbientObjectScene = () => {
  return (
    <group scale={0.5}>
      <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.3}>
        <CameraModel position={[-5.2, 2.9, -0.7]} />
      </Float>
      <Float speed={0.91} rotationIntensity={0.16} floatIntensity={0.25}>
        <ProjectorModel position={[4.8, 1.7, -1.4]} rotation={[0.08, 0.3, 0]} />
      </Float>
      <Float speed={1.31} rotationIntensity={0.2} floatIntensity={0.3}>
        <ControllerModel position={[-4.7, -2.6, -0.4]} />
      </Float>
      <Float speed={1.18} rotationIntensity={0.16} floatIntensity={0.28}>
        <HeadphonesModel position={[4.3, -2.9, -1.1]} />
      </Float>
      <Float speed={1.42} floatIntensity={0.24}>
        <Sphere args={[0.14, 16, 16]} position={[-0.7, 3.7, -0.8]}>
          <meshStandardMaterial color="#8EAFA0" roughness={0.3} metalness={0.2} />
        </Sphere>
      </Float>

      <Float speed={0.82} rotationIntensity={0.14} floatIntensity={0.22}>
        <CameraModel position={[-2.3, -4.0, -1.8]} />
      </Float>
      <Float speed={1.48} rotationIntensity={0.12} floatIntensity={0.2}>
        <ProjectorModel position={[2.1, -3.7, -1.1]} rotation={[-0.1, -0.35, 0.08]} />
      </Float>
      <Float speed={0.96} rotationIntensity={0.18} floatIntensity={0.26}>
        <ControllerModel position={[-2.1, 4.0, -1.3]} />
      </Float>
      <Float speed={1.62} rotationIntensity={0.14} floatIntensity={0.2}>
        <HeadphonesModel position={[2.7, 3.3, -1.5]} />
      </Float>
      <Float speed={1.1} floatIntensity={0.18}>
        <Sphere args={[0.1, 16, 16]} position={[-3.4, 0.8, -1]}>
          <meshStandardMaterial color="#C96F52" roughness={0.4} metalness={0.2} />
        </Sphere>
      </Float>
      <Float speed={1.34} floatIntensity={0.2}>
        <Sphere args={[0.11, 16, 16]} position={[3.5, -0.8, -1.1]}>
          <meshStandardMaterial color="#8EAFA0" roughness={0.3} metalness={0.2} />
        </Sphere>
      </Float>

      <Float speed={1.02} rotationIntensity={0.12} floatIntensity={0.2}>
        <CameraModel position={[0.3, -1.1, -2.2]} />
      </Float>
      <Float speed={1.56} rotationIntensity={0.15} floatIntensity={0.18}>
        <ControllerModel position={[0.2, 1.3, -2.4]} />
      </Float>
    </group>
  );
};

export const AmbientObjectField = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px), (prefers-reduced-motion: reduce)');
    const update = () => setIsEnabled(!mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="ambient-object-field" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.05} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} color="#FFFBF0" />
        <pointLight position={[-4, -3, 2]} intensity={0.55} color="#176B52" />
        <Float speed={0.18} rotationIntensity={0.04} floatIntensity={0.08}>
          <AmbientObjectScene />
        </Float>
      </Canvas>
    </div>
  );
};

export const HeroScene = () => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const mouse = useRef([0, 0]);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setHasWebGL(supported);
    } catch (e) {
      setHasWebGL(false);
    }

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current = [x, y];
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!hasWebGL) {
    return <FallbackHero2D />;
  }

  return (
    <div className="hero-scene-stage relative w-full h-[280px] sm:h-[460px] lg:h-[500px] select-none flex items-center justify-center">
      <Suspense fallback={<FallbackHero2D />}>
        <Canvas
          camera={{ position: [0, 0, 6.8], fov: 42 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.95} />
          <directionalLight position={[5, 7, 5]} intensity={1.4} color="#FFFBF0" />
          <pointLight position={[-4, -3, 2]} intensity={1.2} color="#176B52" />
          <pointLight position={[4, 2, 3]} intensity={1.0} color="#C96F52" />
          <InteractiveScene mouse={mouse} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default HeroScene;
