import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBed } from '@coreui/icons'

import {
  HotelForm,
  HotelInput,
  HotelSelect,
  HotelTextarea,
  HotelAlert,
} from '../../components/hotel'

const tipoHabitacion = [
  { id: 1, nombre: 'Normal' },
  { id: 2, nombre: 'Business' },
  { id: 3, nombre: 'Suite' },
]

const pisoHabitacion = [
  { id: 1, nombre: 'Piso 1' },
  { id: 2, nombre: 'Piso 2' },
  { id: 3, nombre: 'Piso 3' },
]

const estadoHabitacion = [
  { id: 1, nombre: 'Disponible' },
  { id: 2, nombre: 'Ocupada' },
  { id: 3, nombre: 'Mantenimiento' },
  { id: 4, nombre: 'Reservada' },
]

const FormHabitacion = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const esEdicion = id !== undefined

  const rutaRegreso = esEdicion
    ? `/panel/habitaciones/${id}`
    : '/panel/habitaciones'

  const [mensaje, setMensaje] = useState(false)

  const [habitacion, setHabitacion] = useState(
    esEdicion
      ? {
          numero: Number(id),
          tipo: 1,
          tipoVistas: '',
          piso: 1,
          estado: 1,
        }
      : {
          numero: '',
          tipo: '',
          tipoVistas: '',
          piso: '',
          estado: '',
        },
  )

  const handleChange = (e) => {
    const { name, value } = e.target

    setHabitacion((prev) => ({
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

    console.log(habitacion)

    setMensaje(true)

    setTimeout(() => navigate(rutaRegreso), 2000)
  }

  return (
    <>
      {mensaje && (
        <HotelAlert
          color="success"
          title="Operación exitosa"
          className="mb-4"
        >
          ¡Habitación {esEdicion ? 'actualizada' : 'creada'} con éxito!
        </HotelAlert>
      )}

      <HotelForm
        title={esEdicion ? 'Editar habitación' : 'Crear habitación'}
        subtitle={
          esEdicion
            ? 'Modifique la información de la habitación.'
            : 'Complete la información de la nueva habitación.'
        }
        icon={<CIcon icon={cilBed} size="xl" />}
        onSubmit={handleSubmit}
        onCancel={() => navigate(rutaRegreso)}
        className="mb-4"
      >
        <CRow className="g-4">

          {/* NUMERO DE HABITACION */}

          <CCol md={6}>
            <HotelInput
              type="number"
              name="numero"
              label="Número de habitación"
              placeholder="204"
              min={100}
              max={999}
              required
              value={habitacion.numero}
              onChange={handleChange}
            />
          </CCol>

          {/* TIPO DE HABITACION */}

          <CCol md={6}>
            <HotelSelect
              label="Tipo de habitación"
              name="tipo"
              required
              value={habitacion.tipo}
              onChange={handleChange}
            >
              <option value="" disabled>
                Seleccione el tipo de habitación
              </option>

              {tipoHabitacion.map((th) => (
                <option key={th.id} value={th.id}>
                  {th.nombre}
                </option>
              ))}
            </HotelSelect>
          </CCol>

          {/* TIPO DE VISTAS */}

          <CCol xs={12}>
            <HotelTextarea
              label="Tipo de vistas"
              rows={5}
              name="tipoVistas"
              placeholder="Describa las vistas de la habitación..."
              helpText="Descripción de las vistas en 15-20 palabras."
              value={habitacion.tipoVistas}
              onChange={handleChange}
              showCount
            />
          </CCol>

          {/* PISO DE LA HABITACION */}

          <CCol md={6}>
            <HotelSelect
              label="Piso de la habitación"
              name="piso"
              required
              value={habitacion.piso}
              onChange={handleChange}
            >
              <option value="" disabled>
                Seleccione el piso
              </option>

              {pisoHabitacion.map((ph) => (
                <option key={ph.id} value={ph.id}>
                  {ph.nombre}
                </option>
              ))}
            </HotelSelect>
          </CCol>

          {/* ESTADO DE LA HABITACION */}

          <CCol md={6}>
            <HotelSelect
              label="Estado de la habitación"
              name="estado"
              required
              value={habitacion.estado}
              onChange={handleChange}
            >
              <option value="" disabled>
                Seleccione el estado
              </option>

              {estadoHabitacion.map((eh) => (
                <option key={eh.id} value={eh.id}>
                  {eh.nombre}
                </option>
              ))}
            </HotelSelect>
          </CCol>

        </CRow>
      </HotelForm>
    </>
  )
}

export default FormHabitacion