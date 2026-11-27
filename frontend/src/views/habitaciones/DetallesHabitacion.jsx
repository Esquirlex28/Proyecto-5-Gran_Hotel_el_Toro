import { useParams, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
} from '@coreui/react'

import image from '../../assets/images/habitacion.jpg'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { getHabitaciones } from '../../service/api'

const DetallesHabitacion = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [modalEliminar, setModalEliminar] = useState(false)
  const [mensaje, setMensaje] = useState(false)
  const [habitacion, setHabitacion] = useState([
      {ID_Habitacion:0, Numero_Habitacion: 0, Tipo_Vista: '', Nombre_Tipo: '', Capacidad_Maxima:0, Tarifa_Base:0, Nombre_Piso:'', Nombre_Estado: ''}
    ])
    useEffect(()=>{
  
      getHabitaciones()
      .then(res => {
          const hab = res.filter(h => Number(h.ID_Habitacion) == Number(id))
          setHabitacion(hab)
          console.log(hab)
      })
  
    },[]);

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
        <CAlert color="danger" className="text-center shadow-sm">
          ¡Habitacion eliminada con exito!
        </CAlert>
      )}
      <div
        className="position-relative overflow-hidden rounded-3 shadow mb-4"
        style={{ height: 'clamp(14rem, 45vh, 26rem)' }}
      >
        <img
          src={image}
          alt="Habitacion"
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        />
        {/* Degradado para que el titulo blanco sea legible sobre cualquier imagen */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,.65), rgba(0,0,0,0) 55%)' }}
        />
        <h1 className="position-absolute bottom-0 start-0 m-4 h2 text-white">
          Gestion de la Habitacion # {habitacion[0].Numero_Habitacion}
        </h1>

        <CButton
          color="light"
          size="sm"
          className="position-absolute top-0 start-0 m-3 shadow-sm"
          onClick={() => navigate('/panel/habitaciones')}
        >
          <CIcon icon={icon.cilArrowLeft} className="me-1" /> Volver
        </CButton>
      </div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
        <h2 className="h4 mb-0">Detalles de la Habitacion</h2>
        <div className="d-flex gap-2">
          <CButton
            color="primary"
            variant="outline"
            disabled
            onClick={() => navigate(`/panel/habitaciones/${id}/editar`)}
          >
            <CIcon icon={icon.cilPencil} className="me-1" /> Modificar
          </CButton>
          <CButton color="danger" variant="outline" disabled onClick={() => setModalEliminar(true)}>
            <CIcon icon={icon.cilTrash} className="me-1" /> Eliminar
          </CButton>
        </div>
      </div>
      <CListGroup className="shadow-sm mb-4">
        <CListGroupItem className="d-flex justify-content-between py-3">
          <span>
            <CIcon icon={icon.cilTags} className="me-2 text-body-secondary" /> Estado
          </span>
          <strong>{habitacion[0].Nombre_Estado}</strong>
        </CListGroupItem>
        <CListGroupItem className="d-flex justify-content-between py-3">
          <span>
            <CIcon icon={icon.cilTags} className="me-2 text-body-secondary" /> Tipo
          </span>
          <strong>{habitacion[0].Nombre_Tipo}</strong>
        </CListGroupItem>
        <CListGroupItem className="d-flex justify-content-between py-3">
          <span>
            <CIcon icon={icon.cilPeople} className="me-2 text-body-secondary" /> Capacidad
          </span>
          <strong>{habitacion[0].Capacidad_Maxima}</strong>
        </CListGroupItem>
        <CListGroupItem className="d-flex justify-content-between py-3">
          <span>
            <CIcon icon={icon.cilDollar} className="me-2 text-body-secondary" /> Tarifa
          </span>
          <strong>{habitacion[0].Tarifa_Base}</strong>
        </CListGroupItem>
        <CListGroupItem className="d-flex justify-content-between py-3">
          <span>
            <CIcon icon={icon.cilBuilding} className="me-2 text-body-secondary" /> Piso
          </span>
          <strong>{habitacion[0].Nombre_Piso}</strong>
        </CListGroupItem>
        <CListGroupItem className="d-flex justify-content-between py-3">
          <span>
            <CIcon icon={icon.cilWindow} className="me-2 text-body-secondary" /> Vistas
          </span>
          <strong>{habitacion[0].Tipo_Vista}</strong>
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
          ¿Seguro que deseas eliminar la habitación <strong>#{}</strong>? Esta acción no se puede
          deshacer.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalEliminar(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={deleteHabitacion}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DetallesHabitacion
