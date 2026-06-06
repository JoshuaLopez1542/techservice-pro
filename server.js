require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/crear-checkout-session', async (req, res) => {
    try {
        const { carrito } = req.body;

        const line_items = carrito.map(item => ({
            price_data: {
                currency: 'mxn',
                product_data: {
                    name: item.nombre
                },
                unit_amount: item.precio * 100
            },
            quantity: 1
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            success_url: 'http://localhost:3000/success.html',
            cancel_url: 'http://localhost:3000/carrito.html'
        });

        res.json({ url: session.url });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando sesión de pago' });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor Stripe activo');
});