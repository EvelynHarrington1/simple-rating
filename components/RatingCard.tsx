'use client';

import Link from 'next/link';
import { RatingStatusChip } from './RatingStatusChip';
import { formatDateTime, formatShortAddress } from '@/lib/rating-store';
import type { RatingRecord } from '@/lib/types';

export function RatingCard({ rating, actionLabel, href }: { rating: RatingRecord; actionLabel?: string; href?: string }) {
  return (
    <article className="history-item">
      <div className="history-item__top">
        <div className="history-item__score">
          <b>{rating.score}</b>
          <div>
            <div>{href ? 'Rating record' : 'Latest rating'}</div>
            <div className="small muted">{formatDateTime(rating.createdAt)}</div>
          </div>
        </div>
        <RatingStatusChip tone={rating.status === 'submitted' ? 'success' : rating.status === 'pending' ? 'live' : 'warn'}>
          {rating.status}
        </RatingStatusChip>
      </div>
      <div className="history-item__meta">
        <div>Owner {formatShortAddress(rating.owner)}</div>
        {rating.txHash ? <div className="mono">{rating.txHash}</div> : null}
      </div>
      <div className="history-item__footer">
        {href ? (
          <Link href={href as any} className="secondary-button">
            {actionLabel ?? 'Open detail'}
          </Link>
        ) : null}
      </div>
    </article>
  );
}