/**
 * Optional OpenClaw HTTP client for Leta Cloud Functions.
 * Disabled unless OPENCLAW_OPS_ENABLED=true and URL + token are set.
 * Budget: no calls when disabled; use local gateway + Gemini free tier.
 */

/**
 * @param {string} userMessage
 * @param {{ agentId?: string, maxTokens?: number }} [opts]
 * @returns {Promise<{ text: string } | null>}
 */
async function askOpenClaw(userMessage, opts = {}) {
  if (process.env.OPENCLAW_OPS_ENABLED !== 'true') {
    return null;
  }

  const baseUrl = (process.env.OPENCLAW_URL || '').replace(/\/$/, '');
  const token = process.env.OPENCLAW_GATEWAY_TOKEN;
  const agentId = opts.agentId || process.env.OPENCLAW_AGENT_ID || 'leta';

  if (!baseUrl || !token || token.startsWith('YOUR_')) {
    console.warn('openclawClient: missing OPENCLAW_URL or OPENCLAW_GATEWAY_TOKEN');
    return null;
  }

  const url = `${baseUrl}/v1/chat/completions`;
  const body = {
    model: `openclaw:${agentId}`,
    messages: [{ role: 'user', content: userMessage }],
    max_tokens: opts.maxTokens ?? 512,
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

function isOpenClawConfigured() {
  return (
    process.env.OPENCLAW_OPS_ENABLED === 'true' &&
    process.env.OPENCLAW_URL &&
    process.env.OPENCLAW_GATEWAY_TOKEN &&
    !process.env.OPENCLAW_GATEWAY_TOKEN.startsWith('YOUR_')
  );
}

module.exports = { askOpenClaw, isOpenClawConfigured };
