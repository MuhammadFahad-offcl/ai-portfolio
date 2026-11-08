"use client";

import { siteContent } from "@/content/site";
import Reveal from "@/components/ui/Reveal";

export function Step({
  number,
  title,
  description,
  clientAction,
  myAction,
}: (typeof siteContent.process.steps)[number]) {
  return (
    <div className="relative bg-[#FAFAF7] pt-2 md:pt-0">
      <span className="text-4xl font-light tracking-[-0.04em] text-blue-800">{number}</span>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <p className="mt-4 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-600">
        <span className="font-semibold text-slate-900">{siteContent.process.youLabel}</span> {clientAction}
        <span className="px-1 text-slate-400">·</span>
        <span className="font-semibold text-slate-900">{siteContent.process.meLabel}</span> {myAction}
      </p>
    </div>
  );
}

export function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  id,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
}) {
  const answerId = `${id}-answer`;
  return (
    <div className="border-b border-slate-200">
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={onToggle}
          className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
        >
          {question}
          <span aria-hidden="true" className="shrink-0 text-lg text-blue-800">{isOpen ? "−" : "+"}</span>
        </button>
      </h3>
      <div id={answerId} hidden={!isOpen} className="pb-4 pr-8 text-sm leading-6 text-slate-600">{answer}</div>
    </div>
  );
}

export default function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="overflow-hidden border-t border-slate-200 bg-[#FAFAF7] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-2xl">
          <h2 id="process-title" className="text-3xl font-semibold tracking-[-0.03em] text-slate-900 md:text-5xl">{siteContent.process.title}</h2>
        </header>
        <div className="relative">
          <div aria-hidden="true" className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-slate-200 lg:block" />
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {siteContent.process.steps.map((step) => <li key={step.number}><Reveal><Step {...step} /></Reveal></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
