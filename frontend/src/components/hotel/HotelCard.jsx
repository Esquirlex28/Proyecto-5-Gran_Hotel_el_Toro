import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCardImage,
} from '@coreui/react'

import './hotel.scss'

const HotelCard = ({
  children,
  title,
  subtitle,
  icon,
  image,
  imageAlt = '',
  actions,
  footer,
  hoverable = false,
  className = '',
  bodyClassName = '',
  ...props
}) => {
  return (
    <CCard
      {...props}
      className={`hotel-card ${
        hoverable ? 'hotel-card-hoverable' : ''
      } ${className}`}
    >
      {image && (
        <CCardImage
          orientation="top"
          src={image}
          alt={imageAlt}
          className="hotel-card-image"
        />
      )}

      {(title || subtitle || icon || actions) && (
        <CCardHeader className="hotel-card-header">
          <div className="hotel-card-heading">

            {icon && (
              <div className="hotel-card-icon">
                {icon}
              </div>
            )}

            <div>
              {title && (
                <h3 className="hotel-card-title">
                  {title}
                </h3>
              )}

              {subtitle && (
                <div className="hotel-card-subtitle">
                  {subtitle}
                </div>
              )}
            </div>
          </div>

          {actions && (
            <div className="hotel-card-actions">
              {actions}
            </div>
          )}
        </CCardHeader>
      )}

      <CCardBody
        className={`hotel-card-body ${bodyClassName}`}
      >
        {children}
      </CCardBody>

      {footer != null && (
        <CCardFooter className="hotel-card-footer">
          {footer}
        </CCardFooter>
      )}
    </CCard>
  )
}

export default HotelCard