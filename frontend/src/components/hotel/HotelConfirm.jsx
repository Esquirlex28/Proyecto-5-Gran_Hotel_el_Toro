import React, { useId } from 'react'
import CIcon from '@coreui/icons-react'
import { cilWarning, cilX, cilCheck } from '@coreui/icons'

import HotelModal from './HotelModal'
import HotelButton from './HotelButton'
import './hotel.scss'

const HotelConfirm = ({
  visible = false,
  onClose,
  onConfirm,
  title = 'Confirmar operación',
  message = '¿Está seguro de realizar esta operación?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  color = 'danger',
  icon = cilWarning,
  confirmIcon = cilCheck,
  loading = false,
  children,
}) => {
  const titleId = useId()

  const handleClose = () => {
    if (!loading) {
      onClose?.()
    }
  }

  return (
    <HotelModal
      visible={visible}
      onClose={handleClose}
      title={<span id={titleId}>{title}</span>}
      aria-labelledby={titleId}
      backdrop="static"
      keyboard={!loading}
      closeButton={!loading}
      className="hotel-confirm"
      footer={
        <>
          <HotelButton
            color="secondary"
            variant="outline"
            icon={cilX}
            disabled={loading}
            onClick={handleClose}
          >
            {cancelText}
          </HotelButton>

          <HotelButton
            color={color}
            icon={confirmIcon}
            loading={loading}
            disabled={!onConfirm}
            onClick={onConfirm}
          >
            {confirmText}
          </HotelButton>
        </>
      }
    >
      <div className="hotel-confirm-content">
        <div
          className={`hotel-confirm-icon hotel-confirm-${color}`}
        >
          <CIcon
            icon={icon}
            size="xxl"
            aria-hidden="true"
          />
        </div>

        <p className="hotel-confirm-message">
          {message}
        </p>

        {children && (
          <div className="hotel-confirm-details">
            {children}
          </div>
        )}
      </div>
    </HotelModal>
  )
}

export default HotelConfirm