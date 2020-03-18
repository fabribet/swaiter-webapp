import { types } from '../actions/Favorites'

export default (state = { favorites: {} }, action) => {
  switch (action.type) {
    case types.LOGIN_ATTEMPT:
      return {
        ...state
      }

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload
        }
      }

    case types.LOGIN_FAILED:
      return {
        ...state
      }

    case types.LOGOUT: {
      return {
        ...state,
        user: null
      }
    }

    default:
      return state
  }
}
