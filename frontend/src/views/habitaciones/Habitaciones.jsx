import React from 'react'
import { CRow, CCol } from '@coreui/react'
import { CardHabitacion } from './CardHabitacion'

const Habitaciones = () => {
  return (
    <>
      <h1 className='mb-2'>CRUD de las Habitaciones</h1>
      <p className='mb-2'>Aquí encontraras todas las habitaciones disponibles para poder gestionarlas</p>
      <hr />
      <CRow xs={{ cols: 1 }} md={{ cols: 2 }} lg={{ cols: 3 }} className='g-4 mb-4'>
        <CCol> <CardHabitacion /> </CCol>
        <CCol> <CardHabitacion /> </CCol>
        <CCol> <CardHabitacion /> </CCol>
        <CCol> <CardHabitacion /> </CCol>
        <CCol> <CardHabitacion /> </CCol>
        <CCol> <CardHabitacion /> </CCol>
        <CCol> <CardHabitacion /> </CCol>
        <CCol> <CardHabitacion /> </CCol>
        <CCol> <CardHabitacion /> </CCol>
        <CCol> <CardHabitacion /> </CCol>
      </CRow>
    </>
  )
}

export default Habitaciones
