import React from "react";
import styles from "../../styles/versus.module.css";
import Image from "next/image";
import OpponentBox from "./opponentCard";
import PlayerBox from "./playerCard";
import StatusBox from "./statusBar";
import GameBox from "../classic/GameBox";

const versusPage = () => {
  return (
    <>
      <div className={styles.versusContainer}>
        <div className={styles.opponentBox}>
          <OpponentBox />
        </div>
        <div className={styles.Character}>
          <Image src="/images/opponentCharacter.png" width={300} height={300} />
        </div>
        <div className={styles.Character}>
          <Image src="/images/PlayerCharacter.png" width={300} height={300} />
        </div>
        <div className={styles.playerBox}>
          <PlayerBox />
        </div>
        <div className={styles.statusBar}>
          <StatusBox />
        </div>
      </div>
    </>
  );
};

export default versusPage;
