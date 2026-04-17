import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink py-12 text-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3 text-sm text-text-inv-muted">
          <Image
            src="/assets/logo.png"
            alt="Impact Conversion"
            width={120}
            height={28}
            className="h-6 w-auto brightness-0 invert opacity-90"
          />
          <span className="hidden sm:inline">Queenstown, New Zealand</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-text-inv-muted">
          <a href="mailto:jono@impactconversion.com" className="hover:text-cream transition-colors">Email</a>
          <a href="https://www.linkedin.com/company/impactconversion" className="hover:text-cream transition-colors">LinkedIn</a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
