## 🎧 Stripe Payment Service – Markety

Service Node.js dédié aux paiements Stripe pour le projet Markety.
Ce micro-service gère la création de sessions Checkout Stripe ainsi que les pages de redirection après paiement.

Déployé sur Render → https://stripe-pbda.onrender.com

(Exemple — remplace par ton URL réelle)

🚀 Technologies utilisées

- Node.js

- Express

- Stripe API

- dotenv

- Render.com (déploiement)

## 📦 Installation & Lancement local
1. Cloner le repo
git clone https://github.com/cfb2025-2026/Stripe.git
cd Stripe

2. Installer les dépendances
npm install

3. Créer un fichier .env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=xxx
STRIPE_PORT=votre port

4. Lancer le serveur
node server.js

## 📚 API Documentation 
Base URL
Production : https://stripe-xxxx.onrender.com
Local : http://localhost:3001

🔹 POST /create-checkout-session
🎯 Créer une session de paiement Stripe

URL :

POST /create-checkout-session


Body attendu :

{
  "product_name": "Nom du produit",
  "product_price": 29.99,
  "quantity": 1
}


Réponse (201 Created) :

{
  "url": "https://checkout.stripe.com/c/pay_xxxxxxxxxxxxx"
}


Description :

Crée une session Stripe Checkout.

Retourne une URL vers laquelle rediriger l'utilisateur.

Le prix doit être envoyé en euros (la conversion en centimes est faite côté serveur).

🔹 GET /success
🎉 Page affichée après un paiement réussi

URL :

GET /success


Réponse :

<h1>Paiement réussi</h1>


Description :

Redirection par Stripe après validation du paiement.

Peut être personnalisée ou remplacée par un écran frontend.

🔹 GET /cancel
❌ Page affichée si l’utilisateur annule le paiement

URL :

GET /cancel


Réponse :

<h1>Paiement annulé</h1>


Description :

Redirection Stripe quand l’utilisateur clique sur “Annuler”.

🔐 Variables d'environnement
Variable	Description
STRIPE_SECRET_KEY	Clé secrète Stripe (obligatoire)
FRONTEND_URL	URL du frontend Markety (Vercel en prod)
STRIPE_PORT	Port d'écoute local
🛠 Déploiement Render
Commande de build (Render) :
npm install

Commande de démarrage :
node server.js

Variables d'environnement Render à configurer :

STRIPE_SECRET_KEY

FRONTEND_URL

STRIPE_PORT (ex : 10000)

🔗 Intégration frontend
const response = await fetch("https://stripe-xxxx.onrender.com/create-checkout-session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    product_name: item.name,
    product_price: item.price,
    quantity: 1
  })
});

const data = await response.json();
window.location.href = data.url;

✅ Statut

✔️ Serveur fonctionnel
✔️ Compatible Stripe en mode test et production
✔️ API simple et documentée