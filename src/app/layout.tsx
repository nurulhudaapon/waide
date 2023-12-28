import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { initDb } from '../schema/migration'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Waide',
  description: 'An IDE based on Web Assembly',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  initDb();

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
