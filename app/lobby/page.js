import React from 'react'
import styles from '../../styles/lobby.module.css'
import JoinGame from './joinGame'
import JoinGameTest from './joinGameTest'
import ReadyToggle from './readyToggle'

const page = () => {
    // Returns active players in table format displaying username, status and 
  return (
    <>
    <h1 className={styles.Header}>Lobby</h1>
    <div className={styles.tableContainer}>
        <ReadyToggle/>
        <table className={styles.lobbyList}>
            <tr>
                <th>Username</th>
                <th>Status</th>
            </tr>
            <tr>
                <td>Username placeholder</td>
                <td><JoinGame/></td>
            </tr>
            <tr>
                <td>Username placeholder</td>
                <td><JoinGame/></td>
            </tr>
            <JoinGameTest/>

              
        </table>
    </div>
    </>
  )
}

export default page
