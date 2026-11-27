import React from 'react'
import { CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import './hotel.scss'

const HotelBadge = ({
  children,
  color = 'secondary',
  icon,
  soft = true,
  pill = false,
  className = '',
  ...props
}) => {
  return (
    <CBadge
      {...props}
      color={soft ? undefined : color}
      shape={pill ? 'rounded-pill' : undefined}
      className={`hotel-badge ${
        soft ? `hotel-badge-soft hotel-badge-${color}` : ''
      } ${className}`}
    >
      {icon && (
        <CIcon
          icon={icon}
          size="sm"
          aria-hidden="true"
        />
      )}

      {children}
    </CBadge>
  )
}

export default HotelBadge