import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CContainer,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const tiposPorDefecto = [
  { ID_Tipo_Habitacion: 1, Nombre_Tipo: 'Normal', Capacidad_Maxima: 2, Tarifa_Base: 850.0 },
  { ID_Tipo_Habitacion: 2, Nombre_Tipo: 'Doble', Capacidad_Maxima: 4, Tarifa_Base: 1200.0 },
  { ID_Tipo_Habitacion: 3, Nombre_Tipo: 'Business', Capacidad_Maxima: 2, Tarifa_Base: 1800.0 },
  { ID_Tipo_Habitacion: 4, Nombre_Tipo: 'Suite', Capacidad_Maxima: 4, Tarifa_Base: 3500.0 },
  {
    ID_Tipo_Habitacion: 5,
    Nombre_Tipo: 'Suite Presidencial',
    Capacidad_Maxima: 6,
    Tarifa_Base: 7500.0,
  },
]

const TipoHabitacion = () => {
  const navigate = useNavigate()
  const [tipos, setTipos] = useState(tiposPorDefecto)
  const [tipoEliminar, setTipoEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(false)

  const deleteTipo = () => {
    console.log('Mandando peticion de eliminacion', tipoEliminar)
    setTipos((prev) => prev.filter((t) => t.ID_Tipo_Habitacion !== tipoEliminar.ID_Tipo_Habitacion))
    setTipoEliminar(null)
    setMensaje(true)
    setTimeout(() => setMensaje(false), 2000)
  }

  return (
    <>
      {mensaje && (
        <CAlert color="danger" className="text-center shadow-sm">
          ¡Tipo de habitacion eliminado con exito!
        </CAlert>
      )}
      <h1>CRUD de los Tipos de Habitacion</h1>
      <CContainer className="mb-4">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <p className="mb-0 flex-grow-1">
            Aquí encontrarás todos los tipos de habitacion existentes para poder gestionarlos
          </p>
          <CButton
            color="primary"
            variant="outline"
            className="flex-shrink-0"
            onClick={() => navigate('/panel/tipohabitacion/form')}
          >
            <CIcon icon={icon.cilPlus} /> Crear Tipo de Habitacion
          </CButton>
        </div>
      </CContainer>
      <hr />
      <div className="bg-body rounded-3 shadow-sm p-3 mb-4">
        <CTable hover responsive align="middle" className="mb-0">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Capacidad Maxima</CTableHeaderCell>
              <CTableHeaderCell>Tarifa Base</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {tipos.map((t) => (
              <CTableRow key={t.ID_Tipo_Habitacion}>
                <CTableDataCell>{t.ID_Tipo_Habitacion}</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={icon.cilTags} className="me-2" />
                  <strong>{t.Nombre_Tipo}</strong>
                </CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={icon.cilPeople} className="me-2" />
                  {t.Capacidad_Maxima}
                </CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={icon.cilDollar} className="me-2" />
                  {Number(t.Tarifa_Base).toFixed(2)}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    color="primary"
                    size="sm"
                    variant="outline"
                    className="me-2"
                    onClick={() => navigate(`/panel/tipohabitacion/${t.ID_Tipo_Habitacion}/editar`)}
                  >
                    <CIcon icon={icon.cilReload} /> Modificar
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    variant="outline"
                    onClick={() => setTipoEliminar(t)}
                  >
                    <CIcon icon={icon.cilDelete} /> Eliminar
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
      <CModal
        visible={tipoEliminar !== null}
        onClose={() => setTipoEliminar(null)}
        alignment="center"
        aria-labelledby="ModalEliminarTipoLabel"
      >
        <CModalHeader>
          <CModalTitle id="ModalEliminarTipoLabel">Eliminar tipo de habitación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Seguro que deseas eliminar el tipo <strong>{tipoEliminar?.Nombre_Tipo}</strong>? Esta
          acción no se puede deshacer.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setTipoEliminar(null)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={deleteTipo}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default TipoHabitacion
