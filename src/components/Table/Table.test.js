import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import MovieBox from './MovieBox.jsx'
import { mockCanvas } from './../../testUtils'

mockCanvas()

const movieBox =
  <MovieBox
    removeFavorite={() => {}}
    addFavorite={() => {}}
    favorite={false}
    movie={{
      id: 1,
      title: 'Fake movie',
      overview: 'An overview of a fake movie',
      vote_average: 8,
      vote_count: 889,
      poster_path: '/bla.png'
    }}
  />

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    movieBox,
    div
  )
})

it('Renders Movie box correctly', () => {
  const tree = renderer
    .create(movieBox)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('Remove Favorite is called when it\'s a favorite movie & the favorite btn is clicked', () => {
  const spiedRemoveFavorite = jest.fn()
  // Render a checkbox with label in the document
  const shallowMB = shallow(
    <MovieBox
      removeFavorite={spiedRemoveFavorite}
      addFavorite={() => {}}
      favorite
      movie={{
        id: 1,
        title: 'Fake movie',
        overview: 'An overview of a fake movie',
        vote_average: 8,
        vote_count: 889,
        poster_path: '/bla.png'
      }}
    />
  )
  const favoriteBtn = shallowMB.find('div#favoriteBtn')
  const eventObj = {}
  favoriteBtn.simulate('click', eventObj)

  expect(spiedRemoveFavorite).toHaveBeenCalled()
})

it('Add Favorite is called when it\'s NOT a favorite movie & the favorite btn is clicked', () => {
  const spiedAddFavorite = jest.fn()
  // Render a checkbox with label in the document
  const shallowMB = shallow(
    <MovieBox
      removeFavorite={() => {}}
      addFavorite={spiedAddFavorite}
      favorite={false}
      movie={{
        id: 1,
        title: 'Fake movie',
        overview: 'An overview of a fake movie',
        vote_average: 8,
        vote_count: 889,
        poster_path: '/bla.png'
      }}
    />
  )
  const favoriteBtn = shallowMB.find('div#favoriteBtn')
  const eventObj = {}
  favoriteBtn.simulate('click', eventObj)

  expect(spiedAddFavorite).toHaveBeenCalled()
})
