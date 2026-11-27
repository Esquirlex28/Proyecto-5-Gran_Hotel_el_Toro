const API = 'http://localhost:3000/api';

const peticionGet = async (ruta) => {
  const resultado = await fetch(`${API}${ruta}`)
  return resultado.json()
}

const peticionPost = async (ruta, datos) => {
  const formatoPeticion = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  }
  const resultado = await fetch(`${API}${ruta}`, formatoPeticion)
  return resultado.json()
}

const peticionPut = async (ruta, datos) => {
  const formatoPeticion = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  }
  const resultado = await fetch(`${API}${ruta}`, formatoPeticion)
  return resultado.json()
}

const peticionDelete = async (ruta) => {
  const resultado = await fetch(`${API}${ruta}`, { method: 'DELETE' })
  return resultado.json()
}

export const getHabitaciones = () => peticionGet('/habitaciones');
export const getHabitacion = (id) => peticionGet(`/habitaciones/${id}`);
export const getPaises = () => peticionGet('/paises');
export const postPais = (peticion) => peticionPost('/paises', peticion);
export const getClientes = () => peticionGet('/clientes');
export const postClientes = (peticion) => peticionPost('/clientes', peticion);
