import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {  AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from 'react-native-toast-notifications';
import { ElectrodomesticosProvider } from '@/context/ElectrodomesticosContext';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
    <AuthProvider>
      <ElectrodomesticosProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <ToastProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle:"Menú"}}/>
              <Stack.Screen name="auth/login" options={{ headerShown: false}}/>
              <Stack.Screen name="auth/register" options={{ headerShown: false}}/>
              <Stack.Screen name="consumo" options={{headerTitle:"Consumo"}}/>
              <Stack.Screen name="gestion-dispositivos" options={{headerTitle:"Gestionar dispositivos"}}/>
              <Stack.Screen name="agregar-dispositivos" options={{headerTitle:"Agregar dispositivo",presentation:"formSheet"}}/>
              <Stack.Screen name="editar-dispositivos/[id]" options={{headerTitle:"Editar dispositivo",presentation:"formSheet"}}/>
              <Stack.Screen name="+not-found" />
            </Stack>
          </ToastProvider>         
        </ThemeProvider>
      </ElectrodomesticosProvider>
    </AuthProvider>
  );
}
