import { View, Text, TextInput, Dimensions } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInputText from "@/components/CustomInputText";
import { LinearGradient } from "expo-linear-gradient";
import CustomLinkButton from "@/components/CustomLinkButton";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function register() {
  const [usuario, setUsuario] = useState("")
  const [email, setEmail] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [contraseñaRepetida, setContraseñaRepetida] = useState("")
  const insets = useSafeAreaInsets();
  const router = useRouter()

  const widthScreenSize = Dimensions.get("window").width;

  const handleRegister = () => {
    console.log("registered")
  }
  

  return (
    <View style={{flex:1}}>
      <LinearGradient
        colors={["#8BC34A", "#4CAF50", "#388E3C"]}
        style={{
          backgroundColor: "#fee",
          height: Dimensions.get("window").height,
          paddingTop: insets.top,
          paddingBottom: insets.bottom
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent:"center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginTop:30
          }}
        >
          <LinearGradient
            colors={["#C5E1A5", "#558B2F"]}
            style={{
              backgroundColor: "#fee",
              borderRadius:20,
              padding:20
            }}
          >
            <Text style={{ fontSize: 40, fontWeight: "500", marginBottom: 24, textAlign:"center" }}>
            Register
          </Text>
          <CustomInputText
            value={usuario}
            onChangeText={(e) => setUsuario(e)}
            placeholder="Nombre de Usuario"
            autoCorrect={false}
          />
          <CustomInputText
            value={contraseña}
            onChangeText={(e) => setContraseña(e)}
            placeholder="Email"
            secureTextEntry={true}
          />
          <CustomInputText
            value={contraseña}
            onChangeText={(e) => setContraseña(e)}
            placeholder="Contraseña"
            secureTextEntry={true}
          />
          <CustomInputText
            value={contraseña}
            onChangeText={(e) => setContraseña(e)}
            placeholder="Contraseña nuevamente"
            secureTextEntry={true}
          />
          <CustomButton onPress={handleRegister} title="Registrarse" />
          </LinearGradient>
        </View>
        <CustomLinkButton title="Back to Login" url="auth/login">
          
        </CustomLinkButton>
      </LinearGradient>
    </View>
  );
}
