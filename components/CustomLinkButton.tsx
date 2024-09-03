import { useRouter } from "expo-router"
import { Dimensions, Text, TouchableOpacity } from "react-native"

export default function CustomLinkButton({url, title, children,...restOfProps}: {url:string}){
  const router = useRouter()
  return (
    <TouchableOpacity
      {...restOfProps}
      onPress={()=> router.push(url)}
      style={{height: 70, backgroundColor: "#fefefe", borderRadius: "50%", alignSelf:"center", width:Dimensions.get("window").width * 0.8, borderWidth:3, borderStyle:"solid", borderColor: "green", justifyContent:"center", alignItems:"center", flexDirection:"row", gap:10, marginTop:20}}
    >
      {children}
      <Text style={{textAlign:"center", fontSize:20, color:"green"}}>{title}</Text>
    </TouchableOpacity>
  )
}