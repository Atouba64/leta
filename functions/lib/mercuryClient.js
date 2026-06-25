/**
 * Mercury API Client
 * 
 * Provides helper functions for interacting with the Mercury Bank API.
 * Requires MERCURY_API_TOKEN to be set in the environment.
 */

const MERCURY_API_URL = 'https://api.mercury.com/api/v1';

/**
 * Checks if the Mercury API token is configured.
 */
function isMercuryConfigured() {
  return !!process.env.MERCURY_API_TOKEN;
}

/**
 * Fetches all accounts associated with the Mercury API token.
 * @returns {Promise<Object>} The accounts data.
 */
async function getAccounts() {
  if (!isMercuryConfigured()) {
    throw new Error('MERCURY_API_TOKEN is not configured.');
  }

  const response = await fetch(`${MERCURY_API_URL}/accounts`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.MERCURY_API_TOKEN}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Mercury API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Validates a Mercury webhook payload.
 * In a production environment, you should validate the webhook secret
 * provided by Mercury to ensure the request is authentic.
 * 
 * @param {Object} headers Request headers
 * @param {string} rawBody Raw request body string
 * @returns {boolean} True if valid
 */
function validateMercuryWebhook(headers, rawBody) {
  const secret = process.env.MERCURY_WEBHOOK_SECRET;
  if (!secret) return true; // Skip validation if secret is not set (dev mode only)

  // Implement cryptographic verification here using crypto.createHmac
  // specific to Mercury's webhook signature format if they provide one.
  // Example placeholder:
  // const signature = headers['x-mercury-signature'];
  // const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  // return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  
  return true;
}

module.exports = {
  isMercuryConfigured,
  getAccounts,
  validateMercuryWebhook
};
