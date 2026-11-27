import React, { useState } from 'react'

import HotelTable from './HotelTable'
import HotelAvatar from './HotelAvatar'
import HotelButton from './HotelButton'
import HotelBadge from './HotelBadge'
import HotelSearch from './HotelSearch'
import HotelPagination from './HotelPagination'

import './hotel.scss'

const HotelReservationTable = ({
  reservaciones = [],
  onView,
  onEdit,
  onCancel,
  onCheckIn,
  onCheckOut,
  loading = false,
  pageSize = 10,
  showSearch = true,
  showPagination = true,
  className = '',
}) => {
  const [busqueda, setBusqueda] = useState('')
  const [pagina, setPagina] = useState(1)

  // FORMATO DE FECHAS

  const formatearFecha = (fecha) => {
    if (!fecha) return '—'

    const valor = String(fecha).slice(0, 10)
    const partes = valor.split('-')

    if (partes.length !== 3) return valor

    return `${partes[2]}/${partes[1]}/${partes[0]}`
  }

  // FORMATO DE MONEDA

  const formatearMoneda = (total) => {
    if (total === null || total === undefined || total === '') {
      return '—'
    }

    const cantidad = Number(total)

    if (!Number.isFinite(cantidad)) return '—'

    return new Intl.NumberFormat('es-HN', {
      style: 'currency',
      currency: 'HNL',
    }).format(cantidad)
  }

  // BUSCADOR DE RESERVACIONES

  const reservacionesFiltradas = reservaciones.filter(
    (reservacion) =>
      [
        reservacion.id,
        reservacion.codigo,
        reservacion.cliente,
        reservacion.habitacion,
        reservacion.fechaEntrada,
        reservacion.fechaSalida,
        reservacion.estado,
      ]
        .map((valor) => String(valor ?? ''))
        .join(' ')
        .toLowerCase()
        .includes(busqueda.trim().toLowerCase()),
  )

  // PAGINACION

  const limite = Math.max(
    1,
    Math.floor(Number(pageSize) || 10),
  )

  const totalPaginas = Math.max(
    1,
    Math.ceil(reservacionesFiltradas.length / limite),
  )

  const paginaActual = Math.min(pagina, totalPaginas)
  const inicio = (paginaActual - 1) * limite

  const reservacionesVisibles = showPagination
    ? reservacionesFiltradas.slice(inicio, inicio + limite)
    : reservacionesFiltradas

  // COLORES DE LOS ESTADOS

  const coloresEstado = {
    pendiente: 'warning',
    confirmada: 'primary',
    'check-in': 'success',
    'check-out': 'info',
    completada: 'success',
    cancelada: 'danger',
  }

  // COLUMNAS DE LA TABLA

  const columns = [
    {
      key: 'codigo',
      label: 'Reservación',
      render: (reservacion) => (
        <span className="hotel-reservation-code">
          {reservacion.codigo || reservacion.id}
        </span>
      ),
    },

    {
      key: 'cliente',
      label: 'Huésped',

      render: (reservacion) => (
        <div className="hotel-reservation-client">
          <HotelAvatar
            name={reservacion.cliente || ''}
            src={reservacion.fotografia}
            size="sm"
          />

          <span>
            {reservacion.cliente || '—'}
          </span>
        </div>
      ),
    },

    {
      key: 'habitacion',
      label: 'Habitación',

      render: (reservacion) =>
        reservacion.habitacion || '—',
    },

    {
      key: 'fechaEntrada',
      label: 'Entrada',

      render: (reservacion) =>
        formatearFecha(reservacion.fechaEntrada),
    },

    {
      key: 'fechaSalida',
      label: 'Salida',

      render: (reservacion) =>
        formatearFecha(reservacion.fechaSalida),
    },

    {
      key: 'total',
      label: 'Total',

      render: (reservacion) => (
        <span className="hotel-reservation-total">
          {formatearMoneda(reservacion.total)}
        </span>
      ),
    },

    {
      key: 'estado',
      label: 'Estado',

      render: (reservacion) => (
        <HotelBadge
          color={
            coloresEstado[
              String(reservacion.estado ?? '').toLowerCase()
            ] ?? 'secondary'
          }
        >
          {reservacion.estado || 'Sin estado'}
        </HotelBadge>
      ),
    },
  ]

  // ACCIONES DE LA RESERVACION

  if (
    onView ||
    onEdit ||
    onCancel ||
    onCheckIn ||
    onCheckOut
  ) {
    columns.push({
      key: 'acciones',
      label: 'Acciones',
      className: 'text-center',

      render: (reservacion) => {
        const estado = String(
          reservacion.estado ?? '',
        ).toLowerCase()

        return (
          <div className="hotel-reservation-actions">

            {onView && (
              <HotelButton
                color="secondary"
                variant="outline"
                size="sm"
                onClick={() => onView(reservacion)}
              >
                Ver
              </HotelButton>
            )}

            {onEdit &&
              ['pendiente', 'confirmada'].includes(estado) && (
                <HotelButton
                  color="primary"
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(reservacion)}
                >
                  Modificar
                </HotelButton>
              )}

            {onCheckIn && estado === 'confirmada' && (
              <HotelButton
                color="success"
                size="sm"
                onClick={() => onCheckIn(reservacion)}
              >
                Check-in
              </HotelButton>
            )}

            {onCheckOut && estado === 'check-in' && (
              <HotelButton
                color="info"
                size="sm"
                onClick={() => onCheckOut(reservacion)}
              >
                Check-out
              </HotelButton>
            )}

            {onCancel &&
              ['pendiente', 'confirmada'].includes(estado) && (
                <HotelButton
                  color="danger"
                  variant="outline"
                  size="sm"
                  onClick={() => onCancel(reservacion)}
                >
                  Cancelar
                </HotelButton>
              )}

          </div>
        )
      },
    })
  }

  return (
    <div className={`hotel-reservation-table ${className}`}>

      {/* BUSCADOR */}

      {showSearch && (
        <div className="mb-3">
          <HotelSearch
            value={busqueda}
            placeholder="Buscar reservación..."
            disabled={loading}
            onChange={(e) => {
              setBusqueda(e.target.value)
              setPagina(1)
            }}
            onClear={() => {
              setBusqueda('')
              setPagina(1)
            }}
          />
        </div>
      )}

      {/* TABLA */}

      <HotelTable
        columns={columns}
        data={reservacionesVisibles}
        rowKey="id"
        loading={loading}
        emptyMessage={
          busqueda.trim()
            ? 'No se encontraron reservaciones.'
            : 'No hay reservaciones registradas.'
        }
      />

      {/* PAGINACION */}

      {showPagination &&
        !loading &&
        reservacionesFiltradas.length > 0 && (
          <HotelPagination
            currentPage={paginaActual}
            totalItems={reservacionesFiltradas.length}
            pageSize={limite}
            onPageChange={setPagina}
          />
        )}

    </div>
  )
}

export default HotelReservationTable