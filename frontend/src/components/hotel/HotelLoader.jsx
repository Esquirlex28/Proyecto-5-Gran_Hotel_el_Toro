import React from 'react'
import { CSpinner } from '@coreui/react'
import './hotel.scss'

const HotelLoader = ({
  message = 'Cargando información...',
  color = 'primary',
  size = 'normal',
  variant = 'border',
  visible = true,
  fullHeight = false,
  inline = false,
  className = '',
}) => {
  if (!visible) return null

  return (
    <div
      className={`hotel-loader
        hotel-loader-${size}
        ${fullHeight ? 'hotel-loader-full' : ''}
        ${inline ? 'hotel-loader-inline' : ''}
        ${className}`}
      role="status"
      aria-live="polite"
    >
      <CSpinner
        color={color}
        variant={variant}
        className="hotel-loader-spinner"
        aria-hidden="true"
      />

      {message && (
        <span className="hotel-loader-message">
          {message}
        </span>
      )}
    </div>
  )
}

export default HotelLoader