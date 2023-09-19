"use client";

import React, { useEffect, useState } from "react";
import WordInfo from "./WordInfo";
import WordInput from "./WordInput";
import styles from "../../styles/classic/GameBox.module.css";
import { checkValidInput, upperCaseFirstLetter } from "@/utils/utils";
import LinkButton from "../LinkButton";

const ATTEMPTS_PER_WORD = 3;

/* Container for WordInfo and WordInput */
const GameBox = () => {
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
    fetch("/api/randword", { cache: "no-store" })
      .then((res) => res.json())
      .then((wordData) => {
        setWord(wordData.word);
        setDefinition(wordData.definition);
        setAudioUrl(wordData.audioUrl);
        setAttempts(0);
      });
  };

  const checkUserInput = (input) => {
    if (checkValidInput(input, word)) {
      alert("Correct!");
      setupRound();
    } else {
      if (attempts + 1 >= ATTEMPTS_PER_WORD) {
        alert(
          `Wrong. Again. \n Out of attempts! Correct spelling: \"${word}\"`
        );
        setupRound();
      } else {
        alert(
          `Wrong! Attempts remaining: ${ATTEMPTS_PER_WORD - (attempts + 1)}`
        );
        setAttempts(attempts + 1);
      }
    }
  };

  useEffect(() => setupRound(), []);

  return (
    <div>
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

      <div className={styles.mainContainer}>
        <WordInfo
          definition={upperCaseFirstLetter(definition[0])}
          audioUrl={audioUrl}
        />
        <br />
        <br />
        <br />
        <WordInput onSubmitHandler={checkUserInput} />
      </div>
    </div>
  );
};

export default GameBox;
