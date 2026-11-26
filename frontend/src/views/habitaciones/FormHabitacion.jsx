import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  CContainer,
  CForm,
  CFormInput,
  CRow,
  CCol,
  CFormTextarea,
  CFormSelect,
  CButton,
  CAlert,
} from '@coreui/react'

const tipoHabitacion = [
  { id: 1, nombre: 'Normal' },
  { id: 2, nombre: 'Business' },
  { id: 3, nombre: 'Suite' },
]

const pisoHabitacion = [
  { id: 1, nombre: 'Piso 1' },
  { id: 2, nombre: 'Piso 2' },
  { id: 3, nombre: 'Piso 3' },
]

const estadoHabitacion = [
  { id: 1, nombre: 'Disponible' },
  { id: 2, nombre: 'Ocupada' },
  { id: 3, nombre: 'Mantenimiento' },
  { id: 4, nombre: 'Reservada' },
]

const FormHabitacion = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const esEdicion = id !== undefined
  const rutaRegreso = esEdicion ? `/panel/habitaciones/${id}` : '/panel/habitaciones'

  const [mensaje, setMensaje] = useState(false)
  const [habitacion, setHabitacion] = useState(
    esEdicion
      ? { numero: Number(id), tipo: 1, tipoVistas: '', piso: 1, estado: 1 }
      : { numero: '', tipo: '', tipoVistas: '', piso: '', estado: '' },
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setHabitacion((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(esEdicion ? 'Mandando peticion de actualizacion' : 'Mandando peticion de creacion')
    console.log(habitacion)
    setMensaje(true)
    setTimeout(() => navigate(rutaRegreso), 2000)
  }

  return (
    <>
      {mensaje && (
        <CAlert color="success" className="mt-3 text-center shadow">
          ¡Habitacion {esEdicion ? 'actualizada' : 'creada'} con exito!
        </CAlert>
      )}
      <CContainer
        className="position-relative bg-white rounded-3 shadow-lg p-4"
        style={{ width: '100vw', height: '75vh' }}
      >
        <h1>{esEdicion ? 'Editar' : 'Crear'} Habitacion</h1>
        <hr className="mb-5" />
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol xs className="mb-4">
              <CFormInput
                type="number"
                name="numero"
                label="Numero de Habitacion"
                placeholder="204"
                min={100}
                max={999}
                required
                value={habitacion.numero}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs>
              <CFormSelect
                label="Tipo de Habitacion"
                name="tipo"
                required
                value={habitacion.tipo}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Tipo de Habitacion
                </option>
                {tipoHabitacion.map((th) => (
                  <option key={th.id} value={th.id}>
                    {th.nombre}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CFormTextarea
            label="Tipo de Vistas"
            rows={5}
            text="Descripcion de las vistas en 15-20 palabras."
            name="tipoVistas"
            value={habitacion.tipoVistas}
            onChange={handleChange}
          />
          <CRow className="mt-4">
            <CCol xs>
              <CFormSelect
                label="Piso de la Habitacion"
                name="piso"
                required
                value={habitacion.piso}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Piso
                </option>
                {pisoHabitacion.map((ph) => (
                  <option key={ph.id} value={ph.id}>
                    {ph.nombre}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol xs>
              <CFormSelect
                label="Estado de la Habitacion"
                name="estado"
                required
                value={habitacion.estado}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Estado
                </option>
                {estadoHabitacion.map((eh) => (
                  <option key={eh.id} value={eh.id}>
                    {eh.nombre}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <div className="position-absolute bottom-0 start-0 end-0 px-4 py-4 d-flex justify-content-between align-items-center">
            <CButton color="secondary" type="button" onClick={() => navigate(rutaRegreso)}>
              Cancelar
            </CButton>
            <CButton color="primary" type="submit">
              Guardar
            </CButton>
          </div>
        </CForm>
      </CContainer>
    </>
  )
}

export default FormHabitacion
