const fetch = require('node-fetch');

const FRESHCHAT_DOMAIN = process.env.FRESHCHAT_DOMAIN || 'letatechnologiesllc-dbd67cf77f0d94417823659.freshchat.com';
const FRESHCHAT_API_URL = `https://${FRESHCHAT_DOMAIN}/v2`;

async function getHeaders() {
  const token = process.env.FRESHCHAT_API_TOKEN;
  if (!token) {
    console.error('FRESHCHAT_API_TOKEN is not set in environment variables');
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
}

/**
 * Creates a new user in Freshchat
 */
async function createUser(sessionId) {
  const res = await fetch(`${FRESHCHAT_API_URL}/users`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify({
      first_name: 'Web Visitor',
      last_name: sessionId.slice(-4),
      reference_id: sessionId
    })
  });
  if (!res.ok) {
    throw new Error(`Failed to create Freshchat user: ${res.statusText}`);
  }
  const data = await res.json();
  return data.id;
}

/**
 * Creates a conversation for a user
 */
async function createConversation(userId) {
  // Freshchat requires a conversation to be created with messages or directly
  // Sometimes we can just post a message to /users/{user_id}/messages to create conv
  // But let's use the standard POST /conversations
  const res = await fetch(`${FRESHCHAT_API_URL}/conversations`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify({
      users: [{ id: userId }],
      status: 'new'
    })
  });
  if (!res.ok) {
    throw new Error(`Failed to create Freshchat conversation: ${res.statusText}`);
  }
  const data = await res.json();
  return data.id;
}

/**
 * Sends a message on behalf of the user
 */
async function sendMessage(conversationId, userId, text) {
  const res = await fetch(`${FRESHCHAT_API_URL}/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify({
      message_type: 'normal',
      actor_type: 'user',
      actor_id: userId,
      message_parts: [{ text: { content: text } }]
    })
  });
  if (!res.ok) {
    throw new Error(`Failed to send Freshchat message: ${res.statusText}`);
  }
  return await res.json();
}

/**
 * Fetches messages for a conversation
 */
async function getMessages(conversationId) {
  const res = await fetch(`${FRESHCHAT_API_URL}/conversations/${conversationId}/messages`, {
    method: 'GET',
    headers: await getHeaders()
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch Freshchat messages: ${res.statusText}`);
  }
  return await res.json();
}

module.exports = {
  createUser,
  createConversation,
  sendMessage,
  getMessages
};
