import { Colors, DarkColors } from './colors';
import { Typography } from './typography';
import { Spacing } from './spacing';
import { BorderRadius } from './borderRadius';
import { Shadows } from './shadows';

export type ThemeColors = typeof Colors;

export interface Theme {
  colors: ThemeColors;
  typography: typeof Typography;
  spacing: typeof Spacing;
  borderRadius: typeof BorderRadius;
  shadows: typeof Shadows;
}

export function createTheme(isDark: boolean): Theme {
  return {
    colors: (isDark ? DarkColors : Colors) as ThemeColors,
    typography: Typography,
    spacing: Spacing,
    borderRadius: BorderRadius,
    shadows: Shadows,
  };
}
