import React, { useMemo } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useTheme } from '@theme';
import { createButtonStyles } from './Button.styles';
import type { ButtonProps } from './Button.types';

export function Button({
  title,
  variant = 'primary',
  loading = false,
  disabled = false,
  accessibilityHint,
  onPress,
  ...rest
}: ButtonProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createButtonStyles(theme, variant), [theme, variant]);

  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
      {...rest}
    >
      {loading ? (
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <ActivityIndicator
            color={
              variant === 'primary' || variant === 'danger'
                ? theme.colors.text.inverse
                : theme.colors.primary
            }
          />
        </View>
      ) : (
        <Text style={styles.text} maxFontSizeMultiplier={1.5}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
