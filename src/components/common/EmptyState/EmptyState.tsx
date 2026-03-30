import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@theme';
import { Button } from '../Button';

type EmptyStateProps = {
  title: string;
  description: string;
  actionTitle?: string;
  onAction?: () => void;
  testID?: string;
};

export function EmptyState({ title, description, actionTitle, onAction, testID }: EmptyStateProps) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: theme.spacing.xl,
          paddingHorizontal: theme.spacing.md,
        },
        title: {
          ...theme.typography.h4,
          color: theme.colors.text.primary,
          textAlign: 'center',
          marginBottom: theme.spacing.sm,
        },
        desc: {
          ...theme.typography.body2,
          color: theme.colors.text.secondary,
          textAlign: 'center',
          marginBottom: theme.spacing.md,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.wrap} testID={testID} accessibilityRole="text">
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <Text style={styles.desc}>{description}</Text>
      {actionTitle && onAction ? (
        <Button title={actionTitle} variant="secondary" onPress={onAction} accessibilityHint={actionTitle} />
      ) : null}
    </View>
  );
}
