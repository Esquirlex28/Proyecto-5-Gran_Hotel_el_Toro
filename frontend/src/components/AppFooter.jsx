import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        Hotel El Toro
        <span className="ms-1">&copy; 2026 Hotel El Toro.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
