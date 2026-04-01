import { Platform, StyleSheet } from 'react-native';
import type { Theme } from '@theme/createTheme';

export function createButtonStyles(theme: Theme, variant: 'primary' | 'secondary' | 'ghost' | 'danger') {
  const { colors, spacing, borderRadius, typography, shadows } = theme;

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
        ? colors.brandMuted
        : variant === 'danger'
          ? colors.error
          : 'transparent';

  const textColor =
    variant === 'primary' || variant === 'danger'
      ? colors.text.inverse
      : variant === 'secondary'
        ? colors.text.primary
        : colors.primary;

  const primaryExtra =
    variant === 'primary' || variant === 'danger'
      ? Platform.select({
          ios: shadows.primaryButton,
          android: { elevation: 4 },
          default: shadows.primaryButton,
        })
      : {};

  return StyleSheet.create({
    pressable: {
      ...base,
      backgroundColor: bg,
      opacity: 1,
      borderWidth: variant === 'secondary' ? StyleSheet.hairlineWidth : 0,
      borderColor:
        variant === 'secondary' ? colors.border.light : 'transparent',
      ...primaryExtra,
    },
    pressed: {
      opacity: 0.88,
      transform: [{ scale: 0.98 }],
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
