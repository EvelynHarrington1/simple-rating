'use client';

import { ReviewHeader } from '@/components/ReviewHeader';
import { WalletButton } from '@/components/WalletButton';
import { RatingStatusChip } from '@/components/RatingStatusChip';

export default function AboutPage() {
  return (
    <main className="app-shell page-stack">
      <ReviewHeader
        title="About"
        subtitle="A minimal note about how the studio works."
        status={<RatingStatusChip tone="ready">simple</RatingStatusChip>}
      >
        <WalletButton />
      </ReviewHeader>

      <section className="panel">
        <div className="panel__inner">
          <div className="panel__title">
            <div>
              <h1>What this is</h1>
              <p>Users can connect a wallet and submit a score from 1 to 10.</p>
            </div>
          </div>
          <div className="detail-fields">
            <div className="detail-field">
              <div className="detail-field__label">Focus</div>
              <div className="detail-field__value">Fast rating, latest result, and a clean record view.</div>
            </div>
            <div className="detail-field">
              <div className="detail-field__label">Style</div>
              <div className="detail-field__value">Editorial review desk with a premium score surface.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

