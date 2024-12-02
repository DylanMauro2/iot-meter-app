import { View, Dimensions, Text, Modal, ScrollView, Platform } from 'react-native'
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
import { getAllElectrodomesticosInfo } from '@/services/electrodomesticosInfoServices'
import { Electrodomestico, ElectrodomesticoInfo } from '@/types'
import { Ionicons } from '@expo/vector-icons'

export default function AgregarDispositivosScreen() {
  const [selectedValue, setSelectedValue] = useState();
  const [electrodomestico, setElectrodomestico] = useState<Electrodomestico>();
  const [electrodomesticosInfo, setElectrodomesticosInfo] = useState<ElectrodomesticoInfo[]>([]);
  const router = useRouter()

  const { user } = useContext(AuthContext)
  const { obtenerElectrodomesticos } = useContext(ElectrodomesticosContext)

  console.log({user})

  const handleAgregarDispositivo = async (e) => {
    e.preventDefault()        
    const payloadGuardarDispositivo: SaveElectrodomesticoRequest = {
      electrodomestico: {
        ...(electrodomestico?.nombre && { nombre: electrodomestico.nombre }),
        ...(user.usuarioId && { usuarioId: user.usuarioId }),
        ...(electrodomestico?.descripcion && { amperajeNominal: electrodomestico.amperajeNominal }),
        ...(electrodomestico?.amperajeNominal && { amperajeNominal: electrodomestico.amperajeNominal }),
        ...(electrodomestico?.potenciaNominal && { potenciaNominal: electrodomestico.potenciaNominal }),
        ...(electrodomestico?.umbralAmperajeMin && { umbralAmperajeMin: electrodomestico.umbralAmperajeMin }),
        ...(electrodomestico?.umbralAmperajeMax && { umbralAmperajeMax: electrodomestico.umbralAmperajeMax }),
        ...(electrodomestico?.umbralPotenciaMin && { umbralPotenciaMin: electrodomestico.umbralPotenciaMin }),
        ...(electrodomestico?.umbralPotenciaMax && { umbralPotenciaMax: electrodomestico.umbralPotenciaMax }),
        ...(electrodomestico?.marca && { marca: electrodomestico.marca }),
        ...(electrodomestico?.modelo && { modelo: electrodomestico.modelo })
      }
    }

    console.log({payloadGuardarDispositivo})
    
    const dispositivoCreado = await saveElectrodomestico(payloadGuardarDispositivo)
    
    
    Toast.show(dispositivoCreado.message, {
      style: {
        backgroundColor: "#fff",
      },
      textStyle: {
        fontSize: 15,
        fontWeight: "600",
        color: "green",
        alignSelf: "center"
      },
      icon: <Ionicons name="checkmark-circle-outline" size={20} color="green"/>
    })
    
    router.back();

    await obtenerElectrodomesticos();
  }

  const obtenerElectrodomesticosInfo = async () => {
    const electrodomesticosInfo = await getAllElectrodomesticosInfo();
    setElectrodomesticosInfo(electrodomesticosInfo)
  }

  useEffect(() => {
    obtenerElectrodomesticosInfo();
  }, [])

  const handleChangeInput = (field, value) => {
    setElectrodomestico((prevValue) => ({
      ...prevValue,
      [field]: value
    }))
  }

  const handleChangePicker = (itemValue) => {
    setSelectedValue(itemValue)
    console.log({itemValue})
    const selected = electrodomesticosInfo.find(electrodomesticoInfo => electrodomesticoInfo.id === Number(itemValue))
    console.log({selected})
    handleChangeInput("amperajeNominal", selected?.amperajeNominal)
    handleChangeInput("potenciaNominal", selected?.potenciaNominal)
    handleChangeInput("umbralAmperajeMin", selected?.umbralAmperajeMin)
    handleChangeInput("umbralAmperajeMax", selected?.umbralAmperajeMax)
    handleChangeInput("umbralPotenciaMin", selected?.umbralPotenciaMin)
    handleChangeInput("umbralPotenciaMax", selected?.umbralPotenciaMax)
  }
  
  return (
    <ScrollView style={{position:"relative"}}>
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
        <View style={{flex: 1}}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => handleChangePicker(itemValue)}
          mode='dialog'
          style={{width:Dimensions.get("screen").width * 0.8,
            borderRadius: 20, backgroundColor: Platform.OS === "android" ? "#fff" : "none", alignSelf:"center",
            marginVertical: Platform.OS === "android" ? 20 : 0,
          }}
        >
          <Picker.Item label="Lista de electrodomésticos" value={{}} />
          {electrodomesticosInfo.map(electrodomesticoInfo => (
            <Picker.Item key={electrodomesticoInfo.id} label={electrodomesticoInfo.nombre} value={electrodomesticoInfo.id} />  
          ))}
        </Picker> 
            <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
              Nombre
            </Text>
            <CustomInputText
              value={electrodomestico?.nombre}
              onChangeText={(e) => handleChangeInput("nombre", e)}
            />
            <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
              Amperaje Nominal
            </Text>
            <CustomInputText
              value={electrodomestico?.amperajeNominal}
              onChangeText={(e) => handleChangeInput("amperajeNominal", e)}
            />
            <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
              Potencia Nominal
            </Text>
            <CustomInputText
              value={electrodomestico?.potenciaNominal}
              onChangeText={(e) => handleChangeInput("potenciaNominal", e)}          
            />
            <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
              Umbral Amperaje Mínimo
            </Text>
            <CustomInputText
              value={electrodomestico?.umbralAmperajeMin}
              onChangeText={(e) => handleChangeInput("umbralAmperajeMin", e)}        
            />
            <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
              Umbral Amperaje Maximo
            </Text>
            <CustomInputText
              value={electrodomestico?.umbralAmperajeMax}
              onChangeText={(e) => handleChangeInput("umbralAmperajeMax", e)}        
            />
            <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
              Umbral Potencia Mínimo
            </Text>
            <CustomInputText
              value={electrodomestico?.umbralPotenciaMin}
              onChangeText={(e) => handleChangeInput("umbralPotenciaMin", e)}        
            />
            <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
            Umbral Potencia Maxima
            </Text>
            <CustomInputText
              value={electrodomestico?.umbralPotenciaMax}
              onChangeText={(e) => handleChangeInput("umbralPotenciaMax", e)}        
            />
            <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
              Marca
            </Text>
            <CustomInputText
              value={electrodomestico?.marca}
              onChangeText={(e) => handleChangeInput("marca", e)}        
            />
            <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
              Modelo
            </Text>
            <CustomInputText
              value={electrodomestico?.modelo}
              onChangeText={(e) => handleChangeInput("modelo", e)}        
            />
            <Text style={{ fontSize: 23, color: "#000", marginLeft:10, marginBottom: -5}}>
              Descripción
            </Text>
            <CustomInputText
              value={electrodomestico?.descripcion}
              onChangeText={(e) => handleChangeInput("descripcion", e)}          
            />
            <CustomButton title="Agregar dispositivo" onPress={handleAgregarDispositivo}/>
          </View>
        </LinearGradient>
      </LinearGradient>
    </ScrollView>
  )
}


