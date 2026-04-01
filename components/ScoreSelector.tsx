'use client';

export function ScoreSelector({ value, onChange }: { value: number; onChange: (score: number) => void }) {
  return (
    <div className="section-grid">
      <div className="panel__title">
        <div>
          <h2>Choose your score</h2>
          <p>Pick a single number from 1 to 10.</p>
        </div>
      </div>
      <div className="score-grid" role="radiogroup" aria-label="Rating score selector">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((score) => (
          <button
            key={score}
            type="button"
            className="score-chip"
            data-selected={value === score}
            aria-pressed={value === score}
            onClick={() => onChange(score)}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );
}

