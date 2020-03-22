import React from 'react'
import { Badge } from 'reactstrap'
import moment from 'moment'
// import PropTypes from 'prop-types'

// import style from './styles.scss'

import Table from '../../components/Table'
import SessionHeader from '../../components/SessionHeader'

const ORDER_STATUSES = {
  PENDING: 'pending',
  READY: 'ready',
  IN_PROGRESS: 'in_progress'
}

const STATUS_COLORS = {
  [ORDER_STATUSES.PENDING]: 'warning',
  [ORDER_STATUSES.READY]: 'success',
  [ORDER_STATUSES.IN_PROGRESS]: 'info'
}

const FAKE_ORDERS = [
  {
    order: '1 Burger',
    name: 'Roberto',
    location: 'Carpa 4',
    status: ORDER_STATUSES.PENDING,
    ETA: null,
    price: 18
  },
  {
    order: '1 Hotdog - 2 Burguers',
    name: 'Laura',
    location: 'Carpa 17',
    status: ORDER_STATUSES.IN_PROGRESS,
    ETA: moment().add(1, 'hour').valueOf(),
    price: 240
  },
  {
    order: '1 Milkshake',
    name: 'Aylen',
    location: 'Sombrilla 12',
    status: ORDER_STATUSES.PENDING,
    ETA: null,
    price: 180
  },
  {
    order: '2 French Fries - 2 Burguers',
    name: 'Fiama',
    location: 'Carpa 209',
    status: ORDER_STATUSES.READY,
    ETA: moment().valueOf(),
    price: 1829
  },
  {
    order: '8 Hotdog - 2 Burguers',
    name: 'Laura',
    location: 'Carpa 127',
    status: ORDER_STATUSES.IN_PROGRESS,
    ETA: moment().add(1, 'hour').valueOf(),
    price: 240
  },
  {
    order: '9 Burguers',
    name: 'Laura',
    location: 'Carpa 17',
    status: ORDER_STATUSES.IN_PROGRESS,
    ETA: moment().add(2, 'hour').valueOf(),
    price: 1040
  }
]

/**
 * Replaces the status value with a human readable string.
 * @param {string} status
 */
const mapStatus = (status) => status.replace('_', ' ').toUpperCase()

const mappedOrders = FAKE_ORDERS.map(order => {
  order = {
    ...order,
    status: {
      value: order.status,
      tableValue: <Badge color={STATUS_COLORS[order.status]} pill>{mapStatus(order.status)}</Badge>
    },
    ETA: {
      value: order.ETA === null ? moment().add(100, 'days').valueOf() : order.ETA,
      tableValue: order.ETA ? `${Math.round((order.ETA - moment().valueOf()) / 1000 / 60)} minute(s)` : 'n/a'
    }
  }
  return order
})

// const LOADING_STR = 'Loading...'

/**
 * Home PAge - React Component.
 * Main MovieSearch page, Favorites section, the search bar and the search results/ popular movies are rendered.
 *
 * Props
 * favorites {object}      - The saved movies.
 * apiConfig {object}      - Api config information
 * popularMovies {object}  - Popular movies gotten from the API
 * searchedMovies {object} - Movie Search results
 * getApiConfig {func}     - Triggers the call for getting the API config
 * getPopularMovies {func} - Triggers the call for getting the Popular movies
 *
 */
export default function HomePage () {
  return (
    <div>
      <SessionHeader />
      <Table
        name="Dashboard"
        headers={[
          { name: 'Order', key: 'order' },
          { name: 'price', key: 'price' },
          { name: 'Name', key: 'name' },
          { name: 'Location', key: 'location' },
          { name: 'Remaining Time', key: 'ETA' },
          { name: 'Status', key: 'status' }
        ]}
        content={mappedOrders}
        orderBy="ETA"
        // footerText='Some footer info'
      />
    </div>
  )
}

HomePage.propTypes = {

}
