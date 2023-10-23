import React, { useState } from "react";
import io from "socket.io-client";
import styles from "../../../styles/versus.module.css"

let versusSocket;


const GameStart = ({ gameId }) => {
  const [isActive, setIsActive] = useState(true);
  const [ready, setReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(true);
  // opponentReady should be set to false for prod

  /* const handleReady = () => {
    versusSocket.emit("playerReady"); //HELP

    // Set the "ready" state to true
    setReady(true);
    

    // Check if both player and opponent are ready
    if (ready && opponentReady) {
      // Emit a socket event to start the game
      versusSocket.emit("startGame"); //HELP
      
      setIsActive(false)
    } */ 
  };

  return (
    <div>
    
      {isActive ? (
        <div className={styles.gameStartContainer}>
        <div className={styles.startContent}>
          <h2>Ready to Start the Game?</h2>
          <button onClick={handleReady} disabled={ready} className={styles.readyButton}>
            {ready ? "Waiting for Opponent" : "Ready"}
          </button>
          <button onClick={handleReady}>close</button>
        </div>
        </div>
      ) : null}
    
    </div>
  );
};

export default GameStart;
