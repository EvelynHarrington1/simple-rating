'use client';

import { ReactNode, useEffect, useState } from 'react';
import { base } from 'wagmi/chains';
import { useAccount, usePublicClient, useReadContract, useWriteContract } from 'wagmi';
import { ReviewHeader } from '@/components/ReviewHeader';
import { WalletButton } from '@/components/WalletButton';
import { RatingStatusChip } from '@/components/RatingStatusChip';
import { ActionBar } from '@/components/ActionBar';
import { EmptyState } from '@/components/EmptyState';
import { RatingSummaryPanel } from '@/components/RatingSummaryPanel';
import { RatingCard } from '@/components/RatingCard';
import { RatingHistoryList } from '@/components/RatingHistoryList';
import { ScoreSelector } from '@/components/ScoreSelector';
import { SubmitRatingButton } from '@/components/SubmitRatingButton';
import { CopyRatingButton } from '@/components/CopyRatingButton';
import { getLatestViewRating, getSummaryForView, getViewRatings, buildDraftRating, saveLocalRating, formatDateTime, formatShortAddress } from '@/lib/rating-store';
import { APP_ID, APP_NAME, CONTRACT_ADDRESS, ratingAbi } from '@/lib/wagmi';
import type { RatingRecord } from '@/lib/types';
import { trackTransaction } from '@/utils/track';

function useConnectedView(address?: string) {
  const [records, setRecords] = useState<RatingRecord[]>(() => getViewRatings(address));
  const [latest, setLatest] = useState<RatingRecord | null>(() => getLatestViewRating(address));
  const [summary, setSummary] = useState(() => getSummaryForView(address));

  useEffect(() => {
    setRecords(getViewRatings(address));
    setLatest(getLatestViewRating(address));
    setSummary(getSummaryForView(address));
  }, [address]);

  return { records, latest, summary, setRecords, setLatest, setSummary };
}

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const { records, latest, summary } = useConnectedView(address);
  const chainAverage = useReadContract({ abi: ratingAbi, address: CONTRACT_ADDRESS, functionName: 'average' });
  const chainCount = useReadContract({ abi: ratingAbi, address: CONTRACT_ADDRESS, functionName: 'count' });

  return (
    <main className="app-shell page-stack">
      <ReviewHeader
        title="Rating hub"
        subtitle="Fast access to rate now, latest result, and your journal."
        status={<RatingStatusChip tone={isConnected ? 'success' : 'ready'}>{isConnected ? 'connected' : 'ready'}</RatingStatusChip>}
      >
        <WalletButton />
      </ReviewHeader>

      <section className="two-up">
        <div className="panel">
          <div className="panel__inner">
            <div className="panel__title">
              <div>
                <h1>Review desk</h1>
                <p>Make a quick call and keep the latest score close.</p>
              </div>
              <RatingStatusChip tone="live">latest</RatingStatusChip>
            </div>
            <div className="section-grid">
              <div className="summary-grid">
                <div className="summary-tile">
                  <div className="summary-tile__label">Latest score</div>
                  <div className="summary-tile__value">{latest?.score ?? '—'}</div>
                  <div className="summary-tile__note">{latest ? formatDateTime(latest.createdAt) : 'No local rating yet'}</div>
                </div>
                <div className="summary-tile">
                  <div className="summary-tile__label">Connected wallet</div>
                  <div className="summary-tile__value">{formatShortAddress(address)}</div>
                  <div className="summary-tile__note">{isConnected ? 'Wallet ready' : 'Connect to personalize'}</div>
                </div>
              </div>
              <ActionBar
                items={[
                  { label: 'Rate now', href: '/rate', tone: 'primary' },
                  { label: 'View my ratings', href: '/my' },
                ]}
              />
            </div>
          </div>
        </div>

        <RatingSummaryPanel summary={summary} latestScore={latest?.score ?? null} isConnected={isConnected} />
      </section>

      <section className="section-grid">
        <div className="panel">
          <div className="panel__inner">
            <div className="panel__title">
              <div>
                <h2>Latest rating</h2>
                <p>Current record with a direct path to detail.</p>
              </div>
              <RatingStatusChip tone={latest ? 'success' : 'muted'}>{latest ? 'synced' : 'empty'}</RatingStatusChip>
            </div>
            {latest ? <RatingCard rating={latest} href={`/ratings/${latest.id}`} actionLabel="Open detail" /> : <EmptyState title="No rating yet" description="Connect a wallet and submit the first score." />}
          </div>
        </div>

        <div className="panel">
          <div className="panel__inner">
            <div className="panel__title">
              <div>
                <h2>Recent history</h2>
                <p>Preview the last records in the studio rail.</p>
              </div>
              <RatingStatusChip tone="muted">{records.length} items</RatingStatusChip>
            </div>
            {records.length ? <RatingHistoryList items={records.slice(0, 3)} /> : <EmptyState title="No records" description="Your submitted ratings will appear here." />}
          </div>
        </div>
      </section>

      <section className="panel panel--soft">
        <div className="panel__inner">
          <div className="panel__title">
            <div>
              <h2>Chain snapshot</h2>
              <p>Read-only contract metrics for the Base rating feed.</p>
            </div>
            <RatingStatusChip tone="ready">base</RatingStatusChip>
          </div>
          <div className="summary-grid">
            <div className="summary-tile">
              <div className="summary-tile__label">Contract average</div>
              <div className="summary-tile__value">{String(chainAverage.data ? Number(chainAverage.data) : summary.average)}</div>
              <div className="summary-tile__note">Onchain read when available.</div>
            </div>
            <div className="summary-tile">
              <div className="summary-tile__label">Contract count</div>
              <div className="summary-tile__value">{String(chainCount.data ? Number(chainCount.data) : summary.count)}</div>
              <div className="summary-tile__note">Ratings recorded on Base.</div>
            </div>
            <div className="summary-tile">
              <div className="summary-tile__label">Current score</div>
              <div className="summary-tile__value">{latest?.score ?? '—'}</div>
              <div className="summary-tile__note">Latest connected record.</div>
            </div>
            <div className="summary-tile">
              <div className="summary-tile__label">Status</div>
              <div className="summary-tile__value">{isConnected ? 'Live' : 'Idle'}</div>
              <div className="summary-tile__note">{isConnected ? 'Wallet linked' : 'Waiting for a wallet'}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

