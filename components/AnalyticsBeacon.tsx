"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';
import { APP_ID, APP_NAME } from '@/lib/wagmi';
import { recordPageView } from '@/lib/analytics-store';
import { trackPageView } from '@/utils/track';

export function AnalyticsBeacon() {
  const pathname = usePathname();
  const { address } = useAccount();

  useEffect(() => {
    if (!pathname) return;
    recordPageView(pathname);
    void trackPageView(APP_ID, APP_NAME, address, pathname);
  }, [address, pathname]);

  return null;
}