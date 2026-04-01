'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ReviewHeader } from '@/components/ReviewHeader';
import { WalletButton } from '@/components/WalletButton';
import { RatingStatusChip } from '@/components/RatingStatusChip';
import { RatingHistoryList } from '@/components/RatingHistoryList';
import { RatingSummaryPanel } from '@/components/RatingSummaryPanel';
import { EmptyState } from '@/components/EmptyState';
import { getViewRatings, getSummaryForView, getLatestViewRating } from '@/lib/rating-store';

export default function MyRatingsPage() {
  const { address, isConnected } = useAccount();
  const [records, setRecords] = useState(() => getViewRatings(address));
  const [summary, setSummary] = useState(() => getSummaryForView(address));
  const [latest, setLatest] = useState(() => getLatestViewRating(address));

  useEffect(() => {
    setRecords(getViewRatings(address));
    setSummary(getSummaryForView(address));
    setLatest(getLatestViewRating(address));
  }, [address]);

  return (
    <main className="app-shell page-stack">
      <ReviewHeader
        title="My ratings"
        subtitle="Your personal score journal with a direct path to detail."
        status={<RatingStatusChip tone={isConnected ? 'success' : 'ready'}>{isConnected ? 'synced' : 'ready'}</RatingStatusChip>}
      >
        <WalletButton />
      </ReviewHeader>

      <section className="detail-grid">
        <div className="section-grid">
          <div className="panel">
            <div className="panel__inner">
              <div className="panel__title">
                <div>
                  <h1>Score journal</h1>
                  <p>{isConnected ? 'Track your last submitted scores.' : 'Connect a wallet to see your local history.'}</p>
                </div>
                <RatingStatusChip tone={latest ? 'live' : 'muted'}>{latest ? 'latest' : 'empty'}</RatingStatusChip>
              </div>
              {records.length ? <RatingHistoryList items={records} /> : <EmptyState title="No history yet" description="Submit your first rating to build the journal." />}
            </div>
          </div>
        </div>

        <div className="section-grid">
          <RatingSummaryPanel summary={summary} latestScore={latest?.score ?? null} isConnected={isConnected} />
          <div className="panel panel--soft">
            <div className="panel__inner">
              <div className="panel__title">
                <div>
                  <h2>Latest record</h2>
                  <p>Quick read on your most recent score.</p>
                </div>
                <RatingStatusChip tone={latest ? 'success' : 'muted'}>{latest ? 'ready' : 'none'}</RatingStatusChip>
              </div>
              {latest ? <RatingHistoryList items={[latest]} /> : <EmptyState title="No local record" description="Your last rating will appear here after submission." />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

