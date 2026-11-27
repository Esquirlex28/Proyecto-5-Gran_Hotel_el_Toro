import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CRow,
  CCol,
  CFormSelect,
  CButton,
  CAlert,
} from '@coreui/react'
import { IMaskMixin } from 'react-imask'
import { getPaises, postClientes } from '../../service/api'

const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
  <CFormInput {...props} ref={inputRef} />
))

const FormClientes = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const esEdicion = id !== undefined

  const [mensaje, setMensaje] = useState(false)
  const [error, setError] = useState('')
  const [cliente, setCliente] = useState({
    ID_Pais: '',
    DNI: '',
    Pasaporte: '',
    Primer_Nombre: '',
    Segundo_Nombre: '',
    Primer_Apellido: '',
    Segundo_Apellido: '',
    Telefono: '',
    Correo: '',
    FechaNacimiento: '2000-01-01',
    Sexo: 1,
  })
  const [paises, setPaises] = useState([])

  useEffect(() => {
    getPaises().then((res) => {
      if (res.ok) {
        setPaises(res.datos)
      }
      return
    })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCliente((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    postClientes({ ...cliente, ID_Pais: Number(cliente.ID_Pais), Sexo: Number(cliente.Sexo) })
      .then((res) => {
        if (!res.ok) {
          setError(res.mensaje || 'No se pudo guardar el cliente')
          return
        }
        setMensaje(true)
        setTimeout(() => navigate('/panel/clientes'), 2000)
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
          ¡Cliente {esEdicion ? 'actualizado' : 'creado'} con exito!
        </CAlert>
      )}
      {error && (
        <CAlert color="danger" className="text-center shadow-sm">
          {error}
        </CAlert>
      )}
      <CCard className="shadow-sm mb-4">
        <CCardBody className="p-4">
          <h1 className="h3">{esEdicion ? 'Editar' : 'Crear'} Cliente</h1>
          <hr className="mb-4" />
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="text"
                  name="Primer_Nombre"
                  label="Primer Nombre"
                  placeholder="Juan"
                  required
                  value={cliente.Primer_Nombre}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="text"
                  name="Segundo_Nombre"
                  label="Segundo Nombre"
                  placeholder="Luis"
                  value={cliente.Segundo_Nombre}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="text"
                  name="Primer_Apellido"
                  label="Primer Apellido"
                  placeholder="Martinez"
                  required
                  value={cliente.Primer_Apellido}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="text"
                  name="Segundo_Apellido"
                  label="Segundo Apellido"
                  placeholder="Gomez"
                  value={cliente.Segundo_Apellido}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormInputWithMask
                  type="text"
                  name="DNI"
                  label="DNI"
                  placeholder="0000-0000-00000"
                  value={cliente.DNI}
                  mask="0000-0000-00000"
                  unmask={true}
                  onAccept={(value) => setCliente((prev) => ({ ...prev, DNI: value }))}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="text"
                  name="Pasaporte"
                  label="Pasaporte"
                  placeholder="AE1234"
                  value={cliente.Pasaporte}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="email"
                  name="Correo"
                  label="Correo Electronico"
                  placeholder="name@example.com"
                  required
                  value={cliente.Correo}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="tel"
                  name="Telefono"
                  label="Telefono"
                  placeholder="12345678"
                  maxLength={20}
                  required
                  value={cliente.Telefono}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="date"
                  name="FechaNacimiento"
                  label="Fecha Nacimiento"
                  required
                  value={cliente.FechaNacimiento}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormSelect
                  label="Pais"
                  name="ID_Pais"
                  required
                  value={cliente.ID_Pais}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Pais
                  </option>
                  {paises.map((p) => (
                    <option key={p.ID_Pais} value={p.ID_Pais}>
                      {p.Nombre_Pais}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormSelect
                  label="Sexo"
                  name="Sexo"
                  required
                  value={cliente.Sexo}
                  onChange={handleChange}
                >
                  <option value={1}>Masculino</option>
                  <option value={2}>Femenino</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <div className="d-flex justify-content-between align-items-center gap-2 mt-4 pt-3 border-top">
              <CButton
                color="secondary"
                variant="outline"
                type="button"
                onClick={() => navigate('/panel/clientes')}
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

export default FormClientes
