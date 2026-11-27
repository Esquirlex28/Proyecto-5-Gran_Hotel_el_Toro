import React, { useState } from 'react'

import './hotel.scss'

const HotelAvatar = ({
  name = '',
  src,
  size = 'md',
  color = 'primary',
  status,
  className = '',
}) => {
  const [failedSrc, setFailedSrc] = useState(null)

  const iniciales = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra.charAt(0))
    .join('')
    .toUpperCase()

  const mostrarImagen = src && failedSrc !== src

  return (
    <div
      className={`
        hotel-avatar
        hotel-avatar-${size}
        hotel-avatar-${color}
        ${className}
      `}
      role="img"
      aria-label={name || 'Usuario'}
      title={name || 'Usuario'}
    >
      {/* FOTOGRAFIA DEL USUARIO */}

      {mostrarImagen ? (
        <img
          src={src}
          alt=""
          className="hotel-avatar-image"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span className="hotel-avatar-initials">
          {iniciales || 'U'}
        </span>
      )}

      {/* INDICADOR DE ESTADO */}

      {status && (
        <span
          className={`
            hotel-avatar-status
            hotel-avatar-status-${status}
          `}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default HotelAvatar