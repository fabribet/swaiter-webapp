import { call, put, takeLatest } from 'redux-saga/effects'

import { authenticate } from '../api/auth'
import { actions, types } from '../actions/Login'
import { HTTPCodes } from '../utils/constants'

/**
 * Handles the Login intent
 * @param {string} query - The search criteria.
 */
function * Login ({ user }) {
  try {
    const res = yield call(authenticate, user)
    // // Check if res.status ~ 200
    if (res.ok) {
      yield put(actions.LoginSuccess(yield res.json()))
    } else throw res
  } catch (errorResponse) {
    const message = errorResponse.status === HTTPCodes.UNAUTHORIZED
      ? 'The email or password was incorrect'
      : 'There was an error authenticating'
    yield put(actions.LoginFailed(message))
  }
}

export default function * () {
  yield takeLatest(types.LOGIN_ATTEMPT, Login)
}
