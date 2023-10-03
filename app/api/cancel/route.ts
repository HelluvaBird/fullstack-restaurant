import { authOptions } from '@/lib/nextauth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

const handler = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const { id } = await req.json();

  if (!session) {
    return NextResponse.json('Unauthenticated', { status: 401 });
  }

  const order = await prisma.order.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!order) {
    return NextResponse.json('Order not found', { status: 404 });
  }

  const paymentIntent = await stripe.paymentIntents.cancel(
    order.intentId || ''
  );
  await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      status: 'cancelled',
    },
  });

  return NextResponse.json('Order Cancelled', { status: 200 });
};

export { handler as POST };
