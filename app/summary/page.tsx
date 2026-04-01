'use client';

import { useAccount, useReadContract } from 'wagmi';
import { ReviewHeader } from '@/components/ReviewHeader';
import { WalletButton } from '@/components/WalletButton';
import { RatingStatusChip } from '@/components/RatingStatusChip';
import { RatingSummaryPanel } from '@/components/RatingSummaryPanel';
import { RatingHistoryList } from '@/components/RatingHistoryList';
import { getSummaryForView, getViewRatings } from '@/lib/rating-store';
import { CONTRACT_ADDRESS, ratingAbi } from '@/lib/wagmi';

export default function SummaryPage() {
  const { address, isConnected } = useAccount();
  const summary = getSummaryForView(address);
  const records = getViewRatings(address).slice(0, 3);
  const average = useReadContract({ abi: ratingAbi, address: CONTRACT_ADDRESS, functionName: 'average' });
  const count = useReadContract({ abi: ratingAbi, address: CONTRACT_ADDRESS, functionName: 'count' });

  const bars = [
    { label: 'Average', value: summary.average, width: Math.min(100, summary.average * 10) },
    { label: 'Total', value: summary.totalScore, width: Math.min(100, summary.totalScore / 12) },
    { label: 'Count', value: summary.count, width: Math.min(100, summary.count) },
  ];

  return (
    <main className="app-shell page-stack">
      <ReviewHeader
        title="Summary"
        subtitle="Lightweight snapshot of the current rating picture."
        status={<RatingStatusChip tone={isConnected ? 'success' : 'ready'}>{isConnected ? 'synced' : 'ready'}</RatingStatusChip>}
      >
        <WalletButton />
      </ReviewHeader>

      <section className="section-grid">
        <RatingSummaryPanel summary={summary} latestScore={records[0]?.score ?? null} isConnected={isConnected} />
        <div className="panel panel--soft">
          <div className="panel__inner">
            <div className="panel__title">
              <div>
                <h2>Simple spread</h2>
                <p>Compact bars for a quick visual read.</p>
              </div>
              <RatingStatusChip tone="live">base</RatingStatusChip>
            </div>
            <div className="metric-strip">
              {bars.map((bar) => (
                <div key={bar.label} className="metric-bar">
                  <div className="metric-bar__label">
                    <span>{bar.label}</span>
                    <span>{bar.value}</span>
                  </div>
                  <div className="metric-bar__track">
                    <div className="metric-bar__fill" style={{ width: `${bar.width}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="summary-grid" style={{ marginTop: 16 }}>
              <div className="summary-tile">
                <div className="summary-tile__label">Contract average</div>
                <div className="summary-tile__value">{String(average.data !== undefined ? Number(average.data) : summary.average)}</div>
                <div className="summary-tile__note">Onchain read.</div>
              </div>
              <div className="summary-tile">
                <div className="summary-tile__label">Contract count</div>
                <div className="summary-tile__value">{String(count.data !== undefined ? Number(count.data) : summary.count)}</div>
                <div className="summary-tile__note">Visible submissions.</div>
              </div>
              <div className="summary-tile">
                <div className="summary-tile__label">Local preview</div>
                <div className="summary-tile__value">{records.length}</div>
                <div className="summary-tile__note">Latest visible records.</div>
              </div>
              <div className="summary-tile">
                <div className="summary-tile__label">Mode</div>
                <div className="summary-tile__value">{isConnected ? 'Live' : 'Preview'}</div>
                <div className="summary-tile__note">Wallet-aware summary.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="panel__inner">
            <div className="panel__title">
              <div>
                <h2>Recent feed</h2>
                <p>Three latest records from this view.</p>
              </div>
              <RatingStatusChip tone={records.length ? 'success' : 'muted'}>{records.length} items</RatingStatusChip>
            </div>
            <RatingHistoryList items={records} />
          </div>
        </div>
      </section>
    </main>
  );
}

