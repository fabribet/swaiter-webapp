export const types = {
  LOGIN_ATTEMPT: 'LOGIN_ATTEMPT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT'
}

export const actions = {
  /**
   * Generates a Login Attempt action.
   */
  LoginAttempt (user) {
    return {
      type: types.LOGIN_ATTEMPT,
      user
    }
  },

  /**
   * Generates a Login Success Action
   */
  LoginSuccess (payload) {
    return {
      type: types.LOGIN_SUCCESS,
      payload
    }
  },

  /**
   * Generates a Login Failed Action
   */
  LoginFailed (error) {
    return {
      type: types.LOGIN_FAILED,
      error
    }
  },

  /**
   * Generates a Logout Action
   */
  Logout () {
    return {
      type: types.LOGOUT
    }
  }
}

/**
 * Returns the selectors to access the User part of the state.
 */
export const selectors = {
  GetUser: state => state.User
}
