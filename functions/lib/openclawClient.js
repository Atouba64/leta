/**
 * Optional OpenClaw HTTP client for Leta Cloud Functions.
 * Disabled unless OPENCLAW_OPS_ENABLED=true and URL + token are set.
 * Budget: no calls when disabled; use local gateway + Gemini free tier.
 */

function openClawBaseConfig() {
  const baseUrl = (process.env.OPENCLAW_URL || '').replace(/\/$/, '');
  const token = process.env.OPENCLAW_GATEWAY_TOKEN;
  const agentId = process.env.OPENCLAW_AGENT_ID || 'leta';
  const configured = Boolean(
    baseUrl && token && !token.startsWith('YOUR_')
  );
  return { baseUrl, token, agentId, configured };
}

function isOpenClawConfigured() {
  const ops = process.env.OPENCLAW_OPS_ENABLED === 'true';
  const agent = process.env.LETA_AGENT_ENABLED === 'true';
  return (ops || agent) && openClawBaseConfig().configured;
}

function isAgentChatEnabled() {
  return process.env.LETA_AGENT_ENABLED === 'true' && openClawBaseConfig().configured;
}

/**
 * @param {{ messages: Array<{role: string, content: string}>, agentId?: string, maxTokens?: number }} opts
 * @returns {Promise<{ text: string } | null>}
 */
async function chatWithOpenClaw(opts) {
  const { baseUrl, token, agentId, configured } = openClawBaseConfig();
  if (!configured) {
    console.warn('openclawClient: missing OPENCLAW_URL or OPENCLAW_GATEWAY_TOKEN');
    return null;
  }

  const url = `${baseUrl}/v1/chat/completions`;
  const body = {
    model: `openclaw:${opts.agentId || agentId}`,
    messages: opts.messages,
    max_tokens: opts.maxTokens ?? 1024,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    console.warn('openclawClient: HTTP', res.status, errText.slice(0, 200));
    return null;
  }

  const data = await res.json();
  const text =
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    '';

  return { text: String(text).trim() };
}

/**
 * @param {string} userMessage
 * @param {{ agentId?: string, maxTokens?: number }} [opts]
 * @returns {Promise<{ text: string } | null>}
 */
async function askOpenClaw(userMessage, opts = {}) {
  if (process.env.OPENCLAW_OPS_ENABLED !== 'true') {
    return null;
  }
  return chatWithOpenClaw({
    messages: [{ role: 'user', content: userMessage }],
    agentId: opts.agentId,
    maxTokens: opts.maxTokens,
  });
}

module.exports = {
  askOpenClaw,
  chatWithOpenClaw,
  isOpenClawConfigured,
  isAgentChatEnabled,
};
