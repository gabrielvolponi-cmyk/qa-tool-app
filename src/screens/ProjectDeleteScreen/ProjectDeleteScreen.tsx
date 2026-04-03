import React, { useCallback, useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Screen, SuccessModal } from '@components/common';
import { strings } from '@constants/strings';
import { useProjectsStore } from '@store/projectStore';
import { useTheme } from '@theme';
import type { ProjectsStackParamList } from '@app-types/navigation';

type RouteProps = RouteProp<ProjectsStackParamList, 'ProjectDelete'>;

export function ProjectDeleteScreen() {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ProjectsStackParamList>>();
  const { params } = useRoute<RouteProps>();
  const project = useProjectsStore((s) => s.projectById(params.projectId));
  const removeProject = useProjectsStore((s) => s.removeProject);

  const [successVisible, setSuccessVisible] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          marginBottom: theme.spacing.lg,
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
        label: {
          ...theme.typography.captionBold,
          color: theme.colors.text.tertiary,
          marginBottom: theme.spacing.xs,
        },
        name: {
          ...theme.typography.h4,
          color: theme.colors.text.primary,
        },
        dangerBlock: {
          marginTop: theme.spacing.lg,
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
        footer: {
          marginTop: theme.spacing.lg,
        },
      }),
    [isDark, theme]
  );

  const performDelete = useCallback(() => {
    if (!project) return;
    removeProject(project.id);
    setSuccessVisible(true);
  }, [project, removeProject]);

  const onPressDelete = useCallback(() => {
    Alert.alert(strings.projects.dangerZone.confirmTitle, strings.projects.dangerZone.confirmMessage, [
      { text: strings.common.cancel, style: 'cancel' },
      {
        text: strings.projects.dangerZone.deleteProject,
        style: 'destructive',
        onPress: performDelete,
      },
    ]);
  }, [performDelete]);

  const onSuccessConfirm = useCallback(() => {
    setSuccessVisible(false);
    navigation.pop(2);
  }, [navigation]);

  if (!project) {
    return (
      <Screen>
        <Card>
          <Text style={styles.subtitle}>{strings.projects.detailBody}</Text>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {strings.projects.delete.title}
        </Text>
        <Text style={styles.subtitle}>{strings.projects.delete.subtitle}</Text>
      </View>

      <Card accent>
        <Text style={styles.label}>{strings.projects.delete.nameLabel}</Text>
        <Text style={styles.name}>{project.name}</Text>

        <View style={styles.dangerBlock} accessibilityRole="none">
          <Text style={styles.dangerTitle}>{strings.projects.dangerZone.title}</Text>
          <Text style={styles.dangerDescription}>{strings.projects.dangerZone.description}</Text>
          <Button
            title={strings.projects.delete.submit}
            variant="danger"
            onPress={onPressDelete}
            accessibilityHint={strings.projects.delete.submitHint}
          />
        </View>
      </Card>

      <View style={styles.footer} />

      <SuccessModal
        visible={successVisible}
        title={strings.projects.delete.successTitle}
        message={strings.projects.delete.successBody}
        onConfirm={onSuccessConfirm}
        accessibilityHint={strings.projects.delete.successConfirmHint}
      />
    </Screen>
  );
}
