import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { AuthProvider } from '../components/helpers/AuthenContext';

const roboto = Roboto({ weight: ['300', '400', '500', '700'], subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: 'Operation Webapp',
  description: 'Generated by create next app',
  viewport: "initial-scale=1, width=device-width"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${roboto.className} m-0`}>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
