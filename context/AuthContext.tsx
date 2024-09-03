import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"
import * as SecureStore from "expo-secure-store"

export const AuthContext = createContext(null);

export const AuthProvider = ({children} : {children: React.ReactElement}) => {
  const [ user, setUser ] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const onLogin = async (token: any) => {
    await SecureStore.setItemAsync("token", token)
    const decode = jwtDecode(token)
    setUser(decode)
    setIsAuthenticated(true)
  }
    
  const onLogout = async () => {
    await SecureStore.deleteItemAsync("token")
    setUser(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setIsAuthenticated(true);
      }
    })();
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  )
}