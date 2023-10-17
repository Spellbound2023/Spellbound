import React from 'react'
import styles from '../../styles/lobby.module.css'
import JoinGame from './joinGame'
import InstructionsPopup from './instructions'

const page = () => {
    // Returns active players in table format displaying username, status and 
  return (
    <>
    <h1 className={styles.Header}>Lobby</h1>
    <div className={styles.tableContainer}>
        <table className={styles.lobbyList}>
            <tbody>
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
            </tbody> 
        </table>
    </div>
    <InstructionsPopup/>
    </>
  )
}

export default page