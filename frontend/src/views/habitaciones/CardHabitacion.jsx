import React from 'react'
import { CCard, CCardBody, CCardTitle, CCardText, CButton, CCardImage } from '@coreui/react'
import habitacionImage from '../../assets/images/habitacion.jpg'

export const CardHabitacion = () => {
  return (
    <CCard style={{ width: '24rem' }}>
      <CCardImage orientation="top" src={habitacionImage} />
      <CCardBody>
        <CCardTitle>Habitación - #</CCardTitle>
        <CCardText>
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
        </CCardText>
        <CButton color="primary" href="#">
          Go somewhere
        </CButton>
      </CCardBody>
    </CCard>
  )
}
