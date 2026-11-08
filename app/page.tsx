import type { Metadata } from "next";
import { getWhatsAppLink, siteContent } from "@/content/site";
import HeroVisual from "@/components/ui/HeroVisual";
import ClientFooter from "@/components/ui/Footer";
import LiveSystems from "@/components/ui/LiveSystems";
import ProcessSection from "@/components/ui/ProcessSection";
import Reveal from "@/components/ui/Reveal";
import RoiCalculator from "@/components/ui/RoiCalculator";
import SelectedWork from "@/components/ui/SelectedWork";
import {
  FaqSection,
  Guarantee,
  Pricing,
  ScrollProgress,
  SiteNavigation,
  StickyWhatsApp,
  Testimonials,
  TrustBar,
} from "@/components/ui/ClientSections";

const metadataBase = siteContent.metadata.siteUrl.startsWith("http")
  ? new URL(siteContent.metadata.siteUrl)
  : new URL("https://portfolio-fahad-offcl.vercel.app");

export const metadata: Metadata = {
  metadataBase,
  title: siteContent.metadata.title,
  description: siteContent.metadata.description,
  openGraph: {
    title: siteContent.metadata.title,
    description: siteContent.metadata.description,
    images: [siteContent.metadata.openGraphImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.metadata.title,
    description: siteContent.metadata.description,
    images: [siteContent.metadata.openGraphImage],
  },
};

const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${siteContent.footer.name} — ${siteContent.metadata.serviceName}`,
  description: siteContent.metadata.description,
  areaServed: {
    "@type": "Country",
    name: "Pakistan",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  serviceType: ["WhatsApp AI agents", "Workflow automation"],
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SiteNavigation />
      <main className="bg-[#FAFAF7] pt-[72px] text-[#111] overflow-x-hidden">
        {/* Hero Section */}
        <section id="home" aria-labelledby="hero-title" className="overflow-hidden px-4 py-10 sm:px-6 sm:py-14 md:py-20 lg:px-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <Reveal>
              <div className="w-full max-w-2xl text-left">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-blue-800 sm:text-sm">{siteContent.hero.eyebrow}</p>
                <h1 id="hero-title" className="text-3xl font-bold tracking-tight text-[#111] sm:text-5xl md:text-5xl lg:text-6xl">
                  {siteContent.hero.title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {siteContent.hero.description}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <a href={getWhatsAppLink("hero")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-blue-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 sm:w-auto">
                    {siteContent.hero.primaryAction}
                  </a>
                  <a href="#work" className="inline-flex min-h-12 w-full items-center justify-center text-sm font-semibold text-blue-900 underline decoration-blue-300 underline-offset-4 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-800 sm:w-auto">
                    {siteContent.hero.secondaryAction}
                  </a>
                </div>
                <p className="mt-5 text-xs text-slate-500 sm:text-sm">{siteContent.hero.trustLine}</p>
                <p className="mt-4 text-xs leading-5 text-slate-500 sm:text-sm">{siteContent.hero.stackLine}</p>
              </div>
            </Reveal>
            <Reveal className="mx-auto w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] md:ml-auto">
              <HeroVisual />
            </Reveal>
          </div>
        </section>

        <TrustBar />

        {/* Why Automation Section */}
        <section id="why-automation" aria-labelledby="why-title" className="overflow-hidden border-t border-slate-200 px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <Reveal>
              <div>
                <h2 id="why-title" className="max-w-md text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#111] md:text-5xl">{siteContent.manualWork.title}</h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">{siteContent.manualWork.description}</p>
              </div>
            </Reveal>
            <div>
              {siteContent.manualWork.rows.map((item) => (
                <Reveal key={item.before}>
                  <div className="grid grid-cols-1 gap-2 border-b border-slate-200 py-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-5">
                    <p className="text-sm leading-6 text-slate-500">{item.before}</p>
                    <span aria-hidden="true" className="hidden text-blue-800 sm:block">→</span>
                    <p className="text-base font-medium leading-6 text-slate-900">{item.after}</p>
                  </div>
                </Reveal>
              ))}
              <p className="mt-6 max-w-3xl text-sm font-semibold leading-6 text-slate-800">
                {siteContent.manualWork.costLine}{" "}
                <a href="#roi" className="text-blue-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-800">{siteContent.ui.workCostLink}</a>
              </p>
            </div>
          </div>
        </section>

        <SelectedWork />
        <Testimonials />
        <LiveSystems />
        <ProcessSection />
        <Pricing />

        {/* PKR ROI Calculator Section */}
        <section id="roi" aria-labelledby="roi-title" className="overflow-hidden border-t border-slate-200 bg-[#FAFAF7] px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="w-full max-w-lg">
                <h2 id="roi-title" className="text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#111] md:text-5xl">{siteContent.roi.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{siteContent.roi.description}</p>
              </div>
            </Reveal>
            <Reveal className="w-full">
              <RoiCalculator />
            </Reveal>
          </div>
        </section>

        <FaqSection />
        <Guarantee />
      </main>
      <ClientFooter />
      <StickyWhatsApp />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
    </>
  );
}
