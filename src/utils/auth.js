/**
 * Authentication control.
 */
const auth = {
  isAuthenticated: false,
  authenticate (cb) {
    console.log('iupi')
    auth.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signOut (cb) {
    auth.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

export default auth
