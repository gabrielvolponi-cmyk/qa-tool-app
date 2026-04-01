import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Screen } from '@components/common';
import { strings } from '@constants/strings';
import { MOCK_MODULES, type LearningModule } from '@services/mockData';
import { useLearningStore } from '@store/learningStore';
import { useTheme } from '@theme';

type LearningRow =
  | { kind: 'user'; id: string; title: string; url: string }
  | { kind: 'module'; module: LearningModule };

function normalizeExternalUrl(raw: string): string {
  const t = raw.trim();
  if (!t) return '';
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function isProbablyValidUrl(raw: string): boolean {
  const n = normalizeExternalUrl(raw);
  try {
    const u = new URL(n);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function formatLinkPreview(raw: string): string {
  const n = normalizeExternalUrl(raw);
  try {
    const u = new URL(n);
    const host = u.hostname.replace(/^www\./, '');
    const path = u.pathname + u.search;
    const tail = path && path !== '/' ? path : '';
    const line = `${host}${tail}`;
    return line.length > 56 ? `${line.slice(0, 53)}…` : line;
  } catch {
    return raw.trim();
  }
}

export function LearningScreen() {
  const { theme } = useTheme();
  const userLearnings = useLearningStore((s) => s.userLearnings);
  const addLearning = useLearningStore((s) => s.addLearning);

  const [modalVisible, setModalVisible] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftUrl, setDraftUrl] = useState('');

  const listData = useMemo<LearningRow[]>(() => {
    const userRows: LearningRow[] = userLearnings.map((u) => ({
      kind: 'user',
      id: u.id,
      title: u.title,
      url: u.url,
    }));
    const moduleRows: LearningRow[] = MOCK_MODULES.map((m) => ({ kind: 'module', module: m }));
    return [...userRows, ...moduleRows];
  }, [userLearnings]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          marginBottom: theme.spacing.lg,
          marginTop: theme.spacing.sm,
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: theme.spacing.md,
        },
        iconBubble: {
          width: 48,
          height: 48,
          borderRadius: theme.borderRadius.lg,
          backgroundColor: theme.colors.brandMuted,
          alignItems: 'center',
          justifyContent: 'center',
        },
        headerText: {
          flex: 1,
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
        addRow: {
          marginBottom: theme.spacing.md,
        },
        card: {
          marginBottom: theme.spacing.md,
        },
        moduleTitle: {
          ...theme.typography.h4,
          color: theme.colors.text.primary,
        },
        meta: {
          ...theme.typography.caption,
          color: theme.colors.text.secondary,
          marginTop: theme.spacing.sm,
        },
        modalOverlay: {
          flex: 1,
          justifyContent: 'center',
          backgroundColor: theme.colors.background.overlay,
          padding: theme.spacing.lg,
        },
        modalCard: {
          width: '100%',
          maxWidth: 400,
          alignSelf: 'center',
          borderRadius: theme.borderRadius.lg,
          backgroundColor: theme.colors.background.primary,
          padding: theme.spacing.lg,
          maxHeight: '90%',
        },
        modalTitle: {
          ...theme.typography.h3,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.md,
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
        modalActions: {
          flexDirection: 'row',
          gap: theme.spacing.sm,
          marginTop: theme.spacing.sm,
        },
        modalActionGrow: {
          flex: 1,
        },
      }),
    [theme]
  );

  const openUrl = useCallback(async (raw: string) => {
    const url = normalizeExternalUrl(raw);
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(strings.learning.cannotOpenTitle, strings.learning.cannotOpenBody);
      }
    } catch {
      Alert.alert(strings.learning.cannotOpenTitle, strings.learning.cannotOpenBody);
    }
  }, []);

  const onPressRow = useCallback(
    (row: LearningRow) => {
      if (row.kind === 'user') {
        void openUrl(row.url);
        return;
      }
      const m = row.module;
      Alert.alert(m.title, `${m.durationMin} min · ${m.level}`);
    },
    [openUrl]
  );

  const renderItem = useCallback(
    ({ item }: { item: LearningRow }) => {
      const a11y =
        item.kind === 'user'
          ? `${item.title}. ${strings.learning.openLinkA11y}`
          : `${item.module.title}. ${strings.learning.moduleA11y}`;
      return (
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
          onPress={() => onPressRow(item)}
          accessibilityRole="button"
          accessibilityLabel={a11y}
        >
          <Card style={styles.card}>
            <Text style={styles.moduleTitle}>
              {item.kind === 'user' ? item.title : item.module.title}
            </Text>
            <Text style={styles.meta} numberOfLines={2}>
              {item.kind === 'user'
                ? formatLinkPreview(item.url)
                : `${item.module.durationMin} min · ${item.module.level}`}
            </Text>
          </Card>
        </Pressable>
      );
    },
    [onPressRow, styles.card, styles.meta, styles.moduleTitle]
  );

  const openModal = useCallback(() => {
    setDraftTitle('');
    setDraftUrl('');
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const submitAdd = useCallback(() => {
    const t = draftTitle.trim();
    const u = draftUrl.trim();
    if (!t) {
      Alert.alert(strings.learning.validationTitle, strings.learning.titleRequired);
      return;
    }
    if (!u) {
      Alert.alert(strings.learning.validationTitle, strings.learning.urlRequired);
      return;
    }
    if (!isProbablyValidUrl(u)) {
      Alert.alert(strings.learning.validationTitle, strings.learning.urlInvalid);
      return;
    }
    addLearning(t, normalizeExternalUrl(u));
    setModalVisible(false);
    setDraftTitle('');
    setDraftUrl('');
  }, [addLearning, draftTitle, draftUrl]);

  const listHeader = useMemo(
    () => (
      <View>
        <View style={styles.header}>
          <View style={styles.iconBubble}>
            <Ionicons name="library-outline" size={26} color={theme.colors.primary} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title} accessibilityRole="header">
              {strings.learning.title}
            </Text>
            <Text style={styles.subtitle}>{strings.learning.subtitle}</Text>
          </View>
        </View>
        <View style={styles.addRow}>
          <Button
            title={strings.learning.addLearning}
            variant="secondary"
            onPress={openModal}
            accessibilityHint={strings.learning.addLearningHint}
          />
        </View>
      </View>
    ),
    [
      openModal,
      styles.addRow,
      styles.header,
      styles.headerText,
      styles.iconBubble,
      styles.subtitle,
      styles.title,
      theme.colors.primary,
    ]
  );

  return (
    <Screen scroll={false}>
      <FlatList
        data={listData}
        keyExtractor={(item) => (item.kind === 'user' ? item.id : item.module.id)}
        renderItem={renderItem}
        style={{ flex: 1 }}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <Text style={styles.meta}>{strings.learning.emptyDescription}</Text>
        }
      />

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
        accessibilityViewIsModal
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeModal}
            accessibilityRole="button"
            accessibilityLabel={strings.common.cancel}
          />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{strings.learning.modalTitle}</Text>
            <View style={styles.field}>
              <Text style={styles.label}>{strings.learning.titleLabel}</Text>
              <TextInput
                style={styles.input}
                value={draftTitle}
                onChangeText={setDraftTitle}
                placeholder={strings.learning.titlePlaceholder}
                placeholderTextColor={theme.colors.text.tertiary}
                autoCapitalize="sentences"
                autoCorrect
                accessibilityLabel={strings.learning.titleLabel}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>{strings.learning.linkLabel}</Text>
              <TextInput
                style={styles.input}
                value={draftUrl}
                onChangeText={setDraftUrl}
                placeholder={strings.learning.linkPlaceholder}
                placeholderTextColor={theme.colors.text.tertiary}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                accessibilityLabel={strings.learning.linkLabel}
              />
            </View>
            <View style={styles.modalActions}>
              <View style={styles.modalActionGrow}>
                <Button title={strings.common.cancel} variant="ghost" onPress={closeModal} />
              </View>
              <View style={styles.modalActionGrow}>
                <Button title={strings.learning.save} onPress={submitAdd} />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Screen>
  );
}
