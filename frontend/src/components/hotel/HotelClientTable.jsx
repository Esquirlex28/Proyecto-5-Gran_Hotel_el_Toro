import React, { useState } from 'react'

import { cilPencil, cilTrash } from '@coreui/icons'

import HotelTable from './HotelTable'
import HotelAvatar from './HotelAvatar'
import HotelButton from './HotelButton'
import HotelBadge from './HotelBadge'
import HotelSearch from './HotelSearch'
import HotelPagination from './HotelPagination'

import './hotel.scss'

const HotelClientTable = ({
  clientes = [],
  onView,
  onEdit,
  onDelete,
  loading = false,
  pageSize = 10,
  showSearch = true,
  showPagination = true,
  className = '',
}) => {
  const [busqueda, setBusqueda] = useState('')
  const [pagina, setPagina] = useState(1)

  // BUSCADOR DE CLIENTES

  const clientesFiltrados = clientes.filter((cliente) =>
    [
      cliente.nombre,
      cliente.apellido,
      cliente.identidad,
      cliente.correo,
      cliente.telefono,
      cliente.estado,
    ]
      .map((valor) => String(valor ?? ''))
      .join(' ')
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase()),
  )

  // PAGINACION

  const limite = Math.max(1, Math.floor(Number(pageSize) || 10))

  const totalPaginas = Math.max(
    1,
    Math.ceil(clientesFiltrados.length / limite),
  )

  const paginaActual = Math.min(pagina, totalPaginas)

  const inicio = (paginaActual - 1) * limite

  const clientesVisibles = showPagination
    ? clientesFiltrados.slice(inicio, inicio + limite)
    : clientesFiltrados

  // COLORES DE LOS ESTADOS

  const coloresEstado = {
    activo: 'success',
    inactivo: 'secondary',
    bloqueado: 'danger',
    pendiente: 'warning',
  }

  // COLUMNAS DE LA TABLA

  const columns = [
    {
      key: 'id',
      label: '#',
    },

    {
      key: 'nombre',
      label: 'Cliente',
      render: (cliente) => (
        <div className="hotel-client-information">
          <HotelAvatar
            name={`${cliente.nombre ?? ''} ${cliente.apellido ?? ''}`}
            src={cliente.fotografia}
            size="md"
          />

          <div>
            <div className="hotel-client-name">
              {cliente.nombre} {cliente.apellido}
            </div>

            <div className="hotel-client-email">
              {cliente.correo || '—'}
            </div>
          </div>
        </div>
      ),
    },

    {
      key: 'identidad',
      label: 'Identidad',
      render: (cliente) => cliente.identidad || '—',
    },

    {
      key: 'telefono',
      label: 'Teléfono',
      render: (cliente) => cliente.telefono || '—',
    },

    {
      key: 'estado',
      label: 'Estado',
      render: (cliente) => (
        <HotelBadge
          color={
            coloresEstado[
              String(cliente.estado ?? '').toLowerCase()
            ] ?? 'secondary'
          }
        >
          {cliente.estado || 'Sin estado'}
        </HotelBadge>
      ),
    },
  ]

  // ACCIONES OPCIONALES

  if (onView || onEdit || onDelete) {
    columns.push({
      key: 'acciones',
      label: 'Acciones',
      className: 'text-center',

      render: (cliente) => (
        <div className="hotel-table-actions">

          {onView && (
            <HotelButton
              color="secondary"
              variant="outline"
              size="sm"
              onClick={() => onView(cliente)}
            >
              Ver
            </HotelButton>
          )}

          {onEdit && (
            <HotelButton
              color="primary"
              variant="outline"
              size="sm"
              icon={cilPencil}
              onClick={() => onEdit(cliente)}
            >
              Modificar
            </HotelButton>
          )}

          {onDelete && (
            <HotelButton
              color="danger"
              variant="outline"
              size="sm"
              icon={cilTrash}
              onClick={() => onDelete(cliente)}
            >
              Eliminar
            </HotelButton>
          )}

        </div>
      ),
    })
  }

  return (
    <div className={`hotel-client-table ${className}`}>

      {/* BUSCADOR */}

      {showSearch && (
        <div className="mb-3">
          <HotelSearch
            value={busqueda}
            placeholder="Buscar cliente..."
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

      {/* TABLA DE CLIENTES */}

      <HotelTable
        columns={columns}
        data={clientesVisibles}
        rowKey="id"
        loading={loading}
        emptyMessage={
          busqueda.trim()
            ? 'No se encontraron clientes.'
            : 'No hay clientes registrados.'
        }
      />

      {/* PAGINACION */}

      {showPagination && !loading && clientesFiltrados.length > 0 && (
        <HotelPagination
          currentPage={paginaActual}
          totalItems={clientesFiltrados.length}
          pageSize={limite}
          onPageChange={setPagina}
        />
      )}

    </div>
  )
}

export default HotelClientTable