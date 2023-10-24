import React from "react"
import styles from '../../../styles/versus.module.css'

const OpponentStatusBox = ({ points }) => {
  const progressPercentage = (points / 30) * 100;

  return (
        <div className={styles.OpponentProgressBar} style={{ width: '80%' }}>  {/* Inline style added here */}
            <div className={styles.OpponentProgress} style={{ width: `${progressPercentage}%` }}>
          </div>
        </div>
  )
}

export default OpponentStatusBox
