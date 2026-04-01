'use client';

import { ReactNode } from 'react';
import { TopTabs } from './TopTabs';

export function ReviewHeader({
  title,
  subtitle,
  status,
  children,
}: {
  title: string;
  subtitle?: string;
  status?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="top-bar">
      <div className="top-bar__row">
        <div className="brand">
          <div className="brand__eyebrow">Base rating studio</div>
          <div className="brand__title">
            <span>simple-rating</span>
            <strong>{title}</strong>
          </div>
          {subtitle ? <div className="brand__meta">{subtitle}</div> : null}
        </div>
        {children}
      </div>
      <div className="top-bar__row">
        <TopTabs />
        {status}
      </div>
    </header>
  );
}

