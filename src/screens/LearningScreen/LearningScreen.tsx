import React, { useCallback } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, Screen } from '@components/common';
import { strings } from '@constants/strings';
import { MOCK_MODULES, type LearningModule } from '@services/mockData';
import { useTheme } from '@theme';

export function LearningScreen() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    header: {
      marginBottom: theme.spacing.md,
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
  });

  const onPressModule = useCallback((m: LearningModule) => {
    Alert.alert(m.title, `${m.durationMin} min · ${m.level}`);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: LearningModule }) => (
      <Pressable
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
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

  return (
    <Screen scroll={false}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {strings.learning.title}
        </Text>
        <Text style={styles.subtitle}>{strings.learning.subtitle}</Text>
      </View>
      <FlatList
        data={MOCK_MODULES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.meta}>{strings.learning.emptyDescription}</Text>
        }
      />
    </Screen>
  );
}
