'use client';

import { RatingCard } from './RatingCard';
import type { RatingRecord } from '@/lib/types';

export function RatingHistoryList({ items, detailHrefPrefix = '/ratings/' }: { items: RatingRecord[]; detailHrefPrefix?: string }) {
  return (
    <div className="history-list">
      {items.map((item) => (
        <RatingCard key={item.id} rating={item} href={`${detailHrefPrefix}${item.id}`} actionLabel="Open record" />
      ))}
    </div>
  );
}

