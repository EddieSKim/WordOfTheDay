import 'react-native-reanimated';
import '@/global.css';
import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { initDb } from '@/database';


import { useColorScheme } from '@/hooks/use-color-scheme';
import AppHeader from '@/components/appHeader';
import { LABELS } from '@/constants/labels';
import { WordProvider } from '@/contexts/WordContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    initDb();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <WordProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: true,
              header: () => (
                <AppHeader title={LABELS.APP_TITLE} description={LABELS.APP_DESCRIPTION} />
              ),
            }}
          />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
      </WordProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
