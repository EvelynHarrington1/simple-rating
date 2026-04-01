"use client";

import { RatingStatusChip } from './RatingStatusChip';
import { RatingSummary } from '@/lib/types';

export function RatingSummaryPanel({
  summary,
  latestScore,
  isConnected,
  views,
  txCount,
  builderCode,
  builderSuffix,
}: {
  summary: RatingSummary;
  latestScore?: number | null;
  isConnected: boolean;
  views?: number;
  txCount?: number;
  builderCode?: string;
  builderSuffix?: string;
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

        <div className="panel__title" style={{ marginTop: 18 }}>
          <div>
            <h2>Attribution</h2>
            <p>Builder code and activity snapshot.</p>
          </div>
          <RatingStatusChip tone="muted">tracked</RatingStatusChip>
        </div>
        <div className="summary-grid">
          <div className="summary-tile">
            <div className="summary-tile__label">Builder code</div>
            <div className="summary-tile__value mono" style={{ fontSize: '1rem' }}>{builderCode ?? 'bc_xqvxho2a'}</div>
            <div className="summary-tile__note">Base Builder Code.</div>
          </div>
          <div className="summary-tile">
            <div className="summary-tile__label">Data suffix</div>
            <div className="summary-tile__value mono" style={{ fontSize: '1rem' }}>{builderSuffix ?? '0x6263…8021'}</div>
            <div className="summary-tile__note">ERC-8021 attribution suffix.</div>
          </div>
          <div className="summary-tile">
            <div className="summary-tile__label">Views</div>
            <div className="summary-tile__value">{views ?? 0}</div>
            <div className="summary-tile__note">Tracked page views.</div>
          </div>
          <div className="summary-tile">
            <div className="summary-tile__label">Tx volume</div>
            <div className="summary-tile__value">{txCount ?? 0}</div>
            <div className="summary-tile__note">Tracked submitted ratings.</div>
          </div>
        </div>
      </div>
    </div>
  );
}