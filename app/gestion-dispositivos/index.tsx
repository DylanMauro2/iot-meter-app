import { View, Text, Dimensions, SafeAreaView, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomLinkButton from '@/components/CustomLinkButton'
import { Ionicons } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { LinearGradient } from 'expo-linear-gradient'
import { AuthContext } from '@/context/AuthContext'
import { deleteElectrodomesticoById, getElectrodomesticosByUsuarioId } from '@/services/electrodomesticoServices'
import { router, useRouter } from 'expo-router'
import { ElectrodomesticosContext } from '@/context/ElectrodomesticosContext'
import CardButton from '@/components/CardButton'
import { Toast } from 'react-native-toast-notifications'

export default function GestionDispositivosScreen() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { obtenerElectrodomesticos, electrodomesticos } = useContext(ElectrodomesticosContext);
  

  useEffect(() => {
    setLoading(true)
    obtenerElectrodomesticos()
    setLoading(false)
  }, [])

  return (
    <SafeAreaView style={{minHeight:Dimensions.get("window").height}}>
      <LinearGradient
        colors={["#8BC34A", "#4CAF50", "#388E3C"]}
        style={{
          minHeight: Dimensions.get("window").height,
        }}
      >
        <CustomLinkButton title="Agregar dispositivo" url="agregar-dispositivos">
          <Ionicons name="create" size={30} color="green"/>
        </CustomLinkButton>
        {loading ? (<ActivityIndicator/>)
        : (
          <ElectrodomesticosList electrodomesticos={electrodomesticos}/>
        )}
      </LinearGradient>
    </SafeAreaView>
  )
}

const Electrodomestico = ({ electrodomestico }) => {

  const { obtenerElectrodomesticos } = useContext(ElectrodomesticosContext)

  const handleEliminarElectrodomestico = async (electrodomesticoId: number) => {
    const res = await deleteElectrodomesticoById(electrodomesticoId);
    Toast.show(res.message)
    await obtenerElectrodomesticos();
  }

  const handleEditar = async (electrodomesticoId) => {
    router.push({
      pathname: "/editar-dispositivos/[id]",
      params: { id: electrodomesticoId }
    })
  }
  
  return (
      <View
        style={{ padding: 10, backgroundColor: "white", margin: 10, borderRadius: 10}}
      >
        <View style={{flexDirection: "row", justifyContent:"space-between", paddingHorizontal:15}}>
          <View>
            <Text>Nombre: {electrodomestico.nombre}</Text>
            <Text>Amperaje: {electrodomestico.amperaje_nominal}</Text>
            <Text>Potencia: {electrodomestico.potencia_nominal}</Text>
            <Text>Voltaje: {electrodomestico.voltaje_nominal}</Text>
          </View>
          <View>
            <Text>Nombre: {electrodomestico.nombre}</Text>
            <Text>Amperaje: {electrodomestico.amperaje_nominal}</Text>
            <Text>Potencia: {electrodomestico.potencia_nominal}</Text>
            <Text>Voltaje: {electrodomestico.voltaje_nominal}</Text>
          </View>
        </View>
        <View style={{flexDirection: "row", justifyContent:"space-around"}}>
          <CardButton 
            title="Editar"
            onPress={() => {
              handleEditar(electrodomestico.electrodomestico_id)
            }}
          />  
          <CardButton 
            title="Eliminar"
            onPress={() => handleEliminarElectrodomestico(electrodomestico.electrodomestico_id)}
          />  
        </View>
      </View>
  )
}

const ElectrodomesticosList = ({electrodomesticos}) => {
  return (
    <View style={{flex:.8, paddingTop: 20}}>
      <FlatList
      data={electrodomesticos}
      keyExtractor={(electrodomestico) => electrodomestico.electrodomestico_id}
      renderItem={({item}) => <Electrodomestico electrodomestico={item}/>}
    />
    </View>
  )
}

