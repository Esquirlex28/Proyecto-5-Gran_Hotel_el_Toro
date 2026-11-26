import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CRow, CCol, CContainer, CButton } from '@coreui/react'
import { CardHabitacion } from './CardHabitacion'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons';

const habitaciones = [
  { id:1, numero: 204, estado: 'Reservado', tipo: 'Business', Tarifa: 3000, capacidad: 6 },
  { id:2, numero: 205, estado: 'Mantenimiento' },
  { id:3, numero: 206, estado: 'Ocupada' },
  { id:4, numero: 207 },
  { id:5, numero: 208 },
  // ...
]

const Habitaciones = () => {

  const navigate = useNavigate()

  return (
    <>
      <h1>CRUD de las Habitaciones</h1>
      <CContainer className="mb-4">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <p className="mb-0 flex-grow-1">
            Aquí encontrarás todas las habitaciones disponibles para poder gestionarlas
          </p>
          <CButton
            color="primary"
            className="text-primary bg-transparent border-2 flex-shrink-0"
            onClick={()=>{navigate('/panel/habitaciones/form')}}
          >
            <CIcon icon={icon.cilPlus} /> Crear Habitacion
          </CButton>
        </div>
      </CContainer>
      <hr />
      <CRow xs={{ cols: 1 }} md={{ cols: 2 }} lg={{ cols: 3 }} className='g-4 mb-4 m-auto'>
        {habitaciones.map(h => (
          <CCol key={h.numero}>
            <CardHabitacion id={h.id} numero={h.numero} estado={h.estado} tipo={h.tipo} Capacidad={h.capacidad} />
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default Habitaciones
