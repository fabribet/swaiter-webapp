
export const types = {
  GET_ORDERS: 'GET_ORDERS',
  GET_ORDERS_SUCCESS: 'GET_ORDERS_SUCCESS',
  GET_ORDERS_FAILED: 'GET_ORDERS_FAILED',
  PUSH_ORDER: 'PUSH_ORDER',
  UPDATE_ORDER: 'UPDATE_ORDER',
  SET_ORDER_AS_SEEN: 'SET_ORDER_AS_SEEN'
}

export const actions = {
  /**
   * Generates a Get Orders action.
   */
  GetOrders () {
    return { type: types.GET_ORDERS }
  },

  /**
   * Generates a Get Orders Success Action
   */
  GetOrdersSuccess (payload) {
    return {
      type: types.GET_ORDERS_SUCCESS,
      payload
    }
  },

  /**
   * Generates a Get Orders Failed Action
   */
  GetOrdersFailed (error) {
    return {
      type: types.LOGIN_FAILED,
      error
    }
  },

  /**
   * Generates a Push Order Action
   */
  PushOrder (order) {
    return {
      type: types.PUSH_ORDER,
      order
    }
  },

  /**
   * Generates a Push Order Action
   */
  UpdateOrder (order) {
    return {
      type: types.UPDATE_ORDER,
      order
    }
  },

  /**
   * Generates a Push Order Action
   */
  SetOrderAsSeen (id) {
    return {
      type: types.SET_ORDER_AS_SEEN,
      id
    }
  }
}
