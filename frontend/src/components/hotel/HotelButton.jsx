import React from 'react'
import { CButton, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import './hotel.scss'

const HotelButton = ({
  children,
  color = 'primary',
  variant,
  icon,
  type = 'button',
  size,
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <CButton
      color={color}
      variant={variant}
      type={type}
      size={size}
      disabled={disabled || loading}
      className={`hotel-button ${className}`}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <CSpinner size="sm" aria-hidden="true" />
      ) : (
        icon && <CIcon icon={icon} aria-hidden="true" />
      )}

      {children}
    </CButton>
  )
}

export default HotelButton