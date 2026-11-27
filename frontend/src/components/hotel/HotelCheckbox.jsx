import React, { useId } from 'react'
import { CFormCheck, CFormText } from '@coreui/react'

import './hotel.scss'

const HotelCheckbox = ({
  id,
  label,
  name,
  checked,
  onChange,
  required = false,
  disabled = false,
  error,
  helpText,
  className = '',
  ...props
}) => {
  const generatedId = useId()
  const inputId = id || generatedId

  return (
    <div className={`hotel-checkbox-group ${className}`}>
      <CFormCheck
        {...props}
        id={inputId}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        disabled={disabled}
        invalid={Boolean(error)}
        label={
          <>
            {label}

            {required && (
              <span className="text-danger ms-1">*</span>
            )}
          </>
        }
        className="hotel-checkbox"
      />

      {error && (
        <div className="hotel-checkbox-error">
          {error}
        </div>
      )}

      {helpText && !error && (
        <CFormText className="hotel-checkbox-help">
          {helpText}
        </CFormText>
      )}
    </div>
  )
}

export default HotelCheckbox