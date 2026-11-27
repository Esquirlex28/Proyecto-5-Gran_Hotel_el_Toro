import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CContainer,
  CButton,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { getEmpleados } from '../../service/api'

const nombreCompleto = (c) =>
  `${c.Primer_Nombre} ${c.Segundo_Nombre} ${c.Primer_Apellido} ${c.Segundo_Apellido}`

const iniciales = (c) => `${c.Primer_Nombre[0] ?? ''}${c.Primer_Apellido[0] ?? ''}`.toUpperCase()

const formatearFecha = (fecha) => {
  if (!fecha) return '-'
  return new Date(fecha).toLocaleDateString('es-HN', { timeZone: 'UTC' })
}

const textoSexo = (sexo) => (Number(sexo) === 1 ? 'Masculino' : Number(sexo) === 2 ? 'Femenino' : 'Otro')

const Empleados = () => {
  const navigate = useNavigate()
  const [empleados, setEmpleados] = useState([])
  const [empleadoEliminar, setEmpleadoEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(false)

  useEffect(() => {
    getEmpleados()
      .then((res) => {
        if (res.ok) {
          setEmpleados(res.datos)
        }
      })
      .catch((e) => console.error(e))
  }, [])

  const deleteEmpleado = () => {
    console.log('Mandando peticion de eliminacion', empleadoEliminar)
    // Peticion para eliminar el Empleado
    setEmpleadoEliminar(null)
    setMensaje(true)
    setTimeout(() => setMensaje(false), 2000)
  }

  return (
    <>
      {mensaje && (
        <CAlert color="danger" className="text-center shadow-sm">
          ¡Empleado eliminado con exito!
        </CAlert>
      )}
      <h1>Gestion de los Empleados</h1>
      <CContainer className="mb-4">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <p className="mb-0 flex-grow-1">
            Aquí encontrarás todos los Empleados del sistema para poder gestionarlos
          </p>
          <CButton
            color="primary"
            variant="outline"
            className="flex-shrink-0"
            onClick={() => navigate('/panel/empleados/form')}
          >
            <CIcon icon={icon.cilPlus} /> Crear Empleado
          </CButton>
        </div>
      </CContainer>
      <hr />

      {empleados.length === 0 && (
        <p className="text-center text-body-secondary">No hay Empleados registrados</p>
      )}

      {empleados.map((e) => (
        <CCard key={e.ID_Empleado} className="shadow-sm mb-3">
          <CCardBody>
            <CRow className="align-items-center g-3">
              <CCol xs="auto">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-5"
                  style={{ width: 64, height: 64 }}
                >
                  {iniciales(e)}
                </div>
              </CCol>

              <CCol md={3}>
                <h5 className="mb-1">{nombreCompleto(e)}</h5>
                <div className="text-body-secondary small">
                  <CIcon icon={icon.cilAddressBook} className="me-1" />
                  {`DNI: ${e.DNI}`}
                </div>
                <CBadge color="info" className="mt-2">
                  {textoSexo(e.Sexo)}
                </CBadge>
              </CCol>

              <CCol md>
                <div className="mb-1">
                  <CIcon icon={icon.cilEnvelopeClosed} className="me-2" />
                  {e.Correo}
                </div>
                <div className="mb-1">
                  <CIcon icon={icon.cilPhone} className="me-2" />
                  {e.Telefono}
                </div>
              </CCol>

              <CCol md={3}>
                <div className="mb-1">
                  <CIcon icon={icon.cilFlagAlt} className="me-2" />
                  {e.Nombre_Cargo} <span className="text-body-secondary">({e.Usuario ? e.Usuario : 'Sin Usuario'})</span>
                </div>
                <div className="mb-1">
                  <CIcon icon={icon.cilDollar} className="me-2" />
                  {e.Salario}
                </div>
                <div className="mb-1">
                  <CIcon icon={icon.cilCalendar} className="me-2" />
                  {formatearFecha(e.FechaNacimiento)}
                </div>
              </CCol>

              <CCol xs={12} lg="auto" className="text-lg-end text-nowrap">
                <CButton
                  color="primary"
                  size="sm"
                  variant="outline"
                  className="me-2"
                  disabled
                  onClick={() => navigate(`/panel/empleados/${e.ID_Empleado}/editar`)}
                >
                  <CIcon icon={icon.cilReload} /> Modificar
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  variant="outline"
                  disabled
                  onClick={() => setEmpleadoEliminar(e)}
                >
                  <CIcon icon={icon.cilDelete} /> Eliminar
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      ))}

      <CModal
        visible={empleadoEliminar !== null}
        onClose={() => setEmpleadoEliminar(null)}
        aria-labelledby="ModalEliminarEmpleadoLabel"
      >
        <CModalHeader>
          <CModalTitle id="ModalEliminarEmpleadoLabel">Eliminar Empleado</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Seguro que deseas eliminar al Empleado{' '}
          <strong>{empleadoEliminar && nombreCompleto(empleadoEliminar)}</strong>? Esta acción no se
          puede deshacer.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEmpleadoEliminar(null)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={deleteEmpleado}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Empleados
