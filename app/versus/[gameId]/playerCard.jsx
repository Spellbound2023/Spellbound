'use client'

import React, { useState } from "react";
import styles from '../../styles/versus.module.css'
import WordInfo from "../../classic/WordInfo";
import WordInput from "../../classic/WordInput";

const PlayerBox = () => {
    const [audioUrl, setAudioUrl] = useState("");

  return (
    <div className={styles.PlayerCardContainer}>
        <WordInfo 
        definition={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed nisi quis tortor lobortis aliquam. Sed ante purus, tempus ut."} 
        audioUrl={audioUrl}
        />

        <WordInput/>
    </div>
  )
}

export default PlayerBox