"use client";

import React from "react";
import styles from "../../styles/classic/WordInfo.module.css";

const playAudio = (e) => {
  e.preventDefault();
  document.getElementById("pronounciation").play();
};

const WordInfo = ({ definition }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.defContainer}>
        <h6 className={styles.heading}>Definition</h6>
        <p className={styles.definition}>{definition}</p>
      </div>
      <div className={styles.audioContainer}>
        <audio
          id="pronounciation"
          src="https://media.merriam-webster.com/audio/prons/en/us/mp3/v/volumi02.mp3"
        ></audio>
        <a onClick={playAudio}>
          <object className={styles.soundIcon} data="/sound_icon.svg">
            {" "}
          </object>
        </a>
      </div>
    </div>
  );
};

export default WordInfo;
