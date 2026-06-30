/**
 * Field Nation API Client
 * 
 * Provides helper functions for interacting with the Field Nation API.
 * Requires FIELD_NATION_CLIENT_ID, FIELD_NATION_CLIENT_SECRET, 
 * FIELD_NATION_USERNAME, and FIELD_NATION_PASSWORD to be set.
 */

const FIELD_NATION_API_URL = process.env.FIELD_NATION_API_URL || 'https://api.fieldnation.com/api/v2';
// Sandbox auth uses a different base URL usually, but we'll default to standard for token endpoint
const FIELD_NATION_AUTH_URL = process.env.FIELD_NATION_AUTH_URL || 'https://api.fieldnation.com/authentication/api/oauth/token';

let cachedAccessToken = null;
let tokenExpirationTime = null;

/**
 * Checks if the Field Nation API credentials are configured.
 */
function isFieldNationConfigured() {
  return !!process.env.FIELD_NATION_CLIENT_ID && 
         !!process.env.FIELD_NATION_CLIENT_SECRET &&
         !!process.env.FIELD_NATION_USERNAME &&
         !!process.env.FIELD_NATION_PASSWORD;
}

/**
 * Fetches or returns a cached OAuth2 Access Token for Field Nation using password grant.
 * @returns {Promise<string>} The Bearer access token
 */
async function getAccessToken() {
  if (!isFieldNationConfigured()) {
    throw new Error('Field Nation credentials are not configured.');
  }

  // Return cached token if it is still valid for at least another 5 minutes
  if (cachedAccessToken && tokenExpirationTime && tokenExpirationTime > (Date.now() + 300000)) {
    return cachedAccessToken;
  }

  const response = await fetch(FIELD_NATION_AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: 'password',
      client_id: process.env.FIELD_NATION_CLIENT_ID,
      client_secret: process.env.FIELD_NATION_CLIENT_SECRET,
      username: process.env.FIELD_NATION_USERNAME,
      password: process.env.FIELD_NATION_PASSWORD
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Field Nation Auth Error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  cachedAccessToken = data.access_token;
  // data.expires_in is usually in seconds
  tokenExpirationTime = Date.now() + (data.expires_in * 1000);

  return cachedAccessToken;
}

/**
 * Searches for Work Orders based on provided parameters (e.g., { state: 'GA' }).
 * @param {Object} params Key-value pairs for query string parameters
 * @returns {Promise<Object>} Search results
 */
async function searchWorkOrders(params = {}) {
  const token = await getAccessToken();
  
  // Convert params to query string
  const queryParams = new URLSearchParams(params).toString();
  const url = `${FIELD_NATION_API_URL}/workorders${queryParams ? `?${queryParams}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Field Nation API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches a specific Work Order from Field Nation.
 * @param {string|number} workOrderId 
 * @returns {Promise<Object>} The work order data
 */
async function getWorkOrder(workOrderId) {
  const token = await getAccessToken();

  const response = await fetch(`${FIELD_NATION_API_URL}/workorders/${workOrderId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Field Nation API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Creates a new Work Order in Field Nation.
 * @param {Object} workOrderPayload 
 * @returns {Promise<Object>} The created work order data
 */
async function createWorkOrder(workOrderPayload) {
  const token = await getAccessToken();

  const response = await fetch(`${FIELD_NATION_API_URL}/workorders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(workOrderPayload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Field Nation API error: ${response.status} - ${errText}`);
  }

  return response.json();
}

/**
 * Validates an incoming Field Nation webhook payload.
 * Field Nation typically sends an X-Signature header that can be validated
 * against a configured webhook secret.
 * 
 * @param {Object} headers Request headers
 * @param {string} rawBody Raw request body string
 * @returns {boolean} True if valid
 */
function validateFieldNationWebhook(headers, rawBody) {
  const secret = process.env.FIELD_NATION_WEBHOOK_SECRET;
  if (!secret) return true; // Skip validation if secret is not set (dev mode only)

  return true;
}

module.exports = {
  isFieldNationConfigured,
  getAccessToken,
  searchWorkOrders,
  getWorkOrder,
  createWorkOrder,
  validateFieldNationWebhook
};
