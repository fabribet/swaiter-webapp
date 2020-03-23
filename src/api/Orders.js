import { BASE_API_URL, METHODS, HeaderFactory } from './utils'

/**
 * Calls the search movie API.
 * @param {string} query - The query string for the search.
 *
 * @returns Promise<Response>
 *  *************
 *  Usage Example
 *  *************
 *
 *  getOrders()
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
export const getOrders = function (token) {
  return fetch(`${BASE_API_URL}/orders`, {
    method: METHODS.GET,
    headers: HeaderFactory(token),
    cache: 'no-cache'
  })
}
