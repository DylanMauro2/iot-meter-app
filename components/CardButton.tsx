import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Text, TouchableOpacity } from "react-native";

export default function CardButton({title, ...restOfProps} : {title:string}) {
  return (
    <TouchableOpacity
    {...restOfProps}
    style={{
      height: 40,
      marginTop:20,
      }}
      
    >
      <LinearGradient
        colors={["#26A69A", "#00796B"]}
        style={{
          flex: 1,
          alignSelf:"center",
          justifyContent:"center",
          alignItems:"center",
          borderRadius:100,
          width: Dimensions.get("window").width * 0.4,
        }}
      >

        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fefefe" }}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}