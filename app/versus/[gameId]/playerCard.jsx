"use client";

import React, { useEffect, useState } from "react";
import WordInfo from "../../classic/WordInfo";
import WordInput from "../../classic/WordInput";
import styles from "../../../styles/versusGameBox.module.css"
import { checkValidInput, upperCaseFirstLetter } from "@/utils/utils";
import SuccessPopup from "../../classic/successPopup";
<<<<<<< HEAD
import ScoreCounter from "../../classic/scoreCount";
import PlayerScoreCounter from "./playerScoreCounter";
import next from "next";
import io from "socket.io-client";

=======
>>>>>>> c61389d6b0f7962a109ac03ae808ab190830fdf9

const ATTEMPTS_PER_WORD = 3;
let socket;

/* Container for WordInfo and WordInput */
const GameBox = ({ score, setScore, setIsCorrect, nextWord }) => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [attempts, setAttempts] = useState(0);
  


  // the gamebox component controls the flow of the game
  // When it is rendered, it must fetch a random word from the API
  // As long as the user has enough retries, everytime the word input is
  // entered and submit is clicked, the word is validated, and
  // if correct -> get a new word and reset, and rerender
  // if wrong -> if there are more retries then clear out input (need function for that) and increase retries
  // -> if not then print wrong and reset and rerender

  const setupRound = () => {
    if (nextWord && nextWord.wordData) {
      setWord(nextWord.wordData.word);
      console.log("PENIS " + nextWord.wordData.word)
      setDefinition(nextWord.wordData.definition);
      setAudioUrl(nextWord.wordData.audioUrl);
      setAttempts(0);
    }
  };
  

  const checkUserInput = (input) => {
    if (checkValidInput(input, word)) {

    if (attempts === 0) {
      pointsToAdd = 3; // Correct on the first try
    } else if (attempts === 1) {
      pointsToAdd = 2; // Correct on the second try
    } else if (attempts === 2) {
      pointsToAdd = 1; // Correct on the third try
    }

      setIsCorrect(true) //CORRECT POPUP
      try {
        socket.emit("correctAttempt", attempts) //emit correct attempt and amnt of attempts to backend
      } catch (error) {
        <p>eat my ass</p>
      }
/*       setTimeout(() => setIsCorrect(null), 1500);*/    
      } else {
      if (attempts + 1 >= ATTEMPTS_PER_WORD) {
        
        setIsCorrect(false) //INCORRECT POPUP
        try{
          socket.emit("incorrectAttempt")
        } catch (error){
          <p>eat more ass</p>
        }
        alert(
          `Wrong. Again. \n Out of attempts! Correct spelling: \"${word}\"`
        );        
      } else {
        setIsCorrect(false) //INCORRECT POPUP
        setAttempts(attempts + 1);
        try{
          socket.emit("incorrectAttempt")
        } catch (error){
          <p>eat more ass</p>
        }
      }
    }
  };

  useEffect(() => {
    setupRound();
  }, [nextWord]);
  

  return (
    <div>
      
      
       <div className={styles.mainContainer} >
          <div className={styles.wordInfo}>
          <WordInfo
            definition={upperCaseFirstLetter(definition[0])}
            audioUrl={audioUrl}
          />
          </div>
          
          <WordInput onSubmitHandler={checkUserInput} />

          <div className={styles.attemptsSkipContainer}>
        <div className={styles.linkContainer}>
          <a className={`${styles.link} ${styles.linkLeft}`}>
            <div>
              <p className={styles.linkText}>
                Attemps remaining: {ATTEMPTS_PER_WORD - attempts}
              </p>
            </div>
          </a>
        </div>
        <div className={styles.linkContainer}>
          <a
            className={`${styles.link} ${styles.linkRight}`}
            onClick={() => {
              setupRound();
            }}
          >
            <div>
              <p className={styles.linkText}>Skip</p>
            </div>
          </a>
        </div>
      </div>
        </div>
    </div>
  );
};

export default GameBox;
