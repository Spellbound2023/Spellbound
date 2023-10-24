"use client";

import React, { useEffect, useState } from "react";
import WordInfo from "../../classic/WordInfo";
import WordInput from "../../classic/WordInput";
import styles from "../../../styles/versusGameBox.module.css"
import { checkValidInput, upperCaseFirstLetter } from "@/utils/utils";
import SuccessPopup from "../../classic/successPopup";
import ScoreCounter from "../../classic/scoreCount";
import PlayerScoreCounter from "./playerScoreCounter";

const ATTEMPTS_PER_WORD = 3; //for backend logic turn this from


/* Container for WordInfo and WordInput */
const GameBox = ({ score, setScore, setIsCorrect, nextWord, emitSocketEvent, frozen }) => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isTyping, setIsTyping] = useState(false);


  


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
      console.log("WORD: " + nextWord.wordData.word)
      setDefinition(nextWord.wordData.definition);
      setAudioUrl(nextWord.wordData.audioUrl);
      setAttempts(0);
    }
  };
  

  const checkUserInput = (input) => {
    if (checkValidInput(input, word)) {
    var pointsToAdd = 0;

      try {
        setIsCorrect(true) //CORRECT POPUP
        emitSocketEvent("correctAttempt", (attempts + 1)) //emit correct attempt and amnt of attempts to backend
        console.log(attempts)
      } catch (error) {
        console.log("couldnt emit")
      }
/*       setTimeout(() => setIsCorrect(null), 1500);*/    
      } else {
      if (attempts + 1 >= ATTEMPTS_PER_WORD) {
        
        try{
          setIsCorrect(false) //INCORRECT POPUP
          emitSocketEvent("incorrectAttempt")
        } catch (error){
          console.log("couldnt emit")
        }
        alert(
          `Wrong. Again. \n Out of attempts! Correct spelling: \"${word}\"`
        );        
      } else {
        setIsCorrect(false) //INCORRECT POPUP
        setAttempts(attempts + 1);
        try{
          emitSocketEvent.emit("incorrectAttempt")
        } catch (error){
        }
      }
    }
  };

  const skipWord = () => {
    emitSocketEvent("skipWord")
  }

  const onTyping = () => {
    setIsTyping(true);
    emitSocketEvent("typing")

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
            frozen={frozen}
          />
          </div>
          
          <WordInput onSubmitHandler={checkUserInput} onTypingHandler={onTyping} frozen={frozen}/>

          <div className={styles.attemptsSkipContainer}>
        <div className={styles.linkContainer}>
          <a className={`${styles.link} ${styles.linkLeft} ${frozen ? styles.disabled : ""}`}>
            <div>
              <p className={styles.linkText}>
                Attemps remaining: {ATTEMPTS_PER_WORD - attempts}
              </p>
            </div>
          </a>
        </div>
        <div className={styles.linkContainer}>
          <a
            className={`${styles.link} ${styles.linkRight} ${frozen ? styles.disabled : ""}`}
            onClick={() => {
              skipWord();
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
