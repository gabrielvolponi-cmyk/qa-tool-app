import React, { useCallback, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Screen } from '@components/common';
import { strings } from '@constants/strings';
import { MOCK_LOGIN_EMAIL, MOCK_LOGIN_PASSWORD } from '@services/mockAuth';
import { useAuthStore } from '@store/authStore';
import { useTheme } from '@theme';
import type { AuthStackParamList } from '@app-types/navigation';

export function LoginScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const styles = StyleSheet.create({
    flex: { flex: 1 },
    hero: {
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.lg,
      alignItems: 'center',
    },
    logoBubble: {
      width: 72,
      height: 72,
      borderRadius: theme.borderRadius.xl,
      backgroundColor: theme.colors.brandMuted,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.md,
      ...theme.shadows.small,
    },
    brand: {
      ...theme.typography.h2,
      color: theme.colors.text.primary,
      textAlign: 'center',
    },
    subtitle: {
      ...theme.typography.body2,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.sm,
      textAlign: 'center',
      paddingHorizontal: theme.spacing.md,
    },
    hint: {
      ...theme.typography.caption,
      color: theme.colors.primary,
      marginTop: theme.spacing.md,
      textAlign: 'center',
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.brandMuted,
      overflow: 'hidden',
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.sm,
    },
    field: {
      marginBottom: theme.spacing.md,
    },
    label: {
      ...theme.typography.captionBold,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.xs,
    },
    input: {
      ...theme.typography.body1,
      color: theme.colors.text.primary,
      minHeight: theme.spacing.buttonHeight,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border.light,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.input,
    },
    linkWrap: {
      marginTop: theme.spacing.lg,
      alignItems: 'center',
    },
    link: {
      ...theme.typography.body2,
      color: theme.colors.primary,
      fontWeight: '600',
      minHeight: theme.spacing.buttonHeight,
      textAlignVertical: 'center',
      paddingVertical: theme.spacing.sm,
    },
    footer: {
      marginTop: theme.spacing.xl,
    },
  });

  const onSubmit = useCallback(() => {
    setSubmitting(true);
    const ok = login(email, password);
    setSubmitting(false);
    if (!ok) {
      Alert.alert(strings.auth.errorTitle, strings.auth.invalidCredentials);
    }
  }, [email, login, password]);

  const onRegister = useCallback(() => {
    navigation.navigate('RegisterQA');
  }, [navigation]);

  return (
    <Screen scroll>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.hero}>
          <View style={styles.logoBubble}>
            <Ionicons name="shield-checkmark" size={40} color={theme.colors.primary} />
          </View>
          <Text style={styles.brand} accessibilityRole="header">
            {strings.appName}
          </Text>
          <Text style={styles.subtitle}>{strings.auth.loginSubtitle}</Text>
          <Text style={styles.hint} accessibilityLabel={strings.auth.mockHintA11y}>
            {`${strings.auth.mockHintPrefix} ${MOCK_LOGIN_EMAIL} / ${MOCK_LOGIN_PASSWORD}`}
          </Text>
        </View>

        <Card accent>
          <View style={styles.field}>
            <Text style={styles.label}>{strings.auth.emailLabel}</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="username"
              autoComplete="email"
              placeholder={strings.auth.emailPlaceholder}
              placeholderTextColor={theme.colors.text.tertiary}
              style={styles.input}
              accessibilityLabel={strings.auth.emailLabel}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{strings.auth.passwordLabel}</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="password"
              autoComplete="password"
              placeholder={strings.auth.passwordPlaceholder}
              placeholderTextColor={theme.colors.text.tertiary}
              style={styles.input}
              accessibilityLabel={strings.auth.passwordLabel}
            />
          </View>

          <Button
            title={strings.auth.signIn}
            onPress={onSubmit}
            loading={submitting}
            accessibilityHint={strings.auth.signInHint}
          />
        </Card>

        <View style={styles.linkWrap}>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={strings.auth.goToRegister}
            onPress={onRegister}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={styles.link}>{strings.auth.goToRegister}</Text>
          </Pressable>
        </View>

        <View style={styles.footer} />
      </KeyboardAvoidingView>
    </Screen>
  );
}
