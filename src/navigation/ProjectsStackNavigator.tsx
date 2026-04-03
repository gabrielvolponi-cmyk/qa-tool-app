import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProjectListScreen } from '@screens/ProjectListScreen/ProjectListScreen';
import { ProjectCreateScreen } from '@screens/ProjectCreateScreen/ProjectCreateScreen';
import { ProjectDetailScreen } from '@screens/ProjectDetailScreen/ProjectDetailScreen';
import { ProjectEditScreen } from '@screens/ProjectEditScreen/ProjectEditScreen';
import { ProjectDeleteScreen } from '@screens/ProjectDeleteScreen/ProjectDeleteScreen';
import { strings } from '@constants/strings';
import { useTheme } from '@theme';
import type { ProjectsStackParamList } from '@app-types/navigation';

const Stack = createNativeStackNavigator<ProjectsStackParamList>();

export function ProjectsStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.primary,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          ...theme.typography.h4,
          color: theme.colors.text.primary,
        },
        headerShadowVisible: !isDark,
        contentStyle: { backgroundColor: theme.colors.background.secondary },
      }}
    >
      <Stack.Screen
        name="ProjectList"
        component={ProjectListScreen}
        options={{ title: strings.projects.title }}
      />
      <Stack.Screen
        name="ProjectCreate"
        component={ProjectCreateScreen}
        options={{ title: strings.projects.create.title }}
      />
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="ProjectEdit"
        component={ProjectEditScreen}
        options={{ title: strings.projects.edit.title }}
      />
      <Stack.Screen
        name="ProjectDelete"
        component={ProjectDeleteScreen}
        options={{ title: strings.projects.delete.title }}
      />
    </Stack.Navigator>
  );
}
