import React, { useCallback, useMemo, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Screen } from '@components/common';
import { strings } from '@constants/strings';
import { useTheme } from '@theme';
import type { AuthStackParamList } from '@app-types/navigation';
import type { QASeniority } from '@app-types/qaProfile';

const SENIORITY_ORDER: { key: QASeniority; label: string }[] = [
  { key: 'intern', label: strings.auth.register.seniority.intern },
  { key: 'junior', label: strings.auth.register.seniority.junior },
  { key: 'mid', label: strings.auth.register.seniority.mid },
  { key: 'senior', label: strings.auth.register.seniority.senior },
  { key: 'lead', label: strings.auth.register.seniority.lead },
  { key: 'principal', label: strings.auth.register.seniority.principal },
];

const LUBY_EMAIL_SUFFIX = '@luby.co';

function isValidLubyEmail(raw: string): boolean {
  const t = raw.trim().toLowerCase();
  return t.endsWith(LUBY_EMAIL_SUFFIX) && t.length > LUBY_EMAIL_SUFFIX.length;
}

export function RegisterQAScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [fullName, setFullName] = useState('');
  const [lubyEmail, setLubyEmail] = useState('');
  const [seniority, setSeniority] = useState<QASeniority>('mid');
  const [city, setCity] = useState('');
  const [primaryFocus, setPrimaryFocus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        flex: { flex: 1 },
        backRow: {
          marginBottom: theme.spacing.md,
        },
        backLink: {
          ...theme.typography.body2,
          color: theme.colors.primary,
          fontWeight: '600',
          minHeight: theme.spacing.buttonHeight,
          paddingVertical: theme.spacing.sm,
        },
        header: {
          marginBottom: theme.spacing.lg,
        },
        title: {
          ...theme.typography.h2,
          color: theme.colors.text.primary,
        },
        subtitle: {
          ...theme.typography.body2,
          color: theme.colors.text.secondary,
          marginTop: theme.spacing.xs,
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
        seniorityRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
        },
        chip: {
          minHeight: theme.spacing.buttonHeight,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
          borderWidth: StyleSheet.hairlineWidth,
          justifyContent: 'center',
        },
        chipActive: {
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.brandMuted,
        },
        chipIdle: {
          borderColor: theme.colors.border.light,
          backgroundColor: theme.colors.background.secondary,
        },
        chipText: {
          ...theme.typography.caption,
          color: theme.colors.text.primary,
        },
        footer: {
          marginTop: theme.spacing.lg,
        },
      }),
    [theme]
  );

  const onBack = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const onSubmit = useCallback(() => {
    if (fullName.trim().length < 2) {
      Alert.alert(strings.auth.register.validationTitle, strings.auth.register.nameInvalid);
      return;
    }
    if (!isValidLubyEmail(lubyEmail)) {
      Alert.alert(strings.auth.register.validationTitle, strings.auth.register.emailInvalid);
      return;
    }
    if (city.trim().length < 2) {
      Alert.alert(strings.auth.register.validationTitle, strings.auth.register.cityInvalid);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert(strings.auth.register.successTitle, strings.auth.register.successBody, [
        { text: strings.auth.register.backToLogin, onPress: () => navigation.navigate('Login') },
      ]);
    }, 400);
  }, [city, fullName, lubyEmail, navigation]);

  return (
    <Screen scroll>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.backRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={strings.auth.register.backA11y}
            onPress={onBack}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={styles.backLink}>{strings.auth.register.backToLoginShort}</Text>
          </Pressable>
        </View>

        <View style={styles.header}>
          <Text style={styles.title} accessibilityRole="header">
            {strings.auth.register.title}
          </Text>
          <Text style={styles.subtitle}>{strings.auth.register.subtitle}</Text>
        </View>

        <Card accent>
          <View style={styles.field}>
            <Text style={styles.label}>{strings.auth.register.fullName}</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              autoComplete="name"
              textContentType="name"
              placeholder={strings.auth.register.fullNamePh}
              placeholderTextColor={theme.colors.text.tertiary}
              style={styles.input}
              accessibilityLabel={strings.auth.register.fullName}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{strings.auth.register.lubyEmail}</Text>
            <TextInput
              value={lubyEmail}
              onChangeText={setLubyEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
              placeholder={strings.auth.register.lubyEmailPh}
              placeholderTextColor={theme.colors.text.tertiary}
              style={styles.input}
              accessibilityLabel={strings.auth.register.lubyEmail}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{strings.auth.register.seniorityLabel}</Text>
            <View style={styles.seniorityRow}>
              {SENIORITY_ORDER.map((s) => {
                const active = seniority === s.key;
                return (
                  <Pressable
                    key={s.key}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={s.label}
                    onPress={() => setSeniority(s.key)}
                    style={[styles.chip, active ? styles.chipActive : styles.chipIdle]}
                  >
                    <Text style={styles.chipText}>{s.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{strings.auth.register.city}</Text>
            <TextInput
              value={city}
              onChangeText={setCity}
              autoComplete="postal-address-locality"
              textContentType="addressCity"
              placeholder={strings.auth.register.cityPh}
              placeholderTextColor={theme.colors.text.tertiary}
              style={styles.input}
              accessibilityLabel={strings.auth.register.city}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{strings.auth.register.primaryFocus}</Text>
            <TextInput
              value={primaryFocus}
              onChangeText={setPrimaryFocus}
              placeholder={strings.auth.register.primaryFocusPh}
              placeholderTextColor={theme.colors.text.tertiary}
              style={styles.input}
              accessibilityLabel={strings.auth.register.primaryFocus}
            />
          </View>

          <Button
            title={strings.auth.register.submit}
            onPress={onSubmit}
            loading={submitting}
            accessibilityHint={strings.auth.register.submitHint}
          />
        </Card>

        <View style={styles.footer} />
      </KeyboardAvoidingView>
    </Screen>
  );
}
