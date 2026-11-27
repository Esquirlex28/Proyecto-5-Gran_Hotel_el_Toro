import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormTextarea,
  CButton,
  CAlert,
} from '@coreui/react'
import { postCargos } from '../../service/api'

const FormCargo = () => {
  const navigate = useNavigate()

  const [mensaje, setMensaje] = useState(false)
  const [error, setError] = useState('')
  const [cargo, setCargo] = useState({
    Nombre_Cargo: '',
    Descripcion: '',
    Salario_Base: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCargo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (Number(cargo.Salario_Base) <= 0) {
      setError('El salario base debe ser mayor a 0')
      return
    }

    postCargos({
      Nombre_Cargo: cargo.Nombre_Cargo.trim(),
      Descripcion: cargo.Descripcion.trim(),
      Salario_Base: Number(cargo.Salario_Base),
    })
      .then((res) => {
        if (!res.ok) {
          setError(res.mensaje || 'No se pudo guardar el cargo')
          return
        }
        setMensaje(true)
        setTimeout(() => navigate('/panel/cargos'), 2000)
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
          ¡Cargo creado con exito!
        </CAlert>
      )}
      {error && (
        <CAlert color="danger" className="text-center shadow-sm">
          {error}
        </CAlert>
      )}
      <CCard className="shadow-sm mb-4">
        <CCardBody className="p-4">
          <h1 className="h3">Crear Cargo de Empleado</h1>
          <hr className="mb-4" />
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              className="mb-4"
              type="text"
              name="Nombre_Cargo"
              label="Nombre del Cargo"
              placeholder="Recepcionista"
              maxLength={100}
              required
              value={cargo.Nombre_Cargo}
              onChange={handleChange}
            />
            <CFormTextarea
              className="mb-4"
              name="Descripcion"
              label="Descripcion"
              placeholder="Atiende el registro de entrada y salida de los huespedes"
              rows={3}
              required
              value={cargo.Descripcion}
              onChange={handleChange}
            />
            <CFormInput
              className="mb-4"
              type="number"
              name="Salario_Base"
              label="Salario Base"
              placeholder="15000.00"
              min={0.01}
              step={0.01}
              required
              value={cargo.Salario_Base}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-between align-items-center gap-2 mt-4 pt-3 border-top">
              <CButton
                color="secondary"
                variant="outline"
                type="button"
                onClick={() => navigate('/panel/cargos')}
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

export default FormCargo
