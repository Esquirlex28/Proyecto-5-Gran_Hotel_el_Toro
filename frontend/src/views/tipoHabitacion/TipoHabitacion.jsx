import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'

import {
  cilPlus,
  cilTags,
  cilPeople,
  cilDollar,
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

const tiposPorDefecto = [
  {
    ID_Tipo_Habitacion: 1,
    Nombre_Tipo: 'Normal',
    Capacidad_Maxima: 2,
    Tarifa_Base: 850.0,
  },
  {
    ID_Tipo_Habitacion: 2,
    Nombre_Tipo: 'Doble',
    Capacidad_Maxima: 4,
    Tarifa_Base: 1200.0,
  },
  {
    ID_Tipo_Habitacion: 3,
    Nombre_Tipo: 'Business',
    Capacidad_Maxima: 2,
    Tarifa_Base: 1800.0,
  },
  {
    ID_Tipo_Habitacion: 4,
    Nombre_Tipo: 'Suite',
    Capacidad_Maxima: 4,
    Tarifa_Base: 3500.0,
  },
  {
    ID_Tipo_Habitacion: 5,
    Nombre_Tipo: 'Suite Presidencial',
    Capacidad_Maxima: 6,
    Tarifa_Base: 7500.0,
  },
]

const TipoHabitacion = () => {
  const navigate = useNavigate()

  const [tipos, setTipos] = useState(tiposPorDefecto)
  const [tipoEliminar, setTipoEliminar] = useState(null)
  const [mensaje, setMensaje] = useState(false)
  const [busqueda, setBusqueda] = useState('')

  // FUNCION ORIGINAL DE ELIMINACION

  const deleteTipo = () => {
    if (!tipoEliminar) return

    console.log(
      'Mandando peticion de eliminacion',
      tipoEliminar,
    )

    setTipos((prev) =>
      prev.filter(
        (t) =>
          t.ID_Tipo_Habitacion !==
          tipoEliminar.ID_Tipo_Habitacion,
      ),
    )

    setTipoEliminar(null)
    setMensaje(true)

    setTimeout(() => setMensaje(false), 2000)
  }

  // BUSCADOR DE TIPOS DE HABITACIONES

  const tiposFiltrados = tipos.filter((t) =>
    `${t.ID_Tipo_Habitacion} ${t.Nombre_Tipo} ${t.Capacidad_Maxima} ${t.Tarifa_Base}`
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase()),
  )

  // COLUMNAS DE LA TABLA

  const columns = [
    {
      key: 'ID_Tipo_Habitacion',
      label: '#',
    },
    {
      key: 'Nombre_Tipo',
      label: 'Nombre',
      render: (t) => (
        <>
          <CIcon
            icon={cilTags}
            className="me-2 text-body-secondary"
          />
          <strong>{t.Nombre_Tipo}</strong>
        </>
      ),
    },
    {
      key: 'Capacidad_Maxima',
      label: 'Capacidad máxima',
      render: (t) => (
        <>
          <CIcon
            icon={cilPeople}
            className="me-2 text-body-secondary"
          />
          {t.Capacidad_Maxima}
        </>
      ),
    },
    {
      key: 'Tarifa_Base',
      label: 'Tarifa base',
      render: (t) => (
        <>
          <CIcon
            icon={cilDollar}
            className="me-2 text-body-secondary"
          />
          {Number(t.Tarifa_Base).toFixed(2)}
        </>
      ),
    },
    {
      key: 'acciones',
      label: 'Acciones',
      className: 'text-center',
      render: (t) => (
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <HotelButton
            color="primary"
            size="sm"
            variant="outline"
            icon={cilPencil}
            onClick={() =>
              navigate(
                `/panel/tipohabitacion/${t.ID_Tipo_Habitacion}/editar`,
              )
            }
          >
            Modificar
          </HotelButton>

          <HotelButton
            color="danger"
            size="sm"
            variant="outline"
            icon={cilTrash}
            onClick={() => setTipoEliminar(t)}
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
          ¡Tipo de habitación eliminado del listado de prueba!
        </HotelAlert>
      )}

      {/* ENCABEZADO PRINCIPAL */}

      <HotelPageHeader
        title="CRUD de los tipos de habitación"
        description="Aquí encontrarás todos los tipos de habitación existentes para poder gestionarlos."
        icon={cilTags}
        actions={
          <HotelButton
            color="primary"
            variant="outline"
            icon={cilPlus}
            onClick={() =>
              navigate('/panel/tipohabitacion/form')
            }
          >
            Crear tipo de habitación
          </HotelButton>
        }
      />

      {/* TARJETA CON BUSCADOR Y TABLA */}

      <HotelCard
        title="Tipos de habitación"
        subtitle="Listado de los tipos de habitación del hotel"
        className="mb-4"
      >
        <div className="mb-4">
          <HotelSearch
            value={busqueda}
            placeholder="Buscar tipo de habitación..."
            onChange={(e) => setBusqueda(e.target.value)}
            onClear={() => setBusqueda('')}
          />
        </div>

        <HotelTable
          columns={columns}
          data={tiposFiltrados}
          rowKey="ID_Tipo_Habitacion"
          emptyMessage={
            busqueda.trim()
              ? 'No se encontraron tipos de habitación.'
              : 'No hay tipos de habitación registrados.'
          }
        />
      </HotelCard>

      {/* CONFIRMACION DE ELIMINACION */}

      <HotelConfirm
        visible={tipoEliminar !== null}
        onClose={() => setTipoEliminar(null)}
        onConfirm={deleteTipo}
        title="Eliminar tipo de habitación"
        message={
          <>
            ¿Seguro que deseas eliminar el tipo{' '}
            <strong>{tipoEliminar?.Nombre_Tipo}</strong>?
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

export default TipoHabitacion