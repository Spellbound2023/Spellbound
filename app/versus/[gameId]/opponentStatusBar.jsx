import React from "react"
import styles from '../../../styles/versus.module.css'

const OpponentStatusBox = ({ score, completionThreshold }) => {
  const completionPercentage = (score / completionThreshold) * 100;

  // Ensure the completion percentage is capped at 100%
  const barWidth = completionPercentage > 100 ? 100 : completionPercentage;

  return (
    <div className={styles.progressBar} style={{ width: '80%' }}>
      <div
        className={styles.progress}
        style={{ width: `${barWidth}%` }}
      >
        {/* You can add content or text inside the progress div if needed */}
        <div className={styles.opponentScorePercentage}>{score} / {completionThreshold}</div>
      </div>
    </div>
  );
};

export default OpponentStatusBox
