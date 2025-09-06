import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ARW 2025',
  description:
    'Annual Recruitment Week (ARW) is a weeklong University-wide event; Representing all Council of Student Organizations (CSO) accredited organizations where they are given the opportunity to attract and recruit new members from the Lasallian community.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative min-h-screen bg-[url('/bg/st-lasalle-bg.webp')] bg-cover bg-center bg-no-repeat ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="absolute w-full h-full bg-black/50 z-0" />
        <div className="relative z-50">{children}</div>
      </body>
    </html>
  );
}
