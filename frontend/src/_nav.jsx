import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBed, cilSpeedometer } from '@coreui/icons'
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
    icon: <CIcon icon={cilBed} customClassName='nav-icon' />
  }
]

export default _nav