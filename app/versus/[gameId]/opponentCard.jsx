import PotionsRow from "@/components/PotionsRow";
import WaveAnimation from "@/components/WaveAnimation";
import React from "react"
import styles from "../../../styles/opponentBox.module.css";
import OpponentScoreCounter from "./opponentScoreCounter";
import OpponentStatusBox from "./opponentStatusBar";
import OpponentUsername from "./opponentUsername";
import OpponentWordInput from "./opponentWordInput";

const OpponentBox = ({ opponentScore, completionThreshold, border }) => {
  const boxStyle = {
    border,
    /* other styles */
  };


  return (
    <div style={boxStyle} className={styles.opponentBoxContainer}> 

        <div className={styles.userAndStatusContainer}>
            <div className={styles.username}>
              <OpponentUsername />
            </div>

            <div className={styles.opponentStatusContainer}>
              <OpponentStatusBox score={opponentScore} completionThreshold={completionThreshold}/>
            </div>
        </div>


        <div className={styles.rowContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.potionsBox}>
              <PotionsRow />
            </div>
          </div>
          <div className={styles.rightContainer}>
            <OpponentScoreCounter score={opponentScore} />
          </div>
        </div>


        <div className={styles.wordInputContainer}>
          <div className={styles.waveAnimation}>
            <WaveAnimation />
          </div>
          <OpponentWordInput />
        </div>

    </div>
  )
}

export default OpponentBox;