"use client";
import React, { useState } from "react";
import styles from "../../../styles/versus.module.css";
import Image from "next/image";
import OpponentBox from "./opponentCard";
import PlayerBox from "./playerCard";
import StatusBox from "./statusBar";
import NavBar from "@/components/NavBar";
import TopBar from "./topBar";
import GameEndDisplay from "./gameEnd";
import GameBox from "@/app/classic/GameBox";

const versusPage = () => {
  const [gameEnded, setGameEnded] = useState(false);
  const [isWin, setIsWin] = useState(null); // Set to true if you win, false if you lose
  const [opponentScore, setOpponentScore] = useState(15); // Replace with the actual score
  const [word, setWord] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  const handlePlayAgain = () => {
    // Implement your logic to start a new game
    setScore(0);
    setOpponentScore(0);
    setGameEnded(false);
  };

  return (
    <>
      <div className={styles.navContainer}>
        <NavBar showDifficultyText={false} />
      </div>
      <div className={styles.versusContainer}>
        <div className={styles.opponentBox}>
          <OpponentBox />
        </div>
        <div className={styles.Character}>
          <Image src="/images/opponentCharacter.png" width={200} height={200} />
        </div>
        <div className={styles.Character}>
          <Image src="/images/PlayerCharacter.png" width={300} height={300} />
        </div>
        <div className={styles.playerBox}>
          <PlayerBox score={score} setScore={setScore}/>
        </div>
        <div className={styles.statusBar}>
          <StatusBox score={score}/>
        </div>
        <button onClick={() => setGameEnded(true)}>End Game</button>

      {gameEnded && (
        <GameEndDisplay
          isWin={isWin}
          PlayerScore={score}
          opponentScore={opponentScore}
          onPlayAgain={handlePlayAgain}
        />
      )}

      </div>
    </>
  );
};

export default versusPage;
