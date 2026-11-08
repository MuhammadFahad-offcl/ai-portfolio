import { getWhatsAppLink, siteContent } from "@/content/site";

export default function ClientFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[#FAFAF7] px-5 py-8 text-slate-700 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#home" className="font-semibold tracking-[-0.02em] text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-800">
            {siteContent.footer.name}
          </a>
          <p className="mt-1 text-sm text-slate-600">{siteContent.footer.role} · {siteContent.footer.location}</p>
        </div>
        <nav aria-label="Contact and social links" className="flex flex-wrap gap-5">
          <a href={siteContent.footer.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-800">{siteContent.ui.socialLinkedIn}</a>
          <a href={siteContent.footer.github} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-800">{siteContent.ui.socialGitHub}</a>
          <a href={`mailto:${siteContent.footer.email}`} className="text-sm text-slate-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-800">{siteContent.ui.socialEmail}</a>
          <a href={getWhatsAppLink("footer")} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-800">{siteContent.ui.socialWhatsApp}</a>
        </nav>
        <p className="text-xs text-slate-500">{siteContent.footer.copyright}</p>
      </div>
    </footer>
  );
}
