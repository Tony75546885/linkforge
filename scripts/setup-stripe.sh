#!/bin/bash
# LinkForge — Stripe Setup Script
# Run: ./scripts/setup-stripe.sh

set -e

echo "=== LinkForge Stripe Setup ==="
echo ""

# Step 1: Login to Stripe
echo "Step 1: Logging into Stripe..."
stripe login

# Step 2: Create product and price
echo ""
echo "Step 2: Creating Pro plan product..."
PRODUCT_ID=$(stripe products create \
  --name="LinkForge Pro" \
  --description="Unlimited short links, advanced analytics, custom slugs, API access" \
  --default-price-data[currency]=usd \
  --default-price-data[unit-amount]=900 \
  --default-price-data[recurring][interval]=month \
  --format json | grep -o '"id": "prod_[^"]*"' | head -1 | cut -d'"' -f4)

echo "Product created: $PRODUCT_ID"

# Get the price ID
PRICE_ID=$(stripe prices list --product="$PRODUCT_ID" --format json | grep -o '"id": "price_[^"]*"' | head -1 | cut -d'"' -f4)
echo "Price ID: $PRICE_ID"

# Step 3: Get API keys
echo ""
echo "Step 3: Getting API keys..."
echo ""
echo "========================================"
echo "  STRIPE CONFIGURATION"
echo "========================================"
echo ""
echo "Go to https://dashboard.stripe.com/apikeys"
echo "and copy your keys. Then set these env vars"
echo "in Render dashboard (https://dashboard.render.com):"
echo ""
echo "  STRIPE_SECRET_KEY=sk_live_..."
echo "  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_..."
echo "  STRIPE_PRICE_ID_PRO=$PRICE_ID"
echo "  STRIPE_WEBHOOK_SECRET=(from step 4)"
echo ""

# Step 4: Create webhook
echo "Step 4: Creating webhook endpoint..."
echo ""
echo "Go to https://dashboard.stripe.com/webhooks"
echo "and add endpoint:"
echo "  URL: https://linkforge-a1zh.onrender.com/api/stripe/webhook"
echo "  Events: checkout.session.completed, customer.subscription.deleted"
echo ""
echo "Copy the webhook signing secret and add as STRIPE_WEBHOOK_SECRET"
echo ""
echo "=== Setup complete! ==="
