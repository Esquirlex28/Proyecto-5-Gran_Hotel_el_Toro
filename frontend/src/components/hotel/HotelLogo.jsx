import React from 'react'
import logoHotel from '../../assets/images/logo-hotel.png'

import './hotel.scss'

const HotelLogo = ({
  size = 'medium',
  width,
  className = '',
  style,
  ...props
}) => {
  const sizes = {
    small: 48,
    medium: 100,
    large: 180,
    xlarge: 260,
  }

  const logoWidth = width ?? sizes[size] ?? sizes.medium

  return (
    <img
      {...props}
      src={logoHotel}
      alt="Gran Hotel El Toro"
      className={`hotel-logo ${className}`}
      style={{
        width: logoWidth,
        ...style,
      }}
    />
  )
}

export default HotelLogo