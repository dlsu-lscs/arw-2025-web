import type { Metadata } from 'next';
import { Press_Start_2P, Space_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-press-start',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
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
        className={`relative min-h-screen bg-[url('/bg/st-lasalle-bg.webp')] bg-cover bg-center bg-no-repeat ${pressStart.variable} ${spaceMono.variable} ${spaceGrotesk.variable} antialiased `}
      >
        <div className="absolute w-full h-full bg-black/50 z-0" />
        <div className="relative z-50">{children}</div>
      </body>
    </html>
  );
}
