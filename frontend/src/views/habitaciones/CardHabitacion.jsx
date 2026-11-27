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
  ID_Habitacion = 0,
  Numero_Habitacion = 0,
  Tipo_Vista = '',
  Nombre_Tipo = '',
  Capacidad_Maxima = 0,
  Tarifa_Base = 0,
  Nombre_Piso = '',
  Nombre_Estado = '',
}) => {
  const navigate = useNavigate()
  return (
    <CCard className="h-100 shadow-sm border-0 overflow-hidden">
      <div className="position-relative">
        <CCardImage
          orientation="top"
          src={habitacionImage}
          alt={`Habitación ${Numero_Habitacion}`}
          className="object-fit-cover"
          style={{ height: '12rem' }}
        />
        <CBadge
          color={coloresEstado[Nombre_Estado] ?? 'secondary'}
          className="position-absolute top-0 start-0 m-2 px-3 py-2"
        >
          {Nombre_Estado}
        </CBadge>
      </div>
      <CCardBody>
        <CCardTitle>Habitación #{Numero_Habitacion}</CCardTitle>
        <CListGroup flush>
          <CListGroupItem className="d-flex justify-content-between px-0">
            <span>
              <CIcon icon={cilTags} className="me-2 text-body-secondary" /> Tipo
            </span>
            <strong>{Nombre_Tipo}</strong>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between px-0">
            <span>
              <CIcon icon={cilPeople} className="me-2 text-body-secondary" /> Capacidad
            </span>
            <strong>{Capacidad_Maxima}</strong>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between px-0">
            <span>
              <CIcon icon={cilDollar} className="me-2 text-body-secondary" /> Tarifa
            </span>
            <strong>{Tarifa_Base}</strong>
          </CListGroupItem>
          <CListGroupItem className="d-flex justify-content-between px-0">
            <span>
              <CIcon icon={cilBuilding} className="me-2 text-body-secondary" /> Piso
            </span>
            <strong>{Nombre_Piso}</strong>
          </CListGroupItem>
        </CListGroup>
        <CButton
          className="w-100 mt-3"
          color="primary"
          onClick={() => navigate(`/panel/habitaciones/${ID_Habitacion}`)}
        >
          Gestionar Habitacion
        </CButton>
      </CCardBody>
    </CCard>
  )
}
