#!/bin/bash
# ============================================
# Faggin Foundation - Phase 5: Multilingual Setup
# ============================================
# This script:
#   1. Installs routes.yaml into Ghost
#   2. Creates translated pages via Ghost Admin API
#
# Prerequisites:
#   - Ghost running at http://localhost:2368
#   - Full Admin API key (id:secret format)
#
# Usage: bash setup-multilingual.sh [ADMIN_API_KEY]
#   e.g.: bash setup-multilingual.sh 69a1fe0d56f69800011675cf:abc123...

GHOST_URL="http://localhost:2368"
ADMIN_API_KEY="${1:-}"
GHOST_CONTAINER="faggin-foundation-ghost-1"

echo "=== Faggin Foundation - Multilingual Setup ==="
echo ""

# --- Step 1: Install routes.yaml ---
echo "1. Installing routes.yaml..."

ROUTES_FILE="/Users/fmondora/wip/personal/faggin-foundation/content/themes/faggin-foundation/routes.yaml"

if [ ! -f "$ROUTES_FILE" ]; then
    echo "   ERROR: routes.yaml not found at $ROUTES_FILE"
    exit 1
fi

# Copy to Ghost content/settings directory
docker cp "$ROUTES_FILE" "$GHOST_CONTAINER:/var/lib/ghost/content/settings/routes.yaml"
if [ $? -eq 0 ]; then
    echo "   routes.yaml installed successfully."
else
    echo "   ERROR: Failed to copy routes.yaml. Is the Ghost container named '$GHOST_CONTAINER'?"
    echo "   Check with: docker compose ps"
    echo "   Try: docker cp routes.yaml <container-name>:/var/lib/ghost/content/settings/routes.yaml"
fi

# --- Step 2: Restart Ghost to apply routes ---
echo ""
echo "2. Restarting Ghost to apply routes..."
docker compose restart ghost
echo "   Waiting for Ghost to come back up..."
sleep 10

# Check if Ghost is back
for i in {1..12}; do
    if curl -s -o /dev/null -w "%{http_code}" "$GHOST_URL" | grep -q "200\|301\|302"; then
        echo "   Ghost is back online."
        break
    fi
    if [ "$i" -eq 12 ]; then
        echo "   WARNING: Ghost may still be starting. Check manually."
    fi
    sleep 5
done

# --- Step 3: Create translated pages ---
echo ""
echo "3. Creating translated pages..."

if [ -z "$ADMIN_API_KEY" ]; then
    echo ""
    echo "   No Admin API key provided. Showing manual instructions."
    echo ""
    cat << 'MANUAL'
=== MANUAL: Create Translated Pages in Ghost Admin ===

Go to http://localhost:2368/ghost/#/pages and create the following pages:

