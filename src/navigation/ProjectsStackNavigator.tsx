import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProjectListScreen } from '@screens/ProjectListScreen/ProjectListScreen';
import { ProjectDetailScreen } from '@screens/ProjectDetailScreen/ProjectDetailScreen';
import { strings } from '@constants/strings';
import type { ProjectsStackParamList } from '@app-types/navigation';

const Stack = createNativeStackNavigator<ProjectsStackParamList>();

export function ProjectsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProjectList"
        component={ProjectListScreen}
        options={{ title: strings.projects.title }}
      />
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}
