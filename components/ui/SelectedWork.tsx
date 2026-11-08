import { caseStudies, siteContent } from "@/content/site";
import CaseStudyCard, { type CaseStudy } from "@/components/ui/CaseStudyCard";

const [clinicStudy, outreachStudy]: readonly [CaseStudy, CaseStudy] = caseStudies;

export default function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="selected-work-title"
      className="overflow-hidden border-t border-slate-200 px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-800 sm:text-sm">{siteContent.work.eyebrow}</p>
          <h2 id="selected-work-title" className="text-3xl font-semibold tracking-[-0.03em] text-[#111] md:text-5xl">{siteContent.work.title}</h2>
        </header>
        <div className="border-t border-slate-200">
          <CaseStudyCard study={clinicStudy} featured />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <CaseStudyCard study={outreachStudy} />
          <aside className="self-center border-t border-slate-200 py-8 md:border-t-0 md:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{siteContent.work.alsoBuilt.title}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{siteContent.work.alsoBuilt.description.split(" — ")[0]}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{siteContent.work.alsoBuilt.description.split(" — ")[1]}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
