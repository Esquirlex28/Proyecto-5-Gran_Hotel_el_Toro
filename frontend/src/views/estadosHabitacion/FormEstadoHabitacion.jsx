import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CForm, CFormInput, CFormTextarea, CButton, CAlert } from '@coreui/react'
import { postEstadoHabitacion } from '../../service/api'

const FormEstadoHabitacion = () => {
  const navigate = useNavigate()

  const [mensaje, setMensaje] = useState(false)
  const [error, setError] = useState('')
  const [estado, setEstado] = useState({
    Nombre_Estado: '',
    Observaciones: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEstado((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    postEstadoHabitacion({
      Nombre_Estado: estado.Nombre_Estado.trim(),
      Observaciones: estado.Observaciones.trim(),
    })
      .then((res) => {
        if (res.error) {
          setError(res.error)
          return
        }
        setMensaje(true)
        setTimeout(() => navigate('/panel/estadoshabitacion'), 2000)
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
          ¡Estado de habitacion creado con exito!
        </CAlert>
      )}
      {error && (
        <CAlert color="danger" className="text-center shadow-sm">
          {error}
        </CAlert>
      )}
      <CCard className="shadow-sm mb-4">
        <CCardBody className="p-4">
          <h1 className="h3">Crear Estado de Habitacion</h1>
          <hr className="mb-4" />
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              className="mb-4"
              type="text"
              name="Nombre_Estado"
              label="Nombre del Estado"
              placeholder="Disponible"
              maxLength={100}
              required
              value={estado.Nombre_Estado}
              onChange={handleChange}
            />
            <CFormTextarea
              label="Observaciones"
              rows={4}
              maxLength={500}
              text="Opcional. Maximo 500 caracteres."
              name="Observaciones"
              value={estado.Observaciones}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-between align-items-center gap-2 mt-4 pt-3 border-top">
              <CButton
                color="secondary"
                variant="outline"
                type="button"
                onClick={() => navigate('/panel/estadoshabitacion')}
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

export default FormEstadoHabitacion
