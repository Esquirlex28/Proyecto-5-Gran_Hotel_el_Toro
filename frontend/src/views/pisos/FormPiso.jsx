import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CRow, CCol } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilBuilding } from '@coreui/icons'

import { postPiso } from '../../service/api'

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
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)

  const [piso, setPiso] = useState({
    Codigo_Piso: '',
    Nombre_Piso: '',
    Capacidad_Habitaciones: 1,
    Observaciones: '',
  })

  // REDIRECCION DESPUES DE GUARDAR

  useEffect(() => {
    if (!mensaje) return

    const temporizador = setTimeout(() => {
      navigate('/panel/pisos')
    }, 2000)

    return () => clearTimeout(temporizador)
  }, [mensaje, navigate])

  // CAMBIOS EN LOS CAMPOS

  const handleChange = (e) => {
    const { name, value } = e.target

    setPiso((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // GUARDAR PISO

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (guardando || mensaje) return

    setError('')

    // LA EDICION TODAVIA NO ESTA IMPLEMENTADA

    if (esEdicion) {
      setError(
        'La modificación de pisos todavía no está habilitada.',
      )
      return
    }

    setGuardando(true)

    try {
      const res = await postPiso({
        Codigo_Piso: piso.Codigo_Piso.trim(),

        Nombre_Piso: piso.Nombre_Piso.trim(),

        Capacidad_Habitaciones: Number(
          piso.Capacidad_Habitaciones,
        ),

        Observaciones: piso.Observaciones.trim(),
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

  const bloqueado =
    guardando ||
    mensaje ||
    esEdicion

  return (
    <>

      {/* MENSAJE DE EXITO */}

      {mensaje && (
        <HotelAlert
          color="success"
          title="Operación exitosa"
          className="mb-4"
        >
          ¡Piso creado con éxito!
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

      {/* AVISO SOBRE LA EDICION */}

      {esEdicion && (
        <HotelAlert
          color="warning"
          title="Función no disponible"
          className="mb-4"
        >
          La modificación de pisos todavía
          no está habilitada.
        </HotelAlert>
      )}

      {/* FORMULARIO PRINCIPAL */}

      <HotelForm
        title={
          esEdicion
            ? 'Editar piso'
            : 'Crear piso'
        }
        subtitle={
          esEdicion
            ? 'Modifique la información del piso.'
            : 'Complete la información del nuevo piso.'
        }
        icon={<CIcon icon={cilBuilding} size="xl" />}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/panel/pisos')}
        submitText="Guardar"
        loading={guardando}
        disabled={guardando || mensaje}
        showSubmit={!esEdicion}
        className="mb-4"
      >

        <CRow className="g-4">

          {/* CODIGO DEL PISO */}

          <CCol md={6}>
            <HotelInput
              type="text"
              name="Codigo_Piso"
              label="Código del piso"
              placeholder="P1"
              maxLength={25}
              required
              disabled={bloqueado}
              value={piso.Codigo_Piso}
              onChange={handleChange}
            />
          </CCol>

          {/* NOMBRE DEL PISO */}

          <CCol md={6}>
            <HotelInput
              type="text"
              name="Nombre_Piso"
              label="Nombre del piso"
              placeholder="Piso 1"
              maxLength={50}
              required
              disabled={bloqueado}
              value={piso.Nombre_Piso}
              onChange={handleChange}
            />
          </CCol>

          {/* CAPACIDAD DE HABITACIONES */}

          <CCol xs={12}>
            <HotelInput
              type="number"
              name="Capacidad_Habitaciones"
              label="Capacidad de habitaciones"
              placeholder="20"
              min={1}
              required
              disabled={bloqueado}
              value={piso.Capacidad_Habitaciones}
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
              name="Observaciones"
              disabled={bloqueado}
              value={piso.Observaciones}
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