
import React from 'react'
import styles from '../../../styles/versus.module.css'
import HintPotion from './potions/hintPotion'
import FreezePotion from './potions/freezePotion'
import DblPointsPotion from './potions/dblPointsPotion'
import PlayerScoreCounter from './playerScoreCounter'
import Timer from './timer'


const StatusBox = ({ nextWord }) => {

  const progressPercentage = (nextWord.points / 30) * 100;

  return (
    <div className={styles.cardContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progressPercentage}%` }}>

          </div>        
        </div>        
        <div className={styles.score}>
        <PlayerScoreCounter nextWord={nextWord}/>
        </div>

        <div className={styles.Timer}><Timer/></div>
        

        <div className={styles.potionsBox}>
          <HintPotion/>
          <FreezePotion/>
          <DblPointsPotion/>
  
        </div>
    </div>
  )
}

export default StatusBox