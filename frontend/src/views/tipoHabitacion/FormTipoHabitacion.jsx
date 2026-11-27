import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTags } from '@coreui/icons'

import {
  HotelForm,
  HotelInput,
  HotelAlert,
} from '../../components/hotel'

const FormTipoHabitacion = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const esEdicion = id !== undefined

  const [mensaje, setMensaje] = useState(false)

  const [tipo, setTipo] = useState(
    esEdicion
      ? {
          nombre: 'Normal',
          capacidadMaxima: 2,
          tarifaBase: 850.0,
        }
      : {
          nombre: '',
          capacidadMaxima: 1,
          tarifaBase: '',
        },
  )

  const handleChange = (e) => {
    const { name, value } = e.target

    setTipo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(
      esEdicion
        ? 'Mandando peticion de actualizacion'
        : 'Mandando peticion de creacion',
    )

    console.log(tipo)

    setMensaje(true)

    setTimeout(() => navigate('/panel/tipohabitacion'), 2000)
  }

  return (
    <>
      {/* MENSAJE DEL SISTEMA */}

      {mensaje && (
        <HotelAlert
          color="success"
          title="Operación de prueba exitosa"
          className="mb-4"
        >
          ¡Tipo de habitación {esEdicion ? 'actualizado' : 'creado'} en la simulación!
        </HotelAlert>
      )}

      {/* FORMULARIO PRINCIPAL */}

      <HotelForm
        title={
          esEdicion
            ? 'Editar tipo de habitación'
            : 'Crear tipo de habitación'
        }
        subtitle={
          esEdicion
            ? 'Modifique la información del tipo de habitación.'
            : 'Complete la información del nuevo tipo de habitación.'
        }
        icon={<CIcon icon={cilTags} size="xl" />}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/panel/tipohabitacion')}
        className="mb-4"
      >
        <CRow className="g-4">

          {/* NOMBRE DEL TIPO */}

          <CCol xs={12}>
            <HotelInput
              type="text"
              name="nombre"
              label="Nombre del tipo"
              placeholder="Suite"
              maxLength={100}
              required
              value={tipo.nombre}
              onChange={handleChange}
            />
          </CCol>

          {/* CAPACIDAD MAXIMA */}

          <CCol md={6}>
            <HotelInput
              type="number"
              name="capacidadMaxima"
              label="Capacidad máxima"
              placeholder="2"
              min={1}
              required
              value={tipo.capacidadMaxima}
              onChange={handleChange}
            />
          </CCol>

          {/* TARIFA BASE */}

          <CCol md={6}>
            <HotelInput
              type="number"
              name="tarifaBase"
              label="Tarifa base"
              placeholder="1500.00"
              min={0.01}
              step={0.01}
              required
              value={tipo.tarifaBase}
              onChange={handleChange}
            />
          </CCol>

        </CRow>
      </HotelForm>
    </>
  )
}

export default FormTipoHabitacion