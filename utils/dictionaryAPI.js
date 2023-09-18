/*
 * Base API will fetch from Collegiate Dictionary
 */

/* word count = 102774 */

/* Source URL bases */
const MW_API_BASE_URL = "https://dictionaryapi.com/api/v3/references/";
const MW_API_AUDIO_BASE_URL =
  "https://media.merriam-webster.com/audio/prons/en/us/";
const RAND_WORD_API_URL = "https://random-words-api.vercel.app/word";

/* Dictionay codes to add to MW_API_BASE_URL */
const DICT_CODES = {
  elementary: "sd2",
  school: "sd4",
  learners: "learners",
  intermediate: "sd3",
  collegiate: "collegiate",
  medical: "medical",
};

/* The API Keys should be accessible in `.env.local` */
const API_KEYS = {
  elementary: process.env.MW_KEY_ELEMENTARY,
  school: process.env.MW_KEY_SCHOOL,
  learners: process.env.MW_KEY_LEARNERS,
  intermediate: process.env.MW_KEY_INTERMEDIATE,
  collegiate: process.env.MW_KEY_COLLEGIATE,
  medical: process.env.MW_KEY_MEDICAL,
};

/* Function to construct an API URL from a dictionary, word and API key. */
export function constructMWAPIUrl(word, dictName, apiKey) {
  return new URL(
    `${DICT_CODES[dictName]}/json/${word}?key=${apiKey}`,
    MW_API_BASE_URL
  );
}

/* Gets all word data from API URL */
export async function getWordFullDataMW(word, dictName) {
  const apiUrl = constructMWAPIUrl(word, dictName, API_KEYS[dictName]);
  const response = await fetch(apiUrl);
  const wordData = await response.json();
  return wordData;
}

/* Gets the first short definition from the word data */
export function getWordDefinition(wordData) {
  return wordData[0]["shortdef"];
}

/* Gets word audio data from API URL */
export function getAudioUrl(wordData) {
  const audioClipName = wordData[0]["hwi"]["prs"][0]["sound"]["audio"];
  const format = "mp3";
  let subdirectory = "";
  if (audioClipName.startsWith("bix")) {
    subdirectory = "bix";
  } else if (audioClipName.startsWith("gg")) {
    subdirectory = "gg";
  } else if (audioClipName.match(/^\d/)) {
    subdirectory = "number";
  } else {
    subdirectory = audioClipName[0];
  }
  return new URL(
    `${format}/${subdirectory}/${audioClipName}.${format}`,
    MW_API_AUDIO_BASE_URL
  ).href;
}

/* Gets a random word from https://github.com/mcnaveen/Random-Words-API
  This is a temporary solution for obtaining a random word */
export async function getRandomWord() {
  const response = await fetch(RAND_WORD_API_URL, { cache: "no-store" });
  const randWordData = await response.json();
  return randWordData[0].word.toLowerCase();
}

/* Checks whether the given JSON (typically returned by the Merriam Webster 
  dictionary API) represents a valid word in the MW dictionary and contains 
  all the necessary information (definition and TODO: audio data) */
export function checkValidWordData(wordData) {
  // word data returned by the Merriam Webster dictionary is an array
  // containing JSON objects
  return (
    wordData instanceof Array &&
    wordData.length > 0 &&
    typeof wordData[0] === "object" && // check for whether wordData[0] is an object
    !!wordData[0] && // check that wordData[0] is not null
    "shortdef" in wordData[0]
  );
}

export async function getWordDefAndAudio(word) {
  let wordData = await getWordFullDataMW(word, "collegiate");
  let definition = "";
  let audioUrl = "";
  let validWord = false;
  let tempWordData = wordData;
  let tempWord = word;
  let retries = 0;

  while (!validWord) {
    retries++;
    console.log(`Try num : ${retries}`);
    console.log(tempWordData);

    if (checkValidWordData(tempWordData)) {
      // the word is a valid word
      validWord = true;
    } else if (tempWordData instanceof Array && tempWordData.length > 0) {
      // the word is not a valid word but the dictionary has similar words

      for (var i = 0; i < tempWordData.length; i++) {
        // go through all similar words and choose one that is valid
        if (tempWordData[i].includes(" ")) continue;
        tempWord = tempWordData[i];
        tempWordData = await getWordFullDataMW(tempWord, "collegiate");
        validWord = checkValidWordData(tempWordData);
        if (validWord) break;
      }
      if (!validWord) tempWordData = [];
    } else {
      // the word is not a valid word and the dictionary does not have similar words
      tempWord = await getRandomWord();
      tempWordData = await getWordFullDataMW(tempWord, "collegiate");
      validWord = checkValidWordData(tempWordData);
      if (!validWord) tempWordData = [];
    }
  }

  wordData = tempWordData;
  word = tempWord;
  definition = getWordDefinition(wordData);
  // TODO: check if the audio file exists. If not, have a fallback (WebSpeech API)
  audioUrl = getAudioUrl(wordData);

  return {
    word: word,
    definition: definition,
    audioUrl: audioUrl,
  };
}
