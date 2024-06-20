// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/components/AuthContext';
import 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'TimesNewRoman': require('../assets/fonts/times-new-roman.ttf'),
    'TimesNewRoman-Bold': require('../assets/fonts/times-new-roman-bold.ttf'),
    'TimesNewRoman-Italic': require('../assets/fonts/times-new-roman-italic.ttf'),
    'TimesNewRoman-BoldItalic': require('../assets/fonts/times-new-roman-bold-italic.ttf'),
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Slot />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
