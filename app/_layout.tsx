import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import './global.css';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ReceiverProvider } from '@/provider/ReceiverProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    PlusJakartaSans_bold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    PlusJakartaSans_semibold: require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    PlusJakartaSans_normal: require('../assets/fonts/PlusJakartaSans-Regular.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ReceiverProvider>
        <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="biometric" options={{ headerShown: false }} />
          <Stack.Screen name="(account)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ReceiverProvider>
    </ThemeProvider>
  );
}
