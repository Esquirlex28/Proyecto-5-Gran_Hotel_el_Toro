import React from 'react'

import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardImage,
  CCardBody,
  CCardFooter,
  CButton,
  CBadge,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilPeople, cilBed, cilWindow } from '@coreui/icons'

import habitacion from '../../assets/images/landing/hotel-habitacion.png'

const habitaciones = [
  {
    id: 1,
    nombre: 'Habitación Normal',
    descripcion: 'Confort y tranquilidad para tu descanso.',
    capacidad: 2,
    cama: 'Cama matrimonial',
    vista: 'Vista al jardín',
    categoria: 'Confort',
  },
  {
    id: 2,
    nombre: 'Habitación Doble',
    descripcion: 'El espacio ideal para compartir en familia.',
    capacidad: 4,
    cama: 'Dos camas matrimoniales',
    vista: 'Vista a la piscina',
    categoria: 'Familiar',
  },
  {
    id: 3,
    nombre: 'Habitación Business',
    descripcion: 'Comodidad y funcionalidad para tus negocios.',
    capacidad: 2,
    cama: 'Cama King Size',
    vista: 'Vista al jardín',
    categoria: 'Ejecutiva',
  },
  {
    id: 4,
    nombre: 'Suite',
    descripcion: 'Elegancia y descanso frente al Caribe.',
    capacidad: 4,
    cama: 'Cama King Size',
    vista: 'Vista al mar',
    categoria: 'Premium',
  },
  {
    id: 5,
    nombre: 'Suite Presidencial',
    descripcion: 'Nuestra experiencia más exclusiva.',
    capacidad: 6,
    cama: 'Camas King Size',
    vista: 'Vista panorámica al mar',
    categoria: 'Exclusiva',
  },
]

const LandingRooms = () => {
  return (
    <section id="habitaciones" className="landing-section landing-rooms">
      <CContainer>

        <div className="landing-section-heading">
          <span className="landing-section-label">
            DESCANSO Y EXCLUSIVIDAD
          </span>

          <h2>Habitaciones y suites</h2>

          <p>
            Encuentra el espacio perfecto para tu estancia.
          </p>
        </div>

        <CRow
          xs={{ cols: 1 }}
          sm={{ cols: 2 }}
          lg={{ cols: 3 }}
          xl={{ cols: 5 }}
          className="g-3 justify-content-center"
        >

          {habitaciones.map((h) => (
            <CCol key={h.id}>
              <CCard className="landing-room-card h-100">

                <div className="landing-room-image-wrapper">

                  <CCardImage
                    orientation="top"
                    src={habitacion}
                    alt={h.nombre}
                    className="landing-room-image"
                    loading="lazy"
                  />

                  <CBadge className="landing-room-badge">
                    {h.categoria}
                  </CBadge>

                </div>

                <CCardBody>

                  <h3 className="card-title">{h.nombre}</h3>

                  <p className="card-text">
                    {h.descripcion}
                  </p>

                  <div className="landing-room-features">

                    <div>
                      <CIcon icon={cilPeople} className="me-2" />
                      {h.capacidad} huéspedes
                    </div>

                    <div>
                      <CIcon icon={cilBed} className="me-2" />
                      {h.cama}
                    </div>

                    <div>
                      <CIcon icon={cilWindow} className="me-2" />
                      {h.vista}
                    </div>

                  </div>

                </CCardBody>

                <CCardFooter>
                  <CButton
                    as="a"
                    href="#reservaciones"
                    color="primary"
                    variant="outline"
                    size="sm"
                    className="w-100"
                  >
                    Consultar
                  </CButton>
                </CCardFooter>

              </CCard>
            </CCol>
          ))}

        </CRow>
      </CContainer>
    </section>
  )
}

export default LandingRooms