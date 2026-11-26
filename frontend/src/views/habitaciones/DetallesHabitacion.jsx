import { useParams, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CContainer,
  CRow,
  CCol,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert
} from '@coreui/react'

import image from '../../assets/images/habitacion.jpg'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const DetallesHabitacion = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [modalEliminar, setModalEliminar] = useState(false)
  const [mensaje, setMensaje] = useState(false)

  useEffect(() => {
    if (!mensaje) return
    const t = setTimeout(() => navigate(`/panel/habitaciones/${id}`), 2000)
    return () => clearTimeout(t)
  }, [mensaje])

  const deleteHabitacion = (e) => {
    e.preventDefault()
    console.log('Mandando peticion de eliminacion')
    setMensaje(true)
    setModalEliminar(false)
    setTimeout(() => navigate(`/panel/habitaciones`), 2000)
  }

  return (
    <>
      {mensaje && (
        <CAlert color="danger" className="mt-3 text-center shadow">
          ¡Habitacion eliminada con exito!
        </CAlert>
      )}
      <div
        className="position-relative overflow-hidden rounded-3 shadow-lg mb-4"
        style={{ height: '50vh' }}
      >
        <img
          src={image}
          alt={`Habitacion`}
          className="position-absolute top-0 w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
        <h1 className="position-absolute bottom-0 start-0 ms-4 mb-4 text-white">
          Gestion de la Habitacion #{}
        </h1>

        <CButton
          color="ligth"
          className="position-absolute top-0 start-0 m-2 bg-white bg-opacity-50 text-black"
          onClick={() => navigate('/panel/habitaciones')}
        >
          <span>
            <CIcon icon={icon.cilArrowLeft} /> Volver
          </span>
        </CButton>
      </div>
      <CContainer className="mb-4">
        <CRow className="justify-items-center align-items-center text-center">
          <CCol className="d-flex justify-content-center align-items-center">
            <h2>Acciones</h2>
          </CCol>
          <CCol className="d-flex justify-content-center align-items-center">
            <CButton
              color="primary"
              className="top-0 start-0 text-primary bg-transparent border-2"
              onClick={() => navigate(`/panel/habitaciones/${id}/editar`)}
            >
              <span>
                <CIcon icon={icon.cilReload} /> Modificar
              </span>
            </CButton>
          </CCol>
          <CCol className="d-flex justify-content-center align-items-center">
            <CButton
              color="danger"
              className="top-0 start-0 text-danger bg-transparent border-2"
              onClick={() => setModalEliminar(true)}
            >
              <span>
                <CIcon icon={icon.cilDelete} /> Eliminar
              </span>
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
      <h2>Detalles de la Habitacion</h2>
      <hr />
      <CListGroup style={{ height: '25vh' }}>
        <CListGroupItem className="d-flex justify-content-between mb-3">
          <span>
            <CIcon icon={icon.cilTags} className="mx-2" /> Tipo
          </span>
          <strong>{}</strong>
        </CListGroupItem>
        <CListGroupItem className="d-flex justify-content-between mb-3">
          <span>
            <CIcon icon={icon.cilPeople} className="mx-2" /> Capacidad
          </span>
          <strong>{}</strong>
        </CListGroupItem>
        <CListGroupItem className="d-flex justify-content-between mb-3">
          <span>
            <CIcon icon={icon.cilDollar} className="mx-2" /> Tarifa
          </span>
          <strong>{}</strong>
        </CListGroupItem>
        <CListGroupItem className="d-flex justify-content-between mb-3">
          <span>
            <CIcon icon={icon.cilBuilding} className="mx-2" /> Piso
          </span>
          <strong>{}</strong>
        </CListGroupItem>
      </CListGroup>
      <CModal
        visible={modalEliminar}
        onClose={() => setModalEliminar(false)}
        alignment="center"
        aria-labelledby="ModalEliminarLabel"
      >
        <CModalHeader>
          <CModalTitle id="ModalEliminarLabel">Eliminar habitación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Seguro que deseas eliminar la habitación <strong>#{}</strong>? Esta acción no se
          puede deshacer.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalEliminar(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" className="text-white" onClick={deleteHabitacion}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DetallesHabitacion
