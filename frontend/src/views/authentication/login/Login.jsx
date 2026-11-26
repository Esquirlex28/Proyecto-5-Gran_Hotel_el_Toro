import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons';

const Login = () => {
  const navigate = useNavigate()

  // TODO: agregar verificación de credenciales
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/panel/dashboard')
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={6} xl={5}>
            <div className="d-flex flex-column gap-4">
              <div className="text-center">
                <CIcon icon={icon.cibAcm} height={48} />
              </div>
              <CCard className="p-4">
                <CCardBody className="d-flex flex-column gap-4">
                  <h2 className="h5 text-center mb-0">Login to your account</h2>
                  <CForm className="row gy-3" onSubmit={handleSubmit}>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="email">Email address</CFormLabel>
                      <CFormInput
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                      />
                    </CCol>
                    <CCol xs={12}>
                      <div className="d-flex justify-content-between">
                        <CFormLabel htmlFor="password">Password</CFormLabel>
                        <Link to="/authentication/reset-password">I forgot password</Link>
                      </div>
                      <CInputGroup>
                        <CFormInput
                          id="password"
                          type="password"
                          placeholder="Your password"
                          autoComplete="current-password"
                        />
                        <CInputGroupText>
                          <CTooltip content="Show password">
                            <CButton
                              type="button"
                              color="link"
                              className="p-0 link-secondary"
                              aria-label="Show password"
                            >
                              <CIcon icon={icon.cilLowVision} size="sm" />
                            </CButton>
                          </CTooltip>
                        </CInputGroupText>
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12}>
                      <CFormCheck id="rememberMe" label="Remember me on this device" />
                    </CCol>
                    <CCol xs={12}>
                      <CButton color="primary" type="submit" className="w-100">
                        Sign in
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
