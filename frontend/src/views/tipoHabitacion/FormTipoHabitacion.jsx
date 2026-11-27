import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CRow, CCol } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilTags } from '@coreui/icons'

import { postTipoHabitacion } from '../../service/api'

import {
  HotelForm,
  HotelInput,
  HotelAlert,
} from '../../components/hotel'

const FormTipoHabitacion = () => {
  const navigate = useNavigate()

  const [mensaje, setMensaje] = useState(false)
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)

  const [tipo, setTipo] = useState({
    Nombre_Tipo: '',
    Capacidad_Maxima: 1,
    Tarifa_Base: '',
  })

  // REDIRECCION DESPUES DE GUARDAR

  useEffect(() => {
    if (!mensaje) return

    const temporizador = setTimeout(() => {
      navigate('/panel/tipohabitacion')
    }, 2000)

    return () => clearTimeout(temporizador)
  }, [mensaje, navigate])

  // CAMBIOS EN LOS CAMPOS

  const handleChange = (e) => {
    const { name, value } = e.target

    setTipo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // GUARDAR TIPO DE HABITACION

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (guardando || mensaje) return

    setError('')
    setGuardando(true)

    try {
      const res = await postTipoHabitacion({
        Nombre_Tipo: tipo.Nombre_Tipo.trim(),

        Capacidad_Maxima: Number(
          tipo.Capacidad_Maxima,
        ),

        Tarifa_Base: Number(
          tipo.Tarifa_Base,
        ),
      })

      if (res?.error) {
        setError(res.error)
        return
      }

      if (!res) {
        setError(
          'No se recibió una respuesta del servidor.',
        )
        return
      }

      setMensaje(true)

    } catch (e) {
      console.error(e)

      setError(
        'No se pudo conectar con el servidor.',
      )
    } finally {
      setGuardando(false)
    }
  }

  const bloqueado = guardando || mensaje

  return (
    <>

      {/* MENSAJE DE EXITO */}

      {mensaje && (
        <HotelAlert
          color="success"
          title="Operación exitosa"
          className="mb-4"
        >
          ¡Tipo de habitación creado con éxito!
        </HotelAlert>
      )}

      {/* MENSAJE DE ERROR */}

      {error && (
        <HotelAlert
          color="danger"
          title="Error"
          className="mb-4"
          dismissible
          onClose={() => setError('')}
        >
          {error}
        </HotelAlert>
      )}

      {/* FORMULARIO PRINCIPAL */}

      <HotelForm
        title="Crear tipo de habitación"
        subtitle="Complete la información del nuevo tipo de habitación."
        icon={<CIcon icon={cilTags} size="xl" />}
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate('/panel/tipohabitacion')
        }
        submitText="Guardar"
        loading={guardando}
        disabled={bloqueado}
        className="mb-4"
      >

        <CRow className="g-4">

          {/* NOMBRE DEL TIPO */}

          <CCol xs={12}>
            <HotelInput
              type="text"
              name="Nombre_Tipo"
              label="Nombre del tipo"
              placeholder="Suite"
              maxLength={100}
              required
              disabled={bloqueado}
              value={tipo.Nombre_Tipo}
              onChange={handleChange}
            />
          </CCol>

          {/* CAPACIDAD MAXIMA */}

          <CCol md={6}>
            <HotelInput
              type="number"
              name="Capacidad_Maxima"
              label="Capacidad máxima"
              placeholder="2"
              min={1}
              required
              disabled={bloqueado}
              value={tipo.Capacidad_Maxima}
              onChange={handleChange}
            />
          </CCol>

          {/* TARIFA BASE */}

          <CCol md={6}>
            <HotelInput
              type="number"
              name="Tarifa_Base"
              label="Tarifa base"
              placeholder="1500.00"
              min={0.01}
              step={0.01}
              required
              disabled={bloqueado}
              value={tipo.Tarifa_Base}
              onChange={handleChange}
            />
          </CCol>

        </CRow>

      </HotelForm>

    </>
  )
}

export default FormTipoHabitacion