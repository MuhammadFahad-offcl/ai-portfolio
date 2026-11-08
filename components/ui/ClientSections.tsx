"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, MessageCircle, Menu, Play, X } from "lucide-react";
import {
  buildWhatsAppLink,
  clients,
  getWhatsAppLink,
  packages,
  siteContent,
  stats,
  testimonials,
} from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import { FaqItem } from "@/components/ui/ProcessSection";

export function SiteNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("home");
      setScrolled(hero ? hero.getBoundingClientRect().bottom <= 72 : window.scrollY > window.innerHeight * 0.75);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const links = [
    { href: "#work", label: siteContent.navigation.work },
    { href: "#results", label: siteContent.navigation.results },
    { href: "#pricing", label: siteContent.navigation.pricing },
    { href: "#faq", label: siteContent.navigation.faq },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "border-slate-200 bg-[#FAFAF7]/95 backdrop-blur" : "border-transparent bg-[#FAFAF7]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href="#home" className="font-semibold tracking-[-0.02em] text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-700">
          {siteContent.ui.brand}
        </a>
        <nav aria-label={siteContent.ui.mainNavigation} className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-blue-700">
              {link.label}
            </a>
          ))}
          <a href={getWhatsAppLink("audit")} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
            {siteContent.navigation.audit}
          </a>
        </nav>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? siteContent.ui.closeNavigation : siteContent.ui.openNavigation}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-11 w-11 place-items-center rounded-lg border border-slate-300 text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-700 md:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav aria-label={siteContent.ui.mobileNavigation} className="border-t border-slate-200 bg-[#FAFAF7] px-5 py-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-5">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="py-2 text-sm text-slate-700 focus-visible:outline-2 focus-visible:outline-blue-700">
                {link.label}
              </a>
            ))}
            <a href={getWhatsAppLink("audit")} target="_blank" rel="noopener noreferrer" className="py-2 text-sm font-semibold text-blue-800">
              {siteContent.navigation.audit}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div aria-hidden="true" className="fixed left-0 top-0 z-[60] h-1 bg-blue-700" style={{ width: `${progress}%` }} />;
}

export function StatCounter({ value, label }: { value: string; label: string }) {
  const [shown, setShown] = useState(false);
  const [count, setCount] = useState(0);
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = element.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const numeric = Number(value.replace(/[^\d.]/g, ""));
    if (!shown || !Number.isFinite(numeric) || !/^\d/.test(value)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(numeric);
      return;
    }
    const start = performance.now();
    const duration = 800;
    let frame = 0;
    const tick = (now: number) => {
      const ratio = Math.min(1, (now - start) / duration);
      setCount(Math.round(numeric * ratio));
      if (ratio < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shown, value]);

  const numeric = Number(value.replace(/[^\d.]/g, ""));
  const output = /^\d/.test(value) && Number.isFinite(numeric)
    ? value.replace(/[\d,]+/, new Intl.NumberFormat("en-PK").format(count))
    : value;

  return (
    <div ref={element}>
      <p className="break-all text-3xl font-semibold tracking-[-0.03em] text-blue-800 sm:text-4xl">{output}</p>
      <p className="mt-1 text-xs leading-5 text-slate-600">{label}</p>
    </div>
  );
}

export function TrustBar() {
  const useMarquee = clients.length >= 5;
  return (
    <section aria-label={siteContent.ui.clientsAndResults} id="results" className="overflow-hidden border-y border-slate-200 bg-white/70 px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{siteContent.trustBar.title}</p>
          <div className={`mt-3 ${useMarquee ? "overflow-hidden" : ""}`}>
            <div className={`text-sm font-medium text-slate-500 ${useMarquee ? "flex w-max gap-x-5 whitespace-nowrap motion-safe:animate-[client-marquee_40s_linear_infinite]" : "flex flex-wrap gap-x-5 gap-y-2"}`}>
              {clients.map((client) => <span key={client.name} className="break-all">{client.name}</span>)}
              {useMarquee && clients.map((client) => <span key={`duplicate-${client.name}`} aria-hidden="true">{client.name}</span>)}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 border-t border-slate-200 pt-6 sm:grid-cols-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {stats.map((stat) => <StatCounter key={stat.label} {...stat} />)}
        </div>
      </div>
    </section>
  );
}

function TestimonialMedia({ item }: { item: (typeof testimonials)[number] }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  if (!item.photo) return null;
  return (
    <>
      <div className="relative mb-5 h-24 w-24 overflow-hidden rounded-full bg-slate-100">
        <Image src={item.photo} alt={`Portrait of ${item.name}`} fill sizes="96px" className="object-cover" />
        {item.video && (
          <button
            type="button"
            aria-label={siteContent.testimonials.playVideo}
            onClick={() => setOpen(true)}
            className="absolute inset-0 grid place-items-center bg-slate-950/45 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Play aria-hidden="true" size={26} fill="currentColor" />
          </button>
        )}
      </div>
      {open && item.video && (
        <dialog
          ref={dialogRef}
          aria-label={siteContent.testimonials.playVideo}
          onClose={() => setOpen(false)}
          onCancel={(event) => {
            event.preventDefault();
            dialogRef.current?.close();
          }}
          className="m-auto w-[min(94vw,800px)] max-w-none border-0 bg-slate-950 p-4 text-white backdrop:bg-slate-950/80"
        >
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="font-semibold">{item.name}</p>
            <button autoFocus type="button" onClick={() => dialogRef.current?.close()} className="rounded px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-white">
              {siteContent.testimonials.closeVideo}
            </button>
          </div>
          <video src={item.video} controls autoPlay playsInline className="max-h-[75vh] w-full bg-black" />
        </dialog>
      )}
    </>
  );
}

