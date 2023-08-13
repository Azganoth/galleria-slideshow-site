import '@/globals.css';
import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';

const lb = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lb',
});

export const metadata: Metadata = {
  title: 'Galleria',
  description:
    'This is a solution to the "Galleria slideshow site" challenge on Frontend Mentor',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={lb.variable}>{children}</body>
    </html>
  );
}
