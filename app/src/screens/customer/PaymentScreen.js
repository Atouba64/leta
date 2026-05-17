import React, { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { useStripePayment } from '../../hooks/useStripePayment';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import { createPaymentIntent } from '../../services/payments';
import theme from '../../theme';

export default function PaymentScreen({ route, navigation }) {
  const { ticketId, amountCents, title } = route.params || {};
  const { initPaymentSheet, presentPaymentSheet, available } = useStripePayment();
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    setLoading(true);
    try {
      const { clientSecret, demo } = await createPaymentIntent(ticketId, amountCents);
      if (demo || !clientSecret || !available) {
        Alert.alert(
          'Demo mode',
          available
            ? 'Payment simulated — configure Firebase + Stripe for live checkout.'
            : 'Expo Go: payment simulated. Use a dev build for real card checkout.',
        );
        navigation.goBack();
        return;
      }

      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Leta',
      });
      if (initError) throw new Error(initError.message);

      const { error: presentError } = await presentPaymentSheet();
      if (presentError) throw new Error(presentError.message);

      Alert.alert('Payment successful', 'Thank you — your ticket is funded.');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Payment failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll title="Payment">
      <Text style={styles.title}>Pay for service</Text>
      <Text style={styles.sub}>{title}</Text>
      <Text style={styles.amount}>${(amountCents / 100).toFixed(2)}</Text>
      <LetaButton title="Pay with card" onPress={pay} loading={loading} />
      <LetaButton title="Cancel" variant="ghost" onPress={() => navigation.goBack()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h1, marginTop: theme.spacing.md },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.lg },
  amount: { fontSize: 36, fontWeight: '800', color: theme.colors.primary, marginBottom: theme.spacing.xl },
});
