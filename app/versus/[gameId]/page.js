'use client'
import React, { useState } from 'react';
import styles from "../../../styles/versus.module.css";
import Image from "next/image";
import OpponentBox from "./opponentCard";
import PlayerBox from "./playerCard";
import StatusBox from "./statusBar";
import NavBar from "@/components/NavBar";
import TopBar from "./topBar";
import GameEndDisplay from "./gameEnd";
import GameBox from '@/app/classic/GameBox';
import io from "socket.io-client";

let socket;

const versusPage = () => {
  const [gameEnded, setGameEnded] = useState(false);
  const [isWin, setIsWin] = useState(null); // Set to true if you win, false if you lose
  const [PlayerScore, setPlayerScore] = useState(81); // Replace with the actual score
  const [opponentScore, setOpponentScore] = useState(15); // Replace with the actual score

  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [ready, setReady] = useState(false);

  const [isModalVisible, setModalVisible] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(null);
  const [score, setScore] = useState(0);
  const [potions, setPotions] = useState(0);
  const [totalWords] = useState(10); // Assume 10 words in a game for the progress calculation

  const [doublePointsActive, setDoublePointsActive] = useState(false);
  const [freezeActive, setFreezeActive] = useState(false);
  const [hintActive, setHintActive] = useState(false);


  /* 

    UI CHANGES:
    READY SCREEN POPUP
    GAME STARTED
    TIMER STARTED
    WORD CORRECT
    WORD INCORRECT
    POTION USED
    POTION GAINED
    POINTS GAINED
    POINTS LOST
    GAME END

    */

  useEffect(() => { //in useeffect because it happens initially on load ?
   
    socket.on('bothPlayersReady', () => {
      setModalVisible(false);
      startGame();
    });

    
  }, []);

  const startGame = () => {
    setGameStarted(true);
    startTimer();
    socket.emit('gameStarted');
  };

  const startTimer = () => {
    const gameDuration = 300; // placeholder, assume a game lasts for 5 mins 
    setTimer(gameDuration);
    const timerInterval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handlePlayAgain = () => {
    // Implement your logic to start a new game
    setPlayerScore(0);
    setOpponentScore(0);
    setGameEnded(false);
    startGame()
    socket.emit('playAgain');

  };

  const readyStateChange = (readyStatus) => {
    setReady(readyStatus);
    socket.emit('playerReady');

  };

  
  const checkUserInput = (input) => { // Same as classic mode, valid?
    if (checkValidInput(input, word)) {
      let pointsToAdd = 0;

    if (attempts === 0) {
      pointsToAdd = 3; // Correct on the first try
    } else if (attempts === 1) {
      pointsToAdd = 2; // Correct on the second try
    } else if (attempts === 2) {
      pointsToAdd = 1; // Correct on the third try
    }

      setIsCorrect(true) //CORRECT POPUP
      setScore(score + pointsToAdd); // Update the score

      setupRound();
      setTimeout(() => setIsCorrect(null), 1500);
    } else {
      if (attempts + 1 >= ATTEMPTS_PER_WORD) {
        setScore((prevScore) => prevScore - 1);
        setIsCorrect(false) //INCORRECT POPUP
        alert(
          `Wrong. Again. \n Out of attempts! Correct spelling: \"${word}\"`
        );        
        setupRound();
        setTimeout(() => setIsCorrect(null), 1500);
      } else {
        setIsCorrect(false) //INCORRECT POPUP
        setAttempts(attempts + 1);
        setTimeout(() => setIsCorrect(null), 1500);
      }
    }
  };

  // POTIONS

  const handlePotionReceived = () => {
    setPotions(potions + 1);
    socket.emit('potionReceived');
  };

  const handlePotionUsed = () => {
    if (potions > 0) {
      setPotions(potions - 1);
      socket.emit('potionUsed');
    }
  };

  const useDoublePointsPotion = () => {
    setDoublePointsActive(true);
    socket.emit("useDoublePointsPotion"); 

    setTimeout(() => {
        setDoublePointsActive(false); 
    }, 10000);
  }


  const useFreezePotion = () => {
    setFreezeActive(true)
    socket.emit("useFreezePotion"); 

    setTimeout(() => {
      setFreezeActive(false)
    }, 5000);
  }


  const useHintPotion = () => {
    setHintActive(true)
    socket.emit("useHintPotion")
  }


 

  const endGame = () => {
    if (PlayerScore > opponentScore) {
      setIsWin(true)
    } else {
      setIsWin(false)
    }
    setGameEnded(true);
    socket.emit('gameEnd', score);
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
          <PlayerBox/>
        </div>
        <div className={styles.statusBar}>
          <StatusBox />
        </div>
        <button onClick={() => setGameEnded(true)}>End Game</button>

      {gameEnded && (
        <GameEndDisplay
          isWin={isWin}
          PlayerScore={PlayerScore}
          opponentScore={opponentScore}
          onPlayAgain={handlePlayAgain}
        />
      )}

      </div>
    </>
  );
};



export default versusPage;
