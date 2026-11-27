import React from 'react'

import HotelCard from './HotelCard'
import HotelBadge from './HotelBadge'
import HotelButton from './HotelButton'

import './hotel.scss'

const HotelReservationCard = ({
  reservacion = {},
  onView,
  onEdit,
  onCancel,
  onReceipt,
  className = '',
}) => {
  const {
    id,
    codigo,
    cliente,
    habitacion,
    tipoHabitacion,
    fechaEntrada,
    fechaSalida,
    huespedes,
    total,
    estado,
  } = reservacion

  // COLORES DE LOS ESTADOS

  const coloresEstado = {
    pendiente: 'warning',
    confirmada: 'primary',
    'check-in': 'success',
    'check-out': 'info',
    completada: 'success',
    cancelada: 'danger',
  }

  const estadoActual = String(
    estado ?? '',
  ).trim().toLowerCase()

  const puedeModificar = [
    'pendiente',
    'confirmada',
  ].includes(estadoActual)

  // FORMATO DE FECHAS

  const formatearFecha = (fecha) => {
    if (!fecha) return '—'

    const valor = String(fecha).slice(0, 10)
    const partes = valor.split('-')

    if (partes.length !== 3) return valor

    return `${partes[2]}/${partes[1]}/${partes[0]}`
  }

  // CALCULAR NOCHES

  const calcularNoches = () => {
    if (!fechaEntrada || !fechaSalida) return null

    const entrada = Date.parse(
      String(fechaEntrada).slice(0, 10),
    )

    const salida = Date.parse(
      String(fechaSalida).slice(0, 10),
    )

    const diferencia = Math.round(
      (salida - entrada) / 86400000,
    )

    return Number.isFinite(diferencia) &&
      diferencia > 0
      ? diferencia
      : null
  }

  const noches = calcularNoches()

  // FORMATO DEL TOTAL

  const totalValido =
    total !== null &&
    total !== undefined &&
    total !== '' &&
    Number.isFinite(Number(total))

  const totalFormateado = totalValido
    ? new Intl.NumberFormat('es-HN', {
        style: 'currency',
        currency: 'HNL',
      }).format(Number(total))
    : '—'

  return (
    <HotelCard
      className={`hotel-reservation-card ${className}`}
      hoverable
    >

      {/* ENCABEZADO */}

      <div className="hotel-reservation-card-header">

        <div>
          <div className="hotel-reservation-card-label">
            Reservación
          </div>

          <h5 className="hotel-reservation-card-code">
            {codigo || id || 'Sin código'}
          </h5>
        </div>

        <HotelBadge
          color={
            coloresEstado[estadoActual] || 'secondary'
          }
        >
          {estado || 'Sin estado'}
        </HotelBadge>

      </div>

      {/* INFORMACION DE LA HABITACION */}

      <div className="hotel-reservation-card-room">

        <h5>
          Habitación {habitacion || '—'}
        </h5>

        <div className="hotel-reservation-card-muted">
          {tipoHabitacion || 'Tipo no especificado'}
        </div>

        {cliente && (
          <div className="hotel-reservation-card-client">
            Huésped: {cliente}
          </div>
        )}

      </div>

      {/* FECHAS */}

      <div className="hotel-reservation-card-dates">

        <div className="hotel-reservation-date">
          <span>Check-in</span>

          <strong>
            {formatearFecha(fechaEntrada)}
          </strong>
        </div>

        <div className="hotel-reservation-date">
          <span>Check-out</span>

          <strong>
            {formatearFecha(fechaSalida)}
          </strong>
        </div>

      </div>

      {/* INFORMACION ADICIONAL */}

      <div className="hotel-reservation-card-details">

        {noches !== null && (
          <div>
            <span>Duración</span>

            <strong>
              {noches} {noches === 1 ? 'noche' : 'noches'}
            </strong>
          </div>
        )}

        {huespedes != null && (
          <div>
            <span>Huéspedes</span>

            <strong>{huespedes}</strong>
          </div>
        )}

      </div>

      {/* TOTAL */}

      <div className="hotel-reservation-card-total">

        <span>Total de la reservación</span>

        <strong>{totalFormateado}</strong>

      </div>

      {/* ACCIONES */}

      {(onView ||
        (onEdit && puedeModificar) ||
        (onCancel && puedeModificar) ||
        onReceipt) && (

        <div className="hotel-reservation-card-actions">

          {onView && (
            <HotelButton
              color="primary"
              variant="outline"
              onClick={() => onView(reservacion)}
            >
              Ver detalles
            </HotelButton>
          )}

          {onEdit && puedeModificar && (
            <HotelButton
              color="secondary"
              variant="outline"
              onClick={() => onEdit(reservacion)}
            >
              Modificar
            </HotelButton>
          )}

          {onReceipt && (
            <HotelButton
              color="primary"
              variant="outline"
              onClick={() => onReceipt(reservacion)}
            >
              Comprobante
            </HotelButton>
          )}

          {onCancel && puedeModificar && (
            <HotelButton
              color="danger"
              variant="outline"
              onClick={() => onCancel(reservacion)}
            >
              Cancelar
            </HotelButton>
          )}

        </div>
      )}

    </HotelCard>
  )
}

export default HotelReservationCard