import { call, put, takeLatest, select } from 'redux-saga/effects'

import { HTTPCodes } from '../utils/constants'
import { actions, types } from '../actions/Orders'
import { actions as loginActions } from '../actions/Login'
import { getOrders } from '../api/Orders'

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
    if (errorResponse.status === HTTPCodes.UNAUTHORIZED) yield put(loginActions.Logout())
    yield put(actions.GetOrdersFailed('There was an error retrieving the orders'))
  }
}

export default function * () {
  yield takeLatest(types.GET_ORDERS, getOrdersHandler)
}
