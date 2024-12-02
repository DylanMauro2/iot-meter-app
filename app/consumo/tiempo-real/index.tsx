import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions, Text, TouchableOpacity, TouchableNativeFeedback, Touchable, Modal, Platform } from "react-native"
import { LineChart } from "react-native-chart-kit";
import { Table, Row, Rows } from 'react-native-table-component';
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";
import { ElectrodomesticosContext } from "@/context/ElectrodomesticosContext";
import { LinearGradient } from "expo-linear-gradient";
import CustomModal from "@/components/modal/CustomModal";
import CardButton from "@/components/CardButton";
import { Picker } from "@react-native-picker/picker";

export default function ConsumoTiempoRealScreen() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const {isAuthenticated} = useContext(AuthContext)
  
  const {electrodomesticos, obtenerElectrodomesticos} = useContext(ElectrodomesticosContext);

  const obtenerData = () => {
      setData((prevData) => {
        if (prevData.length > 0) {
          let arrayData = [...prevData]
          arrayData.shift()
          arrayData.push(Math.random() * 100)
          return arrayData
        } else if (prevData.length === 0){
          return [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      })
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      obtenerData()
    }, 2000);

    return () => clearInterval(intervalId)
  }, []);
  const state = {
    tableHead: ['ID', 'Nombre', 'Consumo W/h', 'Head4'],
    tableData: [
      ['1', '2', '3', '3'],
      ['a', 'b', 'c', 'd'],
      ['1', '2', '3', '789'],
      ['a', 'b', 'c', 'd']
    ]
  }

  useEffect(() => {
    obtenerElectrodomesticos()
    console.log("obteniendo")
  }, [])

  return (
    <View style={{flex:1}}>
      <LinearGradient
        colors={["#8BC34A", "#4CAF50", "#388E3C"]}
        style={{
          minHeight: Dimensions.get("screen").height,
          padding:10
        }}
      >
        {
          data.length > 0 && electrodomesticos && electrodomesticos.map(electrodomestico => (
            <View key={electrodomestico.id}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{textAlign:"center", fontSize:25, fontWeight:"bold"}}>{electrodomestico.nombre}</Text>
                <TouchableNativeFeedback
                  onPress={() => setShowSettings(true)}
                >
                  <Ionicons name="options" size={32} color="#22577a"/>
                </TouchableNativeFeedback>
              </View>
            <LineChart data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: data
                }
              ] 
              }}
              width={Dimensions.get("window").width - 10}
              height={300}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false,
                backgroundGradientFrom:"#22577a",
                backgroundGradientTo:"#38a3a5",
                decimalPlaces: 0,
                propsForBackgroundLines:{
                  strokeWidth: 1
                }// optional
              }}
              style= {{
                borderRadius: 10,
                paddingVertical:10,
                alignSelf:"center",
              }}
              yAxisSuffix=" W"
            />
            </View>
          ))
        }
        <CustomModal
          show={showSettings}
          setShow={setShowSettings}
        >
          <Text>cambiando rangos de fecha de</Text>
          <Picker
            mode='dialog'
            style={{width:Dimensions.get("screen").width * 0.8,
              borderRadius: 20, backgroundColor: Platform.OS === "android" ? "#fff" : "none", alignSelf:"center",
              marginVertical: Platform.OS === "android" ? 20 : 0,
            }}
          >
            <Picker.Item label="Mensual" value={{}}/>
            <Picker.Item label="Semanal" value={{}}/>
            <Picker.Item label="Diario" value={{}}/>
            <Picker.Item label="Hace 3 Meses" value={{}}/>
            <Picker.Item label="Hace 6 Meses" value={{}}/>
          </Picker>
          <View style={{flexDirection:"row", gap:15}}>
            <CardButton title="Cambiar" onPress={() => setShowSettings(false)}/>
            <CardButton title="Cerrar" onPress={() => setShowSettings(false)}/>
          </View>
        </CustomModal>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
        </LinearGradient>
      </View>
  )
}



const styles = StyleSheet.create({
  container: {padding: 16, paddingTop: 10, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});