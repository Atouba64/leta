/**
 * Quick Test Script for Field Nation API
 * 
 * Run this from your terminal:
 * node scripts/test-field-nation.js
 */

// 1. Manually set environment variables for testing purposes
// (In production, these will be set by Firebase Functions config or a .env file)
process.env.FIELD_NATION_API_URL = 'https://api.fieldnation.com/api/v2';
process.env.FIELD_NATION_AUTH_URL = 'https://api.fieldnation.com/authentication/api/oauth/token';

// TODO: Replace these with your actual Field Nation Client ID and Secret!
process.env.FIELD_NATION_CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
process.env.FIELD_NATION_CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE';

process.env.FIELD_NATION_USERNAME = 'partner@leta.repair';
process.env.FIELD_NATION_PASSWORD = 'Leta@2026';

// 2. Import the client we just built
// We need to provide a minimal polyfill for 'fetch' since we are running this in plain Node,
// and your functions package uses node-fetch. (Node 18+ has fetch natively, but we'll ensure it works).
if (typeof fetch === 'undefined') {
  global.fetch = require('../functions/node_modules/node-fetch');
}
const fieldNation = require('../functions/lib/fieldNationClient');

async function runTest() {
  console.log("=== Starting Field Nation API Test ===");
  
  if (process.env.FIELD_NATION_CLIENT_ID === 'YOUR_CLIENT_ID_HERE') {
    console.error("❌ ERROR: You must add your Client ID and Client Secret at the top of scripts/test-field-nation.js first!");
    return;
  }

  try {
    console.log("1. Authenticating with Field Nation...");
    const token = await fieldNation.getAccessToken();
    console.log("✅ Successfully authenticated! Token acquired (first 10 chars):", token.substring(0, 10) + '...');

    console.log("\n2. Searching for available work orders in Georgia (state: 'GA')...");
    
    // We pass { state: 'GA' } as our query parameter
    const results = await fieldNation.searchWorkOrders({ state: 'GA' });
    
    console.log("✅ Search successful! Found", results.length || results.metadata?.total || 0, "results (or metadata count).");
    console.log("Here is a sample of the JSON response:");
    console.log(JSON.stringify(results, null, 2));

  } catch (error) {
    console.error("\n❌ TEST FAILED:");
    console.error(error.message);
  }
}

runTest();
