import Image from "next/image";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="Impact Conversion"
            width={150}
            height={36}
            className="h-7 w-auto"
            priority
          />
        </a>
        <nav className="hidden items-center gap-8 text-sm text-text-muted md:flex">
          <a href="#how" className="hover:text-text transition-colors">How we work</a>
          <a href="#results" className="hover:text-text transition-colors">Results</a>
          <a href="#faq" className="hover:text-text transition-colors">FAQ</a>
        </nav>
        <a
          href="#book"
          className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream transition-transform hover:scale-105"
        >
          Book a call
        </a>
      </div>
    </header>
  );
}
