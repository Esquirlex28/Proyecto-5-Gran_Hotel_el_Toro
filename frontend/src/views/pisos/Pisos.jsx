import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'

import {
  cilPlus,
  cilBuilding,
  cilBed,
  cilPencil,
  cilTrash,
} from '@coreui/icons'

import {
  HotelPageHeader,
  HotelButton,
  HotelCard,
  HotelTable,
  HotelSearch,
  HotelConfirm,
  HotelAlert,
} from '../../components/hotel'

const pisosPorDefecto = [
  {
    ID_Piso: 1,
    Codigo_Piso: 'P1',
    Nombre_Piso: 'Piso 1',
    Capacidad_Habitaciones: 20,
    Observaciones: 'Acceso a recepcion y restaurante',
  },
  {
    ID_Piso: 2,
    Codigo_Piso: 'P2',
    Nombre_Piso: 'Piso 2',
    Capacidad_Habitaciones: 20,
    Observaciones: '',
  },
  {
    ID_Piso: 3,
    Codigo_Piso: 'P3',
    Nombre_Piso: 'Piso 3',
    Capacidad_Habitaciones: 18,
    Observaciones: 'Habitaciones Business',
  },
  {
    ID_Piso: 4,
    Codigo_Piso: 'P4',
    Nombre_Piso: 'Piso 4',
    Capacidad_Habitaciones: 12,
    Observaciones: 'Suites con vista al mar',
  },
  {
    ID_Piso: 5,
    Codigo_Piso: 'PH',
    Nombre_Piso: 'Penthouse',
    Capacidad_Habitaciones: 2,
    Observaciones: 'Suites presidenciales',
  },
]

const Pisos = () => {
  const navigate = useNavigate()

  const [pisos, setPisos] = useState(pisosPorDefecto)
  const [pisoEliminar, setPisoEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(false)
  const [busqueda, setBusqueda] = useState('')

  // FUNCION ORIGINAL DE ELIMINACION

  const deletePiso = () => {
    if (!pisoEliminar) return

    console.log(
      'Mandando peticion de eliminacion',
      pisoEliminar,
    )

    setPisos((prev) =>
      prev.filter(
        (p) => p.ID_Piso !== pisoEliminar.ID_Piso,
      ),
    )

    setPisoEliminar(null)
    setMensaje(true)

    setTimeout(() => setMensaje(false), 2000)
  }

  // BUSCADOR DE PISOS

  const pisosFiltrados = pisos.filter((p) =>
    `${p.Codigo_Piso} ${p.Nombre_Piso} ${p.Capacidad_Habitaciones} ${p.Observaciones}`
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase()),
  )

  // COLUMNAS DE LA TABLA

  const columns = [
    {
      key: 'Codigo_Piso',
      label: 'Código',
    },
    {
      key: 'Nombre_Piso',
      label: 'Nombre',
      render: (p) => (
        <>
          <CIcon
            icon={cilBuilding}
            className="me-2 text-body-secondary"
          />

          <strong>{p.Nombre_Piso}</strong>
        </>
      ),
    },
    {
      key: 'Capacidad_Habitaciones',
      label: 'Capacidad de habitaciones',
      render: (p) => (
        <>
          <CIcon
            icon={cilBed}
            className="me-2 text-body-secondary"
          />

          {p.Capacidad_Habitaciones}
        </>
      ),
    },
    {
      key: 'Observaciones',
      label: 'Observaciones',
      render: (p) => (
        <span className="text-body-secondary">
          {p.Observaciones || '—'}
        </span>
      ),
    },
    {
      key: 'acciones',
      label: 'Acciones',
      className: 'text-center',
      render: (p) => (
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <HotelButton
            color="primary"
            size="sm"
            variant="outline"
            icon={cilPencil}
            onClick={() =>
              navigate(`/panel/pisos/${p.ID_Piso}/editar`)
            }
          >
            Modificar
          </HotelButton>

          <HotelButton
            color="danger"
            size="sm"
            variant="outline"
            icon={cilTrash}
            onClick={() => setPisoEliminar(p)}
          >
            Eliminar
          </HotelButton>
        </div>
      ),
    },
  ]

  return (
    <>
      {/* MENSAJE DE ELIMINACION */}

      {mensaje && (
        <HotelAlert
          color="danger"
          title="Eliminación de prueba"
          className="mb-4"
        >
          ¡Piso eliminado del listado de prueba!
        </HotelAlert>
      )}

      {/* ENCABEZADO PRINCIPAL */}

      <HotelPageHeader
        title="CRUD de los pisos"
        description="Aquí encontrarás todos los pisos del hotel para poder gestionarlos."
        icon={cilBuilding}
        actions={
          <HotelButton
            color="primary"
            variant="outline"
            icon={cilPlus}
            onClick={() => navigate('/panel/pisos/form')}
          >
            Crear piso
          </HotelButton>
        }
      />

      {/* TARJETA CON BUSCADOR Y TABLA */}

      <HotelCard
        title="Pisos del hotel"
        subtitle="Listado de los pisos y sus características"
        className="mb-4"
      >
        <div className="mb-4">
          <HotelSearch
            value={busqueda}
            placeholder="Buscar piso..."
            onChange={(e) => setBusqueda(e.target.value)}
            onClear={() => setBusqueda('')}
          />
        </div>

        <HotelTable
          columns={columns}
          data={pisosFiltrados}
          rowKey="ID_Piso"
          emptyMessage={
            busqueda.trim()
              ? 'No se encontraron pisos.'
              : 'No hay pisos registrados.'
          }
        />
      </HotelCard>

      {/* CONFIRMACION DE ELIMINACION */}

      <HotelConfirm
        visible={pisoEliminar !== null}
        onClose={() => setPisoEliminar(null)}
        onConfirm={deletePiso}
        title="Eliminar piso"
        message={
          <>
            ¿Seguro que deseas eliminar el piso{' '}
            <strong>{pisoEliminar?.Nombre_Piso}</strong>?
          </>
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        color="danger"
        icon={cilTrash}
        confirmIcon={cilTrash}
      >
        Esta acción no se puede deshacer dentro del listado actual.
      </HotelConfirm>
    </>
  )
}

export default Pisos