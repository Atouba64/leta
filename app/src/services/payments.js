import { httpsCallable } from 'firebase/functions';
import { getFirebase } from '../config/firebase';

export async function createPaymentIntent(ticketId, amountCents) {
  const { functions, configured } = getFirebase();
  if (!configured) {
    return { clientSecret: null, demo: true };
  }

  const fn = httpsCallable(functions, 'createPaymentIntent');
  const { data } = await fn({ ticketId, amountCents, currency: 'usd' });
  return data;
}
