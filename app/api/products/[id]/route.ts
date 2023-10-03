import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const handler = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
};

export { handler as GET };
