import React from "react";
import WordInfo from "./WordInfo";
import WordInput from "./WordInput";
import styles from "../../styles/classic/GameBox.module.css";

/* Container for WordInfo and WordInput */
const GameBox = () => {
  return (
    <div className={styles.mainContainer}>
      <WordInfo definition="having or marked by great volume or bulk : large; also : full" />
    </div>
  );
};

export default GameBox;
