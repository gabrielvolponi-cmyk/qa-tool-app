import React, { useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '@theme';

type CardProps = ViewProps & {
  children: React.ReactNode;
  /** Barra de destaque no topo do cartão */
  accent?: boolean;
};

export function Card({ children, style, accent = true, ...rest }: CardProps) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.lg,
          overflow: 'hidden',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border.light,
          ...theme.shadows.card,
        },
        accentBar: {
          height: 3,
          backgroundColor: theme.colors.primary,
        },
        inner: {
          padding: theme.spacing.cardPadding,
        },
      }),
    [theme]
  );

  return (
    <View style={[styles.wrap, style]} {...rest}>
      {accent ? <View style={styles.accentBar} /> : null}
      <View style={styles.inner}>{children}</View>
    </View>
  );
}
