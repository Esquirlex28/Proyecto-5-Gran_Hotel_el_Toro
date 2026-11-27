import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CListGroup, CListGroupItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  cilArrowLeft,
  cilPencil,
  cilTrash,
  cilTags,
  cilPeople,
  cilDollar,
  cilBuilding,
} from '@coreui/icons'

import image from '../../assets/images/habitacion.jpg'

import {
  HotelButton,
  HotelCard,
  HotelConfirm,
  HotelAlert,
  HotelPageHeader,
} from '../../components/hotel'

const DetallesHabitacion = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [modalEliminar, setModalEliminar] = useState(false)
  const [mensaje, setMensaje] = useState(false)

  useEffect(() => {
    if (!mensaje) return

    const t = setTimeout(
      () => navigate('/panel/habitaciones'),
      2000,
    )

    return () => clearTimeout(t)
  }, [mensaje, navigate])

  const deleteHabitacion = (e) => {
    e?.preventDefault()

    console.log('Mandando peticion de eliminacion')

    setMensaje(true)
    setModalEliminar(false)
  }

  return (
    <>
      {/* MENSAJE DE ELIMINACION */}

      {mensaje && (
        <HotelAlert
          color="danger"
          title="Eliminación de prueba"
          className="mb-4"
        >
          Se ha simulado la eliminación de la habitación.
        </HotelAlert>
      )}

      {/* IMAGEN PRINCIPAL DE LA HABITACION */}

      <div
        className="position-relative overflow-hidden rounded-3 shadow mb-4"
        style={{ height: 'clamp(14rem, 45vh, 26rem)' }}
      >
        <img
          src={image}
          alt="Habitación"
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        />

        {/* DEGRADADO DE LA IMAGEN */}

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,.65), rgba(0,0,0,0) 55%)',
          }}
        />

        <h1 className="position-absolute bottom-0 start-0 m-4 h2 text-white">
          Gestión de la habitación
        </h1>

        {/* BOTON VOLVER */}

        <HotelButton
          color="light"
          size="sm"
          icon={cilArrowLeft}
          className="position-absolute top-0 start-0 m-3 shadow-sm"
          onClick={() => navigate('/panel/habitaciones')}
        >
          Volver
        </HotelButton>
      </div>

      {/* ENCABEZADO Y ACCIONES */}

      <HotelPageHeader
        title="Detalles de la habitación"
        description="Consulte y gestione la información de la habitación."
        actions={
          <div className="d-flex flex-wrap gap-2">

            <HotelButton
              color="primary"
              variant="outline"
              icon={cilPencil}
              disabled={mensaje}
              onClick={() =>
                navigate(`/panel/habitaciones/${id}/editar`)
              }
            >
              Modificar
            </HotelButton>

            <HotelButton
              color="danger"
              variant="outline"
              icon={cilTrash}
              disabled={mensaje}
              onClick={() => setModalEliminar(true)}
            >
              Eliminar
            </HotelButton>

          </div>
        }
      />

      {/* INFORMACION GENERAL */}

      <HotelCard
        title="Información general"
        subtitle="Características de la habitación"
        className="mb-4"
      >
        <CListGroup flush>

          {/* TIPO DE HABITACION */}

          <CListGroupItem className="d-flex justify-content-between align-items-center px-0 py-3">
            <span>
              <CIcon
                icon={cilTags}
                className="me-2 text-body-secondary"
              />
              Tipo
            </span>

            <strong>{}</strong>
          </CListGroupItem>

          {/* CAPACIDAD */}

          <CListGroupItem className="d-flex justify-content-between align-items-center px-0 py-3">
            <span>
              <CIcon
                icon={cilPeople}
                className="me-2 text-body-secondary"
              />
              Capacidad
            </span>

            <strong>{}</strong>
          </CListGroupItem>

          {/* TARIFA */}

          <CListGroupItem className="d-flex justify-content-between align-items-center px-0 py-3">
            <span>
              <CIcon
                icon={cilDollar}
                className="me-2 text-body-secondary"
              />
              Tarifa
            </span>

            <strong>{}</strong>
          </CListGroupItem>

          {/* PISO */}

          <CListGroupItem className="d-flex justify-content-between align-items-center px-0 py-3">
            <span>
              <CIcon
                icon={cilBuilding}
                className="me-2 text-body-secondary"
              />
              Piso
            </span>

            <strong>{}</strong>
          </CListGroupItem>

        </CListGroup>
      </HotelCard>

      {/* VENTANA DE CONFIRMACION */}

      <HotelConfirm
        visible={modalEliminar}
        onClose={() => setModalEliminar(false)}
        onConfirm={deleteHabitacion}
        title="Eliminar habitación"
        message="¿Seguro que deseas eliminar la habitación?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        color="danger"
        icon={cilTrash}
        confirmIcon={cilTrash}
      >
        Esta acción no se puede deshacer.
      </HotelConfirm>
    </>
  )
}

export default DetallesHabitacion