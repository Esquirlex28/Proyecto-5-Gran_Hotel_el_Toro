import React from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import * as icons from '@coreui/icons'

const servicios = [
  {
    nombre: 'Wi-Fi gratuito',
    descripcion: 'Conexión durante toda tu estancia.',
    icono: icons.cilWifi || icons.cilSignalCellular4,
  },
  {
    nombre: 'Restaurante',
    descripcion: 'Gastronomía con esencia caribeña.',
    icono: icons.cilRestaurant || icons.cilDinner,
  },
  {
    nombre: 'Piscina',
    descripcion: 'Un espacio para descansar y relajarte.',
    icono: icons.cilPool || icons.cilDrop,
  },
  {
    nombre: 'Estacionamiento',
    descripcion: 'Comodidad y espacio para tu vehículo.',
    icono: icons.cilCarAlt,
  },
  {
    nombre: 'Recepción',
    descripcion: 'Atención personalizada al huésped.',
    icono: icons.cilClock,
  },
  {
    nombre: 'Aire acondicionado',
    descripcion: 'Temperatura ideal en tu habitación.',
    icono: icons.cilSnowflake,
  },
  {
    nombre: 'Experiencia caribeña',
    descripcion: 'Descubre el encanto de Roatán.',
    icono: icons.cilBeachAccess || icons.cilSun,
  },
  {
    nombre: 'Servicio a la habitación',
    descripcion: 'Atención desde la comodidad de tu cuarto.',
    icono: icons.cilRoom || icons.cilBell,
  },
  {
    nombre: 'Seguridad',
    descripcion: 'Tranquilidad durante tu estancia.',
    icono: icons.cilShieldAlt,
  },
]

const LandingServices = () => {
  return (
    <section id="servicios" className="landing-section landing-services">
      <CContainer>

        <div className="landing-section-heading">
          <span className="landing-section-label">
            COMODIDAD EN CADA DETALLE
          </span>

          <h2>Servicios y experiencias</h2>

          <p>
            Todo lo que necesitas para disfrutar de una estancia especial.
          </p>
        </div>

        <CRow
          xs={{ cols: 1 }}
          sm={{ cols: 2 }}
          lg={{ cols: 3 }}
          className="g-3"
        >
          {servicios.map((servicio) => (
            <CCol key={servicio.nombre}>
              <CCard className="landing-service-card h-100">
                <CCardBody>

                  <div className="landing-service-icon">
                    <CIcon
                      icon={servicio.icono || icons.cilStar}
                      size="lg"
                    />
                  </div>

                  <h3>{servicio.nombre}</h3>
                  <p>{servicio.descripcion}</p>

                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>

      </CContainer>
    </section>
  )
}

export default LandingServices