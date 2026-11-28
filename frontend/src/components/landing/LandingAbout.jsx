import React from 'react'
import { CContainer, CRow, CCol } from '@coreui/react'

import { HotelButton } from '../hotel'

import lobby from '../../assets/images/landing/hotel-lobby.png'

const LandingAbout = () => {
  return (
    <section
      id="nosotros"
      className="landing-section landing-about"
    >
      <CContainer>

        <CRow className="align-items-center g-5">

          <CCol lg={6}>

            <img
              src={lobby}
              alt="Recepción del Gran Hotel El Toro"
              className="landing-about-image"
              loading="lazy"
            />

          </CCol>

          <CCol lg={6}>

            <span className="landing-section-label">
              SOBRE NOSOTROS
            </span>

            <h2>
              Más que un hotel, una experiencia
            </h2>

            <p>
              En el Gran Hotel El Toro buscamos ofrecer
              una experiencia que combine comodidad,
              elegancia y hospitalidad.
            </p>

            <p>
              Ya sea que viajes por negocios, vacaciones
              o para compartir momentos especiales,
              queremos que disfrutes cada instante
              de tu estancia.
            </p>

            <HotelButton
              as="a"
              href="#galeria"
              color="primary"
              size="lg"
            >
              Conoce nuestras instalaciones
            </HotelButton>

          </CCol>

        </CRow>

      </CContainer>
    </section>
  )
}

export default LandingAbout