
import React from 'react'
import styles from '../../../styles/versus.module.css'
import HintPotion from './potions/hintPotion'
import FreezePotion from './potions/freezePotion'
import DblPointsPotion from './potions/dblPointsPotion'
import PlayerScoreCounter from './playerScoreCounter'

const StatusBox = ({ score }) => {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progress}>

          </div>
        </div>
        
        <div className={styles.score}>
        <PlayerScoreCounter score={score}/>
        </div>

        <div className={styles.potionsBox}>
          <HintPotion/>
          <FreezePotion/>
          <DblPointsPotion/>
  
        </div>
    </div>
  )
}

export default StatusBox