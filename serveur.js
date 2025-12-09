const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

app.post('/create-checkout-session', async (req, res) => {
    console.log('BODY:', req.body)
  const { amount } = req.body;
  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Montant invalide ou manquant.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: 'Commande markety' },
          unit_amount: Math.round(Number(amount) * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${FRONTEND_URL}/success`,
      cancel_url: `${FRONTEND_URL}/cancel`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la session Stripe.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server Stripe running on port ${PORT}`);
});