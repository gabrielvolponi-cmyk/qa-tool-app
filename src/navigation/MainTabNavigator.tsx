import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { DashboardScreen } from '@screens/DashboardScreen/DashboardScreen';
import { LearningScreen } from '@screens/LearningScreen/LearningScreen';
import { SettingsScreen } from '@screens/SettingsScreen/SettingsScreen';
import { strings } from '@constants/strings';
import { useTheme } from '@theme';
import type { MainTabParamList } from '@app-types/navigation';
import { ProjectsStackNavigator } from './ProjectsStackNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar,
          borderTopColor: theme.colors.tabBarBorder,
          borderTopWidth: StyleSheet.hairlineWidth,
          paddingTop: 8,
          paddingBottom: 6,
          minHeight: 58,
          ...theme.shadows.tabBar,
        },
        tabBarLabelStyle: theme.typography.captionBold,
        tabBarIcon: ({ color, size, focused }) => {
          const map: Record<
            keyof MainTabParamList,
            { outline: keyof typeof Ionicons.glyphMap; solid: keyof typeof Ionicons.glyphMap }
          > = {
            Home: { outline: 'home-outline', solid: 'home' },
            Projects: { outline: 'folder-open-outline', solid: 'folder-open' },
            Learning: { outline: 'school-outline', solid: 'school' },
            Settings: { outline: 'settings-outline', solid: 'settings' },
          };
          const icons = map[route.name as keyof MainTabParamList];
          const name = focused ? icons.solid : icons.outline;
          return <Ionicons name={name} size={focused ? size + 1 : size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarLabel: strings.tabs.home,
          tabBarAccessibilityLabel: strings.tabs.home,
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsStackNavigator}
        options={{
          tabBarLabel: strings.tabs.projects,
          tabBarAccessibilityLabel: strings.tabs.projects,
        }}
      />
      <Tab.Screen
        name="Learning"
        component={LearningScreen}
        options={{
          tabBarLabel: strings.tabs.learning,
          tabBarAccessibilityLabel: strings.tabs.learning,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: strings.tabs.settings,
          tabBarAccessibilityLabel: strings.tabs.settings,
        }}
      />
    </Tab.Navigator>
  );
}
