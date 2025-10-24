import type { Metadata } from 'next'
import './globals.css'

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
      <body style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#5C4033',
        backgroundColor: '#F5E6D3',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}>
        {children}
      </body>
    </html>
  )
}