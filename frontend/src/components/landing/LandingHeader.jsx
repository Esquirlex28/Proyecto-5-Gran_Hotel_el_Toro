import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  CNavbar,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CContainer,
  CButton,
  useColorModes,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import * as icons from '@coreui/icons'

import { HotelLogo } from '../hotel'

const enlaces = [
  { nombre: 'Inicio', ruta: '#inicio' },
  { nombre: 'Habitaciones', ruta: '#habitaciones' },
  { nombre: 'Servicios', ruta: '#servicios' },
  { nombre: 'Nosotros', ruta: '#nosotros' },
  { nombre: 'Galería', ruta: '#galeria' },
  { nombre: 'Contacto', ruta: '#contacto' },
]

const LandingHeader = () => {
  const [visible, setVisible] = useState(false)

  const { colorMode, setColorMode } = useColorModes(
    'coreui-free-react-admin-template-theme',
  )

  const oscuro =
    colorMode === 'dark' ||
    (colorMode === 'auto' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  const cambiarTema = () => {
    setColorMode(oscuro ? 'light' : 'dark')
  }

  return (
    <CNavbar expand="lg" className="landing-navbar">
      <CContainer>

        <CNavbarBrand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <div className="landing-logo-box">
            <HotelLogo width={44} />
          </div>

          <span className="landing-brand">
            Gran Hotel El Toro
          </span>
        </CNavbarBrand>

        <CNavbarToggler
          onClick={() => setVisible(!visible)}
          aria-expanded={visible}
          aria-label="Abrir menú"
        />

        <CCollapse
          className="navbar-collapse"
          visible={visible}
        >
          <CNavbarNav className="mx-auto">
            {enlaces.map((enlace) => (
              <CNavItem key={enlace.ruta}>
                <CNavLink
                  href={enlace.ruta}
                  onClick={() => setVisible(false)}
                >
                  {enlace.nombre}
                </CNavLink>
              </CNavItem>
            ))}
          </CNavbarNav>

          <div className="d-flex align-items-center flex-wrap gap-2 landing-auth-actions">

            <CButton
              color="primary"
              variant="outline"
              onClick={cambiarTema}
              title={oscuro ? 'Modo claro' : 'Modo oscuro'}
              aria-label={oscuro ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              <CIcon
                icon={
                  oscuro
                    ? icons.cilSun || icons.cilStar
                    : icons.cilMoon || icons.cilStar
                }
              />
            </CButton>

            <CButton
              as={Link}
              to="/authentication/login"
              color="primary"
              variant="outline"
            >
              Iniciar sesión
            </CButton>

            <CButton
              as="a"
              href="#reservaciones"
              color="primary"
              onClick={() => setVisible(false)}
            >
              Reservar ahora
            </CButton>

          </div>
        </CCollapse>

      </CContainer>
    </CNavbar>
  )
}

export default LandingHeader