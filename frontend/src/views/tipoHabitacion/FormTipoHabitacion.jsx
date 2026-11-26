import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CForm, CFormInput, CRow, CCol, CButton, CAlert } from '@coreui/react'

const FormTipoHabitacion = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const esEdicion = id !== undefined

  const [mensaje, setMensaje] = useState(false)
  const [tipo, setTipo] = useState(
    esEdicion
      ? { nombre: 'Normal', capacidadMaxima: 2, tarifaBase: 850.0 }
      : { nombre: '', capacidadMaxima: 1, tarifaBase: '' },
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setTipo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(esEdicion ? 'Mandando peticion de actualizacion' : 'Mandando peticion de creacion')
    console.log(tipo)
    setMensaje(true)
    setTimeout(() => navigate('/panel/tipohabitacion'), 2000)
  }

  return (
    <>
      {mensaje && (
        <CAlert color="success" className="text-center shadow-sm">
          ¡Tipo de habitacion {esEdicion ? 'actualizado' : 'creado'} con exito!
        </CAlert>
      )}
      <CCard className="shadow-sm mb-4">
        <CCardBody className="p-4">
          <h1 className="h3">{esEdicion ? 'Editar' : 'Crear'} Tipo de Habitacion</h1>
          <hr className="mb-4" />
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              className="mb-4"
              type="text"
              name="nombre"
              label="Nombre del Tipo"
              placeholder="Suite"
              maxLength={100}
              required
              value={tipo.nombre}
              onChange={handleChange}
            />
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="number"
                  name="capacidadMaxima"
                  label="Capacidad Maxima"
                  placeholder="2"
                  min={1}
                  required
                  value={tipo.capacidadMaxima}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="number"
                  name="tarifaBase"
                  label="Tarifa Base"
                  placeholder="1500.00"
                  min={0.01}
                  step={0.01}
                  required
                  value={tipo.tarifaBase}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <div className="d-flex justify-content-between align-items-center gap-2 mt-4 pt-3 border-top">
              <CButton
                color="secondary"
                variant="outline"
                type="button"
                onClick={() => navigate('/panel/tipohabitacion')}
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

export default FormTipoHabitacion
