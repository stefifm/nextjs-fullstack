import { prisma } from '@/utils/connect'
import { NextResponse } from 'next/server'

export const PUT = async (req, { params }) => {
  const { id } = params
  try {
    const body = await req.json()
    await prisma.order.update({
      where: { id: id },
      data: { status: body }
    })

    return new NextResponse(JSON.stringify({ message: 'Order updated' }), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 })
  }
}
