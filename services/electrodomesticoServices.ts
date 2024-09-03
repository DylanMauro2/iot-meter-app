export type saveElectrodomesticoRequest = {
  nombre: string,
  usuarioId: number,
  amperajeNominal: number,
  potenciaNominal: number
}

export type editElectrodomesticoByIdRequest = {
  nombre?: string,
  usuarioId?: number,
  amperajeNominal?: number,
  potenciaNominal?: number,
  updatedAt?: Date,
  umbralPotenciaMin?: number,
  umbralPotenciaMax?: number,
  umbralAmperajeMax?: number,
  umbralAmperajeMin?: number,
}

export type getElectrodomesticosByUsuarioIdRequest = {
  usuarioId: number,
}

export type getElectrodomesticoByElectrodomesticoIdRequest = {
  electrodomesticoId: number,
}

export const getElectrodomesticosByUsuarioId  = async (usuarioId) => {
  const payload: getElectrodomesticosByUsuarioIdRequest = {
    usuarioId: usuarioId
  }

  const res = await fetch(`http://localhost:3000/electrodomesticos/usuario/${usuarioId}`, {
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

  const res = await fetch(`http://localhost:3000/electrodomesticos/${electrodomesticoId}`, {
    method: "GET",
    headers: {
      "Content-Type":"application/json"
    }
  })

  
  const electrodomestico = await res.json()

  return electrodomestico;
}

export const saveElectrodomestico = async (payload: saveElectrodomesticoRequest) => {

  const res = await fetch(`http://localhost:3000/electrodomesticos/crear`, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(payload)
  })
  
  const electrodomesticosCreado = await res.json()

  return electrodomesticosCreado;
}

export const deleteElectrodomesticoById = async (electrodomesticoId: number) => {

  const res = await fetch(`http://localhost:3000/electrodomesticos/${electrodomesticoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type":"application/json"
    }
  })
  
  const electrodomesticosEliminado = await res.json()

  return electrodomesticosEliminado;
}