import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@theme';

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  /** Fundo com gradiente suave no topo (padrão: ligado) */
  gradient?: boolean;
};

export function Screen({ children, scroll = false, style, gradient = true }: ScreenProps) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          flex: 1,
          backgroundColor: theme.colors.background.secondary,
        },
        gradientBand: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 280,
        },
        safe: {
          flex: 1,
          backgroundColor: 'transparent',
        },
        inner: {
          flex: 1,
          paddingHorizontal: theme.spacing.containerPadding,
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.md,
        },
      }),
    [theme]
  );

  const content = scroll ? (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        {
          paddingHorizontal: theme.spacing.containerPadding,
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.lg,
          flexGrow: 1,
        },
        style,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.inner, style]}>{children}</View>
  );

  return (
    <View style={styles.root}>
      {gradient ? (
        <LinearGradient
          colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
          style={styles.gradientBand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      ) : null}
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        {content}
      </SafeAreaView>
    </View>
  );
}
