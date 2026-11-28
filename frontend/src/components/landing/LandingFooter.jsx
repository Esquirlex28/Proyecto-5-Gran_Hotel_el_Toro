import React from 'react'
import { Link } from 'react-router-dom'
import { CContainer, CRow, CCol } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cilLocationPin,
  cilPhone,
  cilEnvelopeClosed,
  cilArrowTop,
} from '@coreui/icons'

import { HotelLogo } from '../hotel'

const enlaces = [
  { nombre: 'Inicio', ruta: '#inicio' },
  { nombre: 'Habitaciones', ruta: '#habitaciones' },
  { nombre: 'Servicios', ruta: '#servicios' },
  { nombre: 'Nosotros', ruta: '#nosotros' },
  { nombre: 'Galería', ruta: '#galeria' },
  { nombre: 'Contacto', ruta: '#contacto' },
]

const LandingFooter = () => {
  return (
    <footer className="landing-footer">
      <CContainer>

        <CRow className="g-4">

          {/* INFORMACION DEL HOTEL */}

          <CCol lg={4} md={6}>

            <div className="d-flex align-items-center gap-3 mb-3">
              <HotelLogo width={65} />
              <h3>Gran Hotel El Toro</h3>
            </div>

            <p>
              Elegancia, comodidad y hospitalidad
              en el corazón del Caribe hondureño.
            </p>

          </CCol>

          {/* NAVEGACION */}

          <CCol lg={2} md={6} xs={6}>

            <h4>Explorar</h4>

            <ul className="landing-footer-links">
              {enlaces.map((enlace) => (
                <li key={enlace.ruta}>
                  <a href={enlace.ruta}>
                    {enlace.nombre}
                  </a>
                </li>
              ))}
            </ul>

          </CCol>

          {/* CUENTA DEL CLIENTE */}

          <CCol lg={3} md={6} xs={6}>

            <h4>Mi cuenta</h4>

            <ul className="landing-footer-links">

              <li>
                <Link to="/authentication/login">
                  Iniciar sesión
                </Link>
              </li>

              <li>
                <Link to="/authentication/register">
                  Crear una cuenta
                </Link>
              </li>

              <li>
                <a href="#reservaciones">
                  Planificar mi estancia
                </a>
              </li>

            </ul>

          </CCol>

          {/* CONTACTO */}

          <CCol lg={3} md={6}>

            <h4>Contáctanos</h4>

            <div className="landing-footer-contact">

              <p>
                <CIcon icon={cilLocationPin} className="me-2" />
                Roatán, Islas de la Bahía, Honduras
              </p>

              <p>
                <CIcon icon={cilPhone} className="me-2" />
                Teléfono próximamente
              </p>

              <p>
                <CIcon icon={cilEnvelopeClosed} className="me-2" />
                Correo próximamente
              </p>

            </div>

          </CCol>

        </CRow>

        {/* DERECHOS RESERVADOS */}

        <div className="landing-footer-bottom">

          <p>
            © {new Date().getFullYear()} Gran Hotel El Toro.
            Todos los derechos reservados.
          </p>

          <a href="#inicio">
            Volver al inicio
            <CIcon icon={cilArrowTop} className="ms-2" />
          </a>

        </div>

      </CContainer>
    </footer>
  )
}

export default LandingFooter