import React, { useCallback } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Button, Card, Screen } from '@components/common';
import { strings } from '@constants/strings';
import { useAuthStore } from '@store/authStore';
import { useTheme } from '@theme';
import type { MainTabParamList } from '@app-types/navigation';

type Metric = {
  value: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const METRICS: Metric[] = [
  { value: '12', label: strings.dashboard.metrics.openQa, icon: 'clipboard-outline' },
  { value: '3', label: strings.dashboard.metrics.activeProjects, icon: 'folder-open-outline' },
  { value: '68%', label: strings.dashboard.metrics.automation, icon: 'pulse-outline' },
  { value: '2', label: strings.dashboard.metrics.learning, icon: 'school-outline' },
];

export function DashboardScreen() {
  const { theme } = useTheme();
  const userEmail = useAuthStore((s) => s.userEmail);
  const logout = useAuthStore((s) => s.logout);
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  const onNewReview = useCallback(() => {
    Alert.alert(strings.appName, strings.dashboard.feedback.newReview);
  }, []);

  const onViewProjects = useCallback(() => {
    navigation.navigate('Projects');
  }, [navigation]);

  const styles = StyleSheet.create({
    header: {
      marginBottom: theme.spacing.lg,
      marginTop: theme.spacing.sm,
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: theme.spacing.md,
    },
    titleBlock: {
      flex: 1,
      minWidth: 0,
    },
    signOut: {
      ...theme.typography.body2,
      fontWeight: '600',
      color: theme.colors.primary,
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      minHeight: theme.spacing.buttonHeight,
      textAlign: 'right',
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text.primary,
    },
    subtitle: {
      ...theme.typography.body2,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },
    metricCell: {
      width: '47%',
      minWidth: 140,
    },
    metricRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
    },
    metricTextBlock: {
      flex: 1,
      minWidth: 0,
    },
    metricValue: {
      ...theme.typography.h3,
      color: theme.colors.primary,
      marginBottom: theme.spacing.xs,
    },
    metricLabel: {
      ...theme.typography.caption,
      color: theme.colors.text.secondary,
    },
    iconBubble: {
      width: 40,
      height: 40,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.brandMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      gap: theme.spacing.sm,
    },
    actionsLabel: {
      ...theme.typography.captionBold,
      color: theme.colors.text.tertiary,
      marginBottom: theme.spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
  });

  return (
    <Screen scroll>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.titleBlock}>
            <Text style={styles.title} accessibilityRole="header">
              {strings.dashboard.title}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={strings.dashboard.signOutA11y}
            onPress={logout}
            hitSlop={12}
            style={({ pressed }) => [{ opacity: pressed ? 0.65 : 1 }]}
          >
            <Text style={styles.signOut}>{strings.dashboard.signOut}</Text>
          </Pressable>
        </View>
        <Text style={styles.subtitle}>
          {userEmail
            ? `${strings.dashboard.greeting}, ${userEmail.split('@')[0]} — ${strings.dashboard.subtitle}`
            : strings.dashboard.subtitle}
        </Text>
      </View>

      <View style={styles.grid}>
        {METRICS.map((m) => (
          <Card
            key={m.label}
            style={styles.metricCell}
            accent={false}
            accessibilityLabel={`${m.label}: ${m.value}`}
          >
            <View style={styles.metricRow}>
              <View style={styles.metricTextBlock}>
                <Text style={styles.metricValue}>{m.value}</Text>
                <Text style={styles.metricLabel}>{m.label}</Text>
              </View>
              <View style={styles.iconBubble}>
                <Ionicons name={m.icon} size={22} color={theme.colors.primary} />
              </View>
            </View>
          </Card>
        ))}
      </View>

      <Text style={styles.actionsLabel}>{strings.dashboard.quickActions}</Text>
      <View style={styles.row}>
        <Button title={strings.dashboard.actions.newReview} onPress={onNewReview} />
        <Button title={strings.dashboard.actions.viewProjects} variant="secondary" onPress={onViewProjects} />
      </View>
    </Screen>
  );
}
