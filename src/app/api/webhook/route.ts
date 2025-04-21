import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '../../../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    console.log('Webhook event type:', event.type); // Log event type
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      console.log('Processing checkout session:', session.id);
      console.log('Session metadata:', session.metadata);

      const userId = session.metadata?.userId;
      const items = JSON.parse(session.metadata?.items || '[]');
      
      console.log('Parsed items:', items);

      if (!userId) throw new Error('No user ID in session metadata');
      if (!items.length) throw new Error('No items in session metadata');

      // Create order directly from session data
      const order = await prisma.order.create({
        data: {
          userId,
          total: Number(session.amount_total) / 100,
          status: 'paid',
          items: {
            create: items.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }
      });

      console.log('Order created successfully:', order.id);

    } catch (error) {
      console.error('Detailed error processing order:', error);
      return NextResponse.json({ error: 'Error processing order' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}