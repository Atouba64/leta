import { httpsCallable } from 'firebase/functions';
import { getFirebase } from '../config/firebase';
import { sendCallInviteMessage } from './ticketMessages';

/**
 * Voice between partner dispatcher and field tech — routed through Leta Live (WebRTC).
 * No personal numbers exchanged; session logged on ticket.
 */
export async function startPlatformVoiceCall(ticketId, { uid, role, displayName }) {
  const { functions, configured } = getFirebase();
  if (!configured) {
    return { sessionId: 'demo-voice-session', roomId: 'demo-voice-room' };
  }

  const fn = httpsCallable(functions, 'createTicketChannelCall');
  const { data } = await fn({ ticketId, purpose: 'partner_voice' });

  await sendCallInviteMessage(ticketId, {
    senderId: uid,
    senderRole: role,
    senderLabel: displayName,
    sessionId: data.sessionId,
  });

  return data;
}

export async function joinPlatformVoiceCall(sessionId) {
  const { functions, configured } = getFirebase();
  if (!configured) {
    return { sessionId, roomId: sessionId };
  }

  const fn = httpsCallable(functions, 'joinTicketChannelCall');
  const { data } = await fn({ sessionId });
  return data;
}
