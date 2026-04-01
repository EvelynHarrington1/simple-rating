'use client';

export function SubmitRatingButton({
  score,
  isSubmitting,
  disabled,
}: {
  score: number;
  isSubmitting: boolean;
  disabled?: boolean;
}) {
  const label = score > 0 ? `Submit score ${score}` : 'Select a score';

  return (
    <button className="primary-button" type="submit" disabled={disabled || score === 0 || isSubmitting}>
      {isSubmitting ? 'Submitting...' : label}
    </button>
  );
}

