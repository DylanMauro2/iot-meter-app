import { LinearGradient } from 'expo-linear-gradient'
import React, { Children, ReactNode } from 'react'
import { Dimensions, Modal, View } from 'react-native'

type Props = {
  children: ReactNode;
  show: boolean;
  setShow: (show: boolean) => void
}

const CustomModal = ({ children, show, setShow }: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={() => setShow(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <LinearGradient
          colors={["#C5E1A5", "#558B2F"]}
          style={{
            backgroundColor: "#fee",
            borderRadius: 20,
            padding: 20,
            maxWidth: Dimensions.get("screen").width * 0.95,
            minWidth: Dimensions.get("screen").width * 0.5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          {children}
        </LinearGradient>
      </View>
    </Modal>
  );
}

export default CustomModal
