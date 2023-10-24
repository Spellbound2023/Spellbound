import React, { useState, useEffect } from "react";
import styles from "../../../styles/versus.module.css";

const Timer = ({ gameStartTimestamp }) => {
  const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time in milliseconds
  const timerDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

  useEffect(() => {
    if (gameStartTimestamp) {
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const startTime = new Date(gameStartTimestamp).getTime();
        const timePassed = currentTime - startTime;
        setElapsedTime(timePassed);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gameStartTimestamp]);

  const remainingTime = Math.max(timerDuration - elapsedTime, 0);

  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return <div className={styles.Timer}>{formattedTime}</div>;
};

export default Timer;