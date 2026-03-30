import React, { useCallback } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Button, Card, Screen } from '@components/common';
import { strings } from '@constants/strings';
import { useTheme } from '@theme';
import type { MainTabParamList } from '@app-types/navigation';

export function DashboardScreen() {
  const { theme } = useTheme();
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
    metricValue: {
      ...theme.typography.h3,
      color: theme.colors.primary,
      marginBottom: theme.spacing.xs,
    },
    metricLabel: {
      ...theme.typography.caption,
      color: theme.colors.text.secondary,
    },
    row: {
      gap: theme.spacing.sm,
    },
  });

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {strings.dashboard.title}
        </Text>
        <Text style={styles.subtitle}>{strings.dashboard.subtitle}</Text>
      </View>

      <View style={styles.grid}>
        <Card style={styles.metricCell} accessibilityLabel={`${strings.dashboard.metrics.openQa}: 12`}>
          <Text style={styles.metricValue}>12</Text>
          <Text style={styles.metricLabel}>{strings.dashboard.metrics.openQa}</Text>
        </Card>
        <Card style={styles.metricCell}>
          <Text style={styles.metricValue}>3</Text>
          <Text style={styles.metricLabel}>{strings.dashboard.metrics.activeProjects}</Text>
        </Card>
        <Card style={styles.metricCell}>
          <Text style={styles.metricValue}>68%</Text>
          <Text style={styles.metricLabel}>{strings.dashboard.metrics.automation}</Text>
        </Card>
        <Card style={styles.metricCell}>
          <Text style={styles.metricValue}>2</Text>
          <Text style={styles.metricLabel}>{strings.dashboard.metrics.learning}</Text>
        </Card>
      </View>

      <View style={styles.row}>
        <Button title={strings.dashboard.actions.newReview} onPress={onNewReview} />
        <Button title={strings.dashboard.actions.viewProjects} variant="secondary" onPress={onViewProjects} />
      </View>
    </Screen>
  );
}
