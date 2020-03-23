import { types } from '../actions/Login'

export default (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_ATTEMPT:
      return {
        ...state
      }

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload
      }

    case types.LOGIN_FAILED:
      return {
        ...state
      }

    case types.LOGOUT: {
      return {}
    }

    default:
      return state
  }
}
