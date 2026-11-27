import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CRow, CCol } from '@coreui/react'
import { CardHabitacion } from './CardHabitacion'
import { cilPlus, cilBed } from '@coreui/icons'

import {
  HotelPageHeader,
  HotelButton,
  HotelSearch,
  HotelEmpty,
} from '../../components/hotel'

const habitaciones = [
  { id: 1, numero: 204, estado: 'Reservada', tipo: 'Business', Tarifa: 3000, capacidad: 6 },
  { id: 2, numero: 205, estado: 'Mantenimiento' },
  { id: 3, numero: 206, estado: 'Ocupada' },
  { id: 4, numero: 207 },
  { id: 5, numero: 208 },
  // ...
]

const Habitaciones = () => {
  const navigate = useNavigate()

  const [busqueda, setBusqueda] = useState('')

  const habitacionesFiltradas = habitaciones.filter((h) =>
    `${h.numero} ${h.estado ?? ''} ${h.tipo ?? ''}`
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase())
  )

  return (
    <>
      {/* ENCABEZADO DE LA PANTALLA */}

      <HotelPageHeader
        title="CRUD de las Habitaciones"
        description="Aquí encontrarás todas las habitaciones disponibles para poder gestionarlas."
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
            onChange={(e) => setBusqueda(e.target.value)}
            onClear={() => setBusqueda('')}
          />
        </CCol>
      </CRow>

      {/* LISTADO DE HABITACIONES */}

      {habitacionesFiltradas.length > 0 ? (
        <CRow
          xs={{ cols: 1 }}
          md={{ cols: 2 }}
          lg={{ cols: 3 }}
          className="g-4 mb-4"
        >
          {habitacionesFiltradas.map((h) => (
            <CCol key={h.id}>
              <CardHabitacion
                id={h.id}
                numero={h.numero}
                estado={h.estado}
                tipo={h.tipo}
                Capacidad={h.capacidad}
              />
            </CCol>
          ))}
        </CRow>
      ) : (
        <HotelEmpty
          title={
            busqueda
              ? 'No se encontraron habitaciones'
              : 'No hay habitaciones registradas'
          }
          description={
            busqueda
              ? 'Intente buscar con otro número, tipo o estado.'
              : 'Agregue una habitación para comenzar.'
          }
          actionText={
            busqueda
              ? 'Limpiar búsqueda'
              : 'Crear habitación'
          }
          actionIcon={busqueda ? undefined : cilPlus}
          onAction={() => {
            if (busqueda) {
              setBusqueda('')
            } else {
              navigate('/panel/habitaciones/form')
            }
          }}
        />
      )}
    </>
  )
}

export default Habitaciones