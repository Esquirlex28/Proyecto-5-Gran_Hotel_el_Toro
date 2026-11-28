import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CAlert,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
  cilCalendar,
  cilSearch,
} from '@coreui/icons'

const LandingBooking = () => {
  const navigate = useNavigate()

  const hoy = new Date()

  const fechaMinima = new Date(
    hoy.getTime() - hoy.getTimezoneOffset() * 60000,
  ).toISOString().split('T')[0]

  const [reserva, setReserva] = useState({
    entrada: '',
    salida: '',
    adultos: '2',
    ninos: '0',
    habitaciones: '1',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setReserva((prev) => ({
      ...prev,
      [name]: value,
    }))

    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!reserva.entrada || !reserva.salida) {
      setError('Seleccione las fechas de su estancia.')
      return
    }

    if (reserva.entrada < fechaMinima) {
      setError('La fecha de entrada no puede ser anterior a hoy.')
      return
    }

    if (reserva.salida <= reserva.entrada) {
      setError('La fecha de salida debe ser posterior a la entrada.')
      return
    }

    sessionStorage.setItem(
      'hotelReservaPreliminar',
      JSON.stringify(reserva),
    )

    navigate('/authentication/login')
  }

  return (
    <section
      id="reservaciones"
      className="landing-booking"
    >
      <CContainer>

        <div className="landing-booking-card">

          <div className="landing-booking-heading">

            <CIcon icon={cilCalendar} size="xl" />

            <div>
              <h2>Planifica tu estancia</h2>
              <p>Selecciona las fechas de tu próxima visita.</p>
            </div>

          </div>

          {error && (
            <CAlert color="danger">
              {error}
            </CAlert>
          )}

          <CForm onSubmit={handleSubmit}>

            <CRow className="g-3 align-items-end">

              {/* FECHA DE ENTRADA */}

              <CCol xs={12} md={6} xl={2}>
                <CFormInput
                  type="date"
                  name="entrada"
                  label="Check-in"
                  min={fechaMinima}
                  value={reserva.entrada}
                  onChange={handleChange}
                  required
                />
              </CCol>

              {/* FECHA DE SALIDA */}

              <CCol xs={12} md={6} xl={2}>
                <CFormInput
                  type="date"
                  name="salida"
                  label="Check-out"
                  min={reserva.entrada || fechaMinima}
                  value={reserva.salida}
                  onChange={handleChange}
                  required
                />
              </CCol>

              {/* ADULTOS */}

              <CCol xs={6} md={4} xl={2}>
                <CFormSelect
                  label="Adultos"
                  name="adultos"
                  value={reserva.adultos}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              {/* NINOS */}

              <CCol xs={6} md={4} xl={2}>
                <CFormSelect
                  label="Niños"
                  name="ninos"
                  value={reserva.ninos}
                  onChange={handleChange}
                >
                  {[0, 1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              {/* CANTIDAD DE HABITACIONES */}

              <CCol xs={12} md={4} xl={2}>
                <CFormSelect
                  label="Habitaciones"
                  name="habitaciones"
                  value={reserva.habitaciones}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              {/* BOTON CONSULTAR */}

              <CCol xs={12} xl={2}>
                <CButton
                  type="submit"
                  color="primary"
                  className="landing-booking-button w-100"
                >
                  <CIcon
                    icon={cilSearch}
                    className="me-2"
                  />

                  Consultar
                </CButton>
              </CCol>

            </CRow>

          </CForm>

        </div>

      </CContainer>
    </section>
  )
}

export default LandingBooking