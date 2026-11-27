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
import { getCargos, postEmpleados, postUsuarioEmpleado } from '../../service/api'

const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
  <CFormInput {...props} ref={inputRef} />
))

const FormEmpleados = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const esEdicion = id !== undefined

  const [mensaje, setMensaje] = useState(false)
  const [error, setError] = useState('')
  const [empleado, setEmpleado] = useState({
    ID_Cargo: '',
    Salario: '',
    DNI: '',
    Primer_Nombre: '',
    Segundo_Nombre: '',
    Primer_Apellido: '',
    Segundo_Apellido: '',
    Telefono: '',
    Correo: '',
    FechaNacimiento: '2000-01-01',
    Sexo: 1,
    Usuario: '',
    Password: '',
  })
  const [cargos, setCargos] = useState([])

  useEffect(() => {
    getCargos()
      .then((res) => {
        if (res.ok) {
          setCargos(res.datos)
        }
      })
      .catch((e) => console.error(e))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmpleado((prev) => ({ ...prev, [name]: value }))
  }

  // Al elegir un cargo, se sugiere su salario base como salario del empleado
  const handleCargoChange = (e) => {
    const { value } = e.target
    const cargo = cargos.find((c) => String(c.ID_Cargo) === value)
    setEmpleado((prev) => ({
      ...prev,
      ID_Cargo: value,
      Salario: cargo ? String(cargo.Salario_Base) : prev.Salario,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (empleado.DNI.length !== 13) {
      setError('El DNI debe tener 13 digitos')
      return
    }
    const { Usuario, Password, ...datosEmpleado } = empleado
    postEmpleados({
      ...datosEmpleado,
      ID_Cargo: Number(empleado.ID_Cargo),
      Salario: Number(empleado.Salario),
      Sexo: Number(empleado.Sexo),
    })
      .then((res) => {
        if (!res.ok) {
          setError(res.mensaje || 'No se pudo guardar el empleado')
          return
        }
        setMensaje(true)
        setTimeout(() => navigate('/panel/empleados'), 2000)
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
          ¡Empleado {esEdicion ? 'actualizado' : 'creado'} con exito!
        </CAlert>
      )}
      {error && (
        <CAlert color="danger" className="text-center shadow-sm">
          {error}
        </CAlert>
      )}
      <CCard className="shadow-sm mb-4">
        <CCardBody className="p-4">
          <h1 className="h3">{esEdicion ? 'Editar' : 'Crear'} Empleado</h1>
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
                  value={empleado.Primer_Nombre}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="text"
                  name="Segundo_Nombre"
                  label="Segundo Nombre"
                  placeholder="Luis"
                  value={empleado.Segundo_Nombre}
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
                  value={empleado.Primer_Apellido}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="text"
                  name="Segundo_Apellido"
                  label="Segundo Apellido"
                  placeholder="Gomez"
                  value={empleado.Segundo_Apellido}
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
                  required
                  value={empleado.DNI}
                  mask="0000-0000-00000"
                  unmask={true}
                  onAccept={(value) => setEmpleado((prev) => ({ ...prev, DNI: value }))}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormSelect
                  label="Cargo"
                  name="ID_Cargo"
                  required
                  value={empleado.ID_Cargo}
                  onChange={handleCargoChange}
                >
                  <option value="" disabled>
                    Seleccione un cargo
                  </option>
                  {cargos.map((c) => (
                    <option key={c.ID_Cargo} value={c.ID_Cargo}>
                      {c.Nombre_Cargo}
                    </option>
                  ))}
                </CFormSelect>
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
                  value={empleado.Correo}
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
                  value={empleado.Telefono}
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
                  value={empleado.FechaNacimiento}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="number"
                  name="Salario"
                  label="Salario"
                  placeholder="15000.00"
                  min="0.01"
                  step="0.01"
                  required
                  value={empleado.Salario}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormSelect
                  label="Sexo"
                  name="Sexo"
                  required
                  value={empleado.Sexo}
                  onChange={handleChange}
                >
                  <option value={1}>Masculino</option>
                  <option value={2}>Femenino</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <h2 className="h5 mt-2">Credenciales de acceso</h2>
            <hr className="mb-4" />
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="text"
                  name="Usuario"
                  label="Usuario"
                  placeholder="jmartinez"
                  autoComplete="off"
                  required
                  value={empleado.Usuario}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="password"
                  name="Password"
                  label="Contraseña"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  value={empleado.Password}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <div className="d-flex justify-content-between align-items-center gap-2 mt-4 pt-3 border-top">
              <CButton
                color="secondary"
                variant="outline"
                type="button"
                onClick={() => navigate('/panel/empleados')}
              >
                Cancelar
              </CButton>
              <CButton color="primary" type="submit">
                Guardar
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default FormEmpleados
