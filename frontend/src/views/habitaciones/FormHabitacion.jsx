import React, { useEffect, useState } from 'react'
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
  HotelLoader,
} from '../../components/hotel'

import {
  postHabitacion,
  getTiposHabitacion,
  getPisos,
  getEstadosHabitacion,
} from '../../service/api'

const FormHabitacion = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const esEdicion = id !== undefined

  const rutaRegreso = esEdicion
    ? `/panel/habitaciones/${id}`
    : '/panel/habitaciones'

  const [mensaje, setMensaje] = useState(false)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [errorCarga, setErrorCarga] = useState('')

  const [tiposHabitacion, setTiposHabitacion] = useState([])
  const [pisos, setPisos] = useState([])
  const [estadosHabitacion, setEstadosHabitacion] = useState([])

  const [habitacion, setHabitacion] = useState({
    Numero_Habitacion: '',
    ID_Tipo_Habitacion: '',
    Tipo_Vista: '',
    ID_Piso: '',
    ID_Estado_Habitacion: '',
  })

  // OBTENER DATOS DESDE EL BACKEND

  useEffect(() => {
    let activo = true

    setCargando(true)
    setErrorCarga('')

    Promise.all([
      getTiposHabitacion(),
      getPisos(),
      getEstadosHabitacion(),
    ])
      .then(([tipos, pisosData, estados]) => {
        if (!activo) return

        if (
          !Array.isArray(tipos) ||
          !Array.isArray(pisosData) ||
          !Array.isArray(estados)
        ) {
          throw new Error('Respuesta incorrecta del servidor')
        }

        setTiposHabitacion(tipos)
        setPisos(pisosData)
        setEstadosHabitacion(estados)
      })
      .catch((e) => {
        console.error(e)

        if (activo) {
          setErrorCarga(
            'No fue posible cargar los datos del formulario.',
          )
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false)
        }
      })

    return () => {
      activo = false
    }
  }, [])

  // REDIRECCION DESPUES DE GUARDAR

  useEffect(() => {
    if (!mensaje) return

    const temporizador = setTimeout(() => {
      navigate(rutaRegreso)
    }, 2000)

    return () => clearTimeout(temporizador)
  }, [mensaje, navigate, rutaRegreso])

  // CAMBIOS EN LOS CAMPOS

  const handleChange = (e) => {
    const { name, value } = e.target

    setHabitacion((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // GUARDAR HABITACION

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (guardando || cargando || mensaje || errorCarga) {
      return
    }

    setError('')

    // LA EDICION TODAVIA NO ESTA IMPLEMENTADA

    if (esEdicion) {
      setError(
        'La modificación de habitaciones todavía no está habilitada.',
      )
      return
    }

    setGuardando(true)

    try {
      const res = await postHabitacion({
        Numero_Habitacion: Number(
          habitacion.Numero_Habitacion,
        ),

        ID_Tipo_Habitacion: Number(
          habitacion.ID_Tipo_Habitacion,
        ),

        ID_Piso: Number(habitacion.ID_Piso),

        Tipo_Vista: habitacion.Tipo_Vista.trim(),

        ID_Estado_Habitacion: Number(
          habitacion.ID_Estado_Habitacion,
        ),
      })

      if (res?.error) {
        setError(res.error)
        return
      }

      if (!res) {
        setError('No se recibió una respuesta del servidor.')
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
    Boolean(errorCarga) ||
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
          ¡Habitación creada con éxito!
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

      {/* ERROR AL CARGAR LOS DATOS */}

      {errorCarga && (
        <HotelAlert
          color="danger"
          title="Error de conexión"
          className="mb-4"
        >
          {errorCarga}
        </HotelAlert>
      )}

      {/* AVISO SOBRE LA EDICION */}

      {esEdicion && (
        <HotelAlert
          color="warning"
          title="Función no disponible"
          className="mb-4"
        >
          La modificación de habitaciones todavía
          no está habilitada.
        </HotelAlert>
      )}

      {/* INDICADOR DE CARGA */}

      {cargando ? (
        <HotelLoader
          message="Cargando información del formulario..."
        />
      ) : (

        <HotelForm
          title={
            esEdicion
              ? 'Editar habitación'
              : 'Crear habitación'
          }
          subtitle={
            esEdicion
              ? 'Modifique la información de la habitación.'
              : 'Complete la información de la nueva habitación.'
          }
          icon={<CIcon icon={cilBed} size="xl" />}
          onSubmit={handleSubmit}
          onCancel={() => navigate(rutaRegreso)}
          submitText="Guardar"
          loading={guardando}
          disabled={bloqueado}
          showSubmit={!esEdicion}
          className="mb-4"
        >

          <CRow className="g-4">

            {/* NUMERO DE HABITACION */}

            <CCol md={6}>
              <HotelInput
                type="number"
                name="Numero_Habitacion"
                label="Número de habitación"
                placeholder="204"
                min={100}
                max={999}
                required
                disabled={bloqueado}
                value={habitacion.Numero_Habitacion}
                onChange={handleChange}
              />
            </CCol>

            {/* TIPO DE HABITACION */}

            <CCol md={6}>
              <HotelSelect
                label="Tipo de habitación"
                name="ID_Tipo_Habitacion"
                required
                disabled={bloqueado}
                value={habitacion.ID_Tipo_Habitacion}
                onChange={handleChange}
              >

                <option value="" disabled>
                  Seleccione el tipo de habitación
                </option>

                {tiposHabitacion.map((th) => (
                  <option
                    key={th.ID_Tipo_Habitacion}
                    value={th.ID_Tipo_Habitacion}
                  >
                    {th.Nombre_Tipo}
                  </option>
                ))}

              </HotelSelect>
            </CCol>

            {/* TIPO DE VISTAS */}

            <CCol xs={12}>
              <HotelTextarea
                label="Tipo de vistas"
                rows={5}
                name="Tipo_Vista"
                placeholder="Describa las vistas de la habitación..."
                helpText="Descripción de las vistas en 15-20 palabras."
                maxLength={500}
                required
                disabled={bloqueado}
                value={habitacion.Tipo_Vista}
                onChange={handleChange}
                showCount
              />
            </CCol>

            {/* PISO DE LA HABITACION */}

            <CCol md={6}>
              <HotelSelect
                label="Piso de la habitación"
                name="ID_Piso"
                required
                disabled={bloqueado}
                value={habitacion.ID_Piso}
                onChange={handleChange}
              >

                <option value="" disabled>
                  Seleccione el piso
                </option>

                {pisos.map((ph) => (
                  <option
                    key={ph.ID_Piso}
                    value={ph.ID_Piso}
                  >
                    {ph.Nombre_Piso}
                  </option>
                ))}

              </HotelSelect>
            </CCol>

            {/* ESTADO DE LA HABITACION */}

            <CCol md={6}>
              <HotelSelect
                label="Estado de la habitación"
                name="ID_Estado_Habitacion"
                required
                disabled={bloqueado}
                value={habitacion.ID_Estado_Habitacion}
                onChange={handleChange}
              >

                <option value="" disabled>
                  Seleccione el estado
                </option>

                {estadosHabitacion.map((eh) => (
                  <option
                    key={eh.ID_Estado_Habitacion}
                    value={eh.ID_Estado_Habitacion}
                  >
                    {eh.Nombre_Estado}
                  </option>
                ))}

              </HotelSelect>
            </CCol>

          </CRow>

        </HotelForm>
      )}

    </>
  )
}

export default FormHabitacion