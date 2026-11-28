import React, { useState } from 'react'
import {
  CCarousel,
  CCarouselItem,
  CCarouselCaption,
  CImage,
  CButton,
} from '@coreui/react'

import exterior from '../../assets/images/landing/hotel-exterior.png'
import habitacion from '../../assets/images/landing/hotel-habitacion.png'
import lobby from '../../assets/images/landing/hotel-lobby.png'
import piscina from '../../assets/images/landing/hotel-piscina.png'
import restaurante from '../../assets/images/landing/hotel-restaurante.png'

const slides = [
  {
    imagen: exterior,
    etiqueta: 'ROATÁN · HONDURAS',
    titulo: 'Gran Hotel El Toro',
    descripcion: 'Descubre la elegancia y el encanto del Caribe hondureño.',
  },
  {
    imagen: habitacion,
    etiqueta: 'DESCANSO Y CONFORT',
    titulo: 'Tu descanso, nuestra prioridad',
    descripcion: 'Espacios diseñados para una estancia inolvidable.',
  },
  {
    imagen: lobby,
    etiqueta: 'HOSPITALIDAD',
    titulo: 'Una bienvenida especial',
    descripcion: 'Elegancia y atención desde el primer momento.',
  },
  {
    imagen: piscina,
    etiqueta: 'RELAJACIÓN',
    titulo: 'Disfruta cada momento',
    descripcion: 'Un espacio para desconectar y disfrutar.',
  },
  {
    imagen: restaurante,
    etiqueta: 'GASTRONOMÍA',
    titulo: 'Sabores que inspiran',
    descripcion: 'Una experiencia gastronómica con esencia caribeña.',
  },
]

const LandingCarousel = () => {
  const [reproduccion, setReproduccion] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  return (
    <div className="position-relative">

      <CCarousel
        controls
        indicators
        ride={reproduccion ? 'carousel' : false}
        interval={reproduccion ? 6000 : false}
        transition="crossfade"
        className="landing-carousel"
      >
        {slides.map((slide) => (
          <CCarouselItem key={slide.titulo}>

            <CImage
              src={slide.imagen}
              alt={slide.titulo}
              className="d-block w-100 landing-carousel-image"
            />

            <div className="landing-carousel-overlay" />

            <CCarouselCaption className="landing-carousel-caption">

              <span className="landing-hero-label">
                {slide.etiqueta}
              </span>

              <h1>{slide.titulo}</h1>

              <p>{slide.descripcion}</p>

              <div className="landing-hero-actions">

                <CButton
                  as="a"
                  href="#reservaciones"
                  color="primary"
                >
                  Reservar ahora
                </CButton>

                <CButton
                  as="a"
                  href="#habitaciones"
                  color="light"
                  variant="outline"
                >
                  Ver habitaciones
                </CButton>

              </div>

            </CCarouselCaption>

          </CCarouselItem>
        ))}
      </CCarousel>

      <button
        type="button"
        className="landing-carousel-pause"
        onClick={() => setReproduccion(!reproduccion)}
        aria-label={reproduccion ? 'Pausar carrusel' : 'Reproducir carrusel'}
        title={reproduccion ? 'Pausar' : 'Reproducir'}
      >
        {reproduccion ? 'Ⅱ' : '▶'}
      </button>

    </div>
  )
}

export default LandingCarousel