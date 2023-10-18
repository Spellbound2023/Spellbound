import React from 'react'
import styles from '../../../styles/classic/GameBox.module.css'
import Image from 'next/image';

function OpponentScoreCounter({ score }) {
    return (
        <div className={styles.scoreContainer} style={{ left: 'unset', top: 'unset' }}> {/* made new file to change this styling */}
        <Image src='/images/streakIcon.png' width={60} height={60}/>
        <p className={styles.score}><b>{score}</b></p>
      </div>
    );
  }

export default OpponentScoreCounter