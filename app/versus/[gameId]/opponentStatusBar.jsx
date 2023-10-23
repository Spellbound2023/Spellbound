import React from "react"
import styles from '../../../styles/versus.module.css'

const OpponentStatusBox = ({ points }) => {
  const progressPercentage = (points / 30) * 100;

  return (
        <div className={styles.progressBar} style={{ width: '80%' }}>  {/* Inline style added here */}
            <div className={styles.progress} style={{ width: `${progressPercentage}%` }}>
          </div>
        </div>
  )
}

export default OpponentStatusBox
