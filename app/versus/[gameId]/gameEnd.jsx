import React from "react";
import styles from "../../../styles/versus.module.css";

const GameResultPopup = ({
  isWin,
  PlayerScore,
  opponentScore,
  gameEndMessage,
  onPlayAgain,
}) => {
  // const isWin = PlayerScore > opponentScore;
  let resultMessage;
  //if neither player has a higher score than the other, the game is a Tie
  if (isWin === null) {
    resultMessage = "Draw!";
  } else {
  //depending on winner, either display win or lose to the player. 
    resultMessage = isWin ? "You Win!" : "You Lose!";
  }

  return (
    <div className={styles.gameResultPopup}>
      <div className={styles.popupContent}>
        <h2>{gameEndMessage}</h2>
        <h1>{resultMessage}</h1>
        <div className={styles.scores}>
          <p>
            {/*score is empty value to begin with and is filled with back-end playerScore information*/}
            Your Score: {" "}
            <span className={styles.scoreNumber}>{PlayerScore}</span>
          </p>
          <p>
            Opponent's Score: {" "}
            <span className={styles.scoreNumber}>{opponentScore}</span>
          </p>
        </div>
        <div className={styles.buttonContainer}>
          {/*button to return to lobby after game is finished*/}
          <form action="/versus">
            <input
              type="submit"
              value="Return Home"
              className={styles.HomeButton}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default GameResultPopup;
