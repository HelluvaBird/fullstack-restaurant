import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const fetchProducts = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(category ? { categorySlug: category } : { isFeatured: true }),
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
};

export { fetchProducts as GET };
