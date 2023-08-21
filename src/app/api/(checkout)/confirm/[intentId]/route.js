import { prisma } from '@/utils/connect'
import { NextResponse } from 'next/server'

export const PUT = async (request, { params }) => {
  const { intentId } = params

  try {
    await prisma.order.update({
      where: {
        intent_id: intentId
      },
      data: {
        status: 'Being prepared'
      }
    })

    return new NextResponse(JSON.stringify({ message: 'Order has been updated' }), {
      status: 200
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500
    })
  }
}
