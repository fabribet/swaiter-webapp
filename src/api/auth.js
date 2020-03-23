import { BASE_API_URL, METHODS } from './utils'
import base64 from 'base-64'

/**
 * Calls the search movie API.
 * @param {string} query - The query string for the search.
 *
 * @returns Promise<Response>
 *  *************
 *  Usage Example
 *  *************
 *
 *  searchMovies()
 *    .then(function(response){
 *      if (response.ok) {
 *        response.json().then(function(data) {
 *          console.log(data);
 *        })
 *      } else {
 *        console.log('There was an error searching albums. Error status = ', response.status)
 *      }
 *    })
 */
export const authenticate = function ({ email, password }) {
  return fetch(`${BASE_API_URL}/login`, {
    method: METHODS.POST,
    headers: new Headers({
      Authorization: `Basic ${base64.encode(`${email}:${password}`)}`
    }),
    cache: 'no-cache'
  })
}
