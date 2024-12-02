import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as Linking from "expo-linking";

import { useColorScheme } from '@/hooks/useColorScheme';
import {  AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from 'react-native-toast-notifications';
import { ElectrodomesticosProvider } from '@/context/ElectrodomesticosContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      '(tabs)': {
        screens: {
          'index': 'index',
        },
      },
      'auth/login': 'auth/login',
      'auth/register': 'auth/register',
      'consumo': 'consumo',
      'gestion-dispositivos': 'gestion-dispositivos',
      'agregar-dispositivos': 'agregar-dispositivos',
      'editar-dispositivos/[id]': 'editar-dispositivos/:id',
      '+not-found': '*',
    },
  },
};


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
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
        <ThemeProvider value={theme}>
          <SafeAreaProvider style={{flex:1}}>
            <StatusBar style="light" backgroundColor="#8BC34A"/>
          <ToastProvider>
            <Stack screenOptions={linking}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle:"Menú" }}/>
              <Stack.Screen name="auth/login" options={{ headerShown: false}}/>
              <Stack.Screen name="auth/register" options={{ headerShown: false}}/>
              <Stack.Screen name="consumo" options={{headerTitle:"Consumo", headerStyle: {
                backgroundColor: "#8BC34A"
              }}}/>
              <Stack.Screen name="gestion-dispositivos" options={{headerTitle:"Gestionar dispositivos", headerStyle: {
                backgroundColor: "#8BC34A"
              }}}/>
              <Stack.Screen name="agregar-dispositivos" options={{headerTitle:"Agregar dispositivo",presentation:"formSheet", headerStyle: {
                backgroundColor: "#8BC34A"
              }}}/>
              <Stack.Screen name="editar-dispositivos/[id]" options={{headerTitle:"Editar dispositivo",presentation:"formSheet" ,headerStyle: {
                backgroundColor: "#8BC34A"
              }}}/>
              <Stack.Screen name="+not-found" />
            </Stack>
          </ToastProvider>
          </SafeAreaProvider>         
        </ThemeProvider>
      </ElectrodomesticosProvider>
    </AuthProvider>
  );
}
