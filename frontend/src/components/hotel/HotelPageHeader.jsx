import React from 'react'
import CIcon from '@coreui/icons-react'
import './hotel.scss'

const HotelPageHeader = ({
  title,
  description,
  icon,
  actions,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      {...props}
      className={`hotel-page-header ${className}`}
    >
      <div className="hotel-page-heading">

        {icon && (
          <div className="hotel-page-icon">
            <CIcon
              icon={icon}
              size="xxl"
              aria-hidden="true"
            />
          </div>
        )}

        <div className="hotel-page-information">
          <h1 className="hotel-page-title">
            {title}
          </h1>

          {description && (
            <p className="hotel-page-description">
              {description}
            </p>
          )}

          {children}
        </div>

      </div>

      {actions && (
        <div className="hotel-page-actions">
          {actions}
        </div>
      )}
    </div>
  )
}

export default HotelPageHeader