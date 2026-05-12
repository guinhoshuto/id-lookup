import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Lookup' },
  { href: '/twitch', label: 'Twitch' },
  { href: '/instagram', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200 px-4 py-8 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 text-sm text-slate-500 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="font-display text-base font-semibold text-slate-950">
            ID Lookup
          </p>
          <p className="mt-2">
            Find supported account IDs and copy the result quickly.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}
          <span className="text-slate-400">{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
