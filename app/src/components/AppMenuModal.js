import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

export default function AppMenuModal({ visible, items, onClose, onSelect }) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <Text style={styles.heading}>Menu</Text>
          <Text style={styles.subheading}>Go to any section of the app</Text>

          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {items.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                onPress={() => onSelect(item)}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <View style={[styles.iconWrap, item.type === 'action' && styles.iconWrapMuted]}>
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={item.type === 'action' ? theme.colors.danger : theme.colors.primary}
                  />
                </View>
                <Text style={[styles.label, item.type === 'action' && styles.labelAction]}>
                  {item.label}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.muted} />
              </Pressable>
            ))}
          </ScrollView>

          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: theme.colors.bg,
    borderTopLeftRadius: theme.radii.lg,
    borderTopRightRadius: theme.radii.lg,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    maxHeight: '78%',
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.border,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  heading: {
    ...theme.typography.h2,
    color: theme.colors.ink,
  },
  subheading: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    marginBottom: theme.spacing.md,
  },
  list: {
    marginBottom: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  rowPressed: {
    opacity: 0.85,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapMuted: {
    backgroundColor: '#fef2f2',
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  labelAction: {
    color: theme.colors.danger,
  },
  closeBtn: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
});
