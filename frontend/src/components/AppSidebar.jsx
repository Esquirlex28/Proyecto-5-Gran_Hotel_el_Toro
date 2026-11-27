import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import { HotelBadge } from './hotel'

import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()

  const unfoldable = useSelector(
    (state) => state.sidebarUnfoldable,
  )

  const sidebarShow = useSelector(
    (state) => state.sidebarShow,
  )

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({
          type: 'set',
          sidebarShow: visible,
        })
      }}
    >
      {/* ENCABEZADO DEL MENU LATERAL */}

      <CSidebarHeader className="border-bottom">

        <CSidebarBrand
          as={Link}
          to="/panel/dashboard"
          className="text-decoration-none"
        >
          <span className="sidebar-brand-full">
            <span className="d-flex flex-column align-items-start gap-2">

              <span className="fw-bold fs-5">
                Gran Hotel El Toro
              </span>

              <HotelBadge color="primary">
                Panel administrativo
              </HotelBadge>

            </span>
          </span>

          <span className="sidebar-brand-narrow fw-bold">
            GT
          </span>
        </CSidebarBrand>

        {/* BOTON CERRAR EN DISPOSITIVOS MOVILES */}

        <CCloseButton
          className="d-lg-none"
          dark
          aria-label="Cerrar menú lateral"
          onClick={() =>
            dispatch({
              type: 'set',
              sidebarShow: false,
            })
          }
        />

      </CSidebarHeader>

      {/* OPCIONES DEL MENU */}

      <AppSidebarNav items={navigation} />

      {/* PIE DEL MENU LATERAL */}

      <CSidebarFooter className="border-top d-none d-lg-flex">

        <CSidebarToggler
          aria-label="Expandir o contraer menú lateral"
          onClick={() =>
            dispatch({
              type: 'set',
              sidebarUnfoldable: !unfoldable,
            })
          }
        />

      </CSidebarFooter>

    </CSidebar>
  )
}

export default React.memo(AppSidebar)