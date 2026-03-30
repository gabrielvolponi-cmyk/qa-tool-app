import { StyleSheet } from 'react-native';
import type { Theme } from '@theme/createTheme';

export function createButtonStyles(theme: Theme, variant: 'primary' | 'secondary' | 'ghost') {
  const { colors, spacing, borderRadius, typography } = theme;

  const base = {
    minHeight: spacing.buttonHeight,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  const bg =
    variant === 'primary'
      ? colors.primary
      : variant === 'secondary'
        ? colors.background.tertiary
        : 'transparent';

  const textColor =
    variant === 'primary'
      ? colors.text.inverse
      : variant === 'secondary'
        ? colors.text.primary
        : colors.primary;

  return StyleSheet.create({
    pressable: {
      ...base,
      backgroundColor: bg,
      opacity: 1,
    },
    pressed: {
      opacity: 0.85,
    },
    disabled: {
      opacity: 0.5,
    },
    text: {
      ...typography.button,
      color: textColor,
    },
  });
}
