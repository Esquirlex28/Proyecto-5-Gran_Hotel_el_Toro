import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBuilding } from '@coreui/icons'

import {
  HotelForm,
  HotelInput,
  HotelTextarea,
  HotelAlert,
} from '../../components/hotel'

const FormPiso = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const esEdicion = id !== undefined

  const [mensaje, setMensaje] = useState(false)

  const [piso, setPiso] = useState(
    esEdicion
      ? {
          codigo: 'P1',
          nombre: 'Piso 1',
          capacidadHabitaciones: 20,
          observaciones: 'Acceso a recepcion y restaurante',
        }
      : {
          codigo: '',
          nombre: '',
          capacidadHabitaciones: 1,
          observaciones: '',
        },
  )

  const handleChange = (e) => {
    const { name, value } = e.target

    setPiso((prev) => ({
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

    console.log(piso)

    setMensaje(true)

    setTimeout(() => navigate('/panel/pisos'), 2000)
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
          ¡Piso {esEdicion ? 'actualizado' : 'creado'} en la simulación!
        </HotelAlert>
      )}

      {/* FORMULARIO PRINCIPAL */}

      <HotelForm
        title={esEdicion ? 'Editar piso' : 'Crear piso'}
        subtitle={
          esEdicion
            ? 'Modifique la información del piso.'
            : 'Complete la información del nuevo piso.'
        }
        icon={<CIcon icon={cilBuilding} size="xl" />}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/panel/pisos')}
        className="mb-4"
      >
        <CRow className="g-4">

          {/* CODIGO DEL PISO */}

          <CCol md={6}>
            <HotelInput
              type="text"
              name="codigo"
              label="Código del piso"
              placeholder="P1"
              maxLength={25}
              required
              value={piso.codigo}
              onChange={handleChange}
            />
          </CCol>

          {/* NOMBRE DEL PISO */}

          <CCol md={6}>
            <HotelInput
              type="text"
              name="nombre"
              label="Nombre del piso"
              placeholder="Piso 1"
              maxLength={50}
              required
              value={piso.nombre}
              onChange={handleChange}
            />
          </CCol>

          {/* CAPACIDAD DE HABITACIONES */}

          <CCol xs={12}>
            <HotelInput
              type="number"
              name="capacidadHabitaciones"
              label="Capacidad de habitaciones"
              placeholder="20"
              min={1}
              required
              value={piso.capacidadHabitaciones}
              onChange={handleChange}
            />
          </CCol>

          {/* OBSERVACIONES */}

          <CCol xs={12}>
            <HotelTextarea
              label="Observaciones"
              rows={4}
              maxLength={500}
              helpText="Opcional. Máximo 500 caracteres."
              placeholder="Escriba las observaciones del piso..."
              name="observaciones"
              value={piso.observaciones}
              onChange={handleChange}
              showCount
            />
          </CCol>

        </CRow>
      </HotelForm>
    </>
  )
}

export default FormPiso