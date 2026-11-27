import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'

import { routes } from '../routes'

import {
  CBreadcrumb,
  CBreadcrumbItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilHome } from '@coreui/icons'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  // IDENTIFICAR EL NOMBRE DE LA RUTA

  const getRouteName = (pathname, routes) => {
    const exact = routes.find(
      (route) => route.path === pathname,
    )

    if (exact) return exact.name

    const dynamic = routes.find((route) =>
      matchPath(
        { path: route.path, end: true },
        pathname,
      ),
    )

    return dynamic ? dynamic.name : false
  }

  // GENERAR LA RUTA DE NAVEGACION

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []

    location.split('/').reduce(
      (prev, curr, index, array) => {
        const currentPathname = `${prev}/${curr}`

        const routeName = getRouteName(
          currentPathname,
          routes,
        )

        routeName &&
          breadcrumbs.push({
            pathname: currentPathname,
            name: routeName,
            active: index + 1 === array.length,
          })

        return currentPathname
      },
    )

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  const esInicio = currentLocation === '/panel/dashboard'

  return (
    <CBreadcrumb
      className="my-0 py-2"
      aria-label="Ruta de navegación"
    >
      {/* ENLACE AL PANEL PRINCIPAL */}

      <CBreadcrumbItem active={esInicio}>
        {esInicio ? (
          <span className="d-inline-flex align-items-center gap-2">
            <CIcon icon={cilHome} />
            Inicio
          </span>
        ) : (
          <Link
            to="/panel/dashboard"
            className="d-inline-flex align-items-center gap-2 text-decoration-none"
          >
            <CIcon icon={cilHome} />
            Inicio
          </Link>
        )}
      </CBreadcrumbItem>

      {/* RUTAS GENERADAS AUTOMATICAMENTE */}

      {!esInicio &&
        breadcrumbs.map((breadcrumb) => (
          <CBreadcrumbItem
            key={breadcrumb.pathname}
            active={breadcrumb.active}
          >
            {breadcrumb.active ? (
              <span className="fw-medium">
                {breadcrumb.name}
              </span>
            ) : (
              <Link
                to={breadcrumb.pathname}
                className="text-decoration-none"
              >
                {breadcrumb.name}
              </Link>
            )}
          </CBreadcrumbItem>
        ))}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)