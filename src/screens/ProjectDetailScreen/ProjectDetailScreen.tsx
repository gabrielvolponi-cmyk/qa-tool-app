import React, { useCallback, useMemo } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Screen } from '@components/common';
import { strings } from '@constants/strings';
import { getClientById } from '@services/mockData';
import { useProjectsStore } from '@store/projectStore';
import { useTheme } from '@theme';
import type { ProjectsStackParamList } from '@app-types/navigation';

type RouteProps = RouteProp<ProjectsStackParamList, 'ProjectDetail'>;

export function ProjectDetailScreen() {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ProjectsStackParamList>>();
  const { params } = useRoute<RouteProps>();
  const project = useProjectsStore((s) => s.projectById(params.projectId));
  const removeProject = useProjectsStore((s) => s.removeProject);

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
        row: {
          marginBottom: theme.spacing.sm,
        },
        label: {
          ...theme.typography.captionBold,
          color: theme.colors.text.tertiary,
          marginBottom: theme.spacing.xs,
        },
        dangerBlock: {
          marginTop: theme.spacing.xl,
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.lg,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.error,
          backgroundColor: isDark ? 'rgba(220, 38, 38, 0.12)' : 'rgba(220, 38, 38, 0.06)',
        },
        dangerTitle: {
          ...theme.typography.captionBold,
          color: theme.colors.error,
          marginBottom: theme.spacing.sm,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        dangerDescription: {
          ...theme.typography.body2,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.md,
        },
      }),
    [isDark, theme]
  );

  const clientName = project ? getClientById(project.clientId)?.name : undefined;

  const statusLabel = project
    ? project.status === 'active'
      ? strings.projects.create.statusActive
      : project.status === 'paused'
        ? strings.projects.create.statusPaused
        : strings.projects.create.statusArchived
    : '';

  const confirmDelete = useCallback(() => {
    removeProject(params.projectId);
    navigation.goBack();
  }, [navigation, params.projectId, removeProject]);

  const onPressDelete = useCallback(() => {
    Alert.alert(strings.projects.dangerZone.confirmTitle, strings.projects.dangerZone.confirmMessage, [
      { text: strings.common.cancel, style: 'cancel' },
      {
        text: strings.projects.dangerZone.deleteProject,
        style: 'destructive',
        onPress: confirmDelete,
      },
    ]);
  }, [confirmDelete]);

  return (
    <Screen scroll>
      <Text style={styles.title} accessibilityRole="header">
        {project?.name ?? params.name}
      </Text>
      <Card>
        {project ? (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>{strings.projects.clientLabelShort}</Text>
              <Text style={styles.body}>{clientName ?? '—'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>{strings.projects.create.statusLabel}</Text>
              <Text style={styles.body}>{statusLabel}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>{strings.projects.create.descriptionLabel}</Text>
              <Text style={styles.body}>{project.description || '—'}</Text>
            </View>
            <Text style={styles.meta}>
              {strings.projects.detailBody} {strings.projects.detailFooter}
            </Text>

            <View style={styles.dangerBlock} accessibilityRole="none">
              <Text style={styles.dangerTitle}>{strings.projects.dangerZone.title}</Text>
              <Text style={styles.dangerDescription}>{strings.projects.dangerZone.description}</Text>
              <Button
                title={strings.projects.dangerZone.deleteProject}
                variant="danger"
                onPress={onPressDelete}
                accessibilityHint={strings.projects.dangerZone.deleteHint}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.body}>
              {strings.projects.detailBody} {strings.projects.detailFooter}
            </Text>
          </>
        )}
      </Card>
    </Screen>
  );
}
