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
    //component to activate player ready event and broadcast it to the backend.
    <div>
      <label className={styles.switch}>
        <input
          id="ready-checkbox"
          onClick={handleReadyCheck}
          type="checkbox"
        />
        {/*formatted as a slider for recognisability*/}
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default ReadyToggle;
