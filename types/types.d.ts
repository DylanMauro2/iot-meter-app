export type Electrodomestico = {
  id?: number;
  usuarioId?: number;
  nombre?: string;
  descripcion?: string;
  marca?: string;
  modelo?: string;
  amperajeNominal?: number;
  voltajeNominal?: number;
  potenciaNominal?: number;
  umbralAmperajeMin?: number;
  umbralAmperajeMax?: number;
  umbralPotenciaMin?: number;
  umbralPotenciaMax?: number;
  umbralVoltajeMin?: number;
  umbralVoltajeMax?: number;
  umbralPotenciaMax?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ElectrodomesticoInfo = {
  id?: number;
  nombre?: string;
  amperajeNominal?: number;
  voltajeNominal?: number;
  potenciaNominal?: number;
  umbralAmperajeMin?: number;
  umbralAmperajeMax?: number;
  umbralPotenciaMin?: number;
  umbralPotenciaMax?: number;
}