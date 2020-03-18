import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import PrivateRoute from './routes/PrivateRoute'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'

export default function App () {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/">
          <HomePage />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}
