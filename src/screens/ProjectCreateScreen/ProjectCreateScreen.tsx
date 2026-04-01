import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Screen, SuccessModal } from '@components/common';
import { ClientSelectField } from '@components/features/Projects';
import { strings } from '@constants/strings';
import { MOCK_CLIENTS, type ProjectRow } from '@services/mockData';
import { useProjectsStore } from '@store/projectStore';
import { useTheme } from '@theme';
import type { ProjectsStackParamList } from '@app-types/navigation';

const STATUS_ORDER: { key: ProjectRow['status']; label: string }[] = [
  { key: 'active', label: strings.projects.create.statusActive },
  { key: 'paused', label: strings.projects.create.statusPaused },
  { key: 'archived', label: strings.projects.create.statusArchived },
];

export function ProjectCreateScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ProjectsStackParamList>>();
  const addProject = useProjectsStore((s) => s.addProject);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState<string | null>(null);
  const [status, setStatus] = useState<ProjectRow['status']>('active');
  const [submitting, setSubmitting] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        flex: { flex: 1 },
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
        field: {
          marginBottom: theme.spacing.md,
        },
        label: {
          ...theme.typography.captionBold,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.xs,
        },
        input: {
          ...theme.typography.body1,
          color: theme.colors.text.primary,
          minHeight: theme.spacing.buttonHeight,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border.light,
          borderRadius: theme.borderRadius.md,
          paddingHorizontal: theme.spacing.md,
          backgroundColor: theme.colors.input,
        },
        inputMultiline: {
          minHeight: 100,
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.md,
          textAlignVertical: 'top',
        },
        statusRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
        },
        chip: {
          minHeight: theme.spacing.buttonHeight,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
          borderWidth: StyleSheet.hairlineWidth,
          justifyContent: 'center',
        },
        chipActive: {
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.brandMuted,
        },
        chipIdle: {
          borderColor: theme.colors.border.light,
          backgroundColor: theme.colors.background.secondary,
        },
        chipText: {
          ...theme.typography.caption,
          color: theme.colors.text.primary,
        },
        footer: {
          marginTop: theme.spacing.lg,
        },
      }),
    [theme]
  );

  const onSubmit = useCallback(() => {
    if (name.trim().length < 2) {
      Alert.alert(strings.projects.create.validationTitle, strings.projects.create.nameInvalid);
      return;
    }
    if (!clientId) {
      Alert.alert(strings.projects.create.validationTitle, strings.projects.create.clientInvalid);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      addProject({
        name: name.trim(),
        description: description.trim(),
        clientId,
        status,
      });
      setSubmitting(false);
      setSuccessVisible(true);
    }, 350);
  }, [addProject, clientId, description, name, status]);

  const onSuccessConfirm = useCallback(() => {
    setSuccessVisible(false);
    navigation.goBack();
  }, [navigation]);

  return (
    <Screen scroll>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.header}>
          <Text style={styles.title} accessibilityRole="header">
            {strings.projects.create.title}
          </Text>
          <Text style={styles.subtitle}>{strings.projects.create.subtitle}</Text>
        </View>

        <Card accent>
          <View style={styles.field}>
            <Text style={styles.label}>{strings.projects.create.nameLabel}</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={strings.projects.create.namePh}
              placeholderTextColor={theme.colors.text.tertiary}
              style={styles.input}
              accessibilityLabel={strings.projects.create.nameLabel}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{strings.projects.create.descriptionLabel}</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder={strings.projects.create.descriptionPh}
              placeholderTextColor={theme.colors.text.tertiary}
              style={[styles.input, styles.inputMultiline]}
              multiline
              accessibilityLabel={strings.projects.create.descriptionLabel}
            />
          </View>

          <ClientSelectField
            label={strings.projects.create.clientLabel}
            value={clientId}
            onChange={setClientId}
            clients={MOCK_CLIENTS}
            placeholder={strings.projects.create.clientPlaceholder}
            modalTitle={strings.projects.create.pickerTitle}
            cancelLabel={strings.projects.create.cancel}
            closeModalA11y={strings.projects.create.pickerCloseA11y}
          />

          <View style={styles.field}>
            <Text style={styles.label}>{strings.projects.create.statusLabel}</Text>
            <View style={styles.statusRow}>
              {STATUS_ORDER.map((s) => {
                const active = status === s.key;
                return (
                  <Pressable
                    key={s.key}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={s.label}
                    onPress={() => setStatus(s.key)}
                    style={[styles.chip, active ? styles.chipActive : styles.chipIdle]}
                  >
                    <Text style={styles.chipText}>{s.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Button
            title={strings.projects.create.submit}
            onPress={onSubmit}
            loading={submitting}
            accessibilityHint={strings.projects.create.submitHint}
          />
        </Card>

        <View style={styles.footer} />
      </KeyboardAvoidingView>

      <SuccessModal
        visible={successVisible}
        title={strings.projects.create.successTitle}
        message={strings.projects.create.successBody}
        onConfirm={onSuccessConfirm}
      />
    </Screen>
  );
}
