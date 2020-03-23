import { call, put, takeLatest, select } from 'redux-saga/effects'

import { getOrders } from '../api/Orders'
import { actions, types } from '../actions/Orders'

/**
 * Handles the Get ORders intent
 */
function * getOrdersHandler () {
  const token = yield select(state => state.User.token)
  try {
    const res = yield call(getOrders, token)
    // // Check if res.status ~ 200
    if (res.ok) {
      yield put(actions.GetOrdersSuccess(yield res.json()))
    } else throw res
  } catch (errorResponse) {
    yield put(actions.LoginFailed('There was an error retrieving the orders'))
  }
}

export default function * () {
  yield takeLatest(types.GET_ORDERS, getOrdersHandler)
}
