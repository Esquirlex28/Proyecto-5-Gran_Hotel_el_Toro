import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CForm, CFormInput, CRow, CCol, CButton, CAlert } from '@coreui/react'
import { postTipoHabitacion } from '../../service/api'

const FormTipoHabitacion = () => {
  const navigate = useNavigate()

  const [mensaje, setMensaje] = useState(false)
  const [error, setError] = useState('')
  const [tipo, setTipo] = useState({
    Nombre_Tipo: '',
    Capacidad_Maxima: 1,
    Tarifa_Base: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setTipo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    postTipoHabitacion({
      Nombre_Tipo: tipo.Nombre_Tipo.trim(),
      Capacidad_Maxima: Number(tipo.Capacidad_Maxima),
      Tarifa_Base: Number(tipo.Tarifa_Base),
    })
      .then((res) => {
        if (res.error) {
          setError(res.error)
          return
        }
        setMensaje(true)
        setTimeout(() => navigate('/panel/tipohabitacion'), 2000)
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
          ¡Tipo de habitacion creado con exito!
        </CAlert>
      )}
      {error && (
        <CAlert color="danger" className="text-center shadow-sm">
          {error}
        </CAlert>
      )}
      <CCard className="shadow-sm mb-4">
        <CCardBody className="p-4">
          <h1 className="h3">Crear Tipo de Habitacion</h1>
          <hr className="mb-4" />
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              className="mb-4"
              type="text"
              name="Nombre_Tipo"
              label="Nombre del Tipo"
              placeholder="Suite"
              maxLength={100}
              required
              value={tipo.Nombre_Tipo}
              onChange={handleChange}
            />
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="number"
                  name="Capacidad_Maxima"
                  label="Capacidad Maxima"
                  placeholder="2"
                  min={1}
                  required
                  value={tipo.Capacidad_Maxima}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="number"
                  name="Tarifa_Base"
                  label="Tarifa Base"
                  placeholder="1500.00"
                  min={0.01}
                  step={0.01}
                  required
                  value={tipo.Tarifa_Base}
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

export default FormTipoHabitacion
