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
import { getClientes } from '../../service/api'

const nombreCompleto = (c) =>
  `${c.Primer_Nombre} ${c.Segundo_Nombre} ${c.Primer_Apellido} ${c.Segundo_Apellido}`

const iniciales = (c) => `${c.Primer_Nombre[0] ?? ''}${c.Primer_Apellido[0] ?? ''}`.toUpperCase()

const formatearFecha = (fecha) => {
  if (!fecha) return '-'
  return new Date(fecha).toLocaleDateString('es-HN', { timeZone: 'UTC' })
}

const textoSexo = (sexo) => (Number(sexo) === 1 ? 'Masculino' : Number(sexo) === 2 ? 'Femenino' : 'Otro')

const Clientes = () => {
  const navigate = useNavigate()
  const [clientes, setClientes] = useState([])
  const [clienteEliminar, setClienteEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(false)

  useEffect(() => {
    getClientes()
      .then((res) => {
        if (res.ok) {
          setClientes(res.datos)
        }
      })
      .catch((e) => console.error(e))
  }, [])

  const deleteCliente = () => {
    console.log('Mandando peticion de eliminacion', clienteEliminar)
    // Peticion para eliminar el cliente
    setClienteEliminar(null)
    setMensaje(true)
    setTimeout(() => setMensaje(false), 2000)
  }

  return (
    <>
      {mensaje && (
        <CAlert color="danger" className="text-center shadow-sm">
          ¡Cliente eliminado con exito!
        </CAlert>
      )}
      <h1>Gestion de los Clientes</h1>
      <CContainer className="mb-4">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <p className="mb-0 flex-grow-1">
            Aquí encontrarás todos los clientes del sistema para poder gestionarlos
          </p>
          <CButton
            color="primary"
            variant="outline"
            className="flex-shrink-0"
            onClick={() => navigate('/panel/clientes/form')}
          >
            <CIcon icon={icon.cilPlus} /> Crear Cliente
          </CButton>
        </div>
      </CContainer>
      <hr />

      {clientes.length === 0 && (
        <p className="text-center text-body-secondary">No hay clientes registrados</p>
      )}

      {clientes.map((c) => (
        <CCard key={c.ID_Huesped} className="shadow-sm mb-3">
          <CCardBody>
            <CRow className="align-items-center g-3">
              <CCol xs="auto">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-5"
                  style={{ width: 64, height: 64 }}
                >
                  {iniciales(c)}
                </div>
              </CCol>

              <CCol md={3}>
                <h5 className="mb-1">{nombreCompleto(c)}</h5>
                <div className="text-body-secondary small">
                  <CIcon icon={icon.cilAddressBook} className="me-1" />
                  {c.DNI ? `DNI: ${c.DNI}` : `Pasaporte: ${c.Pasaporte}`}
                </div>
                <CBadge color="info" className="mt-2">
                  {textoSexo(c.Sexo)}
                </CBadge>
              </CCol>

              <CCol md>
                <div className="mb-1">
                  <CIcon icon={icon.cilEnvelopeClosed} className="me-2" />
                  {c.Correo}
                </div>
                <div className="mb-1">
                  <CIcon icon={icon.cilPhone} className="me-2" />
                  {c.Telefono}
                </div>
              </CCol>

              <CCol md>
                <div className="mb-1">
                  <CIcon icon={icon.cilFlagAlt} className="me-2" />
                  {c.Nombre_Pais} <span className="text-body-secondary">({c.Nacionalidad})</span>
                </div>
                <div className="mb-1">
                  <CIcon icon={icon.cilCalendar} className="me-2" />
                  {formatearFecha(c.FechaNacimiento)}
                </div>
              </CCol>

              <CCol xs={12} lg="auto" className="text-lg-end text-nowrap">
                <CButton
                  color="primary"
                  size="sm"
                  variant="outline"
                  className="me-2"
                  disabled
                  onClick={() => navigate(`/panel/clientes/${c.ID_Huesped}/editar`)}
                >
                  <CIcon icon={icon.cilReload} /> Modificar
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  variant="outline"
                  disabled
                  onClick={() => setClienteEliminar(c)}
                >
                  <CIcon icon={icon.cilDelete} /> Eliminar
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      ))}

      <CModal
        visible={clienteEliminar !== null}
        onClose={() => setClienteEliminar(null)}
        aria-labelledby="ModalEliminarClienteLabel"
      >
        <CModalHeader>
          <CModalTitle id="ModalEliminarClienteLabel">Eliminar cliente</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Seguro que deseas eliminar al cliente{' '}
          <strong>{clienteEliminar && nombreCompleto(clienteEliminar)}</strong>? Esta acción no se
          puede deshacer.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setClienteEliminar(null)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={deleteCliente}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Clientes
