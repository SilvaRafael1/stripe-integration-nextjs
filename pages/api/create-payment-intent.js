import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount } = req.body;

    try {
      // Cria o PaymentIntent no Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // valor em centavos (ex: 5000 = $50.00)
        currency: 'brl',
        payment_method_types: ['card'],
      });

      // Envia o client_secret de volta para o front-end
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Método não permitido');
  }
}
