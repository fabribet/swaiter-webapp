import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
// import Truncate from 'react-truncate'

import styles from './styles.module.scss'

/**
 * Verifies what's the column content to return its value.
 * @param {string | number | object} col - the column to be checked
 */
const getColValue = (col) => (typeof col === 'object' && col.value) ? col.value : col

/**
 * Sorts the content array based on the type of the sorting field.
 * @param {array} content - the rows
 * @param {string} key - the key to sort by
 *
 * @returns {array} - the sorted rows.
 */
function sort (content, orderBy) {
  const sortedRows = [...content]
  const key = orderBy.col
  const asc = orderBy.asc
  if (sortedRows.length && sortedRows[0][key]) {
    if (typeof getColValue(sortedRows[0][key]) === 'number') {
      sortedRows.sort((a, b) => {
        const aVal = getColValue(a[key])
        const bVal = getColValue(b[key])
        if (asc) return aVal - bVal
        return bVal - aVal
      })
    } else {
      sortedRows.sort((a, b) => {
        const aVal = getColValue(a[key])
        const bVal = getColValue(b[key])
        if (asc) {
          if (aVal < bVal) return -1
          else if (bVal < aVal) return 1
          return 0
        // Descending case
        } else {
          console.log('descending case')
          if (bVal < aVal) return -1
          else if (aVal < bVal) return 1
          return 0
        }
      })
    }
  }
  return sortedRows
}

/**
 * Table - React component.
 * Renders a box with a movie information and image.
 *
 * Properties
 * - name {String}          - The table name. Will define the title. {Required}
 * - headers {[Object]}     - Table Headers and row keys. {Required}
 * - content {[RowObject]}  - Table Rows. The amount of keys must alling with the amount of headers. {Required}
 * - orderBy {string}       - Key of the column to order the table. {Optional. Default will be the first column}
 * - colors {Object}        - Defines how to color rows based on a key and its values. (Example { val1: green, val2: red, val3: yellow } )
 * - colorBy {string}       - Key of the column to color the row. {Optional}
 * - footerText {String}    - Text to be displayed on the footer.
 */
export default function SwaiterTable (props) {
  const [orderBy, setOrderBy] = useState({
    col: props.orderBy ? props.orderBy : props.headers[0].key,
    asc: true
  })
  const sortedRows = sort(props.content, orderBy)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{props.name}</h2>
      <Table className={styles.table}>
        <thead>
          <tr>
            {props.headers.map((header, index) =>
              <th
                key={`${props.name}_${index}`}
                className={header.key === orderBy.col ? styles.orderBy : null}
                onClick={() => setOrderBy({ col: header.key, asc: orderBy.col === header.key ? !orderBy.asc : true })}

              >
                {header.name}
                {header.key === orderBy.col
                  ? (
                    orderBy.asc ? <FaSortUp /> : <FaSortDown />
                  )
                  : <FaSort />
                }
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) =>
            <tr key={`${props.name}_${index}`} >
              {props.headers.map((header, index) =>
                <td key={`${props.name}_${index}`}>
                  {typeof row[header.key] === 'object' && row[header.key].tableValue
                    ? row[header.key].tableValue
                    : row[header.key]
                  }
                </td>
              )}
            </tr>
          )}
        </tbody>
        {props.footerText
          ? (
            <tfoot>
              <tr>
                <td colSpan={props.headers.length}>{props.footerText}</td>
              </tr>
            </tfoot>
          ) : null
        }
      </Table>
    </div>
  )
}

SwaiterTable.propTypes = {
  name: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  })).isRequired,
  orderBy: PropTypes.string,
  content: PropTypes.array.isRequired,
  footerText: PropTypes.string
}
