import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BroadGame - Admin Panel',
  description: 'Admin panel for BroadGame management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-admin-600">BroadGame Admin</h1>
                <nav className="space-x-4">
                  <a href="/admin" className="text-gray-600 hover:text-gray-900">Dashboard</a>
                  <a href="/admin/users" className="text-gray-600 hover:text-gray-900">Users</a>
                  <a href="/admin/games" className="text-gray-600 hover:text-gray-900">Games</a>
                  <a href="/admin/scores" className="text-gray-600 hover:text-gray-900">Scores</a>
                  <a href="/admin/analytics" className="text-gray-600 hover:text-gray-900">Analytics</a>
                </nav>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
