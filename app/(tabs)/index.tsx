import { Image, StyleSheet, Platform, SafeAreaView, Dimensions, View, TextInput, Pressable, Button, TouchableOpacity, Text, StatusBar } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import CustomLinkButton from '@/components/CustomLinkButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const {isAuthenticated, user} = useContext(AuthContext)
  const insets = useSafeAreaInsets();

  return (
    <View style={{flex:1}}>
      <LinearGradient
        colors={["#8BC34A", "#4CAF50", "#388E3C"]}
        style={{
          flex:1,
          paddingTop: insets.top
        }}
      >
        <View style={{alignItems:"center", justifyContent:"center", marginVertical:30}}>
          <Text style={{fontSize:50, fontWeight:"bold", color:"#FEFEFE"}}>Manargy</Text>
          <Text style={{fontSize:30, color:"#FEFEFE"}}>Bienvenido!</Text>
        </View>
        <View style={{flex:1}}>
          <CustomLinkButton url="/consumo" title="Historial de consumo">
            <Ionicons name="calendar" size={32} color="green"/>
          </CustomLinkButton>
          <CustomLinkButton url="/consumo/tiempo-real" title="Consumo en tiempo real">
            <Ionicons name="bar-chart" size={32} color="green"/>
          </CustomLinkButton>
          <CustomLinkButton url="gestion-dispositivos" title="Gestionar Dispositivos">
            <Feather name="tool" size={32} color="green"/>
          </CustomLinkButton>
        </View>
      </LinearGradient>
  </View>
  );
}