import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import Saga from './sagas'
import reducers from './reducers'
import UserStorage from './middlewares/UserStorage'

const composeEnhanced =
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
    : compose

const UserStorageMiddleware = new UserStorage('__session')

export default () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducers,
    UserStorageMiddleware.InitialState(),
    composeEnhanced(
      applyMiddleware(
        sagaMiddleware,
        UserStorageMiddleware.Middleware()
      )
    )
  )
  sagaMiddleware.run(Saga)
  return store
}
