import React, { useState } from 'react'
import { cilPencil, cilTrash } from '@coreui/icons'

import HotelTable from './HotelTable'
import HotelAvatar from './HotelAvatar'
import HotelButton from './HotelButton'
import HotelBadge from './HotelBadge'
import HotelSearch from './HotelSearch'
import HotelPagination from './HotelPagination'

import './hotel.scss'

const HotelEmployeeTable = ({
  empleados = [],
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

  // BUSCADOR DE EMPLEADOS

  const empleadosFiltrados = empleados.filter((empleado) =>
    [
      empleado.id,
      empleado.nombre,
      empleado.apellido,
      empleado.identidad,
      empleado.correo,
      empleado.telefono,
      empleado.cargo,
      empleado.estado,
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
    Math.ceil(empleadosFiltrados.length / limite),
  )

  const paginaActual = Math.min(pagina, totalPaginas)

  const inicio = (paginaActual - 1) * limite

  const empleadosVisibles = showPagination
    ? empleadosFiltrados.slice(inicio, inicio + limite)
    : empleadosFiltrados

  // COLORES DE LOS ESTADOS

  const coloresEstado = {
    activo: 'success',
    inactivo: 'secondary',
    vacaciones: 'info',
    suspendido: 'danger',
    permiso: 'warning',
  }

  // COLUMNAS DE LA TABLA

  const columns = [
    {
      key: 'id',
      label: '#',
    },

    {
      key: 'nombre',
      label: 'Empleado',
      render: (empleado) => (
        <div className="hotel-employee-information">
          <HotelAvatar
            name={`${empleado.nombre ?? ''} ${empleado.apellido ?? ''}`}
            src={empleado.fotografia}
            size="md"
            color="primary"
          />

          <div>
            <div className="hotel-employee-name">
              {empleado.nombre} {empleado.apellido}
            </div>

            <div className="hotel-employee-email">
              {empleado.correo || '—'}
            </div>
          </div>
        </div>
      ),
    },

    {
      key: 'identidad',
      label: 'Identidad',
      render: (empleado) => empleado.identidad || '—',
    },

    {
      key: 'telefono',
      label: 'Teléfono',
      render: (empleado) => empleado.telefono || '—',
    },

    {
      key: 'cargo',
      label: 'Cargo',
      render: (empleado) => empleado.cargo || '—',
    },

    {
      key: 'estado',
      label: 'Estado',
      render: (empleado) => (
        <HotelBadge
          color={
            coloresEstado[
              String(empleado.estado ?? '').toLowerCase()
            ] ?? 'secondary'
          }
        >
          {empleado.estado || 'Sin estado'}
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

      render: (empleado) => (
        <div className="hotel-table-actions">

          {onView && (
            <HotelButton
              color="secondary"
              variant="outline"
              size="sm"
              onClick={() => onView(empleado)}
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
              onClick={() => onEdit(empleado)}
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
              onClick={() => onDelete(empleado)}
            >
              Eliminar
            </HotelButton>
          )}

        </div>
      ),
    })
  }

  return (
    <div className={`hotel-employee-table ${className}`}>

      {/* BUSCADOR */}

      {showSearch && (
        <div className="mb-3">
          <HotelSearch
            value={busqueda}
            placeholder="Buscar empleado..."
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

      {/* TABLA DE EMPLEADOS */}

      <HotelTable
        columns={columns}
        data={empleadosVisibles}
        rowKey="id"
        loading={loading}
        emptyMessage={
          busqueda.trim()
            ? 'No se encontraron empleados.'
            : 'No hay empleados registrados.'
        }
      />

      {/* PAGINACION */}

      {showPagination &&
        !loading &&
        empleadosFiltrados.length > 0 && (
          <HotelPagination
            currentPage={paginaActual}
            totalItems={empleadosFiltrados.length}
            pageSize={limite}
            onPageChange={setPagina}
          />
        )}

    </div>
  )
}

export default HotelEmployeeTable