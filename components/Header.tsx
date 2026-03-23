import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/process', label: 'Processes' },
  { href: '/materials', label: 'Materials' },
  { href: '/industries', label: 'Industries' },
  { href: '/resources', label: 'Resources' },
  { href: '/rfq', label: 'RFQ' }
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-shell flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold text-brand-900">
          Polymer Connection
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-brand-700">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
