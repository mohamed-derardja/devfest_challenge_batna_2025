import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Student Success Platform',
  description: 'Your all-in-one academic companion for exam prep, resources, and campus life',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}