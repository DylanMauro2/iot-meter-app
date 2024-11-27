import { View, Text, Dimensions, ScrollView, FlatList, ActivityIndicator, Pressable, Modal } from 'react-native'
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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function GestionDispositivosScreen() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { obtenerElectrodomesticos, electrodomesticos } = useContext(ElectrodomesticosContext);
  const insets = useSafeAreaInsets();
  

  useEffect(() => {
    setLoading(true)
    obtenerElectrodomesticos()
    setLoading(false)
  }, [])

  return (
    <View style={{flex:1}}>
      <LinearGradient
        colors={["#8BC34A", "#4CAF50", "#388E3C"]}
        style={{
          minHeight: Dimensions.get("screen").height
        }}
      >
        <CustomLinkButton title="Agregar dispositivo" url="agregar-dispositivos">
          <Ionicons name="create" size={30} color="green"/>
        </CustomLinkButton>
        {loading ? (
          <View style={{flex:1}}>
            <ActivityIndicator/>
          </View>
        )
        : (
          <ElectrodomesticosList electrodomesticos={electrodomesticos}/>
        )}
      </LinearGradient>
    </View>
  )
}

const Electrodomestico = ({ electrodomestico }) => {
  const [showModal, setShowModal] = useState(false);
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
        style={{ padding: 5, paddingTop:50,  backgroundColor: "white", margin: 10, borderRadius: 10,
          position: "relative"
        }}
      >
        <View style={{position:"absolute", top:8, left:8, flexDirection: "row"}}>
          <View>
          <View style={{borderRadius:10, borderColor:"#000000", borderWidth:2, paddingHorizontal: 20, paddingVertical:10}}>
            <Text>
              {electrodomestico.electrodomestico_id}
            </Text>
          </View>
          </View>
        </View>
        <View style={{position:"absolute", flex: 1, alignSelf:"center", top:10}}>
          <View>
              <Text style={{fontSize:30}}>{electrodomestico.nombre}</Text>
          </View>
        </View>
        <View style={{position:"absolute", top:10, right:10}}>
          <Pressable onPress={() => setShowModal(true)}>
            <Ionicons name="close" size={30}/>
          </Pressable>
        </View>
        <View style={{flexDirection: "row", justifyContent:"space-between", paddingTop:10, paddingHorizontal:30}}>
          <View style={{gap:10}}>
            <View style={{alignItems:"center", gap:3}}>
              <Text style={{color:"#333333", fontSize:17}}>Amperaje</Text>
              <Text style={{fontWeight:"bold", fontSize:15}}>{electrodomestico.amperaje_nominal}</Text>
            </View>
            <View style={{alignItems:"center", gap:3}}>
              <Text style={{color:"#333333", fontSize:17}}>Potencia</Text>
              <Text style={{fontWeight:"bold", fontSize:15}}>{electrodomestico.potencia_nominal}</Text>
            </View>
            <View style={{alignItems:"center", gap:3}}>
              <Text style={{color:"#333333", fontSize:17}}>Voltaje</Text>
              <Text style={{fontWeight:"bold", fontSize:15}}>{electrodomestico.voltaje_nominal}</Text>
            </View>
          </View>
          <View style={{gap:10, alignItems:"center"}}>
              <View style={{alignItems:"center", gap:3}}>
                <Text style={{color:"#333333", fontSize:17}}>Umbral de Voltaje</Text>
                <Text style={{fontWeight:"bold", fontSize:15}}>
                  {`${electrodomestico.umbral_voltaje_min} - ${electrodomestico.umbral_voltaje_max}`}
                </Text>
              </View>
              <View style={{alignItems:"center", gap:3}}>
                <Text style={{color:"#333333", fontSize:17}}>Umbral de Amperaje</Text>
                <Text style={{fontWeight:"bold", fontSize:15}}>
                {electrodomestico.umbral_amperaje_max && electrodomestico.umbral_amperaje_min  ? (`${electrodomestico.umbral_amperaje_min} - ${electrodomestico.umbral_amperaje_max}`): "Sin datos"}
                </Text>
              </View>
              <View style={{alignItems:"center", gap:3}}>
                <Text style={{color:"#333333", fontSize:17}}>Umbral de Potencia</Text>
                <Text style={{fontWeight:"bold", fontSize:15}}>
                  {electrodomestico.umbral_potencia_max && electrodomestico.umbral_potencia_min ? (`${electrodomestico.umbral_potencia_min} - ${electrodomestico.umbral_potencia_max}`): "Sin datos"}
                </Text>
              </View>
          </View>
        </View>
        <View style={{flexDirection: "row", justifyContent:"space-around"}}>
          <CardButton 
            title="Editar"
            onPress={() => {
              handleEditar(electrodomestico.electrodomestico_id)
            }}
          /> 
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <LinearGradient
            colors={["#C5E1A5", "#558B2F"]}
            style={{
              backgroundColor: "#fee",
              borderRadius:20,
              padding:20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            <Text style={{color:"white", fontSize:20, fontWeight:"500"}}>¿Está seguro que desea borrar este dispositivo del monitoreo?</Text>
            <View style={{flexDirection:"row", gap: 15}}>
            <CardButton
              title="Eliminar"
              onPress={() => handleEliminarElectrodomestico(electrodomestico.electrodomestico_id)}
            />
            <CardButton
              title="Cancelar"
              onPress={() => setShowModal(false)}
            />
            </View>
            </LinearGradient>
          </View>

        </Modal>
      </View>
  )
}

const ElectrodomesticosList = ({electrodomesticos}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{height: Dimensions.get("window").height - insets.bottom}}>
        <FlatList
        data={electrodomesticos}
        keyExtractor={(electrodomestico) => electrodomestico.electrodomestico_id}
        renderItem={({item}) => <Electrodomestico electrodomestico={item}/>}
      />
    </View>
  )
}

