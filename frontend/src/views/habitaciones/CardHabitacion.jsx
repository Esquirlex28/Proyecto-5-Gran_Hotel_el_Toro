import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCardImage,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
  cilTags,
  cilPeople,
  cilDollar,
  cilBuilding,
  cilArrowRight,
} from '@coreui/icons'

import habitacionImage from '../../assets/images/habitacion.jpg'

import {
  HotelCard,
  HotelBadge,
  HotelButton,
} from '../../components/hotel'

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
    <HotelCard
      className="h-100 overflow-hidden"
      bodyClassName="p-0"
      hoverable
    >
      {/* IMAGEN Y ESTADO DE LA HABITACION */}

      <div className="position-relative">
        <CCardImage
          orientation="top"
          src={habitacionImage}
          alt={`Habitación ${numero}`}
          className="object-fit-cover"
          style={{ height: '12rem' }}
        />

        <HotelBadge
          color={coloresEstado[estado] ?? 'secondary'}
          soft={false}
          className="position-absolute top-0 start-0 m-2 px-3 py-2"
        >
          {estado}
        </HotelBadge>
      </div>

      {/* INFORMACION DE LA HABITACION */}

      <div className="p-3">

        <h5 className="mb-3">
          Habitación #{numero}
        </h5>

        <CListGroup flush>

          {/* TIPO */}

          <CListGroupItem className="d-flex justify-content-between px-0">
            <span>
              <CIcon
                icon={cilTags}
                className="me-2 text-body-secondary"
              />
              Tipo
            </span>

            <strong>{tipo}</strong>
          </CListGroupItem>

          {/* CAPACIDAD */}

          <CListGroupItem className="d-flex justify-content-between px-0">
            <span>
              <CIcon
                icon={cilPeople}
                className="me-2 text-body-secondary"
              />
              Capacidad
            </span>

            <strong>{Capacidad}</strong>
          </CListGroupItem>

          {/* TARIFA */}

          <CListGroupItem className="d-flex justify-content-between px-0">
            <span>
              <CIcon
                icon={cilDollar}
                className="me-2 text-body-secondary"
              />
              Tarifa
            </span>

            <strong>{Tarifa}</strong>
          </CListGroupItem>

          {/* PISO */}

          <CListGroupItem className="d-flex justify-content-between px-0">
            <span>
              <CIcon
                icon={cilBuilding}
                className="me-2 text-body-secondary"
              />
              Piso
            </span>

            <strong>{piso}</strong>
          </CListGroupItem>

        </CListGroup>

        {/* BOTON PARA GESTIONAR LA HABITACION */}

        <HotelButton
          className="w-100 mt-3"
          color="primary"
          icon={cilArrowRight}
          onClick={() => navigate(`/panel/habitaciones/${id}`)}
        >
          Gestionar habitación
        </HotelButton>

      </div>
    </HotelCard>
  )
}