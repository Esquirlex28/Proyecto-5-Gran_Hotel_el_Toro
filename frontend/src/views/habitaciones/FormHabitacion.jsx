import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
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
        <CAlert color="success" className="text-center shadow-sm">
          ¡Habitacion {esEdicion ? 'actualizada' : 'creada'} con exito!
        </CAlert>
      )}
      <CCard className="shadow-sm mb-4">
        <CCardBody className="p-4">
          <h1 className="h3">{esEdicion ? 'Editar' : 'Crear'} Habitacion</h1>
          <hr className="mb-4" />
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md={6} className="mb-4">
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
              <CCol md={6} className="mb-4">
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
              <CCol md={6} className="mb-4">
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
              <CCol md={6} className="mb-4">
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
            <div className="d-flex justify-content-between align-items-center gap-2 mt-4 pt-3 border-top">
              <CButton
                color="secondary"
                variant="outline"
                type="button"
                onClick={() => navigate(rutaRegreso)}
              >
                Cancelar
              </CButton>
              <CButton color="primary" type="submit">
                Guardar
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default FormHabitacion
