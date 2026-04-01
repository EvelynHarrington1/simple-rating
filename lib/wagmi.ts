import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { parseAbi } from 'viem';

export const APP_ID = 'app-032';
export const APP_NAME = 'simple-rating';
export const CONTRACT_ADDRESS = '0xcf1f31529eef75efb083f7617f00c0f1681e2849' as const;

// Replace this placeholder with the real builder code data suffix once it is provided.
export const BUILDER_CODE_DATA_SUFFIX = 'TODO_REPLACE_WITH_BUILDER_CODE_SUFFIX';

export const ratingAbi = parseAbi([
  'function rate(uint8 score)',
  'function average() view returns (uint256)',
  'function count() view returns (uint256)',
  'function totalScore() view returns (uint256)',
  'function rated(address) view returns (bool)'
]);

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
  multiInjectedProviderDiscovery: false,
});

