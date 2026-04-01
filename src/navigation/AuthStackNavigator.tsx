import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@screens/LoginScreen/LoginScreen';
import { RegisterQAScreen } from '@screens/RegisterQAScreen/RegisterQAScreen';
import type { AuthStackParamList } from '@app-types/navigation';
import { useTheme } from '@theme';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStackNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterQA" component={RegisterQAScreen} />
    </Stack.Navigator>
  );
}
