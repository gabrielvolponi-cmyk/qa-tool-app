import React, { useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '@theme';

type CardProps = ViewProps & {
  children: React.ReactNode;
};

export function Card({ children, style, ...rest }: CardProps) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.cardPadding,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border.light,
          ...theme.shadows.card,
        },
      }),
    [theme]
  );

  return (
    <View style={[styles.wrap, style]} {...rest}>
      {children}
    </View>
  );
}
