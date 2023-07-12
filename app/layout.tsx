import '../public/styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import Navbar from '@/components/containers/Navbar'

export const metadata: Metadata = {
  title: 'Operation Daily Plan'
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Script src="../public/js/main.js" />
    </>
  )
}
