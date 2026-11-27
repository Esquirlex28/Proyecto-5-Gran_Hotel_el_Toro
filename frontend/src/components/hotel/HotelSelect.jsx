import React, { useId } from 'react'
import { CFormSelect, CFormLabel } from '@coreui/react'
import './hotel.scss'

const HotelSelect = ({
  label,
  id,
  children,
  required = false,
  error,
  helpText,
  className = '',
  ...props
}) => {
  const generatedId = useId()
  const selectId = id || generatedId

  return (
    <div className="hotel-select-group">
      {label && (
        <CFormLabel htmlFor={selectId}>
          {label}
          {required && (
            <span className="hotel-required"> *</span>
          )}
        </CFormLabel>
      )}

      <CFormSelect
        {...props}
        id={selectId}
        required={required}
        invalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${selectId}-error`
            : helpText
              ? `${selectId}-help`
              : undefined
        }
        className={`hotel-select ${className}`}
      >
        {children}
      </CFormSelect>

      {error ? (
        <div
          id={`${selectId}-error`}
          className="hotel-select-error"
        >
          {error}
        </div>
      ) : (
        helpText && (
          <div
            id={`${selectId}-help`}
            className="hotel-select-help"
          >
            {helpText}
          </div>
        )
      )}
    </div>
  )
}

export default HotelSelect