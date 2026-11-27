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
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { getPaises } from '../../service/api'

const Pisos = () => {
  const navigate = useNavigate()
  const [paises, setPaises] = useState([])
  const [paisEliminar, setPaisEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(false)

  useEffect(() => {
    getPaises().then((res) => {
      if (res.ok) {
        setPaises(res.datos)
      }
      return
    })
  }, [])

  const deletePiso = () => {
    console.log('Mandando peticion de eliminacion', paisEliminar)
    // Peticion para eliminar el pais
    setPaisEliminar(null)
    setMensaje(true)
    setTimeout(() => setMensaje(false), 2000)
  }

  return (
    <>
      {mensaje && (
        <CAlert color="danger" className="text-center shadow-sm">
          ¡Pais eliminado con exito!
        </CAlert>
      )}
      <h1>Gestion de los Paises</h1>
      <CContainer className="mb-4">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <p className="mb-0 flex-grow-1">
            Aquí encontrarás todos los paises del sistema para poder gestionarlos
          </p>
          <CButton
            color="primary"
            variant="outline"
            className="flex-shrink-0"
            onClick={() => navigate('/panel/paises/form')}
          >
            <CIcon icon={icon.cilPlus} /> Crear Pais
          </CButton>
        </div>
      </CContainer>
      <hr />
      <div className="bg-body rounded-3 shadow-sm p-3 mb-4">
        <CTable hover responsive align="middle" className="mb-0">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Nacionalidad</CTableHeaderCell>
              <CTableHeaderCell>Estado</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {paises.map((p) => (
              <CTableRow key={p.ID_Pais}>
                <CTableDataCell>
                  <strong>{p.Nombre_Pais}</strong>
                </CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={icon.cilCompass} className="me-2" />
                  {p.Nacionalidad}
                </CTableDataCell>
                <CTableDataCell className="text-body-secondary">
                  {p.Estado == 1 ? (
                    <CBadge color="success">Activo</CBadge>
                  ) : (
                    <CBadge color="danger">Inactivo</CBadge>
                  )}
                </CTableDataCell>
                <CTableDataCell className="text-center text-nowrap">
                  <CButton
                    color="primary"
                    size="sm"
                    variant="outline"
                    className="me-2"
                    disabled
                    onClick={() => navigate(`/panel/paises/${p.ID_Pais}/editar`)}
                  >
                    <CIcon icon={icon.cilReload} /> Modificar
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    variant="outline"
                    disabled
                    onClick={() => setPaisEliminar(p)}
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
        visible={paisEliminar !== null}
        onClose={() => setPaisEliminar(null)}
        alignment="center"
        aria-labelledby="ModalEliminarPisoLabel"
      >
        <CModalHeader>
          <CModalTitle id="ModalEliminarPisoLabel">Eliminar piso</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Seguro que deseas eliminar el pais <strong>{paisEliminar?.Nombre_Pais}</strong>? Esta
          acción no se puede deshacer.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setPaisEliminar(null)}>
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
