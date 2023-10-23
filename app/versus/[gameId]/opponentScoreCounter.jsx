import React from 'react'
import styles from '../../../styles/classic/GameBox.module.css'
import Image from 'next/image';
import {useState } from "react";


function OpponentScoreCounter({ /*streak*/ }) {

  return (
      <div className={styles.scoreContainer} style={{ left: 'unset', top: 'unset' }}>
        <Image src='/images/streakIcon.png' width={60} height={60}/>
        <p className={styles.score}><b>0</b></p>
      </div>
    );
  }

export default OpponentScoreCounter