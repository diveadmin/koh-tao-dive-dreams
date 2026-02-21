import Stripe from 'stripe';

// This serverless function creates a Stripe Checkout session for a fixed deposit.
// Required environment variables (set in Vercel):
// - STRIPE_SECRET_KEY  (your Stripe secret key)
// - DEPOSIT_AMOUNT (optional, default 2000) — major currency units (e.g., 2000 for ฿2,000)
// - DEPOSIT_CURRENCY (optional, default 'thb')

const stripeKey = process.env.STRIPE_SECRET_KEY || '';
const depositAmountMajor = parseFloat(process.env.DEPOSIT_AMOUNT || '2000');
const depositCurrency = (process.env.DEPOSIT_CURRENCY || 'thb').toLowerCase();

if (!stripeKey) {
  // eslint-disable-next-line no-console
  console.warn('Stripe secret key is not configured. Set STRIPE_SECRET_KEY in environment.');
}

const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const itemTitle = body.itemTitle || 'Booking Deposit';
    const itemType = body.itemType || 'course';
    const customerName = body.name || '';
    const customerEmail = body.email || '';

    // Allow frontend to override deposit amount & currency per-course
    let amountMajor = typeof body.amountMajor === 'number' ? body.amountMajor : depositAmountMajor;
    let currency = (body.currency || depositCurrency || 'thb').toString().toLowerCase();

    // Basic validation
    amountMajor = Number(amountMajor);
    if (isNaN(amountMajor) || amountMajor <= 0) {
      return res.status(400).json({ error: 'Invalid amountMajor' });
    }

    if (typeof currency !== 'string' || currency.length < 2) {
      currency = depositCurrency;
    }

    // unit_amount in the smallest currency unit (e.g., cents)
    const unit_amount = Math.round(amountMajor * 100);

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Deposit — ${itemTitle}`,
              description: `Booking ${itemType}`,
            },
            unit_amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        itemTitle,
        itemType,
        customerName,
        customerEmail,
      },
      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?payment=canceled`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('Stripe checkout session creation failed:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Internal Server Error' });
  }
}
