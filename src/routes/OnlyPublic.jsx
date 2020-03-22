import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

/**
 * A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 */
export default function OnlyPublic ({ children, User, ...rest }) {
  const user = useSelector(state => state.User)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user || !user.token ? (
          children
        ) : (
          <Redirect to={{ pathname: location.state ? location.state.from.pathname : '/' }} />
        )
      }
    />
  )
}

OnlyPublic.propTypes = {
  children: PropTypes.object,
  User: PropTypes.object
}
