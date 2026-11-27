import React, { useState, useId } from 'react'

import {
  CFormLabel,
  CFormInput,
  CFormFeedback,
  CFormText,
  CInputGroup,
  CButton,
} from '@coreui/react'

import './hotel.scss'

const HotelPasswordInput = ({
  label = 'Contraseña',
  id,
  name = 'password',
  required = false,
  disabled = false,
  error,
  helpText,
  className = '',
  ...props
}) => {
  const generatedId = useId()
  const inputId = id || generatedId

  const [mostrarPassword, setMostrarPassword] = useState(false)

  return (
    <div className={`hotel-password-field ${className}`}>

      <CFormLabel
        htmlFor={inputId}
        className="hotel-field-label"
      >
        {label}

        {required && (
          <span className="text-danger ms-1">*</span>
        )}
      </CFormLabel>

      <CInputGroup hasValidation>

        <CFormInput
          {...props}
          id={inputId}
          name={name}
          type={mostrarPassword ? 'text' : 'password'}
          required={required}
          disabled={disabled}
          invalid={Boolean(error)}
          className="hotel-password-input"
        />

        <CButton
          type="button"
          color="secondary"
          variant="outline"
          disabled={disabled}
          className="hotel-password-toggle"
          aria-label={
            mostrarPassword
              ? 'Ocultar contraseña'
              : 'Mostrar contraseña'
          }
          aria-pressed={mostrarPassword}
          title={
            mostrarPassword
              ? 'Ocultar contraseña'
              : 'Mostrar contraseña'
          }
          onClick={() =>
            setMostrarPassword((prev) => !prev)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />

            <circle cx="12" cy="12" r="3" />

            {mostrarPassword && (
              <line x1="3" y1="3" x2="21" y2="21" />
            )}
          </svg>
        </CButton>

        {error && (
          <CFormFeedback invalid>
            {error}
          </CFormFeedback>
        )}

      </CInputGroup>

      {helpText && !error && (
        <CFormText>{helpText}</CFormText>
      )}

    </div>
  )
}

export default HotelPasswordInput