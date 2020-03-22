import { authenticate } from '../api/auth'
import { call, put, takeLatest } from 'redux-saga/effects'
import { actions, types } from '../actions/Login'

/**
 * Handles the Login intent
 * @param {string} query - The search criteria.
 */
function * Login ({ user }) {
  try {
    // yield put(actions.LoginSuccess({ name: 'UsersName', email: user.email, token: 'asdsasdas.asdasdas.qererq' }))
    const res = yield call(authenticate, user)
    // // Check if res.status ~ 200
    if (res.ok) {
      yield put(actions.LoginSuccess(yield res.json()))
    } else throw res
  } catch (e) {
    console.log(e)

    yield put(actions.LoginFailed('There was an error authenticating'))
  }
}

export default function * () {
  yield takeLatest(types.LOGIN_ATTEMPT, Login)
}
