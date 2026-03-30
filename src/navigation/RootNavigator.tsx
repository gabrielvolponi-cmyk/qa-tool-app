import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useTheme } from '@theme';
import { linking } from './linking';
import { MainTabNavigator } from './MainTabNavigator';

export function RootNavigator() {
  const { theme, isDark } = useTheme();

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.colors.primary,
      background: theme.colors.background.primary,
      card: theme.colors.card,
      text: theme.colors.text.primary,
      border: theme.colors.border.light,
      notification: theme.colors.error,
    },
  };

  return (
    <NavigationContainer theme={navTheme} linking={linking}>
      <MainTabNavigator />
    </NavigationContainer>
  );
}
