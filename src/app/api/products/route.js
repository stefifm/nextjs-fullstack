import { prisma } from '@/utils/connect'
import { NextResponse } from 'next/server'

// FETCH ALL PRODUCTS

export const GET = async (req) => {
  const { searchParams } = new URL(req.url)
  const cat = searchParams.get('cat')

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true })
      }
    })
    return new NextResponse(JSON.stringify(products), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 })
  }
}
export const POST = async (req) => {
  try {
    const body = await req.json()
    const product = await prisma.product.create({
      data: body
    })
    return new NextResponse(JSON.stringify(product), { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 })
  }
}
