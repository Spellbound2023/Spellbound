import React, { useState, useEffect } from "react";
import styles from "../../../styles/versus.module.css"

const Timer = () => {
  const [timer, setTimer] = useState(300000); // 5 minutes in milliseconds

  useEffect(() => {
    const updateTimer = () => {
      if (timer > 0) {
        setTimer(timer - 1000);
      } else {
        // Handle timer expiration here if needed
      }
    };

    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  const formattedTime = new Date(timer).toISOString().substr(14, 5);

  return <div className={styles.Timer}>{formattedTime}</div>;
};

export default Timer;
