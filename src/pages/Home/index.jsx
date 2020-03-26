import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Alert } from 'reactstrap'
import EventSource from 'eventsource'
import moment from 'moment'

import SessionHeader from '../../components/SessionHeader'
import Table from '../../components/Table'

import { actions } from '../../actions/Orders'
import { BASE_API_URL } from '../../api/utils'

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

/**
 * Replaces the status value with a human readable string.
 * @param {string} status
 */
const mapStatus = (status) => status.replace('_', ' ').toUpperCase()

const mapOrders = orders => orders.map(order => {
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

const LOADING_STR = 'Loading...'

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
  // FIXME array dependency should not contain dispatch.
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.GetOrders())
  }, [dispatch])

  const orders = useSelector(state => state.Orders)
  // New pushed orders will dismissed after one and a half seconds.
  useEffect(() => {
    const timeOuts = []
    if (orders.data) {
      orders.data.filter(order => order.newItem).forEach(order => {
        timeOuts.push(setTimeout(() => {
          dispatch(actions.SetOrderAsSeen(order._id))
        }, 4000))
      })
    }
    return () => {
      timeOuts.forEach(timeOutId => clearTimeout(timeOutId))
    }
  }, [orders])

  // Subscribe to new orders
  const token = useSelector(state => state.User.token)
  useEffect(() => {
    var eventSourceInitDict = { headers: { Authorization: `Bearer ${token}` } }
    var evtSource = new EventSource(`${BASE_API_URL}/orders/subscribe`, eventSourceInitDict)
    evtSource.addEventListener('new-order', (evt) => {
      if (evt.data) {
        try {
          const newOrder = JSON.parse(evt.data)
          dispatch(actions.PushOrder(newOrder))
        } catch (error) {
          // Do something
        }
      }
    })
    evtSource.onerror = (err) => {
      // TODO Handle error properly
      console.error('EventSource failed:', err.data)
    }
    return () => evtSource.close()
  }, [token, dispatch])

  return (
    <div>
      <SessionHeader />
      { orders.data
        ? (
          <Table
            name="Dashboard"
            headers={[
              { name: '#', key: 'number' },
              { name: 'Order', key: 'description' },
              { name: 'price', key: 'price' },
              { name: 'User', key: 'user' },
              { name: 'Location', key: 'location' },
              { name: 'Remaining Time', key: 'ETA' },
              { name: 'Status', key: 'status' }
            ]}
            content={mapOrders(orders.data)}
            orderBy="ETA"
            // footerText='Some footer info'
          />
        ) : orders.loading
          ? LOADING_STR
          : orders.error
            ? <Alert color="danger">{orders.error}</Alert>
            : null
      }
    </div>
  )
}
