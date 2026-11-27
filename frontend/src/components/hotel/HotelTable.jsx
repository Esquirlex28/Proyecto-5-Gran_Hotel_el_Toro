import React from 'react'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CSpinner,
} from '@coreui/react'

import './hotel.scss'

const HotelTable = ({
  columns = [],
  data = [],
  rowKey = 'id',
  loading = false,
  emptyMessage = 'No hay registros disponibles.',
  striped = false,
  hover = true,
  bordered = false,
  className = '',
  ...props
}) => {
  return (
    <div className="hotel-table-container">
      <CTable
        {...props}
        responsive
        striped={striped}
        hover={hover}
        bordered={bordered}
        className={`hotel-table ${className}`}
      >
        <CTableHead>
          <CTableRow>
            {columns.map((column) => (
              <CTableHeaderCell
                key={column.key}
                scope="col"
                className={column.className}
                style={{ width: column.width }}
              >
                {column.label}
              </CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {loading ? (
            <CTableRow>
              <CTableDataCell
                colSpan={Math.max(columns.length, 1)}
                className="hotel-table-message"
              >
                <CSpinner
                  size="sm"
                  color="primary"
                  className="me-2"
                />
                Cargando registros...
              </CTableDataCell>
            </CTableRow>
          ) : data.length === 0 ? (
            <CTableRow>
              <CTableDataCell
                colSpan={Math.max(columns.length, 1)}
                className="hotel-table-message"
              >
                {emptyMessage}
              </CTableDataCell>
            </CTableRow>
          ) : (
            data.map((row, index) => (
              <CTableRow key={row[rowKey] ?? index}>
                {columns.map((column) => (
                  <CTableDataCell
                    key={column.key}
                    className={column.className}
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.key] ?? '—'}
                  </CTableDataCell>
                ))}
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default HotelTable