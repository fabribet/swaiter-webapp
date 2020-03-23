
/**
 * Common HTTP Methods used
 */
export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  HEAD: 'HEAD'
}

/**
 * Base URL for API calls.
 */
export const BASE_API_URL = process.env.REACT_APP_API_URL
/**
 * API key to authenticate the API calls.
 */
export const API_KEY = process.env.REACT_APP_API_KEY

/**
 * Generate the headers needed for the requests
 * @param {String} token - Token used on Authentication
 */
export const HeaderFactory = token => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  if (token) headers.append('Authorization', `Bearer ${token}`)
  return headers
}
