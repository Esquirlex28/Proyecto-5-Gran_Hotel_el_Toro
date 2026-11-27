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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { getEstadosHabitacion } from '../../service/api'

const EstadosHabitacion = () => {
  const navigate = useNavigate()
  const [estados, setEstados] = useState([])

  useEffect(() => {
    getEstadosHabitacion().then((res) => setEstados(Array.isArray(res) ? res : []))
  }, [])

  return (
    <>
      <h1>CRUD de los Estados de Habitacion</h1>
      <CContainer className="mb-4">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <p className="mb-0 flex-grow-1">
            Aquí encontrarás todos los estados de habitacion para poder gestionarlos
          </p>
          <CButton
            color="primary"
            variant="outline"
            className="flex-shrink-0"
            onClick={() => navigate('/panel/estadoshabitacion/form')}
          >
            <CIcon icon={icon.cilPlus} /> Crear Estado
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
              <CTableHeaderCell>Observaciones</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {estados.map((e) => (
              <CTableRow key={e.ID_Estado_Habitacion}>
                <CTableDataCell>{e.ID_Estado_Habitacion}</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={icon.cilFlagAlt} className="me-2" />
                  <strong>{e.Nombre_Estado}</strong>
                </CTableDataCell>
                <CTableDataCell className="text-body-secondary">
                  {e.Observaciones || '—'}
                </CTableDataCell>
                <CTableDataCell className="text-center text-nowrap">
                  <CButton color="primary" size="sm" variant="outline" className="me-2" disabled>
                    <CIcon icon={icon.cilReload} /> Modificar
                  </CButton>
                  <CButton color="danger" size="sm" variant="outline" disabled>
                    <CIcon icon={icon.cilDelete} /> Eliminar
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default EstadosHabitacion