--- English Pages (tag each with internal tag #en) ---

1. Title: "Home" | Slug: "home-en" | Tag: #en
   Content: Welcome to the Faggin Foundation. Exploring consciousness,
   quantum physics, and the nature of reality.

2. Title: "About" | Slug: "about-en" | Tag: #en
   Content: About Federico Faggin and the Foundation's mission.

3. Title: "Video Series" | Slug: "video-serie-en" | Tag: #en
   Content: Video series on consciousness and quantum physics.

4. Title: "Events" | Slug: "eventi-en" | Tag: #en
   Content: Upcoming events and past appearances.

5. Title: "Research" | Slug: "ricerca-en" | Tag: #en
   Content: Research and development activities.

--- German Pages (tag each with internal tag #de) ---

6. Title: "Startseite" | Slug: "home-de" | Tag: #de
   Content: Willkommen bei der Faggin Foundation.

7. Title: "Uber uns" | Slug: "about-de" | Tag: #de
   Content: Uber Federico Faggin und die Mission der Stiftung.

8. Title: "Videoreihe" | Slug: "video-serie-de" | Tag: #de
   Content: Videoreihe uber Bewusstsein und Quantenphysik.

9. Title: "Veranstaltungen" | Slug: "eventi-de" | Tag: #de
   Content: Kommende und vergangene Veranstaltungen.

10. Title: "Forschung" | Slug: "ricerca-de" | Tag: #de
    Content: Forschungs- und Entwicklungsaktivitaten.

--- Spanish Pages (tag each with internal tag #es) ---

11. Title: "Inicio" | Slug: "home-es" | Tag: #es
    Content: Bienvenido a la Faggin Foundation.

12. Title: "Acerca de" | Slug: "about-es" | Tag: #es
    Content: Sobre Federico Faggin y la mision de la Fundacion.

13. Title: "Serie de Videos" | Slug: "video-serie-es" | Tag: #es
    Content: Serie de videos sobre conciencia y fisica cuantica.

14. Title: "Eventos" | Slug: "eventi-es" | Tag: #es
    Content: Proximos eventos y apariciones anteriores.

15. Title: "Investigacion" | Slug: "ricerca-es" | Tag: #es
    Content: Actividades de investigacion y desarrollo.

NOTE: Internal tags start with # (hash). In Ghost Admin, when adding
tags, type "#en" (the # makes it internal/hidden from public view).

MANUAL
    exit 0
fi

# --- API-based page creation ---
generate_token() {
    local key_id=$(echo "$ADMIN_API_KEY" | cut -d':' -f1)
    local secret=$(echo "$ADMIN_API_KEY" | cut -d':' -f2)

    docker compose exec -T ghost node -e "
const crypto = require('crypto');
const [id, secret] = ['${key_id}', '${secret}'];
const header = Buffer.from(JSON.stringify({alg: 'HS256', typ: 'JWT', kid: id})).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const payload = Buffer.from(JSON.stringify({iat: now, exp: now + 300, aud: '/admin/'})).toString('base64url');
const signature = crypto.createHmac('sha256', Buffer.from(secret, 'hex')).update(header + '.' + payload).digest('base64url');
console.log(header + '.' + payload + '.' + signature);
"
}

TOKEN=$(generate_token)

create_page() {
    local title="$1"
    local slug="$2"
    local tag="$3"
    local html="$4"

    echo "   Creating: $title ($slug) [$tag]"
    curl -s -o /dev/null -w "   HTTP %{http_code}\n" -X POST "$GHOST_URL/ghost/api/admin/pages/" \
        -H "Authorization: Ghost $TOKEN" \
        -H "Content-Type: application/json" \
        -d "{
            \"pages\": [{
                \"title\": \"$title\",
                \"slug\": \"$slug\",
                \"html\": \"$html\",
                \"status\": \"published\",
                \"tags\": [{\"name\": \"$tag\"}]
            }]
        }"
}

echo "   Creating English pages..."
create_page "Home" "home-en" "#en" "<p>Welcome to the Faggin Foundation. Exploring consciousness, quantum physics, and the nature of reality.</p>"
create_page "About" "about-en" "#en" "<p>About Federico Faggin and the Foundation's mission to understand consciousness.</p>"
create_page "Video Series" "video-serie-en" "#en" "<p>Video series exploring consciousness, quantum physics, and the nature of reality.</p>"
create_page "Events" "eventi-en" "#en" "<p>Upcoming events and past appearances by Federico Faggin.</p>"
create_page "Research" "ricerca-en" "#en" "<p>Research and development activities of the Faggin Foundation.</p>"

echo ""
echo "   Creating German pages..."
create_page "Startseite" "home-de" "#de" "<p>Willkommen bei der Faggin Foundation. Erforschung des Bewusstseins, der Quantenphysik und der Natur der Realitat.</p>"
create_page "Uber uns" "about-de" "#de" "<p>Uber Federico Faggin und die Mission der Stiftung.</p>"
create_page "Videoreihe" "video-serie-de" "#de" "<p>Videoreihe uber Bewusstsein und Quantenphysik.</p>"
create_page "Veranstaltungen" "eventi-de" "#de" "<p>Kommende und vergangene Veranstaltungen mit Federico Faggin.</p>"
create_page "Forschung" "ricerca-de" "#de" "<p>Forschungs- und Entwicklungsaktivitaten der Faggin Foundation.</p>"

echo ""
echo "   Creating Spanish pages..."
create_page "Inicio" "home-es" "#es" "<p>Bienvenido a la Faggin Foundation. Explorando la conciencia, la fisica cuantica y la naturaleza de la realidad.</p>"
create_page "Acerca de" "about-es" "#es" "<p>Sobre Federico Faggin y la mision de la Fundacion.</p>"
create_page "Serie de Videos" "video-serie-es" "#es" "<p>Serie de videos sobre conciencia y fisica cuantica.</p>"
create_page "Eventos" "eventi-es" "#es" "<p>Proximos eventos y apariciones anteriores de Federico Faggin.</p>"
create_page "Investigacion" "ricerca-es" "#es" "<p>Actividades de investigacion y desarrollo de la Faggin Foundation.</p>"

echo ""
echo "=== Multilingual setup complete! ==="
echo ""
echo "Test URLs:"
echo "  Italian (default): http://localhost:2368/"
echo "  English:           http://localhost:2368/en/"
echo "  German:            http://localhost:2368/de/"
echo "  Spanish:           http://localhost:2368/es/"
