import React, { useId } from 'react'

import HotelInput from './HotelInput'
import './hotel.scss'

const HotelFileInput = ({
  id,
  label = 'Seleccionar archivo',
  name,
  accept,
  multiple = false,
  required = false,
  disabled = false,
  error,
  helpText,
  onChange,
  className = '',
  ...props
}) => {
  const generatedId = useId()
  const inputId = id || generatedId

  return (
    <HotelInput
      {...props}
      id={inputId}
      type="file"
      label={label}
      name={name}
      accept={accept}
      multiple={multiple}
      required={required}
      disabled={disabled}
      error={error}
      helpText={helpText}
      onChange={onChange}
      className={`hotel-file-field ${className}`}
    />
  )
}

export default HotelFileInput