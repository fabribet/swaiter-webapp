import { connect } from 'react-redux'

import { actions } from '../../actions/TMDB'
import HomePage from './HomePage'

const mapStateToProps = state => ({
  popularMovies: state.TMDB.popularMovies,
  searchedMovies: state.TMDB.searchedMovies,
  apiConfig: state.TMDB.apiConfig,
  favorites: state.Favorites.favorites
})

const mapDispatchToProps = dispatch => ({
  /**
   * Dispatches the action for calling the Popular movies API
   */
  getPopularMovies () {
    dispatch(actions.GetPopularMovies())
  },
  /**
   * Dispatches the action for calling the API config
   */
  getApiConfig () {
    dispatch(actions.GetConfig())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
