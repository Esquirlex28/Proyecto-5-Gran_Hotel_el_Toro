import React, { useEffect, useState } from 'react'
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
  HotelAlert,
  HotelLoader,
} from '../../components/hotel'

import { getPisos } from '../../service/api'

const Pisos = () => {
  const navigate = useNavigate()

  const [pisos, setPisos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // OBTENER PISOS DESDE EL BACKEND

  useEffect(() => {
    let activo = true

    setCargando(true)
    setError('')

    getPisos()
      .then((res) => {
        if (!activo) return

        if (!Array.isArray(res)) {
          throw new Error(
            'Respuesta incorrecta del servidor',
          )
        }

        setPisos(res)
      })

      .catch((e) => {
        console.error(e)

        if (activo) {
          setError(
            'No fue posible obtener los pisos del servidor.',
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
  }, [])

  // BUSCADOR DE PISOS

  const pisosFiltrados = pisos.filter((p) =>
    [
      p.Codigo_Piso,
      p.Nombre_Piso,
      p.Capacidad_Habitaciones,
      p.Observaciones,
    ]
      .map((valor) => String(valor ?? ''))
      .join(' ')
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
      render: () => (
        <div className="d-flex flex-wrap justify-content-center gap-2">

          <HotelButton
            color="primary"
            size="sm"
            variant="outline"
            icon={cilPencil}
            disabled
          >
            Modificar
          </HotelButton>

          <HotelButton
            color="danger"
            size="sm"
            variant="outline"
            icon={cilTrash}
            disabled
          >
            Eliminar
          </HotelButton>

        </div>
      ),
    },
  ]

  return (
    <>

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

      {/* MENSAJE DE ERROR */}

      {error && (
        <HotelAlert
          color="danger"
          title="Error de conexión"
          className="mb-4"
        >
          {error}
        </HotelAlert>
      )}

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
            disabled={cargando || Boolean(error)}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
            onClear={() => setBusqueda('')}
          />

        </div>

        {/* INDICADOR DE CARGA */}

        {cargando ? (

          <HotelLoader
            message="Cargando pisos del hotel..."
          />

        ) : !error && (

          <>

            {/* CANTIDAD DE PISOS */}

            <p className="text-body-secondary mb-3">
              Mostrando {pisosFiltrados.length} de{' '}
              {pisos.length} pisos.
            </p>

            {/* TABLA DE PISOS */}

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

          </>

        )}

      </HotelCard>

    </>
  )
}

export default Pisos