import React, { useEffect, useState } from 'react'
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

import { getPisos } from '../../service/api'

const Pisos = () => {
  const navigate = useNavigate()
  const [pisos, setPisos] = useState([])
  const [pisoEliminar, setPisoEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(false)

  useEffect(() => {
    getPisos().then((res) => setPisos(Array.isArray(res) ? res : []))
  }, [])

  const deletePiso = () => {
    console.log('Mandando peticion de eliminacion', pisoEliminar)
    setPisos((prev) => prev.filter((p) => p.ID_Piso !== pisoEliminar.ID_Piso))
    setPisoEliminar(null)
    setMensaje(true)
    setTimeout(() => setMensaje(false), 2000)
  }

  return (
    <>
      {mensaje && (
        <CAlert color="danger" className="text-center shadow-sm">
          ¡Piso eliminado con exito!
        </CAlert>
      )}
      <h1>CRUD de los Pisos</h1>
      <CContainer className="mb-4">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <p className="mb-0 flex-grow-1">
            Aquí encontrarás todos los pisos del hotel para poder gestionarlos
          </p>
          <CButton
            color="primary"
            variant="outline"
            className="flex-shrink-0"
            onClick={() => navigate('/panel/pisos/form')}
          >
            <CIcon icon={icon.cilPlus} /> Crear Piso
          </CButton>
        </div>
      </CContainer>
      <hr />
      <div className="bg-body rounded-3 shadow-sm p-3 mb-4">
        <CTable hover responsive align="middle" className="mb-0">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Codigo</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Capacidad de Habitaciones</CTableHeaderCell>
              <CTableHeaderCell>Observaciones</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {pisos.map((p) => (
              <CTableRow key={p.ID_Piso}>
                <CTableDataCell>{p.Codigo_Piso}</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={icon.cilBuilding} className="me-2" />
                  <strong>{p.Nombre_Piso}</strong>
                </CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={icon.cilBed} className="me-2" />
                  {p.Capacidad_Habitaciones}
                </CTableDataCell>
                <CTableDataCell className="text-body-secondary">
                  {p.Observaciones || '—'}
                </CTableDataCell>
                <CTableDataCell className="text-center text-nowrap">
                  <CButton
                    color="primary"
                    size="sm"
                    variant="outline"
                    className="me-2"
                    disabled
                    onClick={() => navigate(`/panel/pisos/${p.ID_Piso}/editar`)}
                  >
                    <CIcon icon={icon.cilReload} /> Modificar
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    variant="outline"
                    disabled
                    onClick={() => setPisoEliminar(p)}
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
        visible={pisoEliminar !== null}
        onClose={() => setPisoEliminar(null)}
        alignment="center"
        aria-labelledby="ModalEliminarPisoLabel"
      >
        <CModalHeader>
          <CModalTitle id="ModalEliminarPisoLabel">Eliminar piso</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Seguro que deseas eliminar el piso <strong>{pisoEliminar?.Nombre_Piso}</strong>? Esta
          acción no se puede deshacer.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setPisoEliminar(null)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={deletePiso}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Pisos
