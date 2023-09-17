/*
 * Base API will fetch from Collegiate Dictionary
 */

import React from "react";

/* word count = 102774 */

const APIContent = () => {
  JSON.parse("https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=41da6571-cf7a-4dd9-a41c-bce55ea8ca31")
};

const APIObject = () => {
  word: wordTag,
    definition: definitionTag,
      audio: "https://media.merriam-webster.com/audio/prons/en/us/mp3/${audioTag}.mp3"
};

const DictionaryAPI = (APIObject) => {
  return (
    APIObject
  );
};

export default DictionaryAPI;
