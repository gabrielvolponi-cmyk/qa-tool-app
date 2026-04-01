import React, { useMemo } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme';
import { strings } from '@constants/strings';
import { Button } from '../Button';
import type { SuccessModalProps } from './SuccessModal.types';

export function SuccessModal({
  visible,
  title,
  message,
  onConfirm,
  confirmLabel = strings.common.ok,
  accessibilityHint,
  icon = 'checkmark-circle',
}: SuccessModalProps) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background.overlay,
          paddingHorizontal: theme.spacing.lg,
        },
        sheet: {
          width: '100%',
          maxWidth: 400,
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.xl,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border.light,
          padding: theme.spacing.lg,
          ...theme.shadows.card,
        },
        iconWrap: {
          alignItems: 'center',
          marginBottom: theme.spacing.md,
        },
        title: {
          ...theme.typography.h3,
          color: theme.colors.text.primary,
          textAlign: 'center',
          marginBottom: theme.spacing.sm,
        },
        body: {
          ...theme.typography.body1,
          color: theme.colors.text.secondary,
          textAlign: 'center',
          marginBottom: theme.spacing.lg,
        },
        buttonWrap: {
          width: '100%',
        },
      }),
    [theme]
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onConfirm}
      accessibilityViewIsModal
    >
      <View style={styles.overlay}>
        <View style={styles.sheet} accessibilityRole="alert">
          <View style={styles.iconWrap} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <Ionicons name={icon} size={56} color={theme.colors.success} />
          </View>
          <Text style={styles.title} accessibilityRole="header">
            {title}
          </Text>
          <Text style={styles.body}>{message}</Text>
          <View style={styles.buttonWrap}>
            <Button
              title={confirmLabel}
              onPress={onConfirm}
              accessibilityHint={accessibilityHint}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
