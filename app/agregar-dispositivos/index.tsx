import { View, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButton from '@/components/CustomButton'
import CustomInputText from '@/components/CustomInputText'
import { AuthContext } from '@/context/AuthContext'
import { Toast } from 'react-native-toast-notifications'
import { saveElectrodomestico, saveElectrodomesticoRequest } from '@/services/electrodomesticoServices'
import { useRouter } from 'expo-router'
import { ElectrodomesticosContext } from '@/context/ElectrodomesticosContext'

export default function AgregarDispositivosScreen() {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [amperajeNominal, setAmperajeNominal] = useState(0)
  const [potenciaNominal, setPotenciaNominal] = useState(0)
  const router = useRouter()

  const { user } = useContext(AuthContext)
  const { obtenerElectrodomesticos } = useContext(ElectrodomesticosContext)

  const handleAgregarDispositivo = async (e) => {
    e.preventDefault()    
    
    const payloadGuardarDispositivo: saveElectrodomesticoRequest = {
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
  
  return (
    <View style={{minHeight:Dimensions.get("window").height}}>
      <LinearGradient
        colors={["#8BC34A", "#4CAF50", "#388E3C"]}
        style={{
          minHeight: Dimensions.get("window").height,
          padding: 20,
          alignItems:"center"
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
        <CustomInputText
          placeholder="Nombre"
          value={nombre}
          onChangeText={(e) => setNombre(e)}
        />
        <CustomInputText
          placeholder="Amperaje Nominal"
          value={amperajeNominal}
          onChangeText={(e) => setAmperajeNominal(e)}
        />
        <CustomInputText
          placeholder="Potencia Nominal"
          value={potenciaNominal}
          onChangeText={(e) => setPotenciaNominal(e)}
          
        />
        <CustomInputText
          placeholder="Descripción"
          value={descripcion}
          onChangeText={(e) => setDescripcion(e)}
          
        />
        <CustomButton title="Agregar dispositivo" onPress={handleAgregarDispositivo}/>

        </LinearGradient>

      </LinearGradient>
    </View>
  )
}