import { authOptions } from '@/lib/nextauth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const createOrder = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json('Not Authenticated', { status: 401 });
  }

  try {
    const { products, price, status } = await req.json();

    const order = await prisma.order.create({
      data: {
        userId: session.user.id || '',
        products,
        price,
        status,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
};

const fetchOrders = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json('Not Authenticated', { status: 401 });
  }

  try {
    if (session.user.isAdmin) {
      const orders = await prisma.order.findMany();
      return NextResponse.json(orders, { status: 200 });
    }
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
};

export { createOrder as POST, fetchOrders as GET };
