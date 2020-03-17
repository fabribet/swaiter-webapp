import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import HomePage from './HomePage'
import { mockCanvas, createMockStore } from './../../testUtils'

mockCanvas()
const store = createMockStore()

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <HomePage
        favorites={{}}
        apiConfig={{ loading: true, error: null, data: null }}
        popularMovies={{ loading: true, error: null, data: null }}
        searchedMovies={{ loading: true, error: null, data: null }}
        getApiConfig={() => {}}
        getPopularMovies={() => {}}
      />
    </Provider>,
    div
  )
})
