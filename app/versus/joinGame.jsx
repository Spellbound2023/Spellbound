import React from 'react'
import styles from '../../styles/lobby.module.css'

const JoinGame = () => {
  return (
    <div>
        <form action="../versus" className={styles.joinButton}>
            <input type="submit" value="Join"/>
        </form>
    </div>
  )
}

export default JoinGame