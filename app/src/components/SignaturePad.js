import React, { useRef } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import LetaButton from './LetaButton';
import theme from '../theme';

export default function SignaturePad({ visible, onClose, onSave }) {
  const ref = useRef(null);

  const handleOK = (signature) => {
    onSave(signature);
    onClose();
  };

  const handleClear = () => {
    ref.current?.clearSignature();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <Text style={styles.title}>Customer signature</Text>
        <View style={styles.pad}>
          <SignatureCanvas
            ref={ref}
            onOK={handleOK}
            descriptionText="Sign above"
            clearText="Clear"
            confirmText="Save"
            webStyle={webStyle}
            autoClear={false}
          />
        </View>
        <View style={styles.actions}>
          <LetaButton title="Clear" variant="secondary" onPress={handleClear} style={styles.btn} />
          <LetaButton title="Cancel" variant="ghost" onPress={onClose} style={styles.btn} />
        </View>
      </View>
    </Modal>
  );
}

const webStyle = `
  .m-signature-pad { box-shadow: none; border: none; }
  .m-signature-pad--body { border: 1px solid #e2e8f0; border-radius: 12px; }
  .m-signature-pad--footer { display: none; }
`;

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md, backgroundColor: theme.colors.bg },
  title: { ...theme.typography.h2, marginBottom: theme.spacing.md },
  pad: { flex: 1, minHeight: 280 },
  actions: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.md },
  btn: { flex: 1 },
});
