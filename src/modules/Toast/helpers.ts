import { Platform } from 'react-native';

export function convertDuration(duration: number): number {
  if (Platform.OS === 'ios') {
    return duration / 1000;
  }

  return duration;
}
