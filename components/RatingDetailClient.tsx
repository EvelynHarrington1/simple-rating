'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ReviewHeader } from '@/components/ReviewHeader';
import { WalletButton } from '@/components/WalletButton';
import { RatingStatusChip } from '@/components/RatingStatusChip';
import { RatingCard } from '@/components/RatingCard';
import { CopyRatingButton } from '@/components/CopyRatingButton';
import { EmptyState } from '@/components/EmptyState';
import { getRatingById } from '@/lib/rating-store';
import type { RatingRecord } from '@/lib/types';

export function RatingDetailClient({ id }: { id: string }) {
  const { address, isConnected } = useAccount();
  const [record, setRecord] = useState<RatingRecord | null>(() => getRatingById(id, address));

  useEffect(() => {
    setRecord(getRatingById(id, address));
  }, [address, id]);

  return (
    <main className="app-shell page-stack">
      <ReviewHeader
        title="Rating detail"
        subtitle="Single record sheet with a direct copy path."
        status={<RatingStatusChip tone={isConnected ? 'success' : 'ready'}>{isConnected ? 'synced' : 'ready'}</RatingStatusChip>}
      >
        <WalletButton />
      </ReviewHeader>

      {record ? (
        <section className="detail-slab">
          <div className="detail-hero">
            <div className="detail-hero__number">{record.score}</div>
            <div className="detail-hero__stack">
              <RatingStatusChip tone={record.status === 'submitted' ? 'success' : 'live'}>{record.status}</RatingStatusChip>
              <h1>Score record</h1>
              <div className="muted">{new Date(record.createdAt).toLocaleString('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</div>
            </div>
          </div>

          <div className="detail-grid">
            <div className="panel">
              <div className="panel__inner">
                <div className="panel__title">
                  <div>
                    <h2>Record sheet</h2>
                    <p>Core data for this rating.</p>
                  </div>
                  <RatingStatusChip tone="live">owner</RatingStatusChip>
                </div>
                <div className="detail-fields">
                  <div className="detail-field">
                    <div className="detail-field__label">Owner</div>
                    <div className="detail-field__value mono">{record.owner}</div>
                  </div>
                  <div className="detail-field">
                    <div className="detail-field__label">Transaction hash</div>
                    <div className="detail-field__value mono">{record.txHash ?? 'Pending'}</div>
                  </div>
                  <div className="detail-field">
                    <div className="detail-field__label">Source</div>
                    <div className="detail-field__value">{record.source}</div>
                  </div>
                </div>
                <div className="action-bar" style={{ marginTop: 14 }}>
                  {record.txHash ? <CopyRatingButton value={record.txHash} label="Copy tx hash" /> : null}
                  <CopyRatingButton value={record.owner} label="Copy owner" />
                </div>
              </div>
            </div>

            <div className="section-grid">
              <div className="panel panel--soft">
                <div className="panel__inner">
                  <div className="panel__title">
                    <div>
                      <h2>Current card</h2>
                      <p>Quick visual check for the score.</p>
                    </div>
                  </div>
                  <RatingCard rating={record} />
                </div>
              </div>
              <div className="panel">
                <div className="panel__inner">
                  <div className="panel__title">
                    <div>
                      <h2>Return path</h2>
                      <p>Move back to the journal or the hub.</p>
                    </div>
                  </div>
                  <div className="action-bar">
                    <a className="primary-button" href="/my">Open my ratings</a>
                    <a className="secondary-button" href="/">Go to hub</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="panel">
          <div className="panel__inner">
            <EmptyState title="Record not found" description="This detail link does not match a stored rating yet." action={<a className="secondary-button" href="/my">Back to my ratings</a>} />
          </div>
        </section>
      )}
    </main>
  );
}