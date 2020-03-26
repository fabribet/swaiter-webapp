import { types } from '../actions/Login'

const DEFAULT_STATE = {
  User: {
    formSubmit: {
      data: null,
      error: null,
      loading: false
    }
  }
}

/**
 * User Middleware. In charge of saving the user information to the local storage.
 */
export default class UserStorage {
  constructor (key) {
    this.key = key
  }

  /**
   * Returns the initial state for the User, initialized by the local storage if
   * something has been saved
   */
  InitialState () {
    const state = localStorage.getItem(this.key)
    if (state) {
      try {
        const parsedState = JSON.parse(state)
        return {
          User: parsedState
        }
      } catch (e) {
        return DEFAULT_STATE
      }
    } else return DEFAULT_STATE
  }

  /**
   * User Middleware. Checks for the pertinent actions to save the User updates.
   */
  Middleware () {
    return store => next => action => {
      if (action.type === types.LOGIN_SUCCESS || action.type === types.LOGOUT) {
        const result = next(action)
        localStorage.setItem(this.key, JSON.stringify(store.getState().User))
        return result
      }
      return next(action)
    }
  }
}
