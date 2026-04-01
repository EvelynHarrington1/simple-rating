'use client';

import Link from 'next/link';

export function ActionBar({ items }: { items: { label: string; href: string; tone?: 'primary' | 'secondary' }[] }) {
  return (
    <div className="action-bar">
      {items.map((item) =>
        item.tone === 'primary' ? (
          <Link key={item.href} href={item.href as any} className="primary-button">
            {item.label}
          </Link>
        ) : (
          <Link key={item.href} href={item.href as any} className="secondary-button">
            {item.label}
          </Link>
        ),
      )}
    </div>
  );
}