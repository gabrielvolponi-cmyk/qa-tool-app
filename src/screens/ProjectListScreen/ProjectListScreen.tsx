import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, Screen } from '@components/common';
import { strings } from '@constants/strings';
import { MOCK_PROJECTS, type ProjectRow } from '@services/mockData';
import { useTheme } from '@theme';
import type { ProjectsStackParamList } from '@app-types/navigation';

export function ProjectListScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ProjectsStackParamList>>();
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState<ProjectRow[]>(MOCK_PROJECTS);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setItems([...MOCK_PROJECTS]);
      setRefreshing(false);
    }, 800);
  }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        list: {
          paddingTop: theme.spacing.sm,
          paddingBottom: theme.spacing.xl,
        },
        cardSpacing: {
          marginBottom: theme.spacing.md,
        },
        name: {
          ...theme.typography.h4,
          color: theme.colors.text.primary,
        },
        meta: {
          ...theme.typography.caption,
          color: theme.colors.text.secondary,
          marginTop: theme.spacing.xs,
        },
        badge: {
          alignSelf: 'flex-start',
          marginTop: theme.spacing.sm,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.borderRadius.full,
          backgroundColor: theme.colors.brandMuted,
        },
        badgeText: {
          ...theme.typography.captionBold,
          color: theme.colors.primary,
          textTransform: 'capitalize',
        },
      }),
    [theme]
  );

  const renderItem = useCallback(
    ({ item }: { item: ProjectRow }) => (
      <Pressable
        onPress={() => navigation.navigate('ProjectDetail', { projectId: item.id, name: item.name })}
        accessibilityRole="button"
        accessibilityLabel={`${item.name}, ${strings.projects.openDetailA11y}`}
        style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
      >
        <Card style={styles.cardSpacing} accent={false}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>
            {item.openQaCount} QA abertos
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.status}</Text>
          </View>
        </Card>
      </Pressable>
    ),
    [navigation, styles]
  );

  const keyExtractor = useCallback((item: ProjectRow) => item.id, []);

  const listEmpty = useMemo(
    () => (
      <View style={{ paddingTop: theme.spacing.xxl }} accessibilityRole="none">
        <Text style={styles.name}>{strings.projects.emptyTitle}</Text>
        <Text style={styles.meta}>{strings.projects.emptyDescription}</Text>
      </View>
    ),
    [theme.spacing.xxl, styles.meta, styles.name]
  );

  return (
    <Screen scroll={false}>
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={{ flex: 1 }}
        contentContainerStyle={styles.list}
        ListEmptyComponent={listEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primary} />
        }
      />
    </Screen>
  );
}
