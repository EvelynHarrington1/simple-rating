import { RatingRecord, RatingSummary } from '@/lib/types';

export const MOCK_RATINGS: RatingRecord[] = [
  {
    id: 'sample-901',
    score: 9,
    owner: '0x8f72c3A64F6e9B01dC7b4F2340B1f0C4fB81a901',
    txHash: '0x8b9d1d80f16fef0c76f62c8b37d6d2b3a3c1d4e5f6a7890b1234567890abcd01',
    createdAt: '2026-03-30T10:22:00.000Z',
    status: 'submitted',
    source: 'mock',
  },
  {
    id: 'sample-616',
    score: 6,
    owner: '0x2d91cBBa1F6B4d5A209eA010f8c2aA7FfCDf0616',
    txHash: '0x61b2c3d4e5f67890abcd1234ef567890abcd1234ef567890abcd1234ef567890',
    createdAt: '2026-03-29T14:11:00.000Z',
    status: 'submitted',
    source: 'mock',
  },
  {
    id: 'sample-710',
    score: 10,
    owner: '0xA17C9f11706de5b7d0c3F1f8D0E09c96dF5a0710',
    txHash: '0x710c3c7a93b4f55f12d98c21c0e8c1e0d9f1234abcd98765fedcba0987654321',
    createdAt: '2026-03-28T19:40:00.000Z',
    status: 'submitted',
    source: 'mock',
  },
];

export const MOCK_SUMMARY: RatingSummary = {
  average: 8,
  count: 128,
  totalScore: 1024,
};

