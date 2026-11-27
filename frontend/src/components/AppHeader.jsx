import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { HotelBadge } from './hotel'

const AppHeader = () => {
  const headerRef = useRef()

  const { colorMode, setColorMode } = useColorModes(
    'coreui-free-react-admin-template-theme',
  )

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // EFECTO DE SOMBRA AL DESPLAZARSE

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current &&
        headerRef.current.classList.toggle(
          'shadow-sm',
          document.documentElement.scrollTop > 0,
        )
    }

    document.addEventListener('scroll', handleScroll)

    return () =>
      document.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <CHeader
      position="sticky"
      className="mb-4 p-0"
      ref={headerRef}
    >
      <CContainer className="border-bottom px-4" fluid>

        {/* BOTON DEL MENU LATERAL */}

        <CHeaderToggler
          onClick={() =>
            dispatch({
              type: 'set',
              sidebarShow: !sidebarShow,
            })
          }
          style={{ marginInlineStart: '-14px' }}
          aria-label="Mostrar u ocultar menú lateral"
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        {/* NOMBRE DEL HOTEL */}

        <div className="d-flex align-items-center flex-wrap gap-2 m-2">
          <span className="fw-semibold">
            Gran Hotel El Toro
          </span>

          <HotelBadge
            color="primary"
            className="d-none d-md-inline-flex"
          >
            Administración
          </HotelBadge>
        </div>

        {/* ACCESOS RAPIDOS */}

        <CHeaderNav className="ms-auto">

          {/* NOTIFICACIONES */}

          <CNavItem>
            <CNavLink
              href="#"
              title="Notificaciones"
              aria-label="Notificaciones"
            >
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>

          {/* ACTIVIDADES */}

          <CNavItem>
            <CNavLink
              href="#"
              title="Actividades"
              aria-label="Actividades"
            >
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>

          {/* MENSAJES */}

          <CNavItem>
            <CNavLink
              href="#"
              title="Mensajes"
              aria-label="Mensajes"
            >
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>

        </CHeaderNav>

        {/* SELECTOR DEL TEMA */}

        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75" />
          </li>

          <CDropdown
            variant="nav-item"
            placement="bottom-end"
          >
            <CDropdownToggle
              caret={false}
              title="Cambiar tema"
              aria-label="Cambiar tema"
            >
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>

            <CDropdownMenu>

              {/* MODO CLARO */}

              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon
                  className="me-2"
                  icon={cilSun}
                  size="lg"
                />

                Modo claro
              </CDropdownItem>

              {/* MODO OSCURO */}

              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon
                  className="me-2"
                  icon={cilMoon}
                  size="lg"
                />

                Modo oscuro
              </CDropdownItem>

              {/* MODO AUTOMATICO */}

              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon
                  className="me-2"
                  icon={cilContrast}
                  size="lg"
                />

                Automático
              </CDropdownItem>

            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>

      </CContainer>

      {/* RUTA DE NAVEGACION */}

      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>

    </CHeader>
  )
}

export default AppHeader