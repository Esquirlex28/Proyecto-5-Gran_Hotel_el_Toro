import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardTitle,
  CButton,
  CCardImage,
  CBadge,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import habitacionImage from '../../assets/images/habitacion.jpg'
import CIcon from '@coreui/icons-react'
import { cilTags, cilPeople, cilDollar, cilBuilding } from '@coreui/icons'

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
  piso = 1,
}) => {
  const navigate = useNavigate()
  return (
    <CCard className="h-100 shadow-sm border-0 overflow-hidden">
      <div className="position-relative">
        <CCardImage
          orientation="top"
          src={habitacionImage}
          alt={`Habitación ${numero}`}
          className="object-fit-cover"
          style={{ height: '12rem' }}
        />
        <CBadge
          color={coloresEstado[estado] ?? 'secondary'}
          className="position-absolute top-0 start-0 m-2 px-3 py-2"
        >
          {estado}
        </CBadge>
      </div>
      <CCardBody>
        <CCardTitle>Habitación #{numero}</CCardTitle>
        <CListGroup flush>
          <CListGroupItem className="d-flex justify-content-between px-0">
            <span>
              <CIcon icon={cilTags} className="me-2 text-body-secondary" /> Tipo
            </span>
            <strong>{tipo}</strong>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between px-0">
            <span>
              <CIcon icon={cilPeople} className="me-2 text-body-secondary" /> Capacidad
            </span>
            <strong>{Capacidad}</strong>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between px-0">
            <span>
              <CIcon icon={cilDollar} className="me-2 text-body-secondary" /> Tarifa
            </span>
            <strong>{Tarifa}</strong>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between px-0">
            <span>
              <CIcon icon={cilBuilding} className="me-2 text-body-secondary" /> Piso
            </span>
            <strong>{piso}</strong>
          </CListGroupItem>
        </CListGroup>
        <CButton
          className="w-100 mt-3"
          color="primary"
          onClick={() => navigate(`/panel/habitaciones/${id}`)}
        >
          Gestionar Habitacion
        </CButton>
      </CCardBody>
    </CCard>
  )
}
