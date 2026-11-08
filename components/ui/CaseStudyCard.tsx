"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/content/site";

export type CaseStudy = {
  id: string;
  title: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  stack: readonly string[];
  results: readonly { number: string; label: string }[];
  video: string;
  poster: string;
  videoAlt: string;
  videoShape: string;
};

function VideoFrame({ study, onOpen }: { study: CaseStudy; onOpen: () => void }) {
  const [inView, setInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = frame.current;
    if (!target || !study.video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [study.video]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !study.video) return;
    if (inView) void video.play().catch(() => undefined);
    else video.pause();
  }, [inView, study.video]);

  return (
    <div
      ref={frame}
      className={`group relative mx-auto w-full overflow-hidden bg-slate-950 ${
        study.videoShape === "phone"
          ? "max-w-[300px] sm:max-w-[340px] md:max-w-[360px] rounded-[2rem] border-[6px] sm:border-[7px] border-slate-800"
          : "rounded-xl border border-slate-300"
      }`}
    >
      <div className={`relative ${study.videoShape === "phone" ? "aspect-[9/16]" : "aspect-video"}`}>
        {study.video ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            muted
            loop
            playsInline
            preload="none"
            poster={study.poster}
            aria-label={study.videoAlt}
          >
            <source src={study.video} type="video/mp4" />
            <track
              kind="captions"
              src={siteContent.work.videoCaptionsPath}
              srcLang="en"
              label={siteContent.work.videoCaptionsLabel}
              default
            />
          </video>
        ) : (
          <Image
            src={study.poster}
            alt={study.videoAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        )}
      </div>
      <button
        type="button"
        onClick={study.video ? onOpen : undefined}
        disabled={!study.video}
        className="absolute inset-x-3 bottom-3 min-h-11 rounded-lg bg-slate-950/85 px-4 text-sm font-semibold text-white opacity-100 transition hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        {study.video ? siteContent.work.demoButton : siteContent.work.videoFallback}
      </button>
    </div>
  );
}

function VideoModal({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${study.title} video demo`}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        dialogRef.current?.close();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          dialogRef.current?.close();
        }
      }}
      className="m-auto w-[min(94vw,900px)] max-w-none border-0 bg-slate-950 p-3 text-white backdrop:bg-slate-950/80 sm:p-5"
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <h3 className="font-semibold">{study.title}</h3>
        <button type="button" autoFocus onClick={() => dialogRef.current?.close()} className="rounded px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-white">
          {siteContent.work.closeDemo}
        </button>
      </div>
      {study.video ? (
        <video controls autoPlay playsInline poster={study.poster} className="max-h-[75vh] w-full bg-black">
          <source src={study.video} type="video/mp4" />
          <track kind="captions" src={siteContent.work.videoCaptionsPath} srcLang="en" label={siteContent.work.videoCaptionsLabel} default />
        </video>
      ) : (
        <Image src={study.poster} alt={study.videoAlt} width={1200} height={675} className="h-auto max-h-[75vh] w-full object-contain" />
      )}
      <p className="sr-only">{siteContent.work.videoCaptionsLabel}</p>
    </dialog>
  );
}

export default function CaseStudyCard({ study, featured = false }: { study: CaseStudy; featured?: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <article id={`case-${study.id}`} className={`grid grid-cols-1 gap-7 border-b border-slate-200 py-8 md:gap-10 ${featured ? "lg:grid-cols-[0.85fr_1.15fr] lg:items-center" : ""}`}>
      <VideoFrame study={study} onOpen={() => setModalOpen(true)} />
      <div className="flex flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-800">{study.industry}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl md:text-4xl">{study.title}</h3>
        <p className="mt-2 text-sm text-slate-500">{study.client}</p>
        <dl className="mt-5 space-y-4 text-sm leading-6">
          <div><dt className="font-semibold text-slate-900">{siteContent.work.problemLabel}</dt><dd className="text-slate-600">{study.problem}</dd></div>
          <div><dt className="font-semibold text-slate-900">{siteContent.work.builtLabel}</dt><dd className="text-slate-600">{study.solution}</dd></div>
        </dl>
        <ul aria-label={siteContent.work.technologyLabel} className="mt-5 flex flex-wrap gap-2">
          {study.stack.map((item) => <li key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{item}</li>)}
        </ul>
        <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-200 pt-4 sm:grid-cols-2 lg:grid-cols-3">
          {study.results.map((result) => (
            <div key={result.label} className="rounded-lg bg-slate-50/80 p-3 sm:bg-transparent sm:p-0">
              <p className="break-words text-lg font-bold text-blue-900 sm:text-xl">{result.number}</p>
              <p className="break-words text-xs leading-5 text-slate-600">{result.label}</p>
            </div>
          ))}
        </div>
      </div>
      {modalOpen && <VideoModal study={study} onClose={() => setModalOpen(false)} />}
    </article>
  );
}
