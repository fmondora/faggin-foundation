#!/bin/bash
# ============================================
# Faggin Foundation - Phase 4: Membership & Newsletter Setup
# ============================================
# This script configures Ghost CMS for:
# - Free member signups (no Stripe/paid tiers)
# - Portal with Name + Email
# - Newsletter named "Faggin Foundation"
# - Accent color #8B2500
#
# Prerequisites:
#   - Ghost running at http://localhost:2368
#   - Ghost Admin API key (Zapier integration)
#
# Usage: bash setup-membership.sh

GHOST_URL="http://localhost:2368"
GHOST_ADMIN_API_KEY="69a1fe0d56f69800011675cf"

# --- Generate JWT token for Ghost Admin API ---
generate_token() {
    local key_id=$(echo "$GHOST_ADMIN_API_KEY" | cut -d':' -f1)
    local secret=$(echo "$GHOST_ADMIN_API_KEY" | cut -d':' -f2)

    if [ -z "$secret" ]; then
        echo "ERROR: Admin API key must be in format 'id:secret'"
        echo "Go to Ghost Admin → Settings → Integrations → Zapier"
        echo "Copy the Admin API Key (the full key with colon)"
        exit 1
    fi

    # Generate JWT using Node.js (available in Ghost container)
    local token=$(docker compose exec -T ghost node -e "
const crypto = require('crypto');
const [id, secret] = ['${key_id}', '${secret}'];
const header = Buffer.from(JSON.stringify({alg: 'HS256', typ: 'JWT', kid: id})).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const payload = Buffer.from(JSON.stringify({iat: now, exp: now + 300, aud: '/admin/'})).toString('base64url');
const signature = crypto.createHmac('sha256', Buffer.from(secret, 'hex')).update(header + '.' + payload).digest('base64url');
console.log(header + '.' + payload + '.' + signature);
")
    echo "$token"
}

echo "=== Faggin Foundation - Membership Setup ==="
echo ""

# Check if Ghost is running
echo "1. Checking Ghost status..."
if ! curl -s -o /dev/null -w "%{http_code}" "$GHOST_URL" | grep -q "200\|301\|302"; then
    echo "   ERROR: Ghost not reachable at $GHOST_URL"
    echo "   Run: docker compose up -d"
    exit 1
fi
echo "   Ghost is running."

# Check if we have the full Admin API key (id:secret)
echo ""
echo "2. Generating Admin API token..."
echo "   NOTE: The key ID you have is: $GHOST_ADMIN_API_KEY"
echo "   To use the API, you need the full key in format 'id:secret'"
echo "   Go to: $GHOST_URL/ghost/#/settings/integrations/zapier"
echo "   Copy the 'Admin API Key' value."
echo ""

# Since we only have the key ID, provide manual instructions
cat << 'INSTRUCTIONS'
=== MANUAL CONFIGURATION (Ghost Admin UI) ===

Since API configuration requires the full Admin API key (id:secret),
please configure the following settings manually in Ghost Admin:

--- Step 1: Enable Members ---
Go to: http://localhost:2368/ghost/#/settings/members
  • Subscription access: "Anyone can sign up"
  • Enable newsletter: ON
  • Default post access: "Public"
  • Enable Members Portal: ON
  • Portal button: Show
  • Portal name: ON (collect name during signup)

--- Step 2: Disable Stripe (Free tier only) ---
Go to: http://localhost:2368/ghost/#/settings/members
  • Stripe: Leave disconnected (don't connect)
  • This ensures only free memberships

--- Step 3: Configure Newsletter ---
Go to: http://localhost:2368/ghost/#/settings/newsletters
  • Newsletter name: "Faggin Foundation"
  • Sender email: noreply@fagginfoundation.org
  • Enable: ON

--- Step 4: Portal Customization ---
Go to: http://localhost:2368/ghost/#/settings/members
  Click "Customize Portal"
  • Accent color: #8B2500
  • Welcome title: "Benvenuto nella Faggin Foundation"
  • Signup notice: "Registrati per ricevere la newsletter e partecipare alla community."

--- Step 5: Verify ---
  1. Go to http://localhost:2368
  2. Click "Iscriviti" in the header → Portal should open
  3. Register with a test email
  4. Check http://localhost:8025 (Mailhog) → email should arrive
  5. Click magic link → should log in
  6. Header should show "Account" instead of "Iscriviti"

INSTRUCTIONS

echo ""
echo "=== Alternative: API Configuration ==="
echo ""
echo "If you have the full Admin API key (id:secret format), update"
echo "GHOST_ADMIN_API_KEY in this script and uncomment the API calls below."
echo ""

# --- API Configuration (uncomment when you have the full key) ---
# Uncomment the following section after setting the full Admin API key:

: << 'API_CONFIG'
echo "Generating JWT token..."
TOKEN=$(generate_token)

echo "3. Configuring membership settings..."
curl -s -X PUT "$GHOST_URL/ghost/api/admin/settings/" \
  -H "Authorization: Ghost $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "settings": [
      {"key": "members_signup_access", "value": "all"},
      {"key": "members_from_address", "value": "noreply"},
      {"key": "members_support_address", "value": "noreply@fagginfoundation.org"},
      {"key": "portal_name", "value": "true"},
      {"key": "portal_button", "value": "true"},
      {"key": "portal_plans", "value": "[\"free\"]"},
      {"key": "accent_color", "value": "#8B2500"},
      {"key": "default_content_visibility", "value": "public"}
    ]
  }'

echo ""
echo "4. Configuring newsletter..."
# Get existing newsletter
NEWSLETTER_ID=$(curl -s "$GHOST_URL/ghost/api/admin/newsletters/" \
  -H "Authorization: Ghost $TOKEN" | node -e "
    let data=''; process.stdin.on('data',c=>data+=c); process.stdin.on('end',()=>{
      const r=JSON.parse(data); console.log(r.newsletters[0].id);
    })")

curl -s -X PUT "$GHOST_URL/ghost/api/admin/newsletters/$NEWSLETTER_ID/" \
  -H "Authorization: Ghost $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "newsletters": [{
      "name": "Faggin Foundation",
      "sender_email": "noreply@fagginfoundation.org",
      "subscribe_on_signup": true,
      "status": "active"
    }]
  }'

echo ""
echo "Membership and newsletter configured!"
API_CONFIG

echo ""
echo "Done! Follow the manual steps above."
