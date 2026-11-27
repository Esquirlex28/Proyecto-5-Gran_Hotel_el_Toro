import React from 'react'

import HotelInput from './HotelInput'
import HotelPasswordInput from './HotelPasswordInput'
import HotelCheckbox from './HotelCheckbox'
import HotelButton from './HotelButton'
import HotelAlert from './HotelAlert'

import './hotel.scss'

const HotelLoginForm = ({
  values = {},
  errors = {},
  onChange,
  onSubmit,
  onForgotPassword,
  onRegister,
  loading = false,
  disabled = false,
  error,
  showRemember = false,
  emailLabel = 'Correo electrónico',
  emailName = 'correo',
  emailType = 'email',
  passwordName = 'password',
  className = '',
}) => {

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!loading && !disabled && onSubmit) {
      onSubmit(e)
    }
  }

  const bloqueado = loading || disabled

  return (
    <form
      className={`hotel-login-form ${className}`}
      onSubmit={handleSubmit}
    >

      {/* MENSAJE DE ERROR */}

      {error && (
        <HotelAlert color="danger">
          {error}
        </HotelAlert>
      )}

      {/* CORREO ELECTRONICO */}

      <HotelInput
        label={emailLabel}
        type={emailType}
        name={emailName}
        value={values[emailName] ?? ''}
        onChange={onChange}
        placeholder="Ingrese sus credenciales"
        autoComplete="username"
        error={errors[emailName]}
        disabled={bloqueado}
        required
      />

      {/* CONTRASEÑA */}

      <HotelPasswordInput
        label="Contraseña"
        name={passwordName}
        value={values[passwordName] ?? ''}
        onChange={onChange}
        placeholder="Ingrese su contraseña"
        autoComplete="current-password"
        error={errors[passwordName]}
        disabled={bloqueado}
        required
      />

      {/* OPCIONES DEL FORMULARIO */}

      {(showRemember || onForgotPassword) && (
        <div className="hotel-login-options">

          {showRemember && (
            <HotelCheckbox
              label="Recordarme"
              name="recordarme"
              checked={Boolean(values.recordarme)}
              onChange={onChange}
              disabled={bloqueado}
            />
          )}

          {onForgotPassword && (
            <button
              type="button"
              className="hotel-login-link"
              onClick={onForgotPassword}
              disabled={bloqueado}
            >
              ¿Olvidaste tu contraseña?
            </button>
          )}

        </div>
      )}

      {/* BOTON INICIAR SESION */}

      <HotelButton
        type="submit"
        color="primary"
        loading={loading}
        disabled={bloqueado}
        className="hotel-login-submit"
      >
        {loading
          ? 'Iniciando sesión...'
          : 'Iniciar sesión'}
      </HotelButton>

      {/* REGISTRO DE CLIENTES */}

      {onRegister && (
        <div className="hotel-login-register">

          <span>¿No tienes una cuenta?</span>

          <button
            type="button"
            className="hotel-login-link"
            onClick={onRegister}
            disabled={bloqueado}
          >
            Regístrate
          </button>

        </div>
      )}

    </form>
  )
}

export default HotelLoginForm