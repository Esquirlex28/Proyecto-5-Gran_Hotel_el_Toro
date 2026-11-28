import React from 'react'
import { Link } from 'react-router-dom'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cilLocationPin,
  cilPhone,
  cilEnvelopeClosed,
  cilClock,
} from '@coreui/icons'

const contactos = [
  {
    titulo: 'Ubicación',
    descripcion: 'Roatán, Islas de la Bahía, Honduras',
    icono: cilLocationPin,
  },
  {
    titulo: 'Teléfono',
    descripcion: 'Próximamente',
    icono: cilPhone,
  },
  {
    titulo: 'Correo electrónico',
    descripcion: 'Próximamente',
    icono: cilEnvelopeClosed,
  },
  {
    titulo: 'Atención al huésped',
    descripcion: 'Consulta nuestros horarios',
    icono: cilClock,
  },
]

const LandingContact = () => {
  return (
    <section id="contacto" className="landing-section landing-contact">
      <CContainer>

        <div className="landing-section-heading">
          <span className="landing-section-label">
            ESTAMOS PARA ATENDERTE
          </span>

          <h2>Contáctanos</h2>

          <p>
            Estamos a tu disposición para ayudarte
            a planificar tu próxima estancia.
          </p>
        </div>

        <CRow
          xs={{ cols: 1 }}
          sm={{ cols: 2 }}
          lg={{ cols: 4 }}
          className="g-3"
        >
          {contactos.map((contacto) => (
            <CCol key={contacto.titulo}>
              <CCard className="landing-contact-card h-100">
                <CCardBody>

                  <div className="landing-contact-icon">
                    <CIcon icon={contacto.icono} size="lg" />
                  </div>

                  <h3>{contacto.titulo}</h3>
                  <p>{contacto.descripcion}</p>

                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>

        <div className="landing-contact-cta">

          <h2>Tu próxima experiencia comienza aquí</h2>

          <p>
            Disfruta del descanso y la elegancia
            en el corazón del Caribe hondureño.
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-2">

            <CButton
              as="a"
              href="#reservaciones"
              color="primary"
            >
              Planificar mi estancia
            </CButton>

            <CButton
              as={Link}
              to="/authentication/register"
              color="primary"
              variant="outline"
            >
              Crear una cuenta
            </CButton>

          </div>

        </div>

      </CContainer>
    </section>
  )
}

export default LandingContact