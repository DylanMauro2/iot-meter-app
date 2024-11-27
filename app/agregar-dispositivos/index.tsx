import { View, Dimensions, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButton from '@/components/CustomButton'
import CustomInputText from '@/components/CustomInputText'
import { AuthContext } from '@/context/AuthContext'
import { Toast } from 'react-native-toast-notifications'
import { saveElectrodomestico, SaveElectrodomesticoRequest } from '@/services/electrodomesticoServices'
import { useRouter } from 'expo-router'
import { ElectrodomesticosContext } from '@/context/ElectrodomesticosContext'
import { Picker } from '@react-native-picker/picker'

export default function AgregarDispositivosScreen() {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [amperajeNominal, setAmperajeNominal] = useState(0)
  const [potenciaNominal, setPotenciaNominal] = useState(0)
  const [selectedValue, setSelectedValue] = useState();
  const router = useRouter()

  const { user } = useContext(AuthContext)
  const { obtenerElectrodomesticos } = useContext(ElectrodomesticosContext)

  const handleAgregarDispositivo = async (e) => {
    e.preventDefault()    
    
    const payloadGuardarDispositivo: SaveElectrodomesticoRequest = {
      usuarioId: user.usuarioId,
      nombre: nombre,
      amperajeNominal: amperajeNominal,
      potenciaNominal: potenciaNominal
    }
    
    const dispositivoCreado = await saveElectrodomestico(payloadGuardarDispositivo)
    
    console.log(dispositivoCreado)
    
    Toast.show(dispositivoCreado.message)
    
    router.back();

    await obtenerElectrodomesticos();
  }

  useEffect(() => {
    console.log(selectedValue)
  }, [selectedValue])
  
  return (
    <View style={{minHeight:Dimensions.get("window").height}}>
      <LinearGradient
        colors={["#8BC34A", "#4CAF50", "#388E3C"]}
        style={{
          minHeight: Dimensions.get("window").height,
          alignItems:"center"
        }}
      >
        <LinearGradient
            colors={["#C5E1A5", "#558B2F"]}
            style={{
              backgroundColor: "#fee",
              borderRadius:20,
              padding:20,
              marginTop:20
            }}
          >
        <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
          Nombre
        </Text>
        <CustomInputText
          value={nombre}
          onChangeText={(e) => setNombre(e)}
        />
        <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
          Amperaje Nominal
        </Text>
        
        <CustomInputText
          value={amperajeNominal}
          onChangeText={(e) => setAmperajeNominal(e)}
        />
        <View style={{paddingVertical:200}}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={{ height: 50, width: 250, marginVertical:0}}
          mode='dialog'
        >
          <Picker.Item label="Selecciona un electrodoméstico" value="" />
          <Picker.Item label="Consola de Videojuegos" value="consola" />
          <Picker.Item label="Televisor" value="televisor" />
          <Picker.Item label="Microondas" value="microondas" />
          {/* Agrega más opciones aquí */}
        </Picker>
        </View>
        <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
          Potencia Nominal
        </Text>
        <CustomInputText
          value={potenciaNominal}
          onChangeText={(e) => setPotenciaNominal(e)}
          
        />
        <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
          Descripción
        </Text>
        <CustomInputText
          value={descripcion}
          onChangeText={(e) => setDescripcion(e)}
        />
        <CustomButton title="Agregar dispositivo" onPress={handleAgregarDispositivo}/>
        </LinearGradient>
      </LinearGradient>
    </View>
  )
}