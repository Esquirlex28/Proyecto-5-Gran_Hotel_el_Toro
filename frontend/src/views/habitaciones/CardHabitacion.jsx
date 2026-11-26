import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardTitle, CButton, CCardImage, CBadge, CListGroup, CListGroupItem } from '@coreui/react'
import habitacionImage from '../../assets/images/habitacion.jpg'
import CIcon from '@coreui/icons-react'
import { cilTags, cilPeople, cilDollar, cilLayers, cilBuilding } from '@coreui/icons'

const coloresEstado = {
  Disponible: 'success',
  Ocupada: 'danger',
  Mantenimiento: 'warning',
  Reservada: 'info',
}

export const CardHabitacion = ({
  id,
  numero = 100,
  estado = 'Disponible',
  tipo = 'Normal',
  Capacidad = 4,
  Tarifa = 1500,
  piso = 1
}) => {
  const navigate = useNavigate()
  return (
    <CCard className='shadow-sm border-0' style={{ width: '24rem', objectFit: 'cover' }}>
      <div className='position-relative'>
        <CCardImage orientation="top" src={habitacionImage} className='opacity-75' />
        <CBadge
          color={coloresEstado[estado] ?? 'secondary'}
          className='position-absolute top-0 start-0 m-2 px-3 py-2'
        >
          {estado}
        </CBadge>
      </div>
      <CCardBody>
        <CCardTitle>Habitación #{numero}</CCardTitle>
        <CListGroup flush>
          <CListGroupItem className="d-flex justify-content-between">
            <span><CIcon icon={cilTags} className='mx-2'/> Tipo</span>
            <strong>{tipo}</strong>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between">
            <span><CIcon icon={cilPeople} className='mx-2'/> Capacidad</span>
            <strong>{Capacidad}</strong>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between">
            <span><CIcon icon={cilDollar} className='mx-2'/> Tarifa</span>
            <strong>{Tarifa}</strong>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between">
            <span><CIcon icon={cilBuilding} className='mx-2'/> Piso</span>
            <strong>{piso}</strong>
          </CListGroupItem>
        </CListGroup>
        <CButton className='m-2' color="primary" onClick={() => navigate(`/panel/habitaciones/${id}`)}>
          Gestionar Habitacion
        </CButton>
      </CCardBody>
    </CCard>
  )
}
