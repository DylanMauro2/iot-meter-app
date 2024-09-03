import { View, TextInput, Dimensions } from "react-native";
import React from "react";

export default function CustomInputText({...restOfProps}) {

  const widthScreenSize = Dimensions.get("window").width

  return (
    <View>
      <TextInput
        {...restOfProps}
        style={{
          height: 70,
          backgroundColor: "#fefefe",
          borderColor: "#cecece",
          borderWidth: 2,
          borderStyle: "solid",
          borderRadius: 30,
          paddingLeft: 17,
          fontSize: 22,
          width: widthScreenSize * 0.85,
          marginVertical:8
        }}
      />
    </View>
  );
}
