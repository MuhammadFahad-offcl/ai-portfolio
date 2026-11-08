"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";

function Objects() {
  const group = useRef<Group>(null);
  const chatBubble = useRef<Group>(null);
  const calendar = useRef<Group>(null);
  const clock = useRef<Group>(null);
  const workflow = useRef<Group>(null);
  const cursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (event: PointerEvent) => {
      cursor.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursor.current.y = 1 - (event.clientY / window.innerHeight) * 2;
    };
    window.addEventListener("pointermove", updateCursor, { passive: true });
    return () => window.removeEventListener("pointermove", updateCursor);
  }, []);

  useFrame(({ clock: frameClock }) => {
    if (!group.current) return;
    group.current.rotation.y += (cursor.current.x * 0.12 - group.current.rotation.y) * 0.025;
    group.current.rotation.x += (-cursor.current.y * 0.08 - group.current.rotation.x) * 0.025;
    group.current.position.y = Math.sin(frameClock.elapsedTime * 0.25) * 0.06;
    const scrollDrift = Math.min(window.scrollY / 1200, 1) * 0.1;
    if (chatBubble.current) chatBubble.current.position.x = -1.2 - scrollDrift;
    if (calendar.current) calendar.current.position.x = 1.15 + scrollDrift;
    if (clock.current) clock.current.position.x = 1.4 + scrollDrift;
    if (workflow.current) workflow.current.position.x = -1.3 - scrollDrift;
  });

  return (
    <group ref={group}>
      <Float speed={0.65} rotationIntensity={0.08} floatIntensity={0.16}>
        <group ref={chatBubble} position={[-1.2, 0.5, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.56, 0.16]} />
            <meshStandardMaterial color="#25D366" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <coneGeometry args={[0.12, 0.19, 3]} />
            <meshStandardMaterial color="#25D366" roughness={0.8} />
          </mesh>
          {[-0.19, 0, 0.19].map((x) => (
            <mesh key={x} position={[x, 0, 0.09]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial color="#FAFAF7" roughness={1} />
            </mesh>
          ))}
        </group>
      </Float>

      <Float speed={0.45} rotationIntensity={0.05} floatIntensity={0.12}>
        <group ref={calendar} position={[1.15, 0.8, -0.25]}>
          <mesh>
            <boxGeometry args={[0.76, 0.82, 0.18]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.75} />
          </mesh>
          <mesh position={[0, 0.22, 0.1]}>
            <boxGeometry args={[0.76, 0.2, 0.04]} />
            <meshStandardMaterial color="#dbeafe" roughness={1} />
          </mesh>
          <mesh position={[0.03, -0.08, 0.13]} rotation={[0, 0, -0.7]}>
            <boxGeometry args={[0.08, 0.27, 0.035]} />
            <meshStandardMaterial color="#FAFAF7" roughness={1} />
          </mesh>
          <mesh position={[0.19, -0.02, 0.13]} rotation={[0, 0, 0.72]}>
            <boxGeometry args={[0.08, 0.42, 0.035]} />
            <meshStandardMaterial color="#FAFAF7" roughness={1} />
          </mesh>
        </group>
      </Float>

      <Float speed={0.35} rotationIntensity={0.05} floatIntensity={0.1}>
        <group ref={clock} position={[1.4, -0.6, 0.1]}>
          <mesh>
            <cylinderGeometry args={[0.43, 0.43, 0.14, 32]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.09]}>
            <torusGeometry args={[0.31, 0.035, 8, 32]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.75} />
          </mesh>
          <mesh position={[0.08, 0.09, 0.16]} rotation={[0, 0, -0.5]}>
            <boxGeometry args={[0.045, 0.2, 0.03]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
          </mesh>
          <mesh position={[-0.05, 0, 0.16]}>
            <boxGeometry args={[0.19, 0.045, 0.03]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
          </mesh>
        </group>
      </Float>

      <Float speed={0.55} rotationIntensity={0.1} floatIntensity={0.15}>
        <group ref={workflow} position={[-1.3, -0.75, -0.2]}>
          <mesh>
            <torusKnotGeometry args={[0.24, 0.075, 48, 8, 2, 3]} />
            <meshStandardMaterial color="#2563eb" roughness={0.86} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function HeroObjects() {
  const [visible, setVisible] = useState(false);
  const [staticOnly, setStaticOnly] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const update = () => setStaticOnly(reduced.matches || mobile.matches);
    update();
    reduced.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const element = document.getElementById("hero-objects-canvas");
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="hero-objects-canvas"
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
    >
      {staticOnly ? (
        <Image src="/hero/objects-fallback.png" alt="" fill sizes="(max-width: 768px) 100vw, 440px" className="object-contain" />
      ) : (
        <Canvas
          frameloop={visible ? "always" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 40 }}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          style={{ pointerEvents: "none" }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 4, 5]} intensity={2} />
          <Objects />
        </Canvas>
      )}
    </div>
  );
}
