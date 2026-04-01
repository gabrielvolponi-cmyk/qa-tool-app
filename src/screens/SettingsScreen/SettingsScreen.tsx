import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { Button, Card, Screen } from '@components/common';
import { strings } from '@constants/strings';
import { useAppStore, type ThemeMode } from '@store/appStore';
import { useAuthStore } from '@store/authStore';
import { useTheme } from '@theme';

const MODES: { key: ThemeMode; label: string }[] = [
  { key: 'light', label: strings.settings.themeLight },
  { key: 'dark', label: strings.settings.themeDark },
  { key: 'system', label: strings.settings.themeSystem },
];

export function SettingsScreen() {
  const { theme } = useTheme();
  const themeMode = useAppStore((s) => s.themeMode);
  const setThemeMode = useAppStore((s) => s.setThemeMode);
  const logout = useAuthStore((s) => s.logout);

  const version = Constants.expoConfig?.version ?? '1.0.0';

  const styles = StyleSheet.create({
    header: {
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.sm,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text.primary,
    },
    sectionTitle: {
      ...theme.typography.captionBold,
      color: theme.colors.text.tertiary,
      marginBottom: theme.spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    cardBlock: {
      marginBottom: theme.spacing.lg,
    },
    hint: {
      ...theme.typography.caption,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.md,
    },
    option: {
      minHeight: theme.spacing.buttonHeight,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      borderWidth: StyleSheet.hairlineWidth,
      marginBottom: theme.spacing.sm,
      justifyContent: 'center',
    },
    optionActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.brandMuted,
    },
    optionIdle: {
      borderColor: theme.colors.border.light,
      backgroundColor: theme.colors.background.secondary,
    },
    optionText: {
      ...theme.typography.body1,
      color: theme.colors.text.primary,
    },
    about: {
      ...theme.typography.body2,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.sm,
    },
  });

  const onSelectMode = useCallback(
    (mode: ThemeMode) => {
      setThemeMode(mode);
    },
    [setThemeMode]
  );

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {strings.settings.title}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>{strings.settings.account}</Text>
      <View style={styles.cardBlock}>
        <Card accent={false}>
          <Button
            title={strings.settings.signOut}
            variant="secondary"
            onPress={logout}
            accessibilityHint={strings.settings.signOutHint}
          />
        </Card>
      </View>

      <Text style={styles.sectionTitle}>{strings.settings.appearance}</Text>
      <View style={styles.cardBlock}>
        <Card accent={false}>
          <Text style={styles.hint}>{strings.settings.themeHint}</Text>
          {MODES.map((m) => {
            const active = themeMode === m.key;
            return (
              <Pressable
                key={m.key}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                accessibilityLabel={m.label}
                onPress={() => onSelectMode(m.key)}
                style={[styles.option, active ? styles.optionActive : styles.optionIdle]}
              >
                <Text style={styles.optionText}>{m.label}</Text>
              </Pressable>
            );
          })}
        </Card>
      </View>

      <Text style={styles.sectionTitle}>{strings.settings.about}</Text>
      <Card accent={false}>
        <Text style={styles.optionText}>
          {strings.settings.version}: {version}
        </Text>
        <Text style={styles.about}>{strings.settings.aboutBody}</Text>
      </Card>
    </Screen>
  );
}
