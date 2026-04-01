'use client';

import { ReactNode } from 'react';

export function RatingStatusChip({ tone, children }: { tone: 'ready' | 'live' | 'success' | 'warn' | 'muted'; children: ReactNode }) {
  return (
    <span className="status-chip" data-tone={tone}>
      {children}
    </span>
  );
}

