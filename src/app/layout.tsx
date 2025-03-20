import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/app/_providers/ThemeProvider';
import { BooksProvider } from './_providers/BooksProvider';
import Header from './_components/Header';
import { ThemeBox } from './_components/ThemeBox';
import { Toaster } from './_components/atoms/toaster';

const geistSans = localFont({
  src: './_fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './_fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: '500 Books of Summer',
  description: 'Quench your Thirst for Knowledge',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BooksProvider>
          <ThemeProvider>
            <div className="fixed right-2 top-2">
              <ThemeBox />
            </div>
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </BooksProvider>
      </body>
    </html>
  );
}
