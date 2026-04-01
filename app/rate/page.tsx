'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { ReviewHeader } from '@/components/ReviewHeader';
import { WalletButton } from '@/components/WalletButton';
import { RatingStatusChip } from '@/components/RatingStatusChip';
import { ScoreSelector } from '@/components/ScoreSelector';
import { SubmitRatingButton } from '@/components/SubmitRatingButton';
import { RatingCard } from '@/components/RatingCard';
import { EmptyState } from '@/components/EmptyState';
import { RatingSummaryPanel } from '@/components/RatingSummaryPanel';
import { getLatestViewRating, getSummaryForView, buildDraftRating, saveLocalRating } from '@/lib/rating-store';
import { APP_ID, APP_NAME, CONTRACT_ADDRESS, ratingAbi } from '@/lib/wagmi';
import { trackTransaction } from '@/utils/track';

export default function RatePage() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const [score, setScore] = useState(8);
  const [status, setStatus] = useState<'ready' | 'pending' | 'submitted' | 'failed'>('ready');
  const [statusMessage, setStatusMessage] = useState('Ready to submit.');
  const [latestTx, setLatestTx] = useState<string | null>(null);
  const [latestRating, setLatestRating] = useState(() => getLatestViewRating(address));
  const [summary, setSummary] = useState(() => getSummaryForView(address));

  const rated = useReadContract({ abi: ratingAbi, address: CONTRACT_ADDRESS, functionName: 'rated', args: [address as `0x${string}`], query: { enabled: Boolean(address) } });
  const count = useReadContract({ abi: ratingAbi, address: CONTRACT_ADDRESS, functionName: 'count' });
  const average = useReadContract({ abi: ratingAbi, address: CONTRACT_ADDRESS, functionName: 'average' });

  useEffect(() => {
    setLatestRating(getLatestViewRating(address));
    setSummary(getSummaryForView(address));
  }, [address]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!address) {
      setStatus('failed');
      setStatusMessage('Connect a wallet first.');
      return;
    }

    setStatus('pending');
    setStatusMessage('Submitting score...');

    try {
      const hash = await writeContractAsync({
        abi: ratingAbi,
        address: CONTRACT_ADDRESS,
        functionName: 'rate',
        args: [score],
      });

      setLatestTx(hash);
      setStatusMessage('Waiting for confirmation...');

      await trackTransaction(APP_ID, APP_NAME, address, hash);
      const record = buildDraftRating(score, address, hash);
      saveLocalRating(record);
      setLatestRating(record);
      setSummary(getSummaryForView(address));
      setStatus('submitted');
      setStatusMessage('Score submitted.');
    } catch (error) {
      setStatus('failed');
      setStatusMessage(error instanceof Error ? error.message : 'Submission failed.');
    }
  }

  return (
    <main className="app-shell page-stack">
      <ReviewHeader
        title="Submit rating"
        subtitle="Scoring studio for quick 1 to 10 submissions."
        status={<RatingStatusChip tone={status === 'submitted' ? 'success' : status === 'failed' ? 'warn' : isConnected ? 'live' : 'ready'}>{status}</RatingStatusChip>}
      >
        <WalletButton />
      </ReviewHeader>

      <section className="two-up">
        <form className="panel" onSubmit={handleSubmit}>
          <div className="panel__inner">
            <div className="panel__title">
              <div>
                <h1>Score studio</h1>
                <p>Choose a number, submit it, and keep moving.</p>
              </div>
              <RatingStatusChip tone={status === 'submitted' ? 'success' : status === 'failed' ? 'warn' : 'ready'}>{statusMessage}</RatingStatusChip>
            </div>
            <ScoreSelector value={score} onChange={setScore} />
            <div className="action-bar" style={{ marginTop: 18 }}>
              <SubmitRatingButton score={score} isSubmitting={isPending || status === 'pending'} disabled={!isConnected} />
              {latestTx ? <RatingStatusChip tone="muted">tx ready</RatingStatusChip> : null}
            </div>
          </div>
        </form>

        <div className="section-grid">
          <RatingSummaryPanel summary={summary} latestScore={latestRating?.score ?? null} isConnected={isConnected} />
          <div className="panel">
            <div className="panel__inner">
              <div className="panel__title">
                <div>
                  <h2>Current result</h2>
                  <p>{latestRating ? `Last score ${latestRating.score} at ${new Date(latestRating.createdAt).toLocaleString('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}.` : 'No local submission yet.'}</p>
                </div>
                <RatingStatusChip tone={rated.data ? 'success' : 'ready'}>{rated.data ? 'rated' : 'not rated'}</RatingStatusChip>
              </div>
              {latestRating ? <RatingCard rating={latestRating} href={`/ratings/${latestRating.id}`} actionLabel="Open detail" /> : <EmptyState title="No submission yet" description="Submit a score to see the latest result here." />}
              <div className="action-bar" style={{ marginTop: 14 }}>
                <a className="secondary-button" href="/my">Open my ratings</a>
                <a className="secondary-button" href="/summary">Open summary</a>
              </div>
            </div>
          </div>
          <div className="panel panel--soft">
            <div className="panel__inner">
              <div className="panel__title">
                <div>
                  <h2>Onchain snapshot</h2>
                  <p>Read-only contract values for the current feed.</p>
                </div>
                <RatingStatusChip tone="live">base</RatingStatusChip>
              </div>
              <div className="summary-grid">
                <div className="summary-tile">
                  <div className="summary-tile__label">Average</div>
                  <div className="summary-tile__value">{String(average.data !== undefined ? Number(average.data) : summary.average)}</div>
                  <div className="summary-tile__note">Contract average.</div>
                </div>
                <div className="summary-tile">
                  <div className="summary-tile__label">Count</div>
                  <div className="summary-tile__value">{String(count.data !== undefined ? Number(count.data) : summary.count)}</div>
                  <div className="summary-tile__note">Ratings recorded so far.</div>
                </div>
                <div className="summary-tile">
                  <div className="summary-tile__label">Status</div>
                  <div className="summary-tile__value">{status}</div>
                  <div className="summary-tile__note">Submission flow state.</div>
                </div>
                <div className="summary-tile">
                  <div className="summary-tile__label">Wallet</div>
                  <div className="summary-tile__value">{isConnected ? 'Linked' : 'Idle'}</div>
                  <div className="summary-tile__note">Connect to submit.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


