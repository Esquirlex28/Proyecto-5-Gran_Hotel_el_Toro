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
  cilWindow,
} from '@coreui/icons'

import image from '../../assets/images/habitacion.jpg'

import { getHabitaciones } from '../../service/api'

import {
  HotelButton,
  HotelCard,
  HotelConfirm,
  HotelAlert,
  HotelPageHeader,
  HotelLoader,
  HotelBadge,
} from '../../components/hotel'

const coloresEstado = {
  Disponible: 'success',
  Ocupada: 'danger',
  Mantenimiento: 'warning',
  Reservada: 'info',
  Limpieza: 'info',
}

const DetallesHabitacion = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [modalEliminar, setModalEliminar] = useState(false)
  const [habitacion, setHabitacion] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // OBTENER INFORMACION DE LA HABITACION

  useEffect(() => {
    let activo = true

    setCargando(true)
    setError('')
    setHabitacion(null)

    getHabitaciones()
      .then((res) => {
        if (!activo) return

        const lista = Array.isArray(res) ? res : []

        const hab = lista.find(
          (h) => Number(h.ID_Habitacion) === Number(id),
        )

        if (!hab) {
          navigate('/panel/habitaciones')
          return
        }

        setHabitacion(hab)
      })

      .catch(() => {
        if (activo) {
          setError(
            'No fue posible obtener la información de la habitación.',
          )
        }
      })

      .finally(() => {
        if (activo) {
          setCargando(false)
        }
      })

    return () => {
      activo = false
    }
  }, [id, navigate])

  // ELIMINACION PENDIENTE DE IMPLEMENTACION

  const deleteHabitacion = (e) => {
    e?.preventDefault()

    setModalEliminar(false)
  }

  // INDICADOR DE CARGA

  if (cargando) {
    return (
      <HotelLoader
        message="Cargando información de la habitación..."
      />
    )
  }

  // ERROR DE CONEXION

  if (error) {
    return (
      <>
        <HotelAlert color="danger" title="Error">
          {error}
        </HotelAlert>

        <HotelButton
          color="secondary"
          variant="outline"
          icon={cilArrowLeft}
          onClick={() => navigate('/panel/habitaciones')}
        >
          Volver
        </HotelButton>
      </>
    )
  }

  if (!habitacion) return null

  return (
    <>

      {/* IMAGEN PRINCIPAL DE LA HABITACION */}

      <div
        className="position-relative overflow-hidden rounded-3 shadow mb-4"
        style={{ height: '22rem' }}
      >

        <img
          src={image}
          alt={`Habitación ${habitacion.Numero_Habitacion}`}
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
          Gestión de la habitación #{habitacion.Numero_Habitacion}
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
              disabled
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
              disabled
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

          {/* ESTADO */}

          <CListGroupItem className="d-flex justify-content-between align-items-center px-0 py-3">
            <span>
              <CIcon
                icon={cilTags}
                className="me-2 text-body-secondary"
              />
              Estado
            </span>

            <HotelBadge
              color={
                coloresEstado[habitacion.Nombre_Estado]
                ?? 'secondary'
              }
            >
              {habitacion.Nombre_Estado}
            </HotelBadge>
          </CListGroupItem>

          {/* TIPO DE HABITACION */}

          <CListGroupItem className="d-flex justify-content-between align-items-center px-0 py-3">
            <span>
              <CIcon
                icon={cilTags}
                className="me-2 text-body-secondary"
              />
              Tipo
            </span>

            <strong>
              {habitacion.Nombre_Tipo}
            </strong>
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

            <strong>
              {habitacion.Capacidad_Maxima}
            </strong>
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

            <strong>
              {habitacion.Tarifa_Base}
            </strong>
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

            <strong>
              {habitacion.Nombre_Piso}
            </strong>
          </CListGroupItem>

          {/* VISTA */}

          <CListGroupItem className="d-flex justify-content-between align-items-center px-0 py-3">
            <span>
              <CIcon
                icon={cilWindow}
                className="me-2 text-body-secondary"
              />
              Vistas
            </span>

            <strong>
              {habitacion.Tipo_Vista}
            </strong>
          </CListGroupItem>

        </CListGroup>

      </HotelCard>

      {/* VENTANA DE CONFIRMACION */}

      <HotelConfirm
        visible={modalEliminar}
        onClose={() => setModalEliminar(false)}
        onConfirm={deleteHabitacion}
        title="Eliminar habitación"
        message={`¿Seguro que deseas eliminar la habitación #${habitacion.Numero_Habitacion}?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        color="danger"
        icon={cilTrash}
        confirmIcon={cilTrash}
      >
        Esta operación todavía no está habilitada.
      </HotelConfirm>

    </>
  )
}

export default DetallesHabitacion