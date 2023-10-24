"use client";

import React from "react";
import styles from "../../styles/classic/WordInfo.module.css";

/* Audio player button for word pronounciation */
const playAudio = (e) => {
  e.preventDefault();
  document.getElementById("pronounciation").play();
};

const WordInfo = ({ definition, audioUrl, frozen }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.defContainer}>
        <h6 className={styles.heading}>Definition</h6>
        <p className={styles.definition}>{definition}</p>
      </div>
      <div className={styles.audioContainer}>
        <audio
          id="pronounciation"
          src={audioUrl}
        ></audio>
        <a className={`${styles.audioButton} ${frozen ? styles.disabled : ""}`} onClick={playAudio} >
          <object className={styles.soundIcon} data="/images/sound_icon.svg">
            {" "}
          </object>
        </a>
      </div>
    </div>
  );
};

export default WordInfo;
