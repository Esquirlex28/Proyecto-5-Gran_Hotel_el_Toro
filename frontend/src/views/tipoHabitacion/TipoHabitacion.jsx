import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CIcon from '@coreui/icons-react'

import {
  cilPlus,
  cilTags,
  cilPeople,
  cilDollar,
  cilPencil,
  cilTrash,
  cilStar,
} from '@coreui/icons'

import {
  HotelPageHeader,
  HotelButton,
  HotelCard,
  HotelTable,
  HotelSearch,
  HotelModal,
  HotelAlert,
  HotelLoader,
} from '../../components/hotel'

import {
  getTiposHabitacion,
  getComodidadesPorTipo,
} from '../../service/api'

const TipoHabitacion = () => {
  const navigate = useNavigate()

  const [tipos, setTipos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const [tipoComodidades, setTipoComodidades] = useState(null)
  const [comodidades, setComodidades] = useState([])
  const [cargandoComodidades, setCargandoComodidades] = useState(false)
  const [errorComodidades, setErrorComodidades] = useState('')

  // OBTENER TIPOS DE HABITACION

  useEffect(() => {
    let activo = true

    setCargando(true)
    setError('')

    getTiposHabitacion()
      .then((res) => {
        if (!activo) return

        if (!Array.isArray(res)) {
          throw new Error(
            'Respuesta incorrecta del servidor',
          )
        }

        setTipos(res)
      })

      .catch((e) => {
        console.error(e)

        if (activo) {
          setError(
            'No fue posible obtener los tipos de habitación.',
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

  // ABRIR VENTANA DE COMODIDADES

  const verComodidades = (tipo) => {
    setComodidades([])
    setErrorComodidades('')
    setCargandoComodidades(true)
    setTipoComodidades(tipo)
  }

  // OBTENER COMODIDADES DEL TIPO SELECCIONADO

  useEffect(() => {
    if (!tipoComodidades) return

    let activo = true

    getComodidadesPorTipo(
      tipoComodidades.ID_Tipo_Habitacion,
    )
      .then((res) => {
        if (!activo) return

        if (!Array.isArray(res)) {
          throw new Error(
            'Respuesta incorrecta del servidor',
          )
        }

        setComodidades(res)
      })

      .catch((e) => {
        console.error(e)

        if (activo) {
          setErrorComodidades(
            'No fue posible obtener las comodidades.',
          )
        }
      })

      .finally(() => {
        if (activo) {
          setCargandoComodidades(false)
        }
      })

    return () => {
      activo = false
    }
  }, [tipoComodidades])

  // CERRAR VENTANA DE COMODIDADES

  const cerrarComodidades = () => {
    setTipoComodidades(null)
    setComodidades([])
    setErrorComodidades('')
    setCargandoComodidades(false)
  }

  // BUSCADOR DE TIPOS DE HABITACION

  const tiposFiltrados = tipos.filter((t) =>
    [
      t.ID_Tipo_Habitacion,
      t.Nombre_Tipo,
      t.Capacidad_Maxima,
      t.Tarifa_Base,
    ]
      .map((valor) => String(valor ?? ''))
      .join(' ')
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase()),
  )

  // COLUMNAS DE LA TABLA DE TIPOS

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
            color="info"
            size="sm"
            variant="outline"
            icon={cilStar}
            onClick={() => verComodidades(t)}
          >
            Comodidades
          </HotelButton>

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

  // COLUMNAS DE LA TABLA DE COMODIDADES

  const columnsComodidades = [
    {
      key: 'Nombre_Comodidad',
      label: 'Comodidad',
      render: (c) => (
        <>
          <CIcon
            icon={cilStar}
            className="me-2 text-body-secondary"
          />

          <strong>{c.Nombre_Comodidad}</strong>
        </>
      ),
    },
    {
      key: 'Observaciones',
      label: 'Observaciones',
      render: (c) => (
        <span className="text-body-secondary">
          {c.Observaciones || '—'}
        </span>
      ),
    },
  ]

  return (
    <>

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
        title="Tipos de habitación"
        subtitle="Listado de los tipos de habitación del hotel"
        className="mb-4"
      >

        <div className="mb-4">

          <HotelSearch
            value={busqueda}
            placeholder="Buscar tipo de habitación..."
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
            message="Cargando tipos de habitación..."
          />

        ) : !error && (

          <>

            {/* CANTIDAD DE REGISTROS */}

            <p className="text-body-secondary mb-3">
              Mostrando {tiposFiltrados.length} de{' '}
              {tipos.length} tipos de habitación.
            </p>

            {/* TABLA PRINCIPAL */}

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

          </>

        )}

      </HotelCard>

      {/* VENTANA DE COMODIDADES */}

      <HotelModal
        visible={tipoComodidades !== null}
        onClose={cerrarComodidades}
        title={`Comodidades de ${tipoComodidades?.Nombre_Tipo ?? ''}`}
        subtitle="Comodidades asignadas al tipo de habitación"
        size="lg"
        centered
        scrollable
        footer={
          <>

            <HotelButton
              color="primary"
              variant="outline"
              icon={cilPlus}
              disabled
            >
              Asignar comodidad
            </HotelButton>

            <HotelButton
              color="secondary"
              onClick={cerrarComodidades}
            >
              Cerrar
            </HotelButton>

          </>
        }
      >

        {/* ERROR AL CONSULTAR COMODIDADES */}

        {errorComodidades && (
          <HotelAlert
            color="danger"
            title="Error de conexión"
          >
            {errorComodidades}
          </HotelAlert>
        )}

        {/* CARGA Y TABLA DE COMODIDADES */}

        {cargandoComodidades ? (

          <HotelLoader
            message="Cargando comodidades..."
          />

        ) : !errorComodidades && (

          <HotelTable
            columns={columnsComodidades}
            data={comodidades}
            rowKey="ID_Tipo_Habitacion_Comodidad"
            emptyMessage="Este tipo no tiene comodidades asignadas."
          />

        )}

      </HotelModal>

    </>
  )
}

export default TipoHabitacion