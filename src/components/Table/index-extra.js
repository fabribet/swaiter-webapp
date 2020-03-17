import { connect } from 'react-redux'
import { actions } from '../../actions/Favorites'
import MovieBox from './MovieBox'

const mapStateToProps = state => ({
  // If the API configuration data has been obtained the Images base url is passed.
  imgUrl: state.TMDB.apiConfig.data ? state.TMDB.apiConfig.data.images.base_url : null
})

const mapDispatchToProps = dispatch => ({
  /**
   * Dispatches the add favorite action.
   * @param {Object} movie
   */
  addFavorite (movie) {
    dispatch(actions.AddFavorite(movie))
  },
  /**
   * Dispatches the remove favorite action.
   * @param {number} movieId
   */
  removeFavorite (movieId) {
    dispatch(actions.RemoveFavorite(movieId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieBox)
