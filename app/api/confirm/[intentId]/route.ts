import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const handler = async (
  req: Request,
  { params: { intentId } }: { params: { intentId: string } }
) => {
  try {
    await prisma.order.update({
      where: {
        intentId,
      },
      data: {
        status: 'Being prepared!',
      },
    });
    return NextResponse.json('Order has been updated', { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
};

export { handler as PATCH };
