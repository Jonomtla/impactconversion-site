import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 text-balance text-2xl font-semibold tracking-tight text-text md:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 text-xl font-semibold text-text md:text-2xl">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-6 text-lg leading-relaxed text-text-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-6 space-y-2 pl-6 text-lg leading-relaxed text-text-muted [list-style-type:disc]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-6 space-y-2 pl-6 text-lg leading-relaxed text-text-muted [list-style-type:decimal]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-purple underline decoration-purple/40 underline-offset-4 transition-colors hover:decoration-purple"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-purple/40 bg-purple-soft/30 py-3 pl-6 pr-4 text-lg italic text-text">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-[0.9em] text-text">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl bg-ink p-5 text-sm text-cream">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-10 border-ink/10" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-text">{children}</strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
