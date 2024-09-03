import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import CustomInputText from '@/components/CustomInputText'
import CustomButton from '@/components/CustomButton'
import { getElectrodomesticoByElectrodomesticoId } from '@/services/electrodomesticoServices'


export default function EditarDispositivosScreen() {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [amperajeNominal, setAmperajeNominal] = useState(0)
  const [potenciaNominal, setPotenciaNominal] = useState(0)
  const router = useRouter()

  const { id } = useLocalSearchParams()

  const obtenerElectrodomesticoByElectrodomesticoId = async () => {
    const electrodomestico = await getElectrodomesticoByElectrodomesticoId(Number(id))
    setNombre(electrodomestico.nombre)
    setAmperajeNominal(electrodomestico.amperaje_nominal)
    setPotenciaNominal(electrodomestico.potencia_nominal)
    setDescripcion(electrodomestico.descripcion)
  }

  useEffect(()=>{
    obtenerElectrodomesticoByElectrodomesticoId();
  },[])
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
        <CustomButton title="Actualizar información"/>

        </LinearGradient>

      </LinearGradient>
    </View>
  )
}