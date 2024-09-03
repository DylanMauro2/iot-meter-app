import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Redirect } from 'expo-router'
import { AuthContext } from '@/context/AuthContext'

export default function LogoutScreen() {
  const { onLogout } = useContext(AuthContext)

  useEffect(()=>{
    onLogout()
  }, [])

  return (
    <View>
      <Redirect href="auth/login" />
    </View>
  )
}