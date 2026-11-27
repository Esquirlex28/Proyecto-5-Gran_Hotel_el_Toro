import React from 'react'
import HotelInput from './HotelInput'

import './hotel.scss'

const HotelDateInput = ({
  label = 'Fecha',
  name,
  value,
  onChange,
  min,
  max,
  required = false,
  disabled = false,
  error,
  helpText,
  className = '',
  ...props
}) => {
  return (
    <HotelInput
      {...props}
      type="date"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      required={required}
      disabled={disabled}
      error={error}
      helpText={helpText}
      className={`hotel-date-field ${className}`}
    />
  )
}

export default HotelDateInput