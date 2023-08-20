import { getAuthSession } from '@/utils/auth'
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

// DELETE PRODUCT
export const DELETE = async (req, { params }) => {
  const { id } = params

  const session = await getAuthSession()

  if (session.user.isAdmin) {
    try {
      await prisma.product.delete({
        where: { id: id }
      })

      return new NextResponse(JSON.stringify({ message: 'Product has been' }), { status: 200 })
    } catch (error) {
      return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 })
    }
  } else {
    return new NextResponse(JSON.stringify({ message: 'You are not allowed' }), { status: 403 })
  }
}
