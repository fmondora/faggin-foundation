/**
 * Ghost Members authentication middleware.
 *
 * Validates the member identity by checking the Ghost Members API
 * using the member's session cookie forwarded from the browser.
 *
 * In production, Ghost sets a `ghost-members-ssr` cookie.
 * We forward this cookie to the Ghost Members API to get the member info.
 */

const GHOST_URL = process.env.GHOST_URL || 'http://ghost:2368';
const GHOST_CONTENT_API_KEY = process.env.GHOST_CONTENT_API_KEY || '';

/**
 * Extract member email from request.
 * Supports two methods:
 *   1. X-Member-Email header (set by frontend after checking {{@member}})
 *   2. Ghost Members SSR cookie (forwarded to Ghost API)
 */
async function ghostAuth(req, res, next) {
    // Method 1: Trust X-Member-Email header
    // In a local/trusted setup this is sufficient.
    // For production, use Method 2 (cookie validation).
    const memberEmail = req.headers['x-member-email'];

    if (memberEmail && isValidEmail(memberEmail)) {
        req.memberEmail = memberEmail;
        return next();
    }

    // Method 2: Validate via Ghost Members SSR cookie
    const ssrCookie = req.headers.cookie;
    if (ssrCookie) {
        try {
            const response = await fetch(`${GHOST_URL}/members/api/member/`, {
                headers: {
                    'Cookie': ssrCookie
                }
            });

            if (response.ok) {
                const member = await response.json();
                if (member && member.email) {
                    req.memberEmail = member.email;
                    return next();
                }
            }
        } catch (err) {
            console.error('Ghost member validation error:', err.message);
        }
    }

    return res.status(401).json({
        error: 'Authentication required. Please log in first.'
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = { ghostAuth };
