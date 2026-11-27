import React, { useState } from 'react'

import HotelTable from './HotelTable'
import HotelButton from './HotelButton'
import HotelBadge from './HotelBadge'
import HotelSearch from './HotelSearch'
import HotelPagination from './HotelPagination'

import './hotel.scss'

const HotelPaymentTable = ({
  pagos = [],
  onView,
  onReceipt,
  onRefund,
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

  const formatearMoneda = (monto) => {
    if (monto === null || monto === undefined || monto === '') {
      return '—'
    }

    const cantidad = Number(monto)

    if (!Number.isFinite(cantidad)) return '—'

    return new Intl.NumberFormat('es-HN', {
      style: 'currency',
      currency: 'HNL',
    }).format(cantidad)
  }

  // BUSCADOR DE PAGOS

  const pagosFiltrados = pagos.filter((pago) =>
    [
      pago.id,
      pago.codigo,
      pago.reservacion,
      pago.cliente,
      pago.fecha,
      pago.metodoPago,
      pago.monto,
      pago.referencia,
      pago.estado,
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
    Math.ceil(pagosFiltrados.length / limite),
  )

  const paginaActual = Math.min(pagina, totalPaginas)
  const inicio = (paginaActual - 1) * limite

  const pagosVisibles = showPagination
    ? pagosFiltrados.slice(inicio, inicio + limite)
    : pagosFiltrados

  // COLORES DE LOS ESTADOS

  const coloresEstado = {
    pagado: 'success',
    completado: 'success',
    pendiente: 'warning',
    rechazado: 'danger',
    anulado: 'danger',
    reembolsado: 'info',
  }

  // COLUMNAS DE LA TABLA

  const columns = [
    {
      key: 'codigo',
      label: 'Código de pago',

      render: (pago) => (
        <span className="hotel-payment-code">
          {pago.codigo || pago.id}
        </span>
      ),
    },

    {
      key: 'reservacion',
      label: 'Reservación',

      render: (pago) =>
        pago.reservacion || '—',
    },

    {
      key: 'cliente',
      label: 'Cliente',

      render: (pago) =>
        pago.cliente || '—',
    },

    {
      key: 'fecha',
      label: 'Fecha',

      render: (pago) =>
        formatearFecha(pago.fecha),
    },

    {
      key: 'metodoPago',
      label: 'Método de pago',

      render: (pago) => (
        <span className="hotel-payment-method">
          {pago.metodoPago || '—'}
        </span>
      ),
    },

    {
      key: 'referencia',
      label: 'Referencia',

      render: (pago) =>
        pago.referencia || '—',
    },

    {
      key: 'monto',
      label: 'Monto',

      render: (pago) => (
        <span className="hotel-payment-amount">
          {formatearMoneda(pago.monto)}
        </span>
      ),
    },

    {
      key: 'estado',
      label: 'Estado',

      render: (pago) => (
        <HotelBadge
          color={
            coloresEstado[
              String(pago.estado ?? '').toLowerCase()
            ] ?? 'secondary'
          }
        >
          {pago.estado || 'Sin estado'}
        </HotelBadge>
      ),
    },
  ]

  // ACCIONES OPCIONALES

  if (onView || onReceipt || onRefund) {
    columns.push({
      key: 'acciones',
      label: 'Acciones',
      className: 'text-center',

      render: (pago) => {
        const estado = String(
          pago.estado ?? '',
        ).toLowerCase()

        const pagoCompletado = [
          'pagado',
          'completado',
        ].includes(estado)

        return (
          <div className="hotel-payment-actions">

            {onView && (
              <HotelButton
                color="secondary"
                variant="outline"
                size="sm"
                onClick={() => onView(pago)}
              >
                Ver
              </HotelButton>
            )}

            {onReceipt && pagoCompletado && (
              <HotelButton
                color="primary"
                variant="outline"
                size="sm"
                onClick={() => onReceipt(pago)}
              >
                Comprobante
              </HotelButton>
            )}

            {onRefund && pagoCompletado && (
              <HotelButton
                color="danger"
                variant="outline"
                size="sm"
                onClick={() => onRefund(pago)}
              >
                Reembolsar
              </HotelButton>
            )}

          </div>
        )
      },
    })
  }

  return (
    <div className={`hotel-payment-table ${className}`}>

      {/* BUSCADOR */}

      {showSearch && (
        <div className="mb-3">
          <HotelSearch
            value={busqueda}
            placeholder="Buscar pago..."
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

      {/* TABLA DE PAGOS */}

      <HotelTable
        columns={columns}
        data={pagosVisibles}
        rowKey="id"
        loading={loading}
        emptyMessage={
          busqueda.trim()
            ? 'No se encontraron pagos.'
            : 'No hay pagos registrados.'
        }
      />

      {/* PAGINACION */}

      {showPagination &&
        !loading &&
        pagosFiltrados.length > 0 && (
          <HotelPagination
            currentPage={paginaActual}
            totalItems={pagosFiltrados.length}
            pageSize={limite}
            onPageChange={setPagina}
          />
        )}

    </div>
  )
}

export default HotelPaymentTable