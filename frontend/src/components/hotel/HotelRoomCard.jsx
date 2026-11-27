import React, { useState } from 'react'

import HotelCard from './HotelCard'
import HotelBadge from './HotelBadge'
import HotelButton from './HotelButton'

import './hotel.scss'

const HotelRoomCard = ({
  habitacion = {},
  onView,
  onReserve,
  onEdit,
  showPrice = true,
  className = '',
}) => {
  const [failedImage, setFailedImage] = useState(null)

  const {
    numero,
    nombre,
    tipo,
    descripcion,
    imagen,
    capacidad,
    precio,
    estado,
    servicios = [],
  } = habitacion

  // COLORES SEGUN EL ESTADO

  const coloresEstado = {
    disponible: 'success',
    ocupada: 'danger',
    reservada: 'warning',
    mantenimiento: 'secondary',
    limpieza: 'info',
  }

  const estadoActual = String(
    estado ?? '',
  ).trim().toLowerCase()

  const disponible = estadoActual === 'disponible'

  // FORMATO DEL PRECIO

  const precioValido =
    precio !== null &&
    precio !== undefined &&
    precio !== '' &&
    Number.isFinite(Number(precio))

  const precioFormateado = precioValido
    ? new Intl.NumberFormat('es-HN', {
        style: 'currency',
        currency: 'HNL',
      }).format(Number(precio))
    : '—'

  const mostrarImagen =
    imagen && failedImage !== imagen

  return (
    <HotelCard
      className={`hotel-room-card ${className}`}
      hoverable
    >

      {/* IMAGEN DE LA HABITACION */}

      <div className="hotel-room-image-container">

        {mostrarImagen ? (
          <img
            src={imagen}
            alt={nombre || `Habitación ${numero ?? ''}`}
            className="hotel-room-image"
            onError={() => setFailedImage(imagen)}
          />
        ) : (
          <div className="hotel-room-placeholder">
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 18v-7M3 14h18v7M3 18h18" />
              <path d="M7 14v-4h5v4M12 10h6a3 3 0 0 1 3 3v1" />
            </svg>

            <span>Sin fotografía</span>
          </div>
        )}

        <div className="hotel-room-status">
          <HotelBadge
            color={
              coloresEstado[estadoActual] || 'secondary'
            }
          >
            {estado || 'Sin estado'}
          </HotelBadge>
        </div>

      </div>

      {/* INFORMACION PRINCIPAL */}

      <div className="hotel-room-content">

        <div className="hotel-room-type">
          {tipo || 'Habitación'}
        </div>

        <h5 className="hotel-room-title">
          {nombre || `Habitación ${numero ?? ''}`}
        </h5>

        {numero != null && (
          <div className="hotel-room-number">
            Número: {numero}
          </div>
        )}

        {descripcion && (
          <p className="hotel-room-description">
            {descripcion}
          </p>
        )}

        {/* CAPACIDAD */}

        {capacidad != null && (
          <div className="hotel-room-capacity">
            Capacidad: {capacidad}{' '}
            {Number(capacidad) === 1
              ? 'huésped'
              : 'huéspedes'}
          </div>
        )}

        {/* SERVICIOS */}

        {Array.isArray(servicios) &&
          servicios.length > 0 && (
            <div className="hotel-room-services">
              {servicios.map((servicio, index) => (
                <HotelBadge
                  key={`${servicio}-${index}`}
                  color="secondary"
                >
                  {servicio}
                </HotelBadge>
              ))}
            </div>
          )}

        {/* PRECIO POR NOCHE */}

        {showPrice && (
          <div className="hotel-room-price-section">

            <span className="hotel-room-price">
              {precioFormateado}
            </span>

            <span className="hotel-room-price-label">
              / noche
            </span>

          </div>
        )}

        {/* BOTONES */}

        {(onView || onReserve || onEdit) && (
          <div className="hotel-room-actions">

            {onView && (
              <HotelButton
                color="secondary"
                variant="outline"
                onClick={() => onView(habitacion)}
              >
                Ver detalles
              </HotelButton>
            )}

            {onReserve && (
              <HotelButton
                color="primary"
                disabled={!disponible}
                onClick={() => onReserve(habitacion)}
              >
                Reservar
              </HotelButton>
            )}

            {onEdit && (
              <HotelButton
                color="primary"
                variant="outline"
                onClick={() => onEdit(habitacion)}
              >
                Modificar
              </HotelButton>
            )}

          </div>
        )}

      </div>

    </HotelCard>
  )
}

export default HotelRoomCard