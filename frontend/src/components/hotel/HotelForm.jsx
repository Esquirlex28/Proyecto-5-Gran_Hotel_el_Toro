import React from 'react'
import { CForm } from '@coreui/react'
import { cilSave, cilX } from '@coreui/icons'

import HotelCard from './HotelCard'
import HotelButton from './HotelButton'
import './hotel.scss'

const HotelForm = ({
  title,
  subtitle,
  icon,
  children,
  onSubmit,
  onCancel,
  submitText = 'Guardar',
  cancelText = 'Cancelar',
  submitColor = 'primary',
  loading = false,
  disabled = false,
  showSubmit = true,
  showCancel = true,
  actions,
  className = '',
  ...props
}) => {
  return (
    <HotelCard
      title={title}
      subtitle={subtitle}
      icon={icon}
      className={`hotel-form-card ${className}`}
    >
      <CForm
        {...props}
        onSubmit={onSubmit}
        aria-busy={loading}
        className="hotel-form"
      >
        <div className="hotel-form-content">
          {children}
        </div>

        {(showSubmit || (showCancel && onCancel) || actions) && (
          <div className="hotel-form-footer">

            <div className="hotel-form-secondary-actions">
              {showCancel && onCancel && (
                <HotelButton
                  color="secondary"
                  variant="outline"
                  type="button"
                  icon={cilX}
                  disabled={loading}
                  onClick={onCancel}
                >
                  {cancelText}
                </HotelButton>
              )}
            </div>

            <div className="hotel-form-primary-actions">
              {actions}

              {showSubmit && (
                <HotelButton
                  color={submitColor}
                  type="submit"
                  icon={cilSave}
                  loading={loading}
                  disabled={disabled}
                >
                  {submitText}
                </HotelButton>
              )}
            </div>

          </div>
        )}
      </CForm>
    </HotelCard>
  )
}

export default HotelForm