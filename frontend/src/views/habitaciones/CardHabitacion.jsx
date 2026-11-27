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
          alt={`Habitación ${Numero_Habitacion}`}
          className="object-fit-cover"
          style={{ height: '12rem' }}
        />

        <HotelBadge
          color={coloresEstado[Nombre_Estado] ?? 'secondary'}
          soft={false}
          className="position-absolute top-0 start-0 m-2 px-3 py-2"
        >
          {Nombre_Estado}
        </HotelBadge>

      </div>

      {/* INFORMACION DE LA HABITACION */}

      <div className="p-3">

        <h5 className="mb-3">
          Habitación #{Numero_Habitacion}
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

            <strong>{Nombre_Tipo}</strong>
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

            <strong>{Capacidad_Maxima}</strong>
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

            <strong>{Tarifa_Base}</strong>
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

            <strong>{Nombre_Piso}</strong>
          </CListGroupItem>

        </CListGroup>

        {/* BOTON PARA GESTIONAR LA HABITACION */}

        <HotelButton
          className="w-100 mt-3"
          color="primary"
          icon={cilArrowRight}
          onClick={() =>
            navigate(`/panel/habitaciones/${ID_Habitacion}`)
          }
        >
          Gestionar habitación
        </HotelButton>

      </div>

    </HotelCard>
  )
}