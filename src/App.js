import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import PrivateRoute from './routes/PrivateRoute'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import store from './store'
import OnlyPublic from './routes/OnlyPublic'

export default function App () {
  return (
    <Provider store={ store() }>
      <Router>
        <Switch>
          <OnlyPublic path="/login">
            <LoginPage />
          </OnlyPublic>
          <PrivateRoute path="/">
            <HomePage />
          </PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  )
}
