import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions, Text, TouchableOpacity, TouchableNativeFeedback, Touchable } from "react-native"
import { LineChart } from "react-native-chart-kit";
import { Table, Row, Rows } from 'react-native-table-component';
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";

export default function ConsumoTiempoRealScreen() {
  const [data, setData] = useState([])
  const {isAuthenticated} = useContext(AuthContext)

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

    return ()=> clearInterval(intervalId)
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

  return (
      <View style={styles.container}>
        {
          data.length > 0 ? (
            <>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{textAlign:"center", fontSize:25, fontWeight:"bold"}}>Consumo Total</Text>
                <TouchableNativeFeedback>
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
                yAxisSuffix="W"
              />
            </>
          ) : (<ActivityIndicator size="large" style={{ height: 350, paddingVertical:20}}/>)
        }
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {padding: 16, paddingTop: 10, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});