import React from "react";
import WordInfo from "./WordInfo";
import styles from "../../styles/classic/GameBox.module.css";

const GameBox = () => {
  return (
      <div className={styles.mainContainer}>
        <WordInfo definition="having or marked by great volume or bulk : large; also : full" />
      </div>
  );
};

export default GameBox;
