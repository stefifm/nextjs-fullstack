import Notification from '@/components/Notification'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import QueryProvider from '@/components/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Massimo Rastaurant',
  description: 'The best of Italian food!!',
  icons: {
    icon: '/restaurant.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head></head>
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            <Notification />
            <Navbar />
            {children}
            <Footer />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
