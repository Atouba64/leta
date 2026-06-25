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

let cachedChannelId = null;
async function getChannelId() {
  if (cachedChannelId) return cachedChannelId;
  const res = await fetch(`${FRESHCHAT_API_URL}/channels`, {
    headers: await getHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch channels: " + await res.text());
  const data = JSON.parse(await res.text() || '{}');
  if (data.channels && data.channels.length > 0) {
    cachedChannelId = data.channels[0].id;
  } else {
    throw new Error("No Freshchat channels found in this account.");
  }
  return cachedChannelId;
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
    const errorBody = await res.text();
    throw new Error(`Failed to create Freshchat user: ${res.statusText} - ${errorBody}`);
  }
  const data = JSON.parse(await res.text() || '{}');
  return data.id;
}

/**
 * Creates a conversation for a user
 */
async function createConversation(userId, text) {
  const channelId = await getChannelId();
  const res = await fetch(`${FRESHCHAT_API_URL}/conversations`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify({
      channel_id: channelId,
      users: [{ id: userId }],
      status: 'new',
      messages: [{
        actor_type: 'user',
        actor_id: userId,
        message_type: 'normal',
        message_parts: [{ text: { content: text || "Hello" } }]
      }]
    })
  });
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to create Freshchat conversation: ${res.statusText} - ${errorBody}`);
  }
  const data = JSON.parse(await res.text() || '{}');
  return data.conversation_id || data.id;
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
    const errorBody = await res.text();
    throw new Error(`Failed to send Freshchat message: ${res.statusText} - ${errorBody}`);
  }
  return JSON.parse(await res.text() || '{}');
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
