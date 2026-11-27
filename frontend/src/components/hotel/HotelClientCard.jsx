import React from 'react'

import HotelCard from './HotelCard'
import HotelAvatar from './HotelAvatar'
import HotelBadge from './HotelBadge'
import HotelButton from './HotelButton'

import './hotel.scss'

const HotelClientCard = ({
  cliente = {},
  onView,
  onEdit,
  onDelete,
  showIdentity = true,
  className = '',
}) => {
  const {
    id,
    nombre,
    apellido,
    fotografia,
    identidad,
    correo,
    telefono,
    nacionalidad,
    direccion,
    fechaRegistro,
    estado,
    totalReservaciones,
  } = cliente

  // NOMBRE COMPLETO

  const nombreCompleto = [
    nombre,
    apellido,
  ].filter(Boolean).join(' ') || 'Cliente'

  // COLORES DE LOS ESTADOS

  const coloresEstado = {
    activo: 'success',
    inactivo: 'secondary',
    bloqueado: 'danger',
    pendiente: 'warning',
  }

  const estadoActual = String(
    estado ?? '',
  ).trim().toLowerCase()

  // FORMATO DE FECHAS

  const formatearFecha = (fecha) => {
    if (!fecha) return '—'

    const valor = String(fecha).slice(0, 10)
    const partes = valor.split('-')

    if (partes.length !== 3) return valor

    return `${partes[2]}/${partes[1]}/${partes[0]}`
  }

  return (
    <HotelCard
      className={`hotel-client-card ${className}`}
      hoverable
    >

      {/* ENCABEZADO DEL CLIENTE */}

      <div className="hotel-client-card-header">

        <HotelAvatar
          name={nombreCompleto}
          src={fotografia}
          size="xl"
          color="primary"
        />

        <h5 className="hotel-client-card-name">
          {nombreCompleto}
        </h5>

        {id != null && (
          <span className="hotel-client-card-id">
            Cliente #{id}
          </span>
        )}

        <HotelBadge
          color={
            coloresEstado[estadoActual] || 'secondary'
          }
        >
          {estado || 'Sin estado'}
        </HotelBadge>

      </div>

      {/* INFORMACION PERSONAL */}

      <div className="hotel-client-card-information">

        {showIdentity && (
          <div className="hotel-client-card-field">
            <span>Identidad</span>
            <strong>{identidad || '—'}</strong>
          </div>
        )}

        <div className="hotel-client-card-field">
          <span>Correo electrónico</span>
          <strong>{correo || '—'}</strong>
        </div>

        <div className="hotel-client-card-field">
          <span>Teléfono</span>
          <strong>{telefono || '—'}</strong>
        </div>

        {nacionalidad && (
          <div className="hotel-client-card-field">
            <span>Nacionalidad</span>
            <strong>{nacionalidad}</strong>
          </div>
        )}

        {direccion && (
          <div className="hotel-client-card-field">
            <span>Dirección</span>
            <strong>{direccion}</strong>
          </div>
        )}

        {fechaRegistro && (
          <div className="hotel-client-card-field">
            <span>Fecha de registro</span>

            <strong>
              {formatearFecha(fechaRegistro)}
            </strong>
          </div>
        )}

      </div>

      {/* TOTAL DE RESERVACIONES */}

      {totalReservaciones != null && (
        <div className="hotel-client-card-reservations">

          <span>Total de reservaciones</span>

          <strong>{totalReservaciones}</strong>

        </div>
      )}

      {/* ACCIONES OPCIONALES */}

      {(onView || onEdit || onDelete) && (
        <div className="hotel-client-card-actions">

          {onView && (
            <HotelButton
              color="secondary"
              variant="outline"
              onClick={() => onView(cliente)}
            >
              Ver perfil
            </HotelButton>
          )}

          {onEdit && (
            <HotelButton
              color="primary"
              variant="outline"
              onClick={() => onEdit(cliente)}
            >
              Modificar
            </HotelButton>
          )}

          {onDelete && (
            <HotelButton
              color="danger"
              variant="outline"
              onClick={() => onDelete(cliente)}
            >
              Eliminar
            </HotelButton>
          )}

        </div>
      )}

    </HotelCard>
  )
}

export default HotelClientCard