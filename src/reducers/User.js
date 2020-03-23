import { types } from '../actions/Login'

const DEFAULT_STATE = { formSubmit: { loading: false, error: null } }

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_ATTEMPT:
      return {
        ...state,
        formSubmit: {
          ...state.formSubmit,
          loading: true
        }
      }

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        formSubmit: {
          error: null,
          loading: false
        }
      }

    case types.LOGIN_FAILED:
      return {
        ...state,
        formSubmit: {
          error: action.error,
          loading: false
        }
      }

    case types.LOGOUT: {
      return DEFAULT_STATE
    }

    default:
      return state
  }
}
