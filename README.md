# simple-rating

A premium Base rating studio for submitting 1-to-10 scores.

## Overview

`simple-rating` is a Next.js application focused on simple rating workflows.

It provides a small set of pages for submitting ratings, viewing rating details, reviewing personal activity, and reading a lightweight summary.

The interface is designed to be clear, direct, and entirely in English.

## Repository

GitHub: https://github.com/EvelynHarrington1/simple-rating.git

## Stack

- Next.js App Router
- TypeScript
- Wagmi
- Viem

## Features

- Submit ratings using a 1-to-10 scoring model.
- Browse the main rating hub from the home page.
- View individual rating detail pages.
- Review a personal rating journal.
- Open a lightweight summary page.
- Read a minimal explanation of the project on the about page.
- Includes Base-specific metadata in the application layout.
- Includes a transaction attribution hook in the utilities folder.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Rating hub |
| `/rate` | Submit a rating |
| `/ratings/[id]` | Rating detail |
| `/my` | Personal rating journal |
| `/summary` | Lightweight overview |
| `/about` | Minimal explanation |

## Project Structure Notes

The application uses the Next.js App Router.

Important files referenced by the project include:

- `app/layout.tsx` for shared application layout metadata.
- `lib/wagmi.ts` for Wagmi configuration and the builder code suffix placeholder.
- `utils/track.js` for the transaction attribution hook.

## Setup

Clone the repository:

```bash
git clone https://github.com/EvelynHarrington1/simple-rating.git
```

Move into the project directory:

```bash
cd simple-rating
```

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```
