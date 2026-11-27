import React, { useId } from 'react'
import { CFormTextarea, CFormLabel } from '@coreui/react'
import './hotel.scss'

const HotelTextarea = ({
  label,
  id,
  name,
  value,
  onChange,
  rows = 4,
  required = false,
  disabled = false,
  readOnly = false,
  maxLength,
  showCount = false,
  error,
  helpText,
  text,
  className = '',
  ...props
}) => {
  const generatedId = useId()
  const textareaId = id || generatedId
  const characterCount = String(value ?? '').length
  const description = helpText || text

  return (
    <div className="hotel-textarea-group">
      {label && (
        <CFormLabel htmlFor={textareaId}>
          {label}
          {required && (
            <span className="hotel-required"> *</span>
          )}
        </CFormLabel>
      )}

      <CFormTextarea
        {...props}
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        invalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error || description || showCount
            ? `${textareaId}-info`
            : undefined
        }
        className={`hotel-textarea ${className}`}
      />

      {(error || description || showCount) && (
        <div
          id={`${textareaId}-info`}
          className="hotel-textarea-info"
        >
          <div>
            {error ? (
              <span className="hotel-textarea-error">
                {error}
              </span>
            ) : (
              <span className="hotel-textarea-help">
                {description}
              </span>
            )}
          </div>

          {showCount && (
            <span className="hotel-textarea-count">
              {characterCount}
              {maxLength != null ? `/${maxLength}` : ''}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default HotelTextarea