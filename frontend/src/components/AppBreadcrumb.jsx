import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'

import { routes } from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    // Rutas estáticas primero para que '/panel/habitaciones/form' no se confunda con ':numero'
    const exact = routes.find((route) => route.path === pathname)
    if (exact) return exact.name
    const dynamic = routes.find((route) => matchPath({ path: route.path, end: true }, pathname))
    return dynamic ? dynamic.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem>
        <Link to="/panel/dashboard">Home</Link>
      </CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => (
        <CBreadcrumbItem key={index} active={breadcrumb.active}>
          {breadcrumb.active ? (
            breadcrumb.name
          ) : (
            <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>
          )}
        </CBreadcrumbItem>
      ))}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
