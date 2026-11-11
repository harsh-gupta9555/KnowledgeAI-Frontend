"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeNeuralCoreProps {
  className?: string;
  interactive?: boolean;
}

export default function ThreeNeuralCore({
  className = "w-full h-full min-h-[400px]",
  interactive = true,
}: ThreeNeuralCoreProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Glowing Nucleus (Intelligence Core)
    const nucleusGeo = new THREE.IcosahedronGeometry(1.2, 3);
    const nucleusMat = new THREE.MeshPhongMaterial({
      color: 0x4f46e5,
      emissive: 0x2563eb,
      emissiveIntensity: 0.8,
      shininess: 90,
      transparent: true,
      opacity: 0.85,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleus);

    // 2. Translucent Glass Shell
    const outerShellGeo = new THREE.SphereGeometry(1.75, 48, 48);
    const outerShellMat = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 1.2,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const outerShell = new THREE.Mesh(outerShellGeo, outerShellMat);
    coreGroup.add(outerShell);

    // 3. Neural Lattice / Network Cage
    const latticeGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const lattice = new THREE.Mesh(latticeGeo, latticeMat);
    coreGroup.add(lattice);

    // 4. Neural Nodes on Lattice Vertices
    const nodePositions = latticeGeo.attributes.position;
    const nodesGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd });
    for (let i = 0; i < nodePositions.count; i += 3) {
      const node = new THREE.Mesh(nodesGeo, nodeMat);
      node.position.set(
        nodePositions.getX(i),
        nodePositions.getY(i),
        nodePositions.getZ(i)
      );
      coreGroup.add(node);
    }

    // 5. Data Rings / Retrieval Orbitals
    const orbitalRings: { mesh: THREE.Mesh; speed: number }[] = [];
    const ringParams = [
      { rad: 2.5, rotX: 1.1, rotY: 0.3, col: 0x6366f1, speed: 0.008 },
      { rad: 2.8, rotX: -0.8, rotY: 0.9, col: 0x0ea5e9, speed: -0.006 },
      { rad: 3.1, rotX: 0.5, rotZ: 1.2, col: 0xa855f7, speed: 0.005 },
    ];

    ringParams.forEach((param) => {
      const ringGeo = new THREE.RingGeometry(param.rad - 0.015, param.rad + 0.015, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: param.col,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = param.rotX;
      if (param.rotY) ring.rotation.y = param.rotY;
      if (param.rotZ) (ring.rotation as any).z = param.rotZ;
      scene.add(ring);
      orbitalRings.push({ mesh: ring, speed: param.speed });
    });

    // 6. Floating Document & Knowledge Particles
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 2.0 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = r * Math.cos(phi);

      // Gradient blues and purples
      particleColors[i] = 0.3 + Math.random() * 0.4;
      particleColors[i + 1] = 0.6 + Math.random() * 0.4;
      particleColors[i + 2] = 0.95;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x1e1b4b, 1.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 20);
    pointLight1.position.set(4, 5, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 3.5, 20);
    pointLight2.position.set(-4, -3, 3);
    scene.add(pointLight2);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      targetX = (e.clientX - halfX) * 0.0006;
      targetY = (e.clientY - halfY) * 0.0006;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 500;
      const newHeight = container.clientHeight || 500;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Subtle floating and rotation
      coreGroup.rotation.y += 0.006;
      coreGroup.rotation.x = Math.sin(time * 0.5) * 0.15;
      coreGroup.position.y = Math.sin(time * 1.2) * 0.15;

      lattice.rotation.y -= 0.003;
      nucleus.rotation.z += 0.004;

      // Orbital rings spin
      orbitalRings.forEach((orb) => {
        orb.mesh.rotation.z += orb.speed;
      });

      // Particle cloud rotation
      particles.rotation.y = time * 0.04;
      particles.rotation.x = Math.cos(time * 0.3) * 0.05;

      // Mouse parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      scene.rotation.y = mouseX;
      scene.rotation.x = mouseY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return <div ref={mountRef} className={className} />;
}
