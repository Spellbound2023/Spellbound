import PotionsRow from "@/components/PotionsRow";
import WaveAnimation from "@/components/WaveAnimation";
import React from "react"
import styles from "../../styles/opponentBox.module.css";
import OpponentStatusBox from "./opponentStatusBar";
import OpponentUsername from "./opponentUsername";
import OpponentWordInput from "./opponentWordInput";


const OpponentBox = () => {
  return (
    <div className={styles.opponentBoxContainer}> 

        <div className={styles.username}>
          <OpponentUsername />
        </div>

        <div className={styles.statusBarContainer}>
          <OpponentStatusBox />
          <div className={styles.potionsBox }>
            <PotionsRow/>
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

export default OpponentBox
