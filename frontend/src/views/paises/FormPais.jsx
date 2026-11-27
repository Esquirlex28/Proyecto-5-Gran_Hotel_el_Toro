import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
  CFormCheck,
  CFormLabel,
} from '@coreui/react'
import { postPais } from '../../service/api'

const FormPais = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const esEdicion = id !== undefined

  const [mensaje, setMensaje] = useState(false)
  const [error, setError] = useState('')
  const [pais, setPais] = useState({ Nombre_Pais: '', Nacionalidad: '', Estado: 1 })

  const handleChange = (e) => {
    const { name, value } = e.target
    setPais((prev) => ({ ...prev, [name]: value }))
  }

  const handleEstadoChange = (e) => {
    setPais((prev) => ({ ...prev, Estado: Number(e.target.value) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    postPais(pais)
      .then((res) => {
        if (!res.ok) {
          setError(res.mensaje || 'No se pudo guardar el pais')
          return
        }
        setMensaje(true)
        setTimeout(() => navigate('/panel/paises'), 2000)
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
          ¡Pais {esEdicion ? 'actualizado' : 'creado'} con exito!
        </CAlert>
      )}
      {error && (
        <CAlert color="danger" className="text-center shadow-sm">
          {error}
        </CAlert>
      )}
      <CCard className="shadow-sm mb-4">
        <CCardBody className="p-4">
          <h1 className="h3">{esEdicion ? 'Editar' : 'Crear'} Pais</h1>
          <hr className="mb-4" />
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="text"
                  name="Nombre_Pais"
                  label="Nombre del Pais"
                  placeholder="Honduras"
                  maxLength={50}
                  required
                  value={pais.Nombre_Pais}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="text"
                  name="Nacionalidad"
                  label="Nacionalidad"
                  placeholder="Hondureña"
                  maxLength={150}
                  required
                  value={pais.Nacionalidad}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CFormLabel>Estado</CFormLabel>
            <CFormCheck
              type="radio"
              name="Estado"
              id="estadoActivo"
              value={1}
              label="Activo"
              checked={pais.Estado === 1}
              onChange={handleEstadoChange}
            />
            <CFormCheck
              type="radio"
              name="Estado"
              id="estadoInactivo"
              value={0}
              label="Inactivo"
              checked={pais.Estado === 0}
              onChange={handleEstadoChange}
            />
            <div className="d-flex justify-content-between align-items-center gap-2 mt-4 pt-3 border-top">
              <CButton
                color="secondary"
                variant="outline"
                type="button"
                onClick={() => navigate('/panel/paises')}
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

export default FormPais
