import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Altiplano - Search Your Knowledge, Not The Web',
  description: 'A local-first parametric search engine powered by advanced AI guardrails. Private, fast, and offline-capable with sophisticated prompt priming.',
  keywords: 'search engine, AI, local-first, privacy, offline, parametric search, guardrails',
  authors: [{ name: 'Altiplano' }],
  openGraph: {
    type: 'website',
    url: 'https://altiplano.vercel.app',
    title: 'Altiplano - Search Your Knowledge, Not The Web',
    description: 'A local-first parametric search engine powered by advanced AI guardrails. Private, fast, and offline-capable.',
    images: ['/altiplano-branding.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Altiplano - Search Your Knowledge, Not The Web',
    description: 'A local-first parametric search engine powered by advanced AI guardrails. Private, fast, and offline-capable.',
    images: ['/altiplano-branding.png'],
  },
  icons: {
    icon: '/altiplano-graphic-mark-logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}