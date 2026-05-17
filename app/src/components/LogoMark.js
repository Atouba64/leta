import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

const logoSource = require('../../assets/icon.png');

export default function LogoMark({ size = 48, showWordmark = true }) {
  return (
    <View style={styles.row}>
      <Image source={logoSource} style={{ width: size, height: size, borderRadius: size * 0.22 }} />
      {showWordmark ? (
        <Text style={[styles.wordmark, { fontSize: size * 0.55 }]}>
          Leta<Text style={styles.dot}>.</Text>
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wordmark: {
    fontWeight: '800',
    color: theme.colors.ink,
    letterSpacing: -0.5,
  },
  dot: {
    color: theme.colors.primary,
  },
});
