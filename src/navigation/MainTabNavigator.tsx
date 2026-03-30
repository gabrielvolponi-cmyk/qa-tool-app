import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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
          backgroundColor: theme.colors.background.primary,
          borderTopColor: theme.colors.border.light,
        },
        tabBarLabelStyle: theme.typography.captionBold,
        tabBarIcon: ({ color, size }) => {
          const map: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
            Home: 'home-outline',
            Projects: 'folder-open-outline',
            Learning: 'school-outline',
            Settings: 'settings-outline',
          };
          const name = map[route.name as keyof MainTabParamList];
          return <Ionicons name={name} size={size} color={color} />;
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
