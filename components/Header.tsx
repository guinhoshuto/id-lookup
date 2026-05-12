import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/', label: 'Lookup' },
  { href: '/twitch', label: 'Twitch' },
  { href: '/instagram', label: 'Instagram' },
];

export default function Header() {
  const router = useRouter();

  return (
    <header className="relative z-20 px-4 py-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Link href="/" className="min-w-0">
          <p className="font-display truncate text-lg font-semibold text-slate-950">
            ID Lookup
          </p>
          <p className="text-xs text-slate-500">Find IDs by username</p>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-2 text-sm">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 font-medium transition ${
                  isActive
                    ? 'bg-slate-950 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
