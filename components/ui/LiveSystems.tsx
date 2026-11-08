"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppLink, siteContent } from "@/content/site";

const engineLogs = siteContent.demo.terminal;
const architectureBadges = siteContent.demo.technologies;
const chatMessages = siteContent.demo.chat;

function AppointmentPhone() {
  return (
    <div className="mx-auto flex h-[720px] w-full max-w-[360px] flex-col overflow-hidden rounded-[3rem] border-4 border-slate-800 bg-slate-50 shadow-2xl shadow-blue-900/50">
      <div className="relative flex h-12 shrink-0 items-center justify-center bg-white">
        <div className="absolute top-0 h-5 w-28 rounded-b-2xl bg-slate-800" />
      </div>

      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
        <span aria-hidden="true" className="text-xl text-slate-500">
          ‹
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-xs font-bold text-white">
          {siteContent.demo.phoneAvatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">          {siteContent.demo.clinicLabel}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />
            {siteContent.demo.assistantLabel}
          </p>
        </div>
      </header>

      <div className="scrollbar-hide flex flex-1 flex-col gap-3 overflow-y-auto bg-[#e9edef] px-3 py-4">
        <p className="mx-auto rounded-lg bg-white/80 px-3 py-1 text-[10px] font-medium text-slate-500 shadow-sm">
          {siteContent.demo.dayLabel}
        </p>
        {chatMessages.map((message) => {
          const isAgent = message.from === "agent";

          return (
            <div
              key={`${message.time}-${message.english}`}
              className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                isAgent
                  ? "self-start rounded-tl-sm bg-white text-slate-700"
                  : "self-end rounded-tr-sm bg-slate-200 text-slate-800"
              }`}
            >
              <p className="text-xs leading-5 sm:text-[13px]">{message.english}</p>
              <p
                lang="ur"
                dir="rtl"
                className="mt-1 text-right text-xs leading-5 text-slate-600"
              >
                {message.urdu}
              </p>
              <p className="mt-1 text-right text-[10px] text-slate-400">
                {message.time}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center gap-2 bg-[#f0f2f5] px-3 py-3">
        <span className="flex-1 rounded-full bg-white px-4 py-2.5 text-xs text-slate-400">
          {siteContent.demo.messagePlaceholder}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-white">
          <MessageCircle aria-hidden="true" size={17} />
        </span>
      </div>
    </div>
  );
}

function EngineLog() {
  const [visibleLogs, setVisibleLogs] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = logRef.current;
    if (!target) return;

    let timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setVisibleLogs(engineLogs.length);
          return;
        }

        timers = engineLogs.map((_, index) =>
          window.setTimeout(() => setVisibleLogs(index + 1), 350 + index * 450),
        );
      },
      { threshold: 0.3 },
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <div
      ref={logRef}
      className="mt-6 flex-grow rounded-xl border border-slate-800 bg-black p-4 font-mono text-sm"
    >
      <div
        aria-label={siteContent.demo.architectureLogLabel}
        aria-live="polite"
        className="space-y-3 overflow-y-auto text-xs leading-6 sm:text-sm"
      >
        {engineLogs.slice(0, visibleLogs).map((log, index) => (
          <p
            key={log}
            className={`break-words reveal-up ${
              index === engineLogs.length - 1
                ? "font-semibold text-green-300"
                : "text-blue-300"
            }`}
          >
            {log}
          </p>
        ))}
        {visibleLogs < engineLogs.length && (
          <span
            aria-hidden="true"
            className="inline-block h-4 w-2 animate-pulse bg-blue-300 align-middle"
          />
        )}
      </div>
    </div>
  );
}

export default function LiveSystems() {
  return (
    <section
      id="demo"
      aria-labelledby="live-systems-title"
      className="relative isolate overflow-hidden bg-slate-950 px-6 py-16 text-white sm:px-10 md:py-24 lg:px-16"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="mb-10 max-w-3xl">
          <p className="mb-4 text-sm font-bold tracking-widest text-blue-500">
            {siteContent.demo.eyebrow}
          </p>
          <h2
            id="live-systems-title"
            className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-white md:text-5xl"
          >
            {siteContent.demo.title}
          </h2>
        </header>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <AppointmentPhone />
          </div>

          <div className="h-full lg:col-span-7">
            <div className="flex h-full min-h-[600px] flex-col justify-between rounded-3xl border border-blue-500/20 bg-blue-950/40 p-6 backdrop-blur-xl sm:p-8">
              <div className="flex flex-1 flex-col">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                  <h3 className="text-lg font-semibold text-white">
                    {siteContent.demo.architecture}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {architectureBadges.map((badge) => (
                    <div
                      key={badge.title}
                      className="flex flex-col gap-1 rounded-xl border border-slate-700 bg-slate-900/50 p-4"
                    >
                      <p className="text-xs text-slate-400">{badge.title}</p>
                      <p                       className={`text-sm font-semibold ${badge.title === "Delivery" ? "text-emerald-300" : "text-blue-300"}`}>
                        {badge.value}
                      </p>
                    </div>
                  ))}
                </div>

                <EngineLog />
              </div>

              <div className="mt-8 border-t border-blue-500/20 pt-8">
                <h3 className="mb-2 text-2xl font-extrabold text-white">
                  {siteContent.demo.action}
                </h3>
                <p className="mb-6 text-slate-300">
                  {siteContent.demo.subtext}
                </p>
                <a
                  href={getWhatsAppLink("demo")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 py-4 text-center text-lg font-bold text-white transition-colors hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                >
                  <MessageCircle aria-hidden="true" size={22} />
                  {siteContent.demo.action}
                </a>
                <p className="mt-3 text-center text-xs text-slate-400">{siteContent.demo.actionNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
