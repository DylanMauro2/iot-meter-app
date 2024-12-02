import { View, Text, Dimensions, ActivityIndicator, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import CustomInputText from '@/components/CustomInputText'
import CustomButton from '@/components/CustomButton'
import { getElectrodomesticoByElectrodomesticoId, updateElectrodomestico, UpdateElectrodomesticoRequest } from '@/services/electrodomesticoServices'
import { Electrodomestico } from '@/types'
import { ElectrodomesticosContext } from '@/context/ElectrodomesticosContext'
import { Toast } from 'react-native-toast-notifications'
import { Ionicons } from '@expo/vector-icons'


export default function EditarDispositivosScreen() {
  const [loading, setLoading] = useState(false);
  const [electrodomestico, setElectrodomestico] = useState<Electrodomestico>();

  const { obtenerElectrodomesticos } = useContext(ElectrodomesticosContext);

  const router = useRouter()

  const { id } = useLocalSearchParams()

  const obtenerElectrodomesticoByElectrodomesticoId = async () => {
    setLoading(true);
    const electrodomestico = await getElectrodomesticoByElectrodomesticoId(Number(id))
    setElectrodomestico(electrodomestico);
    setLoading(false);
  }

  const editarElectrodometico = async () => {
    const payload: UpdateElectrodomesticoRequest = {
      id: Number(electrodomestico?.id), 
      electrodomestico: {
        ...(electrodomestico?.nombre && {nombre: electrodomestico.nombre}),
        ...(electrodomestico?.amperajeNominal && {amperajeNominal: electrodomestico.amperajeNominal}),
        ...(electrodomestico?.potenciaNominal && {potenciaNominal: electrodomestico.potenciaNominal}),
        ...(electrodomestico?.marca && { marca: electrodomestico.marca }),
        ...(electrodomestico?.modelo && { modelo: electrodomestico.modelo }),
        ...(electrodomestico?.umbralAmperajeMax && { umbralAmperajeMax: electrodomestico.umbralAmperajeMax }),
        ...(electrodomestico?.umbralAmperajeMin && { umbralAmperajeMin: electrodomestico.umbralAmperajeMin }),
        ...(electrodomestico?.umbralPotenciaMin && { umbralPotenciaMin: electrodomestico.umbralPotenciaMin }),
        ...(electrodomestico?.umbralPotenciaMax && { umbralPotenciaMax: electrodomestico.umbralPotenciaMax }),
        ...(electrodomestico?.descripcion && { descripcion: electrodomestico.descripcion }),
      }
    }

    const res = await updateElectrodomestico(payload);

    Toast.show(res.message, {
      style: {
        backgroundColor: "#fff",
        zIndex:200
      },
      textStyle: {
        fontSize: 15,
        fontWeight: "600",
        color: "green"
      },
      icon: <Ionicons name="checkmark-circle-outline" size={20} color="green"/>
    });

    router.back();

    await obtenerElectrodomesticos();

  } 

  useEffect(()=>{
    obtenerElectrodomesticoByElectrodomesticoId();
  },[])

  useEffect(()=>{
    console.log(electrodomestico)
  },[electrodomestico])

  const handleChangeInput = (field, value) => {
    setElectrodomestico((prevValue) => ({
      ...prevValue,
      [field]: value
    }))
  }

  return (
    <ScrollView style={{position: "relative"}}>
      <LinearGradient
        colors={["#8BC34A", "#4CAF50", "#388E3C"]}
        style={{
          padding: 20,
          alignItems:"center",
        }}
      >
        <LinearGradient
            colors={["#C5E1A5", "#558B2F"]}
            style={{
              backgroundColor: "#fee",
              height:"auto",
              borderRadius:20,
              padding:20,
              marginBottom:20
            }}
          >
        {loading ? (
          <View style={{flex:1}}>
            <ActivityIndicator/>
          </View>
        ) : (
          <View style={{flex: 1}}>
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
            <CustomButton title="Actualizar información" onPress={() => editarElectrodometico()}/>
          </View>
        )}
        </LinearGradient>

      </LinearGradient>
    </ScrollView>
  )
}