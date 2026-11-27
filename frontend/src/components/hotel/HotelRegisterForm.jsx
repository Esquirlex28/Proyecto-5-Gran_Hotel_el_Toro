import React from 'react'

import HotelInput from './HotelInput'
import HotelPasswordInput from './HotelPasswordInput'
import HotelCheckbox from './HotelCheckbox'
import HotelButton from './HotelButton'
import HotelAlert from './HotelAlert'

import './hotel.scss'

const HotelRegisterForm = ({
  values = {},
  errors = {},
  onChange,
  onSubmit,
  onLogin,
  onTerms,
  loading = false,
  disabled = false,
  error,
  showIdentity = true,
  showPhone = true,
  showTerms = false,
  fieldNames = {},
  className = '',
}) => {
  const campos = {
    nombre: 'nombre',
    apellido: 'apellido',
    identidad: 'identidad',
    correo: 'correo',
    telefono: 'telefono',
    password: 'password',
    confirmarPassword: 'confirmarPassword',
    terminos: 'terminos',
    ...fieldNames,
  }

  const bloqueado = loading || disabled

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!bloqueado && onSubmit) {
      onSubmit(e)
    }
  }

  return (
    <form
      className={`hotel-register-form ${className}`}
      onSubmit={handleSubmit}
    >

      {/* MENSAJE DE ERROR */}

      {error && (
        <HotelAlert color="danger">
          {error}
        </HotelAlert>
      )}

      {/* INFORMACION PERSONAL */}

      <div className="hotel-register-grid">

        <HotelInput
          label="Nombre"
          name={campos.nombre}
          value={values[campos.nombre] ?? ''}
          onChange={onChange}
          placeholder="Ingrese su nombre"
          autoComplete="given-name"
          error={errors[campos.nombre]}
          disabled={bloqueado}
          required
        />

        <HotelInput
          label="Apellido"
          name={campos.apellido}
          value={values[campos.apellido] ?? ''}
          onChange={onChange}
          placeholder="Ingrese su apellido"
          autoComplete="family-name"
          error={errors[campos.apellido]}
          disabled={bloqueado}
          required
        />

      </div>

      {/* IDENTIDAD */}

      {showIdentity && (
        <HotelInput
          label="Documento de identidad"
          name={campos.identidad}
          value={values[campos.identidad] ?? ''}
          onChange={onChange}
          placeholder="Ingrese su identificación"
          error={errors[campos.identidad]}
          disabled={bloqueado}
          required
        />
      )}

      {/* CORREO ELECTRONICO */}

      <HotelInput
        label="Correo electrónico"
        type="email"
        name={campos.correo}
        value={values[campos.correo] ?? ''}
        onChange={onChange}
        placeholder="correo@ejemplo.com"
        autoComplete="email"
        error={errors[campos.correo]}
        disabled={bloqueado}
        required
      />

      {/* TELEFONO */}

      {showPhone && (
        <HotelInput
          label="Teléfono"
          type="tel"
          name={campos.telefono}
          value={values[campos.telefono] ?? ''}
          onChange={onChange}
          placeholder="Ingrese su teléfono"
          autoComplete="tel"
          error={errors[campos.telefono]}
          disabled={bloqueado}
          required
        />
      )}

      {/* CONTRASEÑA */}

      <HotelPasswordInput
        label="Contraseña"
        name={campos.password}
        value={values[campos.password] ?? ''}
        onChange={onChange}
        placeholder="Ingrese su contraseña"
        autoComplete="new-password"
        error={errors[campos.password]}
        disabled={bloqueado}
        required
      />

      {/* CONFIRMAR CONTRASEÑA */}

      <HotelPasswordInput
        label="Confirmar contraseña"
        name={campos.confirmarPassword}
        value={
          values[campos.confirmarPassword] ?? ''
        }
        onChange={onChange}
        placeholder="Repita su contraseña"
        autoComplete="new-password"
        error={errors[campos.confirmarPassword]}
        disabled={bloqueado}
        required
      />

      {/* TERMINOS Y CONDICIONES */}

      {showTerms && (
        <div className="hotel-register-terms">

          <HotelCheckbox
            name={campos.terminos}
            label="Acepto los términos y condiciones."
            checked={Boolean(values[campos.terminos])}
            onChange={onChange}
            error={errors[campos.terminos]}
            disabled={bloqueado}
            required
          />

          {onTerms && (
            <button
              type="button"
              className="hotel-register-link"
              onClick={onTerms}
              disabled={bloqueado}
            >
              Consultar términos y condiciones
            </button>
          )}

        </div>
      )}

      {/* BOTON REGISTRARSE */}

      <HotelButton
        type="submit"
        color="primary"
        loading={loading}
        disabled={bloqueado}
        className="hotel-register-submit"
      >
        {loading
          ? 'Creando cuenta...'
          : 'Registrarse'}
      </HotelButton>

      {/* VOLVER AL INICIO DE SESION */}

      {onLogin && (
        <div className="hotel-register-login">

          <span>¿Ya tienes una cuenta?</span>

          <button
            type="button"
            className="hotel-register-link"
            onClick={onLogin}
            disabled={bloqueado}
          >
            Inicia sesión
          </button>

        </div>
      )}

    </form>
  )
}

export default HotelRegisterForm