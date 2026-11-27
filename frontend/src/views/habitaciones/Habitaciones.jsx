import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CRow, CCol } from '@coreui/react'
import { cilPlus, cilBed } from '@coreui/icons'

import { CardHabitacion } from './CardHabitacion'

import { getHabitaciones } from '../../service/api'

import {
  HotelPageHeader,
  HotelButton,
  HotelSearch,
  HotelEmpty,
  HotelLoader,
  HotelAlert,
} from '../../components/hotel'

const Habitaciones = () => {
  const navigate = useNavigate()

  const [habitaciones, setHabitaciones] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // OBTENER HABITACIONES DESDE EL BACKEND

  useEffect(() => {
    let activo = true

    setCargando(true)
    setError('')

    getHabitaciones()
      .then((res) => {
        if (!activo) return

        if (!Array.isArray(res)) {
          throw new Error(
            'Respuesta incorrecta del servidor',
          )
        }

        setHabitaciones(res)
      })

      .catch((e) => {
        console.error(e)

        if (activo) {
          setError(
            'No fue posible obtener las habitaciones del servidor.',
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

  // BUSCADOR DE HABITACIONES

  const habitacionesFiltradas = habitaciones.filter((h) =>
    [
      h.Numero_Habitacion,
      h.Nombre_Estado,
      h.Nombre_Tipo,
      h.Nombre_Piso,
      h.Capacidad_Maxima,
      h.Tarifa_Base,
    ]
      .map((valor) => String(valor ?? ''))
      .join(' ')
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase()),
  )

  return (
    <>

      {/* ENCABEZADO DE LA PANTALLA */}

      <HotelPageHeader
        title="CRUD de las habitaciones"
        description="Aquí encontrarás las habitaciones registradas para poder gestionarlas."
        icon={cilBed}
        actions={
          <HotelButton
            color="primary"
            variant="outline"
            icon={cilPlus}
            onClick={() => {
              navigate('/panel/habitaciones/form')
            }}
          >
            Crear habitación
          </HotelButton>
        }
      />

      {/* BUSCADOR DE HABITACIONES */}

      <CRow className="mb-4">
        <CCol md={6} lg={4}>
          <HotelSearch
            value={busqueda}
            placeholder="Buscar habitación..."
            disabled={cargando || Boolean(error)}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
            onClear={() => setBusqueda('')}
          />
        </CCol>
      </CRow>

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

      {/* INDICADOR DE CARGA */}

      {cargando ? (
        <HotelLoader
          message="Cargando habitaciones..."
        />
      ) : !error && (

        <>

          {/* CANTIDAD DE HABITACIONES */}

          <p className="text-body-secondary mb-3">
            Mostrando {habitacionesFiltradas.length} de{' '}
            {habitaciones.length} habitaciones.
          </p>

          {/* LISTADO DE HABITACIONES */}

          {habitacionesFiltradas.length > 0 ? (

            <CRow
              xs={{ cols: 1 }}
              md={{ cols: 2 }}
              lg={{ cols: 3 }}
              className="g-4 mb-4"
            >

              {habitacionesFiltradas.map((h) => (
                <CCol key={h.ID_Habitacion}>

                  <CardHabitacion
                    ID_Habitacion={h.ID_Habitacion}
                    Numero_Habitacion={h.Numero_Habitacion}
                    Nombre_Estado={h.Nombre_Estado}
                    Nombre_Tipo={h.Nombre_Tipo}
                    Capacidad_Maxima={h.Capacidad_Maxima}
                    Tarifa_Base={h.Tarifa_Base}
                    Nombre_Piso={h.Nombre_Piso}
                    Tipo_Vista={h.Tipo_Vista}
                  />

                </CCol>
              ))}

            </CRow>

          ) : (

            /* ESTADO VACIO */

            <HotelEmpty
              title={
                busqueda.trim()
                  ? 'No se encontraron habitaciones'
                  : 'No hay habitaciones registradas'
              }

              description={
                busqueda.trim()
                  ? 'Intente buscar con otro número, tipo, piso o estado.'
                  : 'Agregue una habitación para comenzar.'
              }

              actionText={
                busqueda.trim()
                  ? 'Limpiar búsqueda'
                  : 'Crear habitación'
              }

              actionIcon={
                busqueda.trim() ? undefined : cilPlus
              }

              onAction={() => {
                if (busqueda.trim()) {
                  setBusqueda('')
                } else {
                  navigate('/panel/habitaciones/form')
                }
              }}
            />

          )}

        </>

      )}

    </>
  )
}

export default Habitaciones