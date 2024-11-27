import { Redirect, Tabs, useRootNavigationState, useRouter } from 'expo-router';
import React, { useContext, useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContext } from '@/context/AuthContext';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {isAuthenticated} = useContext(AuthContext)
  const rootNavigationState = useRootNavigationState();
  const insets = useSafeAreaInsets();

  if (!rootNavigationState?.key) return null;

  if (!isAuthenticated) {
    return <Redirect href="auth/login" />
  }


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: Platform.OS === 'android' ? 0 : 10,
          marginBottom: insets.bottom,
          backgroundColor: "#fff" // Ajuste específico para Android
        },
        tabBarIconStyle: {
          width:40
        },
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight:"700",
          color:"green"
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon size={36} name={focused ? 'home' : 'home-outline'} color="green" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon size={36} name={focused ? 'person' : 'person-outline'} color="green" />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: 'Salir',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon size={36} name={focused ? 'enter' : 'enter-outline'} color="green" />
          ),
        }}
      />
    </Tabs>
  );
}
