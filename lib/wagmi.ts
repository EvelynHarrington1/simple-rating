import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { parseAbi } from 'viem';

export const APP_ID = 'app-032';
export const APP_NAME = 'simple-rating';
export const CONTRACT_ADDRESS = '0xcf1f31529eef75efb083f7617f00c0f1681e2849' as const;

export const BUILDER_CODE = 'bc_xqvxho2a';
export const BUILDER_CODE_DATA_SUFFIX = '0x62635f78717678686f32610b0080218021802180218021802180218021' as const;

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