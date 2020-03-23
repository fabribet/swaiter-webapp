import { fork, all } from 'redux-saga/effects'
import Login from './Login'

export default function * () {
  yield all([fork(Login)])
}