export function Testimonials() {
  const [featured, ...others] = testimonials;
  return (
    <section aria-labelledby="testimonials-title" className="overflow-hidden border-t border-slate-200 px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 id="testimonials-title" className="mb-10 text-3xl font-semibold tracking-[-0.03em] text-[#111] md:text-5xl">{siteContent.testimonials.title}</h2>
        </Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="border-l-2 border-blue-800 pl-6 sm:pl-8">
            <TestimonialMedia item={featured} />
            <blockquote className="text-2xl leading-relaxed tracking-[-0.02em] text-slate-800 sm:text-3xl">“{featured.quote}”</blockquote>
            <p className="mt-6 text-sm font-semibold text-slate-900">{featured.name}</p>
            <p className="text-sm text-slate-600">{featured.role} · {featured.business} · {featured.city}</p>
            {featured.caseStudy && (
              <a href={`#case-${featured.caseStudy}`} className="mt-3 inline-block text-sm font-semibold text-blue-800 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-800">
                {siteContent.testimonials.viewAgent}
              </a>
            )}
          </article>
          <div className="space-y-6">
            {others.map((item) => (
              <article key={item.name} className="border-t border-slate-200 pt-5">
                <TestimonialMedia item={item} />
                <blockquote className="text-base leading-7 text-slate-700">“{item.quote}”</blockquote>
                <p className="mt-3 text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-sm text-slate-600">{item.role} · {item.business} · {item.city}</p>
                {item.caseStudy && (
                  <a href={`#case-${item.caseStudy}`} className="mt-2 inline-block text-sm font-semibold text-blue-800 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-800">
                    {siteContent.testimonials.viewAgent}
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-500">{siteContent.ui.testimonialPlaceholderNote}</p>
      </div>
    </section>
  );
}

export function PricingCard({ pack }: { pack: (typeof packages)[number] }) {
  const message = siteContent.whatsapp.messages[pack.messageKey];
  return (
    <article className={`flex h-full flex-col border p-6 sm:p-7 ${pack.highlighted ? "relative border-blue-800 bg-white ring-1 ring-blue-800 md:-translate-y-2" : "border-slate-200 bg-white"}`}>
      {pack.highlighted && <span className="mb-4 w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-900">{siteContent.pricing.highlightedLabel}</span>}
      <h3 className="text-2xl font-semibold tracking-[-0.02em] text-slate-900">{pack.name}</h3>
      <p className="mt-5 text-xs text-slate-500">{siteContent.pricing.setupLabel}</p>
      <p className="break-all text-xl font-semibold text-slate-900">{siteContent.ui.currency} {pack.setupFee}</p>
      <p className="mt-3 text-xs text-slate-500">{siteContent.pricing.monthlyLabel}</p>
      <p className="break-all text-xl font-semibold text-slate-900">{siteContent.ui.currency} {pack.monthlyFee}<span className="text-sm font-normal text-slate-500"> {siteContent.ui.monthlyUnit}</span></p>
      <p className="mt-5 text-sm leading-6 text-slate-600"><span className="font-semibold text-slate-800">{siteContent.pricing.bestForLabel}:</span> {pack.bestFor}</p>
      <ul className="mt-5 space-y-3">
        {pack.features.map((feature) => <li key={feature} className="flex gap-2 text-sm leading-5 text-slate-700"><Check aria-hidden="true" size={17} className="mt-0.5 shrink-0 text-blue-800" />{feature}</li>)}
      </ul>
      <a href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 pt-8 text-sm font-semibold text-blue-900 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-700">
        <MessageCircle size={18} aria-hidden="true" />{siteContent.pricing.chooseLabel}
      </a>
    </article>
  );
}

export function Pricing() {
  const packageCards = [...packages].sort((a, b) => Number(b.highlighted) - Number(a.highlighted));
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="overflow-hidden border-t border-slate-200 bg-[#f3f3ee] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <header className="mb-10 max-w-2xl">
            <h2 id="pricing-title" className="text-3xl font-semibold tracking-[-0.03em] text-[#111] md:text-5xl">{siteContent.pricing.title}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{siteContent.pricing.description}</p>
          </header>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {packageCards.map((pack) => <PricingCard key={pack.id} pack={pack} />)}
        </div>
        <p className="mt-8 text-sm leading-6 text-slate-600"><strong className="text-slate-900">{siteContent.pricing.includedTitle}</strong> {siteContent.pricing.included.join(" · ")}.</p>
      </div>
    </section>
  );
}

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <section id="faq" aria-labelledby="faq-title" className="overflow-hidden border-t border-slate-200 px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 id="faq-title" className="mb-5 text-3xl font-semibold tracking-[-0.03em] text-[#111] md:text-5xl">{siteContent.faq.title}</h2>
          {siteContent.faq.items.map((faq, index) => (
            <FaqItem key={faq.question} id={`faq-${index + 1}`} {...faq} isOpen={openFaq === index} onToggle={() => setOpenFaq((current) => current === index ? null : index)} />
          ))}
        </div>
        <aside className="h-fit border border-slate-200 bg-white p-6 md:sticky md:top-24">
          <h3 className="text-lg font-semibold text-slate-900">{siteContent.ui.faqContactTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{siteContent.ui.faqContactDescription}</p>
          <a href={getWhatsAppLink("process")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 text-sm font-semibold text-white hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800">
            <MessageCircle size={18} aria-hidden="true" />{siteContent.ui.faqContactAction}
          </a>
        </aside>
      </div>
    </section>
  );
}

export function Guarantee() {
  return (
    <section id="guarantee" aria-labelledby="guarantee-title" className="border-t border-slate-200 bg-white px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 id="guarantee-title" className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#111] sm:text-4xl">{siteContent.guarantee.title}</h2>
          <ul className="mt-6 flex flex-col gap-3 text-sm text-slate-700 sm:flex-row sm:gap-6">
            {siteContent.guarantee.benefits.map((benefit) => <li key={benefit} className="flex items-center gap-2"><Check aria-hidden="true" size={17} className="text-blue-800" />{benefit}</li>)}
          </ul>
          <p className="mt-7 text-base font-medium text-slate-800">{siteContent.guarantee.directContact}</p>
          <a href={getWhatsAppLink("guarantee")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-green-600 px-6 text-base font-semibold text-white hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800">
            <MessageCircle size={20} aria-hidden="true" />{siteContent.guarantee.action}
          </a>
          <p className="mt-3 text-sm text-slate-500">{siteContent.guarantee.replyTime}</p>
        </div>
        <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full bg-slate-100 md:mx-0">
          {/* TODO: Replace with verified portrait image if the cutout is not suitable in a circular crop. */}
          <Image
            src="/fahad-cutout.png"
            alt={siteContent.footer.name}
            fill
            sizes="144px"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}

export function StickyWhatsApp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("home");
    const finalCta = document.getElementById("guarantee");
    if (!hero || !finalCta) return;
    let heroVisible = true;
    let finalCtaVisible = false;
    const syncVisibility = () => setVisible(!heroVisible && !finalCtaVisible);
    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      syncVisibility();
    }, { threshold: 0.1 });
    const ctaObserver = new IntersectionObserver(([entry]) => {
      finalCtaVisible = entry.isIntersecting;
      syncVisibility();
    }, { threshold: 0.1 });
    heroObserver.observe(hero);
    ctaObserver.observe(finalCta);
    return () => {
      heroObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);
  return (
    <a
      href={getWhatsAppLink("audit")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={siteContent.ui.auditOnWhatsApp}
      className={`fixed inset-x-4 z-40 flex min-h-14 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 pb-[env(safe-area-inset-bottom)] text-center text-sm font-semibold text-white shadow-lg transition duration-200 hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <MessageCircle size={18} aria-hidden="true" />Get a free audit
    </a>
  );
}
