import React from 'react'

import HotelLogo from './HotelLogo'

import './hotel.scss'

const HotelAuthLayout = ({
  title,
  subtitle,
  children,
  footer,
  showLogo = true,
  showBrand = false,
  maxWidth = 480,
  className = '',
}) => {
  return (
    <div className={`hotel-auth-layout ${className}`}>

      <div
        className="hotel-auth-container"
        style={{ maxWidth }}
      >

        {/* IDENTIDAD DEL HOTEL */}

        {showLogo && (
          <div className="hotel-auth-brand">

            <HotelLogo size="large" />

            {showBrand && (
              <div className="hotel-auth-brand-name">
                Gran Hotel El Toro
              </div>
            )}

          </div>
        )}

        {/* TARJETA DE AUTENTICACION */}

        <div className="hotel-auth-card">

          {/* ENCABEZADO */}

          {(title || subtitle) && (
            <div className="hotel-auth-header">

              {title && (
                <h1 className="hotel-auth-title">
                  {title}
                </h1>
              )}

              {subtitle && (
                <p className="hotel-auth-subtitle">
                  {subtitle}
                </p>
              )}

            </div>
          )}

          {/* FORMULARIO */}

          <div className="hotel-auth-content">
            {children}
          </div>

          {/* PIE DEL FORMULARIO */}

          {footer && (
            <div className="hotel-auth-footer">
              {footer}
            </div>
          )}

        </div>

        {/* DERECHOS RESERVADOS */}

        <div className="hotel-auth-copyright">
          © {new Date().getFullYear()} Gran Hotel El Toro.
          Todos los derechos reservados.
        </div>

      </div>

    </div>
  )
}

export default HotelAuthLayout