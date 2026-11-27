import React, { useId } from 'react'
import {
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
  CFormLabel,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilSearch, cilX } from '@coreui/icons'

import './hotel.scss'

const HotelSearch = ({
  id,
  label,
  value = '',
  onChange,
  onClear,
  placeholder = 'Buscar...',
  disabled = false,
  clearable = true,
  className = '',
  ...props
}) => {
  const generatedId = useId()
  const searchId = id || generatedId

  const handleClear = () => {
    if (onClear) {
      onClear()
    }
  }

  return (
    <div className={`hotel-search ${className}`}>
      {label && (
        <CFormLabel htmlFor={searchId}>
          {label}
        </CFormLabel>
      )}

      <CInputGroup className="hotel-search-group">
        <CInputGroupText className="hotel-search-icon">
          <CIcon icon={cilSearch} aria-hidden="true" />
        </CInputGroupText>

        <CFormInput
          {...props}
          id={searchId}
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={label || placeholder}
          className="hotel-search-input"
        />

        {clearable && value && onClear && (
          <CButton
            type="button"
            color="secondary"
            variant="outline"
            disabled={disabled}
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            className="hotel-search-clear"
          >
            <CIcon icon={cilX} aria-hidden="true" />
          </CButton>
        )}
      </CInputGroup>
    </div>
  )
}

export default HotelSearch