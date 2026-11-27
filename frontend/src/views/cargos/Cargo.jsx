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
import { getCargos } from '../../service/api'

const CargoHabitacion = () => {
  const navigate = useNavigate()
  const [cargos, setCargos] = useState([
    {Nombre_Cargo: '', Descripcion: '', Salario_Base: 0.00}
  ])
  const [cargoEliminar, setcargoEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(false)

  useEffect(()=>{

    getCargos()
    .then(res=>{
      if(res.ok) {
        setCargos(res.datos)
      }
      return
    })

  },[])

  const deletecargo = () => {
    console.log('Mandando peticion de eliminacion', cargoEliminar)
    // Comando para eliminar el cargo
    setMensaje(true)
    setTimeout(() => setMensaje(false), 2000)
  }

  return (
    <>
      {mensaje && (
        <CAlert color="danger" className="text-center shadow-sm">
          ¡Cargo de habitacion eliminado con exito!
        </CAlert>
      )}
      <h1>CRUD de los Cargos de Empleados</h1>
      <CContainer className="mb-4">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <p className="mb-0 flex-grow-1">
            Aquí encontrarás todos los cargos de los Empleados existentes para poder gestionarlos
          </p>
          <CButton
            color="primary"
            variant="outline"
            className="flex-shrink-0"
            onClick={() => navigate('/panel/cargos/form')}
          >
            <CIcon icon={icon.cilPlus} /> Crear Cargo de Empleado
          </CButton>
        </div>
      </CContainer>
      <hr />
      <div className="bg-body rounded-3 shadow-sm p-3 mb-4">
        <CTable hover responsive align="middle" className="mb-0">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nombre Cargo</CTableHeaderCell>
              <CTableHeaderCell>Descripcion</CTableHeaderCell>
              <CTableHeaderCell>Salario</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {cargos.map((c) => (
              <CTableRow key={c.ID_Cargo}>
                <CTableDataCell>{c.ID_Cargo}</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={icon.cilTags} className="me-2" />
                  <strong>{c.Nombre_Cargo}</strong>
                </CTableDataCell>
                <CTableDataCell>
                  {c.Descripcion}
                </CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={icon.cilDollar} className="me-2" />
                  L {Number(c.Salario_Base).toFixed(2)}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    color="primary"
                    size="sm"
                    variant="outline"
                    className="me-2"
                    disabled
                    onClick={() => navigate(`/panel/cargos/${c.ID_Cargo}/editar`)}
                  >
                    <CIcon icon={icon.cilReload} /> Modificar
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    variant="outline"
                    disabled
                    onClick={() => setcargoEliminar(c)}
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
        visible={cargoEliminar !== null}
        onClose={() => setcargoEliminar(null)}
        alignment="center"
        aria-labelledby="ModalEliminarcargoLabel"
      >
        <CModalHeader>
          <CModalTitle id="ModalEliminarcargoLabel">Eliminar cargo de habitación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Seguro que deseas eliminar el cargo <strong>{cargoEliminar?.Nombre_Cargo}</strong>? Esta
          acción no se puede deshacer.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setcargoEliminar(null)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={deletecargo}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default CargoHabitacion
