import React from 'react'
import { CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilCheckCircle,
  cilXCircle,
  cilWarning,
  cilInfo,
} from '@coreui/icons'

import './hotel.scss'

const alertIcons = {
  success: cilCheckCircle,
  danger: cilXCircle,
  warning: cilWarning,
  info: cilInfo,
}

const HotelAlert = ({
  children,
  title,
  color = 'info',
  icon,
  showIcon = true,
  dismissible = false,
  visible = true,
  onClose,
  className = '',
  ...props
}) => {
  const selectedIcon = icon || alertIcons[color] || cilInfo

  return (
    <CAlert
      {...props}
      color={color}
      visible={visible}
      dismissible={dismissible}
      onClose={onClose}
      className={`hotel-alert ${className}`}
    >
      <div className="hotel-alert-content">

        {showIcon && (
          <div className="hotel-alert-icon">
            <CIcon
              icon={selectedIcon}
              size="xl"
              aria-hidden="true"
            />
          </div>
        )}

        <div className="hotel-alert-message">
          {title && (
            <div className="hotel-alert-title">
              {title}
            </div>
          )}

          <div className="hotel-alert-text">
            {children}
          </div>
        </div>

      </div>
    </CAlert>
  )
}

export default HotelAlert