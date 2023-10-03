import { authOptions } from '@/lib/nextauth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const handler = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  const { status } = await req.json();
  try {
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return NextResponse.json('Order updated', { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
};

const orderDetails = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);

  const order = await prisma.order.findFirst({
    where: {
      id,
      userId: session?.user.id,
    },
  });

  if (!order) {
    return NextResponse.json('Order not found', { status: 404 });
  }

  return NextResponse.json(order, { status: 200 });
};

export { handler as PATCH, orderDetails as GET };
