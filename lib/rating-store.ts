import { MOCK_RATINGS, MOCK_SUMMARY } from '@/lib/mock-ratings';
import { RatingRecord, RatingSummary } from '@/lib/types';

const STORAGE_KEY = 'simple-rating:records';

export function normalizeAddress(address?: string | null) {
  return address?.toLowerCase() ?? '';
}

export function formatShortAddress(address?: string | null) {
  if (!address) return 'Not connected';
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function readStored(): RatingRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RatingRecord[]) : [];
  } catch {
    return [];
  }
}

function writeStored(records: RatingRecord[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function getRatingsSnapshot() {
  return [...readStored()];
}

export function getViewRatings(address?: string | null) {
  const normalized = normalizeAddress(address);
  const local = readStored().filter((item) => normalizeAddress(item.owner) === normalized);
  if (local.length > 0) {
    return [...local].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }
  return [...MOCK_RATINGS].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export function getLatestViewRating(address?: string | null) {
  const records = getViewRatings(address);
  return records[0] ?? null;
}

export function getSummaryForView(address?: string | null): RatingSummary {
  const records = getViewRatings(address);
  if (records.length === 0) return MOCK_SUMMARY;
  const totalScore = records.reduce((sum, record) => sum + record.score, 0);
  return {
    average: Math.round(totalScore / records.length),
    count: records.length,
    totalScore,
  };
}

export function getRatingById(id: string, address?: string | null) {
  return getViewRatings(address).find((record) => record.id === id) ?? null;
}

export function saveLocalRating(record: RatingRecord) {
  const current = readStored();
  const normalized = normalizeAddress(record.owner);
  const next = [
    record,
    ...current.filter((item) => !(normalizeAddress(item.owner) === normalized && item.id === record.id)),
  ];
  writeStored(next);
  return next;
}

export function buildDraftRating(score: number, owner: string, txHash?: string): RatingRecord {
  return {
    id: `rating-${Date.now()}`,
    score,
    owner,
    txHash,
    createdAt: new Date().toISOString(),
    status: 'submitted',
    source: 'local',
  };
}

