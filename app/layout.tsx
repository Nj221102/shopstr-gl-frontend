import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Load Inter font properly using Next.js font system
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Use relative paths for icons to work with any basePath
export const metadata: Metadata = {
  title: 'Shopstr Username Registration',
  description: 'Register your Shopstr username with BOLT12 offers',
  icons: {
    icon: './shopstr_logo.png',
    apple: './shopstr_logo.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="./shopstr_logo.png" />
        <link rel="apple-touch-icon" href="./shopstr_logo.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
} 