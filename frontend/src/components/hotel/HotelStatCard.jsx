import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilArrowBottom } from '@coreui/icons'

import HotelCard from './HotelCard'
import './hotel.scss'

const HotelStatCard = ({
  title,
  value = 0,
  icon,
  color = 'primary',
  description,
  trend,
  trendDirection = 'up',
  trendColor,
  footer,
  className = '',
  ...props
}) => {
  return (
    <HotelCard
      {...props}
      className={`hotel-stat-card ${className}`}
      footer={footer}
    >
      <div className="hotel-stat-content">
        <div className="hotel-stat-information">

          <div className="hotel-stat-title">
            {title}
          </div>

          <div className="hotel-stat-value">
            {value}
          </div>

          {description && (
            <div className="hotel-stat-description">
              {description}
            </div>
          )}

        </div>

        {icon && (
          <div
            className={`hotel-stat-icon hotel-stat-${color}`}
          >
            <CIcon
              icon={icon}
              size="xxl"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {trend != null && (
        <div className="hotel-stat-trend">
          <span
            className={`hotel-stat-indicator text-${
              trendColor ||
              (trendDirection === 'up' ? 'success' : 'danger')
            }`}
          >
            <CIcon
              icon={
                trendDirection === 'up'
                  ? cilArrowTop
                  : cilArrowBottom
              }
              size="sm"
              aria-hidden="true"
            />

            {trend}
          </span>
        </div>
      )}
    </HotelCard>
  )
}

export default HotelStatCard