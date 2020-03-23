import { fork, all } from 'redux-saga/effects'
import Login from './Login'
import Orders from './Orders'

export default function * () {
  yield all([fork(Login), fork(Orders)])
}
