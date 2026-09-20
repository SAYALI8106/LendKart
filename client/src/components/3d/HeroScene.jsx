import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Sphere, Cylinder, Torus } from '@react-three/drei';
import FallbackHero2D from './FallbackHero2D';

// 3D Model: Smart Projector
const ProjectorModel = ({ position, rotation }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Main Projector Chassis */}
      <RoundedBox args={[2.2, 1.1, 2.0]} radius={0.12} smoothness={4} castShadow>
        <meshStandardMaterial color="#1a1d24" metalness={0.7} roughness={0.25} />
      </RoundedBox>

      {/* Front Optical Bezel */}
      <mesh position={[0, 0, 1.02]}>
        <planeGeometry args={[1.9, 0.8]} />
        <meshStandardMaterial color="#0f1117" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Projector Glass Lens */}
      <Cylinder args={[0.38, 0.38, 0.4, 32]} rotation={[Math.PI / 2, 0, 0]} position={[-0.45, 0.05, 1.15]}>
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </Cylinder>

      {/* Laser Light Cone Simulation */}
      <Cylinder
        args={[0.38, 1.2, 1.8, 32, 1, true]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-0.45, 0.05, 2.1]}
      >
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.15} wireframe={false} />
      </Cylinder>

      {/* Status LED */}
      <Sphere args={[0.04, 16, 16]} position={[0.65, 0.4, 1.02]}>
        <meshStandardMaterial color="#B8FF6A" emissive="#B8FF6A" emissiveIntensity={1.5} />
      </Sphere>
    </group>
  );
};

// 3D Model: SLR Camera
const CameraModel = ({ position }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = -Math.cos(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Camera Body */}
      <RoundedBox args={[1.5, 1.0, 0.7]} radius={0.08} smoothness={4} castShadow>
        <meshStandardMaterial color="#14171d" roughness={0.4} metalness={0.6} />
      </RoundedBox>
      {/* Viewfinder Bump */}
      <RoundedBox args={[0.5, 0.35, 0.6]} radius={0.05} position={[0, 0.55, -0.05]}>
        <meshStandardMaterial color="#1f232d" roughness={0.3} metalness={0.7} />
      </RoundedBox>
      {/* Pro Lens Cylinder */}
      <Cylinder args={[0.36, 0.36, 0.7, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.6]}>
        <meshStandardMaterial color="#2d3340" metalness={0.8} roughness={0.2} />
      </Cylinder>
      {/* Gold Ring on Lens */}
      <Torus args={[0.37, 0.02, 16, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.75]}>
        <meshStandardMaterial color="#EAB308" metalness={0.9} roughness={0.2} />
      </Torus>
    </group>
  );
};

// 3D Model: Wireless Gaming Controller
const ControllerModel = ({ position }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position} rotation={[0.4, -0.4, 0.2]}>
      {/* Main Controller Shell */}
      <RoundedBox args={[1.6, 0.8, 0.4]} radius={0.16} smoothness={4} castShadow>
        <meshStandardMaterial color="#7C5CFF" roughness={0.3} metalness={0.5} />
      </RoundedBox>
      {/* Left Grip */}
      <Cylinder args={[0.2, 0.28, 0.9, 16]} rotation={[0, 0, -0.5]} position={[-0.7, -0.4, 0]}>
        <meshStandardMaterial color="#181b24" roughness={0.6} />
      </Cylinder>
      {/* Right Grip */}
      <Cylinder args={[0.2, 0.28, 0.9, 16]} rotation={[0, 0, 0.5]} position={[0.7, -0.4, 0]}>
        <meshStandardMaterial color="#181b24" roughness={0.6} />
      </Cylinder>
      {/* Thumbsticks */}
      <Cylinder args={[0.12, 0.12, 0.1, 16]} position={[-0.3, -0.05, 0.25]}>
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.8} />
      </Cylinder>
      <Cylinder args={[0.12, 0.12, 0.1, 16]} position={[0.3, -0.15, 0.25]}>
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.8} />
      </Cylinder>
    </group>
  );
};

// 3D Model: Studio Headphones
const HeadphonesModel = ({ position }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Headband Arc */}
      <Torus args={[0.65, 0.05, 16, 32, Math.PI]} rotation={[0, 0, 0]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
      </Torus>
      {/* Left Earcup */}
      <Cylinder args={[0.25, 0.25, 0.2, 24]} rotation={[0, 0, Math.PI / 2]} position={[-0.65, 0.1, 0]}>
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </Cylinder>
      {/* Right Earcup */}
      <Cylinder args={[0.25, 0.25, 0.2, 24]} rotation={[0, 0, Math.PI / 2]} position={[0.65, 0.1, 0]}>
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </Cylinder>
    </group>
  );
};

// Main Scene Composition with Parallax Mouse Movement
const InteractiveScene = ({ mouse }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      // Smooth interpolation towards mouse position
      groupRef.current.rotation.y += (mouse.current[0] * 0.35 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-mouse.current[1] * 0.25 - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center 4K Projector */}
      <Float speed={2.0} rotationIntensity={0.4} floatIntensity={0.8}>
        <ProjectorModel position={[0, 0.1, 0]} rotation={[0.15, -0.3, 0]} />
      </Float>

      {/* Floating Camera Top Left */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <CameraModel position={[-2.4, 1.4, -0.5]} />
      </Float>

      {/* Floating Gaming Controller Right */}
      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1.0}>
        <ControllerModel position={[2.4, 0.8, -0.3]} />
      </Float>

      {/* Floating Studio Headphones Bottom Left */}
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.7}>
        <HeadphonesModel position={[-2.2, -1.2, 0.2]} />
      </Float>

      {/* Futuristic Orbiting Rental Nodes */}
      <Float speed={3.0} floatIntensity={1.5}>
        <Sphere args={[0.15, 16, 16]} position={[2.1, -1.3, 0.5]}>
          <meshStandardMaterial color="#B8FF6A" emissive="#B8FF6A" emissiveIntensity={1.2} />
        </Sphere>
      </Float>
    </group>
  );
};

export const HeroScene = () => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const mouse = useRef([0, 0]);

  useEffect(() => {
    // Check WebGL support
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
    <div className="relative w-full h-[480px] lg:h-[580px] select-none">
      <Suspense fallback={<FallbackHero2D />}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
          <pointLight position={[-4, -3, 2]} intensity={2.0} color="#7C5CFF" />
          <pointLight position={[4, 2, 3]} intensity={2.5} color="#00D4FF" />
          <InteractiveScene mouse={mouse} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default HeroScene;
