import React from 'react'
import styles from '../../styles/classic/GameBox.module.css'
import Image from 'next/image';

function ScoreCounter({ score }) {
    return (
      //takes the user score as a prop from GameBox, and displays it inside of the image
      <div className={styles.scoreContainer}>
        <Image src='/images/streakIcon.png' width={100} height={90}/>
        <p className={styles.score}><b>{score}</b></p>
      </div>
    );
  }

export default ScoreCounter