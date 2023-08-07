import '@/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galleria',
  description:
    'This is a solution to the "Galleria slideshow site" challenge on Frontend Mentor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
