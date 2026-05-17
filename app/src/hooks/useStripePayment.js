import { supportsStripe } from '../utils/runtime';

export function useStripePayment() {
  if (!supportsStripe) {
    return {
      available: false,
      initPaymentSheet: async () => ({ error: null }),
      presentPaymentSheet: async () => ({ error: { message: 'Expo Go — use demo pay' } }),
    };
  }

  const { useStripe } = require('@stripe/stripe-react-native');
  const stripe = useStripe();
  return { available: true, ...stripe };
}
