import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

import './hotel.scss'

const HotelModal = ({
  visible = false,
  onClose,
  title,
  subtitle,
  icon,
  children,
  footer,
  size,
  centered = true,
  scrollable = true,
  backdrop = true,
  keyboard = true,
  closeButton = true,
  className = '',
  ...props
}) => {
  return (
    <CModal
      {...props}
      visible={visible}
      onClose={onClose}
      size={size}
      alignment={centered ? 'center' : undefined}
      scrollable={scrollable}
      backdrop={backdrop}
      keyboard={keyboard}
      className={`hotel-modal ${className}`}
    >
      <CModalHeader
        closeButton={closeButton}
        className="hotel-modal-header"
      >
        <div className="hotel-modal-heading">

          {icon && (
            <div className="hotel-modal-icon">
              {icon}
            </div>
          )}

          <div>
            <CModalTitle className="hotel-modal-title">
              {title}
            </CModalTitle>

            {subtitle && (
              <div className="hotel-modal-subtitle">
                {subtitle}
              </div>
            )}
          </div>

        </div>
      </CModalHeader>

      <CModalBody className="hotel-modal-body">
        {children}
      </CModalBody>

      {footer != null && (
        <CModalFooter className="hotel-modal-footer">
          {footer}
        </CModalFooter>
      )}
    </CModal>
  )
}

export default HotelModal