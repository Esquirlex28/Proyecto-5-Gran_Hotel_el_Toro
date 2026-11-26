import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CRow,
  CCol,
  CButton,
  CAlert,
} from '@coreui/react'

const FormPiso = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const esEdicion = id !== undefined

  const [mensaje, setMensaje] = useState(false)
  const [piso, setPiso] = useState(
    esEdicion
      ? {
          codigo: 'P1',
          nombre: 'Piso 1',
          capacidadHabitaciones: 20,
          observaciones: 'Acceso a recepcion y restaurante',
        }
      : { codigo: '', nombre: '', capacidadHabitaciones: 1, observaciones: '' },
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setPiso((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(esEdicion ? 'Mandando peticion de actualizacion' : 'Mandando peticion de creacion')
    console.log(piso)
    setMensaje(true)
    setTimeout(() => navigate('/panel/pisos'), 2000)
  }

  return (
    <>
      {mensaje && (
        <CAlert color="success" className="mt-3 text-center shadow">
          ¡Piso {esEdicion ? 'actualizado' : 'creado'} con exito!
        </CAlert>
      )}
      <CContainer
        className="position-relative bg-white rounded-3 shadow-lg p-4"
        style={{ width: '100vw', height: '75vh' }}
      >
        <h1>{esEdicion ? 'Editar' : 'Crear'} Piso</h1>
        <hr className="mb-5" />
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol xs className="mb-4">
              <CFormInput
                type="text"
                name="codigo"
                label="Codigo del Piso"
                placeholder="P1"
                maxLength={25}
                required
                value={piso.codigo}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs>
              <CFormInput
                type="text"
                name="nombre"
                label="Nombre del Piso"
                placeholder="Piso 1"
                maxLength={50}
                required
                value={piso.nombre}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CFormInput
            className="mb-4"
            type="number"
            name="capacidadHabitaciones"
            label="Capacidad de Habitaciones"
            placeholder="20"
            min={1}
            required
            value={piso.capacidadHabitaciones}
            onChange={handleChange}
          />
          <CFormTextarea
            label="Observaciones"
            rows={4}
            maxLength={500}
            text="Opcional. Maximo 500 caracteres."
            name="observaciones"
            value={piso.observaciones}
            onChange={handleChange}
          />
          <div className="position-absolute bottom-0 start-0 end-0 px-4 py-4 d-flex justify-content-between align-items-center">
            <CButton color="secondary" type="button" onClick={() => navigate('/panel/pisos')}>
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

export default FormPiso
