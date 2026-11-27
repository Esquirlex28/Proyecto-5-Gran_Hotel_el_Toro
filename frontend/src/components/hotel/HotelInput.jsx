import React, { useId } from 'react'
import { CFormInput, CFormLabel } from '@coreui/react'
import './hotel.scss'

const HotelInput = ({
  label,
  type = 'text',
  id,
  required = false,
  error,
  helpText,
  className = '',
  ...props
}) => {
  const generatedId = useId()
  const inputId = id || generatedId

  return (
    <div className="hotel-input-group">
      {label && (
        <CFormLabel htmlFor={inputId}>
          {label}
          {required && (
            <span className="hotel-required"> *</span>
          )}
        </CFormLabel>
      )}

      <CFormInput
        {...props}
        id={inputId}
        type={type}
        required={required}
        invalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helpText
              ? `${inputId}-help`
              : undefined
        }
        className={`hotel-input ${className}`}
      />

      {error ? (
        <div
          id={`${inputId}-error`}
          className="hotel-input-error"
        >
          {error}
        </div>
      ) : (
        helpText && (
          <div
            id={`${inputId}-help`}
            className="hotel-input-help"
          >
            {helpText}
          </div>
        )
      )}
    </div>
  )
}

export default HotelInput