import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Habitaciones = React.lazy(() => import('./views/habitaciones/Habitaciones'))
const DetallesHabitacion = React.lazy(() => import('./views/habitaciones/DetallesHabitacion'))
const FormHabitacion = React.lazy(() => import('./views/habitaciones/FormHabitacion'))
const TipoHabitacion = React.lazy(() => import('./views/tipoHabitacion/TipoHabitacion'))
const FormTipoHabitacion = React.lazy(() => import('./views/tipoHabitacion/FormTipoHabitacion'))
const Pisos = React.lazy(() => import('./views/pisos/Pisos'))
const FormPiso = React.lazy(() => import('./views/pisos/FormPiso'))

// Catalogo de componentes
const HotelCatalog = React.lazy(() => import('./components/hotel/HotelCatalog'))

const routes = [
  { path: '/panel/dashboard', exact: true, name: 'Inicio' },
  { path: '/panel/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/panel/habitaciones', exact: true, name: 'Habitaciones', element: Habitaciones },
  { path: '/panel/habitaciones/:id', name: 'Detalles', element: DetallesHabitacion },
  { path: '/panel/habitaciones/form', name: 'Formulario', element: FormHabitacion },
  { path: '/panel/habitaciones/:id/editar', name: 'Editar', element: FormHabitacion },
  { path: '/panel/tipohabitacion', exact: true, name: 'Tipos de Habitacion', element: TipoHabitacion },
  { path: '/panel/tipohabitacion/form', name: 'Formulario', element: FormTipoHabitacion },
  { path: '/panel/tipohabitacion/:id/editar', name: 'Editar', element: FormTipoHabitacion },
  { path: '/panel/pisos', exact: true, name: 'Pisos', element: Pisos },
  { path: '/panel/pisos/form', name: 'Formulario', element: FormPiso },
  { path: '/panel/pisos/:id/editar', name: 'Editar', element: FormPiso },

  // Ruta temporal para probar los componentes
  { path: '/panel/componentes', name: 'Componentes', element: HotelCatalog },
]

export { routes }
