import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Text, SafeAreaView, TextInput,  Dimensions, StatusBar } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';
import CustomInputText from '@/components/CustomInputText';
import CustomButton from '@/components/CustomButton';

export default function TabTwoScreen() {
  const router = useRouter()

  const {user} = useContext(AuthContext)

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [editando, setEditando] = useState(false)

  console.log(user)

  const handleEditarPerfil = async () => {
    const payload = {
      nombre: nombre,
      email: email 
    }

    const res = await fetch(`http://localhost:3000/usuarios/${user.usuarioId}`, {
      method:"PUT",
      
    })
  }

  return (
    <View style={{width:Dimensions.get("window").width, backgroundColor:"#cecece", alignSelf:"center", flex:1}}>
      <View style={{flex:.73}}>
        <LinearGradient 
          colors={['#8BC34A', '#4CAF50', '#388E3C']}
          style={{backgroundColor:"#fee", height: Dimensions.get("window").height, flex:1}}
        >
        <View style={styles.avatar}>
          <Text style={{fontSize:60, fontWeight:"600"}}>{user.nombre.split(" ")[0][0].toUpperCase()}</Text>
        </View>
        <View style={{alignSelf:"center"}}>
        <Text style={{ color:"#FFFFFF", fontSize:30, fontWeight:"600", marginTop:10}}>
          {user.nombre.toUpperCase()}
        </Text>
      </View>
      <View style={{flexDirection:"row", marginTop:20}}>
          <View style={{flex:0.33, alignItems:"center", flexDirection:"column", gap:4}}>
            <Text style={{fontSize: 20, color: "#FEFEFE", fontWeight:"700"}}>2</Text>
            <Text style={{textAlign:"center", fontSize: 16, color: "#F5F5F5", fontWeight:"500"}}>Dispositivos Registrados</Text>
          </View>
          <View style={{flex:0.34, alignItems:"center", flexDirection:"column", gap:4}}>
          <Text style={{fontSize: 20, color: "#FEFEFE", fontWeight:"700"}}>1</Text>
          <Text style={{textAlign:"center", fontSize: 16, color: "#F5F5F5", fontWeight:"500"}}>Dispositivos Activos</Text>
          </View>
          <View style={{flex:0.33, alignItems:"center", flexDirection:"column", gap:4}}>
          <Text style={{fontSize: 20, color: "#FEFEFE", fontWeight:"700"}}>10</Text>
          <Text style={{textAlign:"center", fontSize: 16, color: "#F5F5F5", fontWeight:"500"}}>Dispositivos Conectados</Text>
          </View>
        </View>
        </LinearGradient>
      </View>
      
      <View style={{flex:1, padding: 10, alignContent:"center", backgroundColor:"#CECECE"}}>
        <View style={{paddingLeft:25}}>
          <Text style={{fontWeight:"600", fontSize:17}}>Nombre:</Text>
        </View>
        <View style={{alignItems:"center"}}>
          <CustomInputText
            placeholder="Nombre"
            value={editando ? (nombre) : (user.nombre)}
            onChangeText={(e) => { setNombre(e)}}
            editable={editando}
          />
        </View>
        <View style={{paddingLeft:25}}>
          <Text style={{fontWeight:"600", fontSize:17}}>Email:</Text>
        </View>
        <View style={{alignItems:"center"}}>
          <CustomInputText
            placeholder="email"
            value={editando ? (email) : (user.email)}
            onChangeText={(e) => setEmail(e)}
            editable={editando}
          />
        </View>
        
      
        {editando ? (
          <CustomButton title="Guardar" onPress={()=> {setEditando(false)}} />
        ): (
          <CustomButton title="Editar" onPress={()=> {setEditando(true)}}/>
        )}


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  profileCard: {
    flexDirection: 'row',
    marginBottom:20,
    backgroundColor:"#fefefe"  
  },
  profileInfo: {
    padding:0,
  },
  avatar: {
    width: 100,
    height:100,
    backgroundColor:"#8BC34A",
    fontSize: 120,
    borderRadius: "50%",
    marginTop:80,
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    borderWidth: 2,
  }
});
