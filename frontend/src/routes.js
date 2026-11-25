import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Habitaciones = React.lazy(() => import('./views/habitaciones/Habitaciones'))

const routes = [
  { path: '/panel', exact: true, name: 'Inicio' },
  { path: '/panel/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/panel/habitaciones', name: 'Habitaciones', element: Habitaciones },
]

export {routes}