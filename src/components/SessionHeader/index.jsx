import React from 'react'
import { FaPowerOff } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

import { actions } from '../../actions/Login'

import styles from './styles.module.scss'

/**
 * Table - React component.
 * Renders a box with a movie information and image.
 */
export default function SessionHeader () {
  const user = useSelector(state => state)
  const dispatch = useDispatch()

  if (!user) return null
  return (
    <div className={styles.container}>
      <div className={styles.logoutBtn} title="Logout" size={32} onClick={() => dispatch(actions.Logout())}>
        <FaPowerOff />
      </div>
    </div>
  )
}
