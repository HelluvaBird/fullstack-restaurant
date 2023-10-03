import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const handler = async (req: Request) => {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
};

export { handler as GET };
