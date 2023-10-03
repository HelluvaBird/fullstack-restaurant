import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

const handler = async (
  req: Request,
  { params: { orderId } }: { params: { orderId: string } }
) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (order && order.intentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        order.intentId
      );
      return NextResponse.json(paymentIntent.client_secret, { status: 200 });
    }

    if (order) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: order.price,
        currency: 'usd',
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          intentId: paymentIntent.id,
        },
      });

      return NextResponse.json(paymentIntent.client_secret, { status: 200 });
    }
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(`Invalid order ${orderId}`, { status: 500 });
  }
};

export { handler as POST };
