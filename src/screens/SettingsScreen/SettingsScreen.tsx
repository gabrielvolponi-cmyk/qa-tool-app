import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { Card, Screen } from '@components/common';
import { strings } from '@constants/strings';
import { useAppStore, type ThemeMode } from '@store/appStore';
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
      ...theme.typography.h4,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.sm,
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
      backgroundColor: theme.colors.background.tertiary,
    },
    optionIdle: {
      borderColor: theme.colors.border.light,
      backgroundColor: theme.colors.card,
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

      <Text style={styles.sectionTitle}>{strings.settings.appearance}</Text>
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

      <Text style={[styles.sectionTitle, { marginTop: theme.spacing.lg }]}>{strings.settings.about}</Text>
      <Card>
        <Text style={styles.optionText}>
          {strings.settings.version}: {version}
        </Text>
        <Text style={styles.about}>{strings.settings.aboutBody}</Text>
      </Card>
    </Screen>
  );
}
