"use client";

import React from "react";
import styles from "../../styles/classic/WordInfo.module.css";

// Function to play audio when the audio button is clicked
const playAudio = (e) => {
  e.preventDefault();
  document.getElementById("pronounciation").play();
};

// Define a functional component called WordInfo
const WordInfo = ({ definition, audioUrl, frozen }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.defContainer}>
        <h6 className={styles.heading}>Definition</h6>
        <p className={styles.definition}>{definition}</p>
      </div>
      <div className={styles.audioContainer}>
      {/* Define an audio element for word pronunciation with the provided audio URL */}
        <audio
          id="pronounciation"
          src={audioUrl}
        ></audio>
        {/* Create an audio button to trigger audio playback */}
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
