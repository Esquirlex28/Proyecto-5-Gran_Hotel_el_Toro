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

import { getTiposHabitacion, getComodidadesPorTipo } from '../../service/api'

const TipoHabitacion = () => {
  const navigate = useNavigate()
  const [tipos, setTipos] = useState([])
  const [tipoEliminar, setTipoEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(false)
  const [tipoComodidades, setTipoComodidades] = useState(null)
  const [comodidades, setComodidades] = useState([])

  useEffect(() => {
    getTiposHabitacion().then((res) => setTipos(Array.isArray(res) ? res : []))
  }, [])

  const verComodidades = (tipo) => {
    setTipoComodidades(tipo)
    setComodidades([])
    getComodidadesPorTipo(tipo.ID_Tipo_Habitacion).then((res) => setComodidades(Array.isArray(res) ? res : []))
  }

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
                <CTableDataCell className="text-center text-nowrap">
                  <CButton
                    color="info"
                    size="sm"
                    variant="outline"
                    className="me-2"
                    onClick={() => verComodidades(t)}
                  >
                    <CIcon icon={icon.cilStar} /> Comodidades
                  </CButton>
                  <CButton
                    color="primary"
                    size="sm"
                    variant="outline"
                    className="me-2"
                    disabled
                    onClick={() => navigate(`/panel/tipohabitacion/${t.ID_Tipo_Habitacion}/editar`)}
                  >
                    <CIcon icon={icon.cilReload} /> Modificar
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    variant="outline"
                    disabled
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
      <CModal
        size="lg"
        visible={tipoComodidades !== null}
        onClose={() => setTipoComodidades(null)}
        alignment="center"
        aria-labelledby="ModalComodidadesTipoLabel"
      >
        <CModalHeader>
          <CModalTitle id="ModalComodidadesTipoLabel">
            Comodidades de {tipoComodidades?.Nombre_Tipo}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable hover responsive align="middle" className="mb-0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Comodidad</CTableHeaderCell>
                <CTableHeaderCell>Observaciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {comodidades.map((c) => (
                <CTableRow key={c.ID_Tipo_Habitacion_Comodidad}>
                  <CTableDataCell>
                    <CIcon icon={icon.cilStar} className="me-2" />
                    <strong>{c.Nombre_Comodidad}</strong>
                  </CTableDataCell>
                  <CTableDataCell className="text-body-secondary">
                    {c.Observaciones || '—'}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          {comodidades.length === 0 && (
            <p className="text-body-secondary text-center mt-3 mb-0">
              Este tipo no tiene comodidades asignadas
            </p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" variant="outline" disabled>
            <CIcon icon={icon.cilPlus} /> Asignar Comodidad
          </CButton>
          <CButton color="secondary" onClick={() => setTipoComodidades(null)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default TipoHabitacion
