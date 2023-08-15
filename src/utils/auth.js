import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './connect'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ]
}

export const getAuthSession = () => getServerSession(authOptions)
