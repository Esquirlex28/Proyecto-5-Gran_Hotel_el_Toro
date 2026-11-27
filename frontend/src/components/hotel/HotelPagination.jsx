import React from 'react'
import {
  CPagination,
  CPaginationItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cilChevronLeft,
  cilChevronRight,
} from '@coreui/icons'

import './hotel.scss'

const HotelPagination = ({
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  showInfo = true,
  disabled = false,
  className = '',
}) => {
  const safePageSize = Math.max(1, pageSize)
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / safePageSize)
  )

  const page = Math.min(
    Math.max(1, currentPage),
    totalPages
  )

  const firstItem =
    totalItems === 0
      ? 0
      : (page - 1) * safePageSize + 1

  const lastItem = Math.min(
    page * safePageSize,
    totalItems
  )

  const pages = [...new Set([
    1,
    page - 1,
    page,
    page + 1,
    totalPages,
  ])]
    .filter((number) => number >= 1 && number <= totalPages)
    .sort((a, b) => a - b)

  const changePage = (newPage) => {
    if (
      !disabled &&
      newPage >= 1 &&
      newPage <= totalPages &&
      newPage !== page
    ) {
      onPageChange?.(newPage)
    }
  }

  return (
    <div className={`hotel-pagination ${className}`}>

      {showInfo && (
        <div className="hotel-pagination-info">
          Mostrando {firstItem} - {lastItem} de {totalItems} registros
        </div>
      )}

      <CPagination
        aria-label="Navegación de páginas"
        className="hotel-pagination-list"
      >
        <CPaginationItem
          component="button"
          type="button"
          disabled={disabled || page === 1}
          onClick={() => changePage(page - 1)}
          aria-label="Página anterior"
        >
          <CIcon icon={cilChevronLeft} />
        </CPaginationItem>

        {pages.map((number, index) => (
          <React.Fragment key={number}>

            {index > 0 && number - pages[index - 1] > 1 && (
              <CPaginationItem disabled>
                ...
              </CPaginationItem>
            )}

            <CPaginationItem
              component="button"
              type="button"
              active={page === number}
              disabled={disabled}
              onClick={() => changePage(number)}
              aria-current={page === number ? 'page' : undefined}
            >
              {number}
            </CPaginationItem>

          </React.Fragment>
        ))}

        <CPaginationItem
          component="button"
          type="button"
          disabled={disabled || page === totalPages}
          onClick={() => changePage(page + 1)}
          aria-label="Página siguiente"
        >
          <CIcon icon={cilChevronRight} />
        </CPaginationItem>

      </CPagination>
    </div>
  )
}

export default HotelPagination