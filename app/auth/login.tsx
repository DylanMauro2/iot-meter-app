import { View, Text, SafeAreaView, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInputText from "@/components/CustomInputText";
import { AuthContext } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import CustomLinkButton from "@/components/CustomLinkButton";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useToast } from "react-native-toast-notifications";

export default function onLogin() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { onLogin, isAuthenticated } = useContext(AuthContext);

  const toast = useToast()

  if (isAuthenticated) {
    return <Redirect href="(tabs)" />;
  }

  const widthScreenSize = Dimensions.get("window").width;

  const handleLogin = async () => {

    const payload = {
      email,
      contrasena,
    };

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log(res)

      if (res.status === 200) {
        const cookie = res.headers.get("set-cookie")?.split(";")[0]
        const token = cookie?.split("=")[1]
        console.log(token)

        if (!token) {
          setEmail("");
          setContrasena("");
          return onLogin(null);
        }

        setEmail("");
        setContrasena("");
        onLogin(token);
      }

      const token = await res.json();

      console.log(token);

    } catch (error) {
      console.log(error)      
    }
  };

  return (
    <View style={{flex:1}}>
      <LinearGradient
        colors={["#8BC34A", "#4CAF50", "#388E3C"]}
        style={{
          backgroundColor: "#fee",
          height: Dimensions.get("window").height,
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent:"center",
            marginTop: 200,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <LinearGradient
            colors={["#C5E1A5", "#558B2F"]}
            style={{
              backgroundColor: "#fee",
              borderRadius:"15%",
              padding:20
            }}
          >
            <Text style={{ fontSize: 40, fontWeight: "500", marginBottom: 24, textAlign:"center" }}>
            Login
          </Text>
          <CustomInputText
            value={email}
            onChangeText={(e) => setEmail(e)}
            placeholder="Email"
            autoCorrect={false}
          />
          <CustomInputText
            value={contrasena}
            onChangeText={(e) => setContrasena(e)}
            placeholder="Contraseña"
            secureTextEntry={true}
          />
          <CustomButton onPress={handleLogin} title="Login" />
          <Text>{contrasena}</Text>
          </LinearGradient>
        </View>
        <Text style={{textAlign:"center", color:"#FEFEFE", marginVertical: 20, fontSize:20}}>¿Aún no está registrado?</Text>
        <CustomLinkButton url="auth/register" title="Registrarse Aquí">
          <Ionicons name="create-sharp" size={32} color="green"/>
        </CustomLinkButton>
      </LinearGradient>
    </View>
  );
}
