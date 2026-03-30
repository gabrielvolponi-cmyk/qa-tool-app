import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Card, Screen } from '@components/common';
import { strings } from '@constants/strings';
import { useTheme } from '@theme';
import type { ProjectsStackParamList } from '@app-types/navigation';

type RouteProps = RouteProp<ProjectsStackParamList, 'ProjectDetail'>;

export function ProjectDetailScreen() {
  const { theme } = useTheme();
  const { params } = useRoute<RouteProps>();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        title: {
          ...theme.typography.h3,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.md,
        },
        body: {
          ...theme.typography.body1,
          color: theme.colors.text.secondary,
        },
        meta: {
          ...theme.typography.caption,
          color: theme.colors.text.tertiary,
          marginTop: theme.spacing.lg,
        },
      }),
    [theme]
  );

  return (
    <Screen scroll>
      <Text style={styles.title} accessibilityRole="header">
        {params.name}
      </Text>
      <Card>
        <Text style={styles.body}>
          Identificador: {params.projectId}. {strings.projects.detailBody}
        </Text>
        <Text style={styles.meta}>{strings.projects.detailFooter}</Text>
      </Card>
    </Screen>
  );
}
