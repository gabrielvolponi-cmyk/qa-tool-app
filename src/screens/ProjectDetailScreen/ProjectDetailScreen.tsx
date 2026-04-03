import React, { useCallback, useLayoutEffect, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

  const goToDelete = useCallback(() => {
    if (!project) return;
    navigation.navigate('ProjectDelete', { projectId: project.id });
  }, [navigation, project]);

  useLayoutEffect(() => {
    if (!project) return;
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={strings.projects.edit.title}
          onPress={() => navigation.navigate('ProjectEdit', { projectId: project.id })}
          hitSlop={12}
          style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1, paddingHorizontal: theme.spacing.sm }]}
        >
          <Ionicons name="create-outline" size={22} color={theme.colors.primary} />
        </Pressable>
      ),
    });
  }, [navigation, project, theme.colors.primary, theme.spacing.sm]);

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
                onPress={goToDelete}
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
