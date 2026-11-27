import React from 'react'
import { CFooter } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBuilding } from '@coreui/icons'

const AppFooter = () => {
  const anioActual = new Date().getFullYear()

  return (
    <CFooter className="px-4 py-3">

      {/* IDENTIDAD DEL HOTEL */}

      <div className="d-flex align-items-center gap-2">
        <CIcon
          icon={cilBuilding}
          className="text-body-secondary"
          size="lg"
        />

        <span className="fw-semibold">
          Gran Hotel El Toro
        </span>

        <span className="text-body-secondary small">
          &copy; {anioActual}
        </span>
      </div>

      {/* INFORMACION DEL SISTEMA */}

      <div className="ms-auto">
        <span className="text-body-secondary small">
          Sistema de gestión hotelera
        </span>
      </div>

    </CFooter>
  )
}

export default React.memo(AppFooter)