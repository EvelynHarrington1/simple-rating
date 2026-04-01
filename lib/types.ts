export type RatingRecord = {
  id: string;
  score: number;
  owner: `0x${string}` | string;
  txHash?: `0x${string}` | string;
  createdAt: string;
  status: 'submitted' | 'pending' | 'failed' | 'draft';
  source: 'mock' | 'local' | 'chain';
};

export type RatingSummary = {
  average: number;
  count: number;
  totalScore: number;
};

