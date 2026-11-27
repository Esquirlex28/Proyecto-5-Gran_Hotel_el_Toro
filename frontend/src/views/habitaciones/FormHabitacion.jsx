import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CRow,
  CCol,
  CFormTextarea,
  CFormSelect,
  CButton,
  CAlert,
} from '@coreui/react'
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
  const rutaRegreso = esEdicion ? `/panel/habitaciones/${id}` : '/panel/habitaciones'

  const [mensaje, setMensaje] = useState(false)
  const [error, setError] = useState('')
  const [tiposHabitacion, setTiposHabitacion] = useState([])
  const [pisos, setPisos] = useState([])
  const [estadosHabitacion, setEstadosHabitacion] = useState([])
  const [habitacion, setHabitacion] = useState({
    Numero_Habitacion: esEdicion ? Number(id) : '',
    ID_Tipo_Habitacion: '',
    Tipo_Vista: '',
    ID_Piso: '',
    ID_Estado_Habitacion: '',
  })

  useEffect(() => {
    getEstadosHabitacion()
    .then(res=> setEstadosHabitacion(res));
    getTiposHabitacion()
    .then(res => setTiposHabitacion(res));
    getPisos()
    .then(res => setPisos(res))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setHabitacion((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (esEdicion) {
      // TODO: conectar la edicion al backend
      console.log('Mandando peticion de actualizacion', habitacion)
      setMensaje(true)
      setTimeout(() => navigate(rutaRegreso), 2000)
      return
    }

    postHabitacion({
      Numero_Habitacion: Number(habitacion.Numero_Habitacion),
      ID_Tipo_Habitacion: Number(habitacion.ID_Tipo_Habitacion),
      ID_Piso: Number(habitacion.ID_Piso),
      Tipo_Vista: habitacion.Tipo_Vista.trim(),
      ID_Estado_Habitacion: Number(habitacion.ID_Estado_Habitacion),
    })
      .then((res) => {
        if (res.error) {
          setError(res.error)
          return
        }
        setMensaje(true)
        setTimeout(() => navigate(rutaRegreso), 2000)
      })
      .catch((e) => {
        console.error(e)
        setError('No se pudo conectar con el servidor')
      })
  }

  return (
    <>
      {mensaje && (
        <CAlert color="success" className="text-center shadow-sm">
          ¡Habitacion {esEdicion ? 'actualizada' : 'creada'} con exito!
        </CAlert>
      )}
      {error && (
        <CAlert color="danger" className="text-center shadow-sm">
          {error}
        </CAlert>
      )}
      <CCard className="shadow-sm mb-4">
        <CCardBody className="p-4">
          <h1 className="h3">{esEdicion ? 'Editar' : 'Crear'} Habitacion</h1>
          <hr className="mb-4" />
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md={6} className="mb-4">
                <CFormInput
                  type="number"
                  name="Numero_Habitacion"
                  label="Numero de Habitacion"
                  placeholder="204"
                  min={100}
                  max={999}
                  required
                  value={habitacion.Numero_Habitacion}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormSelect
                  label="Tipo de Habitacion"
                  name="ID_Tipo_Habitacion"
                  required
                  value={habitacion.ID_Tipo_Habitacion}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Tipo de Habitacion
                  </option>
                  {tiposHabitacion.map((th) => (
                    <option key={th.ID_Tipo_Habitacion} value={th.ID_Tipo_Habitacion}>
                      {th.Nombre_Tipo}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CFormTextarea
              label="Tipo de Vistas"
              rows={5}
              text="Descripcion de las vistas en 15-20 palabras."
              name="Tipo_Vista"
              maxLength={500}
              required
              value={habitacion.Tipo_Vista}
              onChange={handleChange}
            />
            <CRow className="mt-4">
              <CCol md={6} className="mb-4">
                <CFormSelect
                  label="Piso de la Habitacion"
                  name="ID_Piso"
                  required
                  value={habitacion.ID_Piso}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Piso
                  </option>
                  {pisos.map((ph) => (
                    <option key={ph.ID_Piso} value={ph.ID_Piso}>
                      {ph.Nombre_Piso}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6} className="mb-4">
                <CFormSelect
                  label="Estado de la Habitacion"
                  name="ID_Estado_Habitacion"
                  required
                  value={habitacion.ID_Estado_Habitacion}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Estado
                  </option>
                  {estadosHabitacion.map((eh) => (
                    <option key={eh.ID_Estado_Habitacion} value={eh.ID_Estado_Habitacion}>
                      {eh.Nombre_Estado}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <div className="d-flex justify-content-between align-items-center gap-2 mt-4 pt-3 border-top">
              <CButton
                color="secondary"
                variant="outline"
                type="button"
                onClick={() => navigate(rutaRegreso)}
              >
                Cancelar
              </CButton>
              <CButton color="primary" type="submit" disabled={mensaje}>
                Guardar
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default FormHabitacion
