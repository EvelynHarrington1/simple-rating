# simple-rating

A premium Base rating studio for submitting 1 to 10 scores.

## Stack
- Next.js App Router
- TypeScript
- Wagmi
- Viem

## Pages
- `/` rating hub
- `/rate` submit rating
- `/ratings/[id]` rating detail
- `/my` personal rating journal
- `/summary` lightweight overview
- `/about` minimal explanation

## Notes
- All visible UI text is English.
- `app/layout.tsx` includes the required Base app id meta tag.
- `lib/wagmi.ts` keeps a placeholder for the builder code suffix.
- `utils/track.js` contains the transaction attribution hook.