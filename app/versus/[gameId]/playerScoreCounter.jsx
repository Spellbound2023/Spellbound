import React from 'react'
import styles from '../../../styles/classic/GameBox.module.css'
import Image from 'next/image';
import { useEffect, useState } from "react";


function PlayerScoreCounter({ nextWord }) {
  const [streak, setStreak] = useState(0);


  const setupScore = () => {
    if (nextWord && nextWord.wordData) {
      setStreak(nextWord.streak);
      // console.log("streak: " + nextWord.streak)
    }
  };

  useEffect(() => {
    setupScore();
  }, [nextWord]);
  

    return (
        <div className={styles.scoreContainer} style={{ left: 'unset', top: 'unset' }}> {/* made new file to change this styling */}
        <Image src='/images/streakIcon.png' width={60} height={60}/>
        <p className={styles.score}><b>{streak}</b></p>
      </div>
    );
  }

export default PlayerScoreCounter