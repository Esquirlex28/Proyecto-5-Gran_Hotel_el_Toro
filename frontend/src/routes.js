import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Habitaciones = React.lazy(() => import('./views/habitaciones/Habitaciones'))
const DetallesHabitacion = React.lazy(() => import('./views/habitaciones/DetallesHabitacion'))
const FormHabitacion = React.lazy(() => import('./views/habitaciones/FormHabitacion'))
const TipoHabitacion = React.lazy(() => import('./views/tipoHabitacion/TipoHabitacion'))
const FormTipoHabitacion = React.lazy(() => import('./views/tipoHabitacion/FormTipoHabitacion'))
const Pisos = React.lazy(() => import('./views/pisos/Pisos'))
const FormPiso = React.lazy(() => import('./views/pisos/FormPiso'))
const Paises = React.lazy(() => import('./views/paises/Paises'))
const FormPais = React.lazy(() => import('./views/paises/FormPais'))
const Clientes = React.lazy(() => import('./views/clientes/Clientes'))
const FormClientes = React.lazy(() => import('./views/clientes/FormClientes'))
const Empleados = React.lazy(() => import('./views/empleados/Empleados'))
const FormEmpleados = React.lazy(() => import('./views/empleados/FormEmpleados'))
const Cargo = React.lazy(() => import('./views/cargos/Cargo'))
const FormCargo = React.lazy(() => import('./views/cargos/FormCargo'))
const EstadosHabitacion = React.lazy(() => import('./views/estadosHabitacion/EstadosHabitacion'))
const FormEstadoHabitacion = React.lazy(() => import('./views/estadosHabitacion/FormEstadoHabitacion'))
const Comodidades = React.lazy(() => import('./views/comodidades/Comodidades'))


const routes = [
  { path: '/panel/dashboard', exact: true, name: 'Inicio' },
  { path: '/panel/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/panel/habitaciones', exact: true, name: 'Habitaciones', element: Habitaciones },
  { path: '/panel/habitaciones/:id', name: 'Detalles', element: DetallesHabitacion },
  { path: '/panel/habitaciones/form', name: 'Formulario', element: FormHabitacion },
  { path: '/panel/habitaciones/:id/editar', name: 'Editar', element: FormHabitacion },
  { path: '/panel/tipohabitacion', exact: true, name: 'Tipos de Habitacion', element: TipoHabitacion },
  { path: '/panel/tipohabitacion/form', name: 'Formulario', element: FormTipoHabitacion },
  { path: '/panel/pisos', exact: true, name: 'Pisos', element: Pisos },
  { path: '/panel/pisos/form', name: 'Formulario', element: FormPiso },
  { path: '/panel/estadoshabitacion', exact: true, name: 'Estados de Habitacion', element: EstadosHabitacion },
  { path: '/panel/estadoshabitacion/form', name: 'Formulario', element: FormEstadoHabitacion },
  { path: '/panel/comodidades', exact: true, name: 'Comodidades', element: Comodidades },
  { path: '/panel/paises', exact: true, name: 'Paises', element: Paises },
  { path: '/panel/paises/form', exact: true, name: 'Formulario', element: FormPais },
  { path: '/panel/clientes', exact: true, name: 'Clientes', element: Clientes },
  { path: '/panel/clientes/form', exact: true, name: 'Formulario', element: FormClientes },
  { path: '/panel/empleados', exact: true, name: 'Empleados', element: Empleados },
  { path: '/panel/empleados/form', exact: true, name: 'Formulario', element: FormEmpleados },
  { path: '/panel/cargos', exact: true, name: 'Cargos', element: Cargo },
  { path: '/panel/cargos/form', exact: true, name: 'Formulario', element: FormCargo },
]

export { routes }
