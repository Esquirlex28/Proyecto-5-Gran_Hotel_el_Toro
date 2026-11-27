import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormTextarea,
  CRow,
  CCol,
  CButton,
  CAlert,
} from '@coreui/react'
import { postPiso } from '../../service/api'

const FormPiso = () => {
  const navigate = useNavigate()

  const [mensaje, setMensaje] = useState(false)
  const [error, setError] = useState('')
  const [piso, setPiso] = useState({
    Codigo_Piso: '',
    Nombre_Piso: '',
    Capacidad_Habitaciones: 1,
    Observaciones: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setPiso((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    postPiso({
      Codigo_Piso: piso.Codigo_Piso.trim(),
      Nombre_Piso: piso.Nombre_Piso.trim(),
      Capacidad_Habitaciones: Number(piso.Capacidad_Habitaciones),
      Observaciones: piso.Observaciones.trim(),
    })
      .then((res) => {
        if (res.error) {
          setError(res.error)
          return
        }
        setMensaje(true)
        setTimeout(() => navigate('/panel/pisos'), 2000)
      })
      .catch((e) => {
        console.error(e)
        setError('No se pudo conectar con el servidor')
      })
  }

  return (
    <>
      {mensaje && (
        <CAlert color="success" className="text-center shadow-sm">
          ¡Piso creado con exito!
        </CAlert>
      )}
      {error && (
        <CAlert color="danger" className="text-center shadow-sm">
          {error}
        </CAlert>
      )}
      <CCard className="shadow-sm mb-4">
        <CCardBody className="p-4">
          <h1 className="h3">Crear Piso</h1>
          <hr className="mb-4" />
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="text"
                  name="Codigo_Piso"
                  label="Codigo del Piso"
                  placeholder="P1"
                  maxLength={25}
                  required
                  value={piso.Codigo_Piso}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="text"
                  name="Nombre_Piso"
                  label="Nombre del Piso"
                  placeholder="Piso 1"
                  maxLength={50}
                  required
                  value={piso.Nombre_Piso}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CFormInput
              className="mb-4"
              type="number"
              name="Capacidad_Habitaciones"
              label="Capacidad de Habitaciones"
              placeholder="20"
              min={1}
              required
              value={piso.Capacidad_Habitaciones}
              onChange={handleChange}
            />
            <CFormTextarea
              label="Observaciones"
              rows={4}
              maxLength={500}
              text="Opcional. Maximo 500 caracteres."
              name="Observaciones"
              value={piso.Observaciones}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-between align-items-center gap-2 mt-4 pt-3 border-top">
              <CButton
                color="secondary"
                variant="outline"
                type="button"
                onClick={() => navigate('/panel/pisos')}
              >
                Cancelar
              </CButton>
              <CButton color="primary" type="submit" disabled={mensaje}>
                Guardar
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default FormPiso
