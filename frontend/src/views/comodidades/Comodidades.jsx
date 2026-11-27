import React, { useEffect, useState } from 'react'
import {
  CContainer,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { getComodidades } from '../../service/api'

const Comodidades = () => {
  const [comodidades, setComodidades] = useState([])

  useEffect(() => {
    getComodidades().then((res) => setComodidades(Array.isArray(res) ? res : []))
  }, [])

  return (
    <>
      <h1>CRUD de las Comodidades</h1>
      <CContainer className="mb-4">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <p className="mb-0 flex-grow-1">
            Aquí encontrarás el catalogo de comodidades del hotel para poder gestionarlas
          </p>
          <CButton color="primary" variant="outline" className="flex-shrink-0" disabled>
            <CIcon icon={icon.cilPlus} /> Crear Comodidad
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
              <CTableHeaderCell>Estado</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {comodidades.map((c) => (
              <CTableRow key={c.ID_Comodidad}>
                <CTableDataCell>{c.ID_Comodidad}</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={icon.cilStar} className="me-2" />
                  <strong>{c.Nombre_Comodidad}</strong>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color={c.Estado === 1 ? 'success' : 'secondary'}>
                    {c.Estado === 1 ? 'Activa' : 'Inactiva'}
                  </CBadge>
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

export default Comodidades
