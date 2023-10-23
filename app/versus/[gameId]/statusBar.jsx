
import React from 'react'
import styles from '../../../styles/versus.module.css'
import HintPotion from './potions/hintPotion'
import FreezePotion from './potions/freezePotion'
import DblPointsPotion from './potions/dblPointsPotion'
import PlayerScoreCounter from './playerScoreCounter'
import CompletionBar from './completionBar'
import Timer from './timer'


const StatusBox = ({ score, completionThreshold, freezeEffect }) => {
  return (
    <div className={styles.cardContainer}>

      <CompletionBar score={score} completionThreshold={completionThreshold}/>
        
        <div className={styles.score}>
        <PlayerScoreCounter score={score}/>
        </div>

        <div className={styles.Timer}><Timer/></div>
        

        <div className={styles.potionsBox}>
          <HintPotion/>
          <FreezePotion freezeOpponent={freezeEffect}/>
          <DblPointsPotion/>
  
        </div>
    </div>
  )
}

export default StatusBox