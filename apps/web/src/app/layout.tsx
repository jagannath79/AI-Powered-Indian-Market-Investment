import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'AI-Powered Indian Market Investment Intelligence Platform',
  description: 'Live-data decision support for Indian stock market capital allocation.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
