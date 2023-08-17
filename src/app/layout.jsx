import Notification from '@/components/Notification'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import QueryProvider from '@/components/QueryProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
            <ToastContainer
              position='bottom-right'
              theme='dark'
              autoClose={3000}
            />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
