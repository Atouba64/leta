import React from 'react';
import { supportsStripe } from '../utils/runtime';
import { env } from '../config/env';

const stripeKey =
  env.stripePublishableKey || 'pk_test_placeholder_replace_in_env';

export default function AppProviders({ children }) {
  if (!supportsStripe) {
    return children;
  }

  const { StripeProvider } = require('@stripe/stripe-react-native');
  return (
    <StripeProvider
      publishableKey={stripeKey}
      merchantIdentifier="merchant.com.leta.app"
    >
      {children}
    </StripeProvider>
  );
}
