"use client";

import { useEffect, useState } from "react";

const messageTimes = [
  [450, 1],
  [1350, 2],
  [2600, 3],
  [4250, 4],
  [5150, 5],
  [6500, 6],
] as const;

export default function WhatsappDemo() {
  const [step, setStep] = useState(0);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const timers = messageTimes.map(([delay, nextStep]) =>
      window.setTimeout(() => setStep(nextStep), delay),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [replayKey]);

  function replay() {
    setStep(0);
    setReplayKey((key) => key + 1);
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3 sm:p-4">
      <div className="mx-auto w-full max-w-[300px] sm:max-w-sm rounded-[2.5rem] border-[6px] sm:border-[7px] border-slate-800 bg-slate-900 p-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.7)]">
        <div className="relative flex h-[480px] sm:h-[520px] flex-col overflow-hidden rounded-[1.9rem] bg-[#f3f5f8]">
          <div className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-900" />
          <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 pb-3 pt-7">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-900 text-xs font-semibold tracking-wide text-white">
              AI
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">AI Assistant</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Online
              </p>
            </div>
          </header>

          <div
            aria-label="Simulated WhatsApp conversation"
            aria-live="polite"
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-4"
          >
            {step >= 1 && (
              <p className="ml-auto max-w-[86%] rounded-2xl rounded-tr-sm bg-blue-900 px-3.5 py-2.5 text-xs leading-5 text-white shadow-sm sm:text-sm">
                Hi, I need to book a hospital appointment for tomorrow at 3 PM.
                <span className="mt-1 block text-right text-[10px] text-blue-100">
                  10:41 AM
                </span>
              </p>
            )}

            {step === 2 && <TypingIndicator />}

            {step >= 3 && (
              <p className="max-w-[88%] rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-3.5 py-2.5 text-xs leading-5 text-slate-700 shadow-sm sm:text-sm">
                Checking the hospital schedule... 3:00 PM is available. What is your name?
                <span className="mt-1 block text-right text-[10px] text-slate-400">
                  10:41 AM
                </span>
              </p>
            )}

            {step >= 4 && (
              <p className="ml-auto max-w-[86%] rounded-2xl rounded-tr-sm bg-blue-900 px-3.5 py-2.5 text-xs leading-5 text-white shadow-sm sm:text-sm">
                Muhammad Fahad.
                <span className="mt-1 block text-right text-[10px] text-blue-100">
                  10:42 AM
                </span>
              </p>
            )}

            {step === 5 && <TypingIndicator />}

            {step >= 6 && (
              <p className="max-w-[90%] rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-3.5 py-2.5 text-xs leading-5 text-slate-700 shadow-sm sm:text-sm">
                Great! Your hospital appointment is confirmed for tomorrow at
                3:00 PM. Your confirmation has been sent to WhatsApp.
                <span className="mt-1 block text-right text-[10px] text-slate-400">
                  10:42 AM
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={replay}
        className="mx-auto mt-4 flex min-h-10 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-medium text-slate-200 transition hover:border-blue-400 hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        <span aria-hidden="true" className="mr-2">
          ↺
        </span>
        Replay Demo
      </button>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div
      aria-label="AI Assistant is typing"
      className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 shadow-sm"
    >
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 motion-reduce:animate-none"
          style={{ animationDelay: `${dot * 150}ms` }}
        />
      ))}
    </div>
  );
}
