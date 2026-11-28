import React, { useState } from 'react'
import {
  CContainer,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CImage,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilZoomIn } from '@coreui/icons'

import exterior from '../../assets/images/landing/hotel-exterior.png'
import lobby from '../../assets/images/landing/hotel-lobby.png'
import habitacion from '../../assets/images/landing/hotel-habitacion.png'
import piscina from '../../assets/images/landing/hotel-piscina.png'
import restaurante from '../../assets/images/landing/hotel-restaurante.png'

const fotografias = [
  { titulo: 'Gran Hotel El Toro', imagen: exterior },
  { titulo: 'Recepción', imagen: lobby },
  { titulo: 'Habitaciones', imagen: habitacion },
  { titulo: 'Piscina', imagen: piscina },
  { titulo: 'Restaurante', imagen: restaurante },
]

const LandingGallery = () => {
  const [seleccionada, setSeleccionada] = useState(null)

  return (
    <section id="galeria" className="landing-section landing-gallery">
      <CContainer>

        <div className="landing-section-heading">
          <span className="landing-section-label">
            DESCUBRE NUESTROS ESPACIOS
          </span>

          <h2>Explora el hotel</h2>

          <p>
            Conoce cada rincón de nuestras instalaciones.
          </p>
        </div>

        <div className="landing-gallery-grid">

          {fotografias.map((foto, index) => (
            <button
              key={foto.titulo}
              type="button"
              className={`landing-gallery-item ${
                index === 0 ? 'landing-gallery-featured' : ''
              }`}
              onClick={() => setSeleccionada(foto)}
              aria-label={`Ampliar ${foto.titulo}`}
            >
              <img
                src={foto.imagen}
                alt={foto.titulo}
                loading="lazy"
              />

              <div className="landing-gallery-overlay">
                <span>{foto.titulo}</span>
                <CIcon icon={cilZoomIn} />
              </div>

            </button>
          ))}

        </div>

      </CContainer>

      <CModal
        visible={seleccionada !== null}
        onClose={() => setSeleccionada(null)}
        size="xl"
        alignment="center"
        className="landing-gallery-modal"
      >
        <CModalHeader>
          <CModalTitle>
            {seleccionada?.titulo}
          </CModalTitle>
        </CModalHeader>

        <CModalBody className="p-0">
          {seleccionada && (
            <CImage
              src={seleccionada.imagen}
              alt={seleccionada.titulo}
              fluid
              className="w-100"
            />
          )}
        </CModalBody>
      </CModal>

    </section>
  )
}

export default LandingGallery