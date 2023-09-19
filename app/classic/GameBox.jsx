'use client';

import React, { useState } from "react";
import WordInfo from "./WordInfo";
import WordInput from "./WordInput";
import styles from "../../styles/classic/GameBox.module.css";
import { getRandomWord } from "@/utils/dictionaryAPI";

/* Container for WordInfo and WordInput */
const GameBox = () => {
  const [definition, setDefinition] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  // const [retries, setRetries] = useState(0);

  // the gamebox component controls the flow of the game
  // When it is rendered, it must fetch a random word from the API
  // As long as the user has enough retries, everytime the word input is 
  // entered and submit is clicked, the word is validated, and
  // if correct -> get a new word and reset, and rerender
  // if wrong -> if there are more retries then clear out input (need function for that) and increase retries
              // -> if not then print wrong and reset and rerender


  // Need:
    // functionality to check correctness of the entered text (utils)

  getRandomWord();

  return (
    
    <div className={styles.mainContainer}>
      <WordInfo 
      definition={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed nisi quis tortor lobortis aliquam. Sed ante purus, tempus ut."} 
      audioUrl={audioUrl}
      />
      <WordInput />
    </div>
    
  )
};

export default GameBox;
