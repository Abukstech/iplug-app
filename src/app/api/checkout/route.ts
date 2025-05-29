import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { authOptions } from '../auth/[...nextauth]/auth';
import prisma from '../../../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil'
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get user ID from database using email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { items } = body;

    console.log('Creating checkout session with items:', items);

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      metadata: {
        userId: user.id,
        items: JSON.stringify(items.map((item: { id: string; quantity: number; price: number }) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        })))
      }
    });

    console.log('Checkout session created:', stripeSession.id);
    // Create a new order in the database
    const newOrder = await prisma.order.create({
      data: {
        userId: user.id,
        total: (stripeSession.amount_total ?? 0) / 100, // Convert cents to dollars
        status: 'Pending',
        items: {
          create: items.map((item: { id: string; quantity: number; price: number }) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    console.log('New order created:', newOrder.id);

    return NextResponse.json({ sessionId: stripeSession.id, orderId: newOrder.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}