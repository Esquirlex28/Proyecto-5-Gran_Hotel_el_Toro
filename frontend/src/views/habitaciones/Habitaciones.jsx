import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CRow, CCol, CContainer, CButton } from '@coreui/react'
import { CardHabitacion } from './CardHabitacion'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { getHabitaciones } from '../../service/api'

const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([
    {ID_Habitacion:0, Numero_Habitacion: 0, Tipo_Vista: '', Nombre_Tipo: '', Capacidad_Maxima:0, Tarifa_Base:0, Nombre_Piso:'', Nombre_Estado: ''}
  ])
  const navigate = useNavigate()

  useEffect(()=>{

    getHabitaciones()
    .then(res => {
        setHabitaciones(res)
        console.log(habitaciones)
    })

  },[]);

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
            variant="outline"
            className="flex-shrink-0"
            onClick={() => {
              navigate('/panel/habitaciones/form')
            }}
          >
            <CIcon icon={icon.cilPlus} /> Crear Habitacion
          </CButton>
        </div>
      </CContainer>
      <hr />
      <CRow xs={{ cols: 1 }} md={{ cols: 2 }} lg={{ cols: 3 }} className="g-4 mb-4">
        {habitaciones.map((h) => (
          <CCol key={h.ID_Habitacion}>
            <CardHabitacion
              ID_Habitacion={h.ID_Habitacion}
              Numero_Habitacion={h.Numero_Habitacion}
              Nombre_Estado={h.Nombre_Estado}
              Nombre_Tipo={h.Nombre_Tipo}
              Capacidad_Maxima={h.Capacidad_Maxima}
              Tarifa_Base={h.Tarifa_Base}
              Nombre_Piso={h.Nombre_Piso}
            />
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default Habitaciones
