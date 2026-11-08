"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { siteContent } from "@/content/site";

// Tailwind skeleton loader fallback for the 3D Canvas
function HeroCanvasSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className="relative h-full w-full animate-pulse rounded-3xl bg-slate-200/40">
        <div className="absolute left-6 top-10 h-12 w-20 rounded-xl bg-slate-300/50 shadow-sm" />
        <div className="absolute right-8 top-16 h-14 w-16 rounded-xl bg-slate-300/50 shadow-sm" />
        <div className="absolute bottom-20 left-8 h-10 w-24 rounded-xl bg-slate-300/50 shadow-sm" />
        <div className="absolute bottom-24 right-10 h-12 w-14 rounded-full bg-slate-300/50 shadow-sm" />
      </div>
    </div>
  );
}

const HeroObjects = dynamic(() => import("@/components/3d/HeroObjects"), {
  ssr: false,
  loading: () => <HeroCanvasSkeleton />,
});

export default function HeroVisual() {
  const [notifications, setNotifications] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const first = window.setTimeout(() => setNotifications(1), 1500);
    const second = window.setTimeout(() => setNotifications(2), 3000);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const onMove = (event: MouseEvent) => {
      if (reduced.matches || mobile.matches) return;
      const rect = document.getElementById("hero-portrait")?.getBoundingClientRect();
      if (!rect) return;
      setOffset({
        x: Math.max(-10, Math.min(10, (event.clientX - rect.left - rect.width / 2) / 40)),
        y: Math.max(-10, Math.min(10, (event.clientY - rect.top - rect.height / 2) / 40)),
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px]">
      <HeroObjects />
      <div className="absolute bottom-4 left-1/2 z-10 h-8 w-40 -translate-x-1/2 rounded-[50%] bg-slate-900/15 blur-md motion-safe:animate-[shadow-breathe_5s_ease-in-out_infinite]" />
      <div
        id="hero-portrait"
        className="absolute inset-x-0 bottom-0 z-10 flex h-[95%] items-end justify-center"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        <div className="relative flex h-full w-full items-end justify-center motion-safe:animate-[portrait-bob_5s_ease-in-out_infinite]">
          <Image
            alt="Muhammad Fahad, AI automation engineer in Lahore"
            src="/fahad-cutout.png"
            width={768}
            height={811}
            priority={true}
            sizes="(max-width: 768px) 90vw, 440px"
            className="h-full w-auto max-w-full object-contain object-bottom"
          />
        </div>
      </div>
      <div
        className={`absolute bottom-6 left-2 z-20 max-w-[85%] rounded-xl border border-slate-200 bg-white p-3 shadow-md transition-all duration-300 sm:bottom-10 sm:-left-4 sm:max-w-xs sm:p-4 ${
          notifications > 0 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <p className="text-[10px] font-semibold text-slate-500 sm:text-xs">NEW WHATSAPP BOOKING</p>
        <p className="mt-1 text-xs font-semibold text-slate-900 sm:text-sm">
          {siteContent.hero.bookingNotification}
        </p>
      </div>
      <div
        className={`absolute right-2 top-10 z-20 max-w-[85%] rounded-xl border border-slate-200 bg-white p-3 shadow-md transition-all duration-300 sm:-right-2 sm:top-14 sm:max-w-xs sm:p-4 ${
          notifications > 1 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <p className="text-[10px] font-semibold text-slate-500 sm:text-xs">WHATSAPP AUTOMATION</p>
        <p className="mt-1 text-xs font-semibold text-slate-900 sm:text-sm">
          {siteContent.hero.reminderNotification}
        </p>
      </div>
    </div>
  );
}
