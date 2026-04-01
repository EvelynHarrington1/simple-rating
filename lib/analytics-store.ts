import { getRatingsSnapshot } from '@/lib/rating-store';

const STORAGE_KEY = 'simple-rating:analytics';
const ANALYTICS_EVENT = 'simple-rating:analytics';

type AnalyticsState = {
  views: number;
  routes: Record<string, number>;
  txCount: number;
};

const DEFAULT_STATE: AnalyticsState = {
  views: 0,
  routes: {},
  txCount: 0,
};

function notifyChange() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(ANALYTICS_EVENT));
}

function readState(): AnalyticsState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as AnalyticsState;
    return {
      views: parsed.views ?? 0,
      routes: parsed.routes ?? {},
      txCount: parsed.txCount ?? 0,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function writeState(state: AnalyticsState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  notifyChange();
}

export function recordPageView(pathname: string) {
  const state = readState();
  const next = {
    ...state,
    views: state.views + 1,
    routes: {
      ...state.routes,
      [pathname]: (state.routes[pathname] ?? 0) + 1,
    },
  };
  writeState(next);
  return next;
}

export function recordTransaction() {
  const state = readState();
  const next = {
    ...state,
    txCount: state.txCount + 1,
  };
  writeState(next);
  return next;
}

export function subscribeAnalytics(onChange: () => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => onChange();
  window.addEventListener(ANALYTICS_EVENT, handler);
  return () => window.removeEventListener(ANALYTICS_EVENT, handler);
}

export function getAnalyticsSnapshot(pathname?: string) {
  const state = readState();
  const ratings = getRatingsSnapshot();
  return {
    views: state.views,
    routeViews: pathname ? state.routes[pathname] ?? 0 : state.views,
    txCount: state.txCount || ratings.filter((rating) => Boolean(rating.txHash)).length,
  };
}