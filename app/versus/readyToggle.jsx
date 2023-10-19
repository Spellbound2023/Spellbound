"use client";
import styles from '../../styles/lobby.module.css'
import React from "react";

const ReadyToggle = ({ onClick : onClickHandler }) => {
  function handleReadyCheck(e) {
    let checkStatus = document.getElementById("ready-checkbox").checked;
    console.log("Ready: ", checkStatus);
    onClickHandler(checkStatus);
  }

  return (
    <div>
      <label className={styles.switch}>
        <input
          id="ready-checkbox"
          onClick={handleReadyCheck}
          type="checkbox"
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default ReadyToggle;
