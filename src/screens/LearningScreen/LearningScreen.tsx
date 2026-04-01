import React, { useCallback, useMemo } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Screen } from '@components/common';
import { strings } from '@constants/strings';
import { MOCK_MODULES, type LearningModule } from '@services/mockData';
import { useTheme } from '@theme';

export function LearningScreen() {
  const { theme } = useTheme();

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
      }),
    [theme]
  );

  const onPressModule = useCallback((m: LearningModule) => {
    Alert.alert(m.title, `${m.durationMin} min · ${m.level}`);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: LearningModule }) => (
      <Pressable
        style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
        onPress={() => onPressModule(item)}
        accessibilityRole="button"
        accessibilityLabel={`${item.title}. ${strings.learning.moduleA11y}`}
      >
        <Card style={styles.card}>
          <Text style={styles.moduleTitle}>{item.title}</Text>
          <Text style={styles.meta}>
            {item.durationMin} min · {item.level}
          </Text>
        </Card>
      </Pressable>
    ),
    [onPressModule, styles.card, styles.meta, styles.moduleTitle]
  );

  const listHeader = useMemo(
    () => (
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
    ),
    [styles.header, styles.headerText, styles.iconBubble, styles.subtitle, styles.title, theme.colors.primary]
  );

  return (
    <Screen scroll={false}>
      <FlatList
        data={MOCK_MODULES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ flex: 1 }}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <Text style={styles.meta}>{strings.learning.emptyDescription}</Text>
        }
      />
    </Screen>
  );
}
