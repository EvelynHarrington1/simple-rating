'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Hub' },
  { href: '/rate', label: 'Rate' },
  { href: '/my', label: 'My ratings' },
  { href: '/summary', label: 'Summary' },
  { href: '/about', label: 'About' },
];

export function TopTabs() {
  const pathname = usePathname();

  return (
    <nav className="top-tabs" aria-label="Primary navigation">
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href as any} className="top-tab" data-active={pathname === tab.href || pathname.startsWith(`${tab.href}/`)}>
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}