'use client';

import { RatingStatusChip } from './RatingStatusChip';
import { RatingSummary } from '@/lib/types';

export function RatingSummaryPanel({
  summary,
  latestScore,
  isConnected,
}: {
  summary: RatingSummary;
  latestScore?: number | null;
  isConnected: boolean;
}) {
  const tiles = [
    { label: 'Average', value: summary.average, note: 'Rounded studio average' },
    { label: 'Ratings', value: summary.count, note: 'Visible records' },
    { label: 'Total score', value: summary.totalScore, note: 'Accumulated input' },
    { label: 'State', value: latestScore ?? '—', note: isConnected ? 'Latest local result' : 'Connect to see yours' },
  ];

  return (
    <div className="panel panel--soft">
      <div className="panel__inner">
        <div className="panel__title">
          <div>
            <h2>Rating summary</h2>
            <p>Fast read on the current score picture.</p>
          </div>
          <RatingStatusChip tone={isConnected ? 'live' : 'ready'}>{isConnected ? 'synced' : 'ready'}</RatingStatusChip>
        </div>
        <div className="summary-grid">
          {tiles.map((tile) => (
            <div key={tile.label} className="summary-tile">
              <div className="summary-tile__label">{tile.label}</div>
              <div className="summary-tile__value">{tile.value}</div>
              <div className="summary-tile__note">{tile.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

