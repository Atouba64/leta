/**
 * Shared handler for Leta AI chat (HTTP + Callable).
 */

const { buildAgentContext, resolveAuth } = require('./letaAgentContext');
const { chatWithOpenClaw, isAgentChatEnabled } = require('./openclawClient');

const MAX_HISTORY = 12;
const MAX_MESSAGE_LEN = 4000;

/**
 * @param {import('firebase-admin/firestore').Firestore} db
 * @param {import('firebase-admin/auth').Auth} authAdmin
 * @param {{
 *   message?: string,
 *   history?: Array<{role: string, content: string}>,
 *   authorization?: string,
 *   auth?: { uid?: string, role?: string, tenantId?: string | null },
 * }} input
 */
async function handleLetaAgentChat(db, authAdmin, input) {
  if (!isAgentChatEnabled()) {
    return {
      ok: false,
      enabled: false,
      message:
        'Leta AI is not enabled. Set LETA_AGENT_ENABLED=true and OPENCLAW_* in functions/.env (see openclaw/README.md).',
    };
  }

  const message = String(input.message || '').trim();
  if (!message) {
    const err = new Error('message is required');
    err.status = 400;
    throw err;
  }
  if (message.length > MAX_MESSAGE_LEN) {
    const err = new Error('message too long');
    err.status = 400;
    throw err;
  }

  const auth = input.auth?.uid
    ? {
        uid: input.auth.uid,
        role: input.auth.role || 'customer',
        tenantId: input.auth.tenantId || null,
      }
    : await resolveAuth(authAdmin, input.authorization);
  const { audience, systemPrompt } = await buildAgentContext(db, auth);

  const history = sanitizeHistory(input.history);
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: message },
  ];

  const result = await chatWithOpenClaw({ messages, maxTokens: 1024 });
  if (!result?.text) {
    return {
      ok: false,
      enabled: true,
      audience,
      message: 'Agent request failed. Check OpenClaw gateway and GEMINI_API_KEY.',
    };
  }

  return {
    ok: true,
    enabled: true,
    audience,
    reply: result.text,
  };
}

/**
 * @param {unknown} history
 * @returns {Array<{role: string, content: string}>}
 */
function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .slice(-MAX_HISTORY)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content)
    .map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, MAX_MESSAGE_LEN),
    }));
}

module.exports = { handleLetaAgentChat };
