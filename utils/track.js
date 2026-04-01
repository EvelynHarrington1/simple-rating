const DASHBOARD_API = 'https://base-dashboard-zeta.vercel.app/api/track';

export async function trackTransaction(appId, appName, userAddress, txHash) {
  try {
    await fetch(DASHBOARD_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: appId,
        app_name: appName,
        user_address: userAddress?.toLowerCase(),
        tx_hash: txHash,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Silent failure; never block the core flow.
  }
}

export async function trackPageView(appId, appName, userAddress, pathname) {
  try {
    await fetch(DASHBOARD_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: appId,
        app_name: appName,
        user_address: userAddress?.toLowerCase(),
        page_path: pathname,
        event_type: 'view',
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Silent failure; never block the core flow.
  }
}