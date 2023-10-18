import React from 'react';
import styles from '../../styles/versus.module.css'

const GameResultPopup = ({ PlayerScore, opponentScore, onPlayAgain }) => {
  const isWin = PlayerScore > opponentScore;
  const resultMessage = isWin ? "You Win!" : "You Lose!";


  return (
    <div className={styles.gameResultPopup}>
      <div className={styles.popupContent}>
        <h1>{resultMessage}</h1>
        <div className={styles.scores}>
          <p>Your Score: <span className={styles.scoreNumber}>{PlayerScore}</span></p>
          <p>Opponent's Score: <span className={styles.scoreNumber}>{opponentScore}</span></p>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={onPlayAgain} className={styles.ReplayButton}>Play Again</button>
          <form action='/lobby' ><input type='submit' value="Return Home" className={styles.HomeButton}/></form>
        </div>
      </div>
    </div>
  );
};

export default GameResultPopup;