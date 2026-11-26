import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CContainer, CForm, CFormInput, CRow, CCol, CButton, CAlert } from '@coreui/react'

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
        <CAlert color="success" className="mt-3 text-center shadow">
          ¡Tipo de habitacion {esEdicion ? 'actualizado' : 'creado'} con exito!
        </CAlert>
      )}
      <CContainer
        className="position-relative bg-white rounded-3 shadow-lg p-4"
        style={{ width: '100vw', height: '60vh' }}
      >
        <h1>{esEdicion ? 'Editar' : 'Crear'} Tipo de Habitacion</h1>
        <hr className="mb-5" />
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
            <CCol xs className="mb-4">
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
            <CCol xs>
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
          <div className="position-absolute bottom-0 start-0 end-0 px-4 py-4 d-flex justify-content-between align-items-center">
            <CButton
              color="secondary"
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
      </CContainer>
    </>
  )
}

export default FormTipoHabitacion
