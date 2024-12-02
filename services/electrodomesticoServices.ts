import { Electrodomestico } from "@/types"

export type SaveElectrodomesticoRequest = {
  electrodomestico: Electrodomestico
}

export type UpdateElectrodomesticoRequest = {
  id: number,
  electrodomestico: Electrodomestico
}

export type GetElectrodomesticosByUsuarioIdRequest = {
  usuarioId: number,
}

export type GetElectrodomesticoByElectrodomesticoIdRequest = {
  electrodomesticoId: number,
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
console.log(apiUrl)

export const getElectrodomesticosByUsuarioId  = async (usuarioId) => {
  const payload: GetElectrodomesticosByUsuarioIdRequest = {
    usuarioId: usuarioId
  }

  const res = await fetch(`${apiUrl}/electrodomesticos/usuario/${usuarioId}`, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(payload)
  })
  
  const electrodomesticos = await res.json()

  return electrodomesticos;
}

export const getElectrodomesticoByElectrodomesticoId  = async (electrodomesticoId: number) => {

  const res = await fetch(`${apiUrl}/electrodomesticos/${electrodomesticoId}`, {
    method: "GET",
    headers: {
      "Content-Type":"application/json"
    }
  })

  
  const electrodomestico = await res.json()

  return electrodomestico;
}

export const saveElectrodomestico = async (payload: SaveElectrodomesticoRequest) => {

  const res = await fetch(`${apiUrl}/electrodomesticos/crear`, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(payload.electrodomestico)
  })
  
  const electrodomesticosCreado = await res.json()

  return electrodomesticosCreado;
}

export const deleteElectrodomesticoById = async (electrodomesticoId: number) => {

  const res = await fetch(`${apiUrl}/electrodomesticos/${electrodomesticoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type":"application/json"
    }
  })
  
  const electrodomesticosEliminado = await res.json()

  return electrodomesticosEliminado;
}

export const updateElectrodomestico = async (payload: UpdateElectrodomesticoRequest) => {

  const res = await fetch(`${apiUrl}/electrodomesticos/${payload.id}/editar`, {
    method: "PUT",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(payload.electrodomestico)
  })
  
  const electrodomesticosEliminado = await res.json()

  return electrodomesticosEliminado;
}