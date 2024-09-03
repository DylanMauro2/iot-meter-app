import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"
import * as SecureStore from "expo-secure-store"
import { getElectrodomesticosByUsuarioId } from "@/services/electrodomesticoServices";
import { AuthContext } from "./AuthContext";

export const ElectrodomesticosContext = createContext(null);

export const ElectrodomesticosProvider = ({ children } : {children: React.ReactElement}) => {
  const [ electrodomesticos, setElectrodomesticos ] = useState()
  const {user} = useContext(AuthContext)

  const obtenerElectrodomesticos = async () => {
    const res = await getElectrodomesticosByUsuarioId(user.usuarioId)
    setElectrodomesticos(res)
    console.log(res)
  }

  return (
    <ElectrodomesticosContext.Provider value={{ electrodomesticos, obtenerElectrodomesticos }}>
      {children}
    </ElectrodomesticosContext.Provider>
  )
}