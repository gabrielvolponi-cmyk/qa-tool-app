import { Platform, ViewStyle } from 'react-native';

const iosSmall: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
};

const iosMedium: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
};

export const Shadows = {
  card: Platform.select<ViewStyle>({
    ios: iosMedium,
    android: { elevation: 4 },
    default: iosMedium,
  })!,
  small: Platform.select<ViewStyle>({
    ios: iosSmall,
    android: { elevation: 2 },
    default: iosSmall,
  })!,
};
