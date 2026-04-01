import { Platform, ViewStyle } from 'react-native';

const shadowColor = '#4F46E5';

const iosSmall: ViewStyle = {
  shadowColor,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
};

const iosMedium: ViewStyle = {
  shadowColor: '#0F172A',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 16,
};

const iosPrimaryButton: ViewStyle = {
  shadowColor,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.28,
  shadowRadius: 10,
};

export const Shadows = {
  card: Platform.select<ViewStyle>({
    ios: iosMedium,
    android: { elevation: 6 },
    default: iosMedium,
  })!,
  small: Platform.select<ViewStyle>({
    ios: iosSmall,
    android: { elevation: 3 },
    default: iosSmall,
  })!,
  /** Sombra no botão primário (iOS; Android usa elevation no estilo do botão) */
  primaryButton: Platform.select<ViewStyle>({
    ios: iosPrimaryButton,
    android: { elevation: 4 },
    default: iosPrimaryButton,
  })!,
  tabBar: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
    },
    android: { elevation: 12 },
    default: {},
  })!,
};
