import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBed, cilBuilding, cilMap, cilPeople, cilSpeedometer, cilTags } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/panel/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  { component: CNavTitle, name: 'Gestión' },
  {
    component: CNavItem,
    name: 'Habitaciones',
    to: '/panel/habitaciones',
    icon: <CIcon icon={cilBed} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Tipo Habitaciones',
    to: '/panel/tipohabitacion',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pisos',
    to: '/panel/pisos',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  { component: CNavTitle, name: 'Usuarios y Cuentas' },
  {
    component: CNavItem,
    name: 'Paises',
    to: '/panel/paises',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Clientes',
    to: '/panel/clientes',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Empleados',
    to: '/panel/empleados',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
]

export default _nav
