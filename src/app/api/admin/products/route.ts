import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: { select: { name: true } },
      images: { take: 1, orderBy: { position: 'asc' } },
    },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { images, variants, ...rest } = data

  const product = await prisma.product.create({
    data: {
      ...rest,
      images: images ? { create: images } : undefined,
      variants: variants ? { create: variants } : undefined,
    },
    include: { category: { select: { name: true } }, images: { take: 1 } },
  })
  return NextResponse.json(product)
}
