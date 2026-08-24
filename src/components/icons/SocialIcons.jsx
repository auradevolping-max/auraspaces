// lucide-react removed brand/logo glyphs (Facebook, Instagram, ...) from its
// icon set, so these ship as local inline SVGs — same pattern already used
// for the WhatsApp glyph in FloatingWhatsApp.jsx.

export function Facebook({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.98H7.96V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.98A10 10 0 0 0 22 12Z" />
    </svg>
  )
}

export function Instagram({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16Zm0 5.46a4.38 4.38 0 1 0 0 8.76 4.38 4.38 0 0 0 0-8.76Zm0 7.22a2.84 2.84 0 1 1 0-5.68 2.84 2.84 0 0 1 0 5.68Zm5.57-7.4a1.02 1.02 0 1 1-2.05 0 1.02 1.02 0 0 1 2.05 0Z" />
    </svg>
  )
}
