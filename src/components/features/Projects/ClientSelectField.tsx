import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme';
import type { Client } from '@services/mockData';

type ClientSelectFieldProps = {
  label: string;
  value: string | null;
  onChange: (clientId: string) => void;
  clients: Client[];
  placeholder: string;
  modalTitle: string;
  cancelLabel: string;
  closeModalA11y: string;
};

export function ClientSelectField({
  label,
  value,
  onChange,
  clients,
  placeholder,
  modalTitle,
  cancelLabel,
  closeModalA11y,
}: ClientSelectFieldProps) {
  const { theme } = useTheme();
  const { height: windowHeight } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => (value ? clients.find((c) => c.id === value) : undefined),
    [clients, value]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        field: {
          marginBottom: theme.spacing.md,
        },
        label: {
          ...theme.typography.captionBold,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.xs,
        },
        trigger: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: theme.spacing.buttonHeight,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border.light,
          borderRadius: theme.borderRadius.md,
          paddingHorizontal: theme.spacing.md,
          backgroundColor: theme.colors.input,
        },
        triggerText: {
          ...theme.typography.body1,
          color: selected ? theme.colors.text.primary : theme.colors.text.tertiary,
          flex: 1,
        },
        modalOverlay: {
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: theme.colors.background.overlay,
        },
        sheet: {
          backgroundColor: theme.colors.background.primary,
          borderTopLeftRadius: theme.borderRadius.lg,
          borderTopRightRadius: theme.borderRadius.lg,
          paddingBottom: theme.spacing.lg,
          maxHeight: Math.round(windowHeight * 0.55),
          ...theme.shadows.card,
        },
        cancelText: {
          ...theme.typography.body2,
          color: theme.colors.primary,
          fontWeight: '600',
        },
        sheetHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.md,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: theme.colors.border.light,
        },
        sheetTitle: {
          ...theme.typography.h4,
          color: theme.colors.text.primary,
        },
        row: {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.md,
          minHeight: theme.spacing.listItemHeight,
          justifyContent: 'center',
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: theme.colors.border.light,
        },
        rowText: {
          ...theme.typography.body1,
          color: theme.colors.text.primary,
        },
        rowSelected: {
          backgroundColor: theme.colors.brandMuted,
        },
      }),
    [selected, theme, windowHeight]
  );

  const onPick = useCallback(
    (id: string) => {
      onChange(id);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}. ${selected ? selected.name : placeholder}`}
        onPress={() => setOpen(true)}
        style={({ pressed }) => [styles.trigger, { opacity: pressed ? 0.92 : 1 }]}
      >
        <Text style={styles.triggerText} numberOfLines={1}>
          {selected?.name ?? placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={theme.colors.text.tertiary} />
      </Pressable>

      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setOpen(false)}
            accessibilityRole="button"
            accessibilityLabel={closeModalA11y}
          />
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{modalTitle}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={cancelLabel}
                onPress={() => setOpen(false)}
                hitSlop={12}
              >
                <Text style={styles.cancelText}>{cancelLabel}</Text>
              </Pressable>
            </View>
            <FlatList
              data={clients}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const isSel = item.id === value;
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSel }}
                    onPress={() => onPick(item.id)}
                    style={[styles.row, isSel && styles.rowSelected]}
                  >
                    <Text style={styles.rowText}>{item.name}</Text>
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
