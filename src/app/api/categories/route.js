import { prisma } from '@/utils/connect'
import { NextResponse } from 'next/server'

// FETCH ALL CATEGORIES

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany()
    return new NextResponse(JSON.stringify(categories), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 })
  }
}
export const POST = () => {
  return new NextResponse('Hello', { status: 200 })
}
