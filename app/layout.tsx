import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import type { ReactNode } from 'react';

const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
});

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${monoFont.variable}`}>
      <head>
        <meta name="base:app_id" content="69cce2651aacdcc17b255186" />
        <meta name="talentapp:project_verification" content="d7958c684204f585c31ea0a9c3be310ccc138b824761f93fe86e53467b0806a81a7bcc68ad9eecec1be963e6f8805c0ceaccca2ebaca307fe98501820721e913" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

