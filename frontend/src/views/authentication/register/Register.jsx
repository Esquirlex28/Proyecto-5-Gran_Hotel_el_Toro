import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import logo from '../../../assets/images/logo.png'
import { eye } from '../../../assets/icons/eye'
import { postUsuarioEmpleado } from '../../../service/api'

const Register = () => {
  const navigate = useNavigate()

  const [mensaje, setMensaje] = useState(false)
  const [error, setError] = useState('')
  const [verPassword, setVerPassword] = useState(false)
  const [cuenta, setCuenta] = useState({ ID_Empleado: '', Usuario: '', Password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCuenta((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    postUsuarioEmpleado({
      ID_Empleado: Number(cuenta.ID_Empleado),
      Usuario: cuenta.Usuario.trim(),
      Password: cuenta.Password,
    })
      .then((res) => {
        if (!res.ok) {
          setError(res.mensaje || 'No se pudo crear la cuenta')
          return
        }
        setMensaje(true)
        setTimeout(() => navigate('/authentication/login'), 2000)
      })
      .catch((e) => {
        console.error(e)
        setError('No se pudo conectar con el servidor')
      })
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={6} xl={5}>
            <div className="d-flex flex-column gap-4 text-center">
              <div>
                <img src={logo} alt="Gran Hotel el Toro" height={96} />
              </div>
              {mensaje && (
                <CAlert color="success" className="shadow-sm mb-0">
                  ¡Cuenta creada con exito!
                </CAlert>
              )}
              {error && (
                <CAlert color="danger" className="shadow-sm mb-0">
                  {error}
                </CAlert>
              )}
              <CCard className="p-4">
                <CCardBody className="d-flex flex-column gap-4">
                  <h2 className="h5 text-center mb-0">Crear cuenta de empleado</h2>
                  <CForm className="row gy-3 text-start" onSubmit={handleSubmit}>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="ID_Empleado">ID de Empleado</CFormLabel>
                      <CFormInput
                        id="ID_Empleado"
                        name="ID_Empleado"
                        type="number"
                        placeholder="1"
                        min={1}
                        required
                        value={cuenta.ID_Empleado}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="Usuario">Usuario</CFormLabel>
                      <CFormInput
                        id="Usuario"
                        name="Usuario"
                        placeholder="Tu usuario"
                        autoComplete="username"
                        required
                        value={cuenta.Usuario}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="Password">Contraseña</CFormLabel>
                      <CInputGroup>
                        <CFormInput
                          id="Password"
                          name="Password"
                          type={verPassword ? 'text' : 'password'}
                          placeholder="Tu contraseña"
                          autoComplete="new-password"
                          required
                          value={cuenta.Password}
                          onChange={handleChange}
                        />
                        <CInputGroupText>
                          <CButton
                            type="button"
                            color="link"
                            className="p-0 link-secondary"
                            aria-label="Ver contraseña"
                            onClick={() => setVerPassword(!verPassword)}
                          >
                            <CIcon icon={verPassword ? icon.cilLowVision : eye} size="sm" />
                          </CButton>
                        </CInputGroupText>
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12}>
                      <CButton color="primary" type="submit" className="w-100" disabled={mensaje}>
                        Crear cuenta
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
              <div className="text-body-secondary">
                ¿Ya tienes cuenta? <Link to="/authentication/login">Inicia sesion</Link>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
