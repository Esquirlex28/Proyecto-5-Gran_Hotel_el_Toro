import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilInbox, cilPlus } from '@coreui/icons'

import HotelButton from './HotelButton'
import './hotel.scss'

const HotelEmpty = ({
  title = 'No hay registros disponibles',
  description = 'Todavía no existe información para mostrar.',
  icon = cilInbox,
  actionText,
  actionIcon = cilPlus,
  onAction,
  actionColor = 'primary',
  compact = false,
  children,
  className = '',
}) => {
  return (
    <div
      className={`hotel-empty ${
        compact ? 'hotel-empty-compact' : ''
      } ${className}`}
    >
      <div className="hotel-empty-icon">
        <CIcon
          icon={icon}
          size="xxl"
          aria-hidden="true"
        />
      </div>

      <h3 className="hotel-empty-title">
        {title}
      </h3>

      {description && (
        <p className="hotel-empty-description">
          {description}
        </p>
      )}

      {actionText && onAction && (
        <HotelButton
          color={actionColor}
          icon={actionIcon}
          onClick={onAction}
        >
          {actionText}
        </HotelButton>
      )}

      {children}
    </div>
  )
}

export default HotelEmpty