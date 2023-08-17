import { prisma } from '@/utils/connect'
import { NextResponse } from 'next/server'

export const GET = async (req, { params }) => {
  const { id } = params
  try {
    const product = await prisma.product.findUnique({
      where: { id: id }
    })

    return new NextResponse(JSON.stringify(product), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 })
  }
}
