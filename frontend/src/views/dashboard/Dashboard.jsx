import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  cilSpeedometer,
  cilBed,
  cilTags,
  cilBuilding,
  cilArrowRight,
  cilInfo,
} from '@coreui/icons'

import {
  HotelPageHeader,
  HotelCard,
  HotelButton,
  HotelStatCard,
  HotelAlert,
} from '../../components/hotel'

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <>
      {/* ENCABEZADO PRINCIPAL */}

      <HotelPageHeader
        title="Sistema de Hotel El Toro"
        description="Panel principal de administración del hotel."
        icon={cilSpeedometer}
      />

      {/* TARJETA DE BIENVENIDA */}

      <HotelCard
        title="Bienvenido al Gran Hotel El Toro"
        subtitle="Sistema de gestión hotelera"
        icon={<CIcon icon={cilBuilding} size="xl" />}
        className="mb-4"
      >
        <p className="mb-0">
          Desde este panel podrá administrar las habitaciones,
          los tipos de habitaciones y los pisos del hotel.
          Seleccione uno de los módulos disponibles para comenzar.
        </p>
      </HotelCard>

      {/* TARJETAS DE ESTADISTICAS */}

      <h2 className="h5 mb-3">Resumen general</h2>

      <CRow className="g-4 mb-4">

        <CCol sm={6} lg={4}>
          <HotelStatCard
            title="Habitaciones"
            value="—"
            icon={cilBed}
            color="primary"
            description="Total de habitaciones registradas"
          />
        </CCol>

        <CCol sm={6} lg={4}>
          <HotelStatCard
            title="Tipos de habitación"
            value="—"
            icon={cilTags}
            color="success"
            description="Categorías de habitaciones"
          />
        </CCol>

        <CCol sm={6} lg={4}>
          <HotelStatCard
            title="Pisos"
            value="—"
            icon={cilBuilding}
            color="info"
            description="Total de pisos registrados"
          />
        </CCol>

      </CRow>

      {/* ACCESOS DIRECTOS */}

      <h2 className="h5 mb-3">Módulos de administración</h2>

      <CRow className="g-4 mb-4">

        {/* MODULO DE HABITACIONES */}

        <CCol md={6} lg={4}>
          <HotelCard
            title="Habitaciones"
            subtitle="Gestión de habitaciones"
            icon={<CIcon icon={cilBed} size="xl" />}
            className="h-100"
            hoverable
            footer={
              <HotelButton
                color="primary"
                icon={cilArrowRight}
                className="w-100"
                onClick={() =>
                  navigate('/panel/habitaciones')
                }
              >
                Gestionar habitaciones
              </HotelButton>
            }
          >
            <p className="mb-0">
              Consulte, cree, modifique y administre
              las habitaciones del hotel.
            </p>
          </HotelCard>
        </CCol>

        {/* MODULO DE TIPOS DE HABITACION */}

        <CCol md={6} lg={4}>
          <HotelCard
            title="Tipos de habitación"
            subtitle="Gestión de categorías"
            icon={<CIcon icon={cilTags} size="xl" />}
            className="h-100"
            hoverable
            footer={
              <HotelButton
                color="primary"
                icon={cilArrowRight}
                className="w-100"
                onClick={() =>
                  navigate('/panel/tipohabitacion')
                }
              >
                Gestionar tipos
              </HotelButton>
            }
          >
            <p className="mb-0">
              Administre las categorías de habitaciones,
              sus capacidades máximas y tarifas base.
            </p>
          </HotelCard>
        </CCol>

        {/* MODULO DE PISOS */}

        <CCol md={6} lg={4}>
          <HotelCard
            title="Pisos"
            subtitle="Gestión de instalaciones"
            icon={<CIcon icon={cilBuilding} size="xl" />}
            className="h-100"
            hoverable
            footer={
              <HotelButton
                color="primary"
                icon={cilArrowRight}
                className="w-100"
                onClick={() =>
                  navigate('/panel/pisos')
                }
              >
                Gestionar pisos
              </HotelButton>
            }
          >
            <p className="mb-0">
              Administre los pisos del hotel, sus capacidades
              de habitaciones y observaciones.
            </p>
          </HotelCard>
        </CCol>

      </CRow>

      {/* INFORMACION DEL SISTEMA */}

      <HotelAlert
        color="info"
        title="Información del sistema"
        icon={cilInfo}
      >
        Las estadísticas estarán disponibles cuando el panel
        se conecte con los servicios correspondientes del sistema.
      </HotelAlert>
    </>
  )
}

export default Dashboard