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
import { postLoginEmpleado } from '../../../service/api'

const Login = () => {
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [verPassword, setVerPassword] = useState(false)
  const [credenciales, setCredenciales] = useState({ Usuario: '', Password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredenciales((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    postLoginEmpleado({
      Usuario: credenciales.Usuario.trim(),
      Password: credenciales.Password,
    })
      .then((res) => {
        if (!res.ok) {
          setError(res.mensaje || 'No se pudo iniciar sesion')
          return
        }
        localStorage.setItem('empleado', JSON.stringify(res.empleado))
        navigate('/panel/dashboard')
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
            <div className="d-flex flex-column gap-4">
              <div className="text-center">
                <img src={logo} alt="Gran Hotel el Toro" height={160} />
              </div>
              {error && (
                <CAlert color="danger" className="text-center shadow-sm mb-0">
                  {error}
                </CAlert>
              )}
              <CCard className="p-4">
                <CCardBody className="d-flex flex-column gap-4">
                  <h2 className="h5 text-center mb-0">Iniciar sesion</h2>
                  <CForm className="row gy-3" onSubmit={handleSubmit}>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="Usuario">Usuario</CFormLabel>
                      <CFormInput
                        id="Usuario"
                        name="Usuario"
                        placeholder="Tu usuario"
                        autoComplete="username"
                        required
                        value={credenciales.Usuario}
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
                          autoComplete="current-password"
                          required
                          value={credenciales.Password}
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
                      <CButton color="primary" type="submit" className="w-100">
                        Entrar
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>

            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
