import PotionsRow from "@/components/PotionsRow";
import WaveAnimation from "@/components/WaveAnimation";
import React from "react"
import styles from "../../../styles/opponentBox.module.css";
import OpponentScoreCounter from "./opponentScoreCounter";
import OpponentStatusBox from "./opponentStatusBar";
import OpponentUsername from "./opponentUsername";
import OpponentWordInput from "./opponentWordInput";

const OpponentBox = ({ isTyping, username, points, streak }) => {
  return (
    <div className={styles.opponentBoxContainer}> 

        <div className={styles.userAndStatusContainer}>
            <div className={styles.username}>
              <OpponentUsername username={username}/>
            </div>

            <div className={styles.opponentStatusContainer}>
              <OpponentStatusBox points = {points} />
            </div>
        </div>


        <div className={styles.rowContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.potionsBox}>
              <PotionsRow />
            </div>
          </div>
          <div className={styles.rightContainer}>
            <OpponentScoreCounter streak = {streak}/>
          </div>
        </div>


        <div className={styles.wordInputContainer}>
          {isTyping && (
            <div className={styles.waveAnimation}>
              <WaveAnimation />
            </div>
          )}
          <OpponentWordInput />
        </div>

    </div>
  )
}

export default OpponentBox;