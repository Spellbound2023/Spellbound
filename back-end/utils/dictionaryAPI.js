/* Note: Base API will fetch from Collegiate Dictionary */

/* ============ Constants =============== */

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

/* ============ Imports =============== */

const _ = require("lodash");
// import wordList from "./wordsList";
const { wordList } = require("./wordsList");

/* ============ Functions =============== */

/* Gets a random word from https://github.com/mcnaveen/Random-Words-API
  This is a temporary solution for obtaining a random word */
async function getRandomWordFromAPI() {
  const response = await fetch(RAND_WORD_API_URL, { cache: "no-store" });
  const randWordData = await response.json();
  return randWordData[0].word.toLowerCase();
}

/* Gets a random word from the word list file */
function getRandomWord() {
  const randWord = _.sampleSize(wordList)[0];
  return randWord;
}

/* Function to construct an API URL from a dictionary, word and API key. */
function constructMWAPIUrl(word, dictName, apiKey) {
  return new URL(
    `${DICT_CODES[dictName]}/json/${word}?key=${apiKey}`,
    MW_API_BASE_URL
  );
}

/* Gets all word data from API URL */
async function getWordFullDataMW(word, dictName) {
  const apiUrl = constructMWAPIUrl(word, dictName, API_KEYS[dictName]);

  // reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const response = await fetch(apiUrl, { cache: "no-store" });
  const wordData = await response.json();
  return wordData;
}

/* Gets the first short definition from the word data */
function getWordDefinition(wordObject) {
  return wordObject["shortdef"];
}

/* Gets word audio data from API URL */
function getAudioUrl(wordObject) {
  const audioClipName = wordObject["hwi"]["prs"][0]["sound"]["audio"];
  const format = "mp3";
  let subdirectory = "";
  if (audioClipName.startsWith("bix")) {
    subdirectory = "bix";
  } else if (audioClipName.startsWith("gg")) {
    subdirectory = "gg";
  } else if (audioClipName != "" && !isNaN(parseInt(audioClipName.charAt(0)))) {
    subdirectory = "number";
  } else {
    subdirectory = audioClipName[0];
  }
  return new URL(
    `${format}/${subdirectory}/${audioClipName}.${format}`,
    MW_API_AUDIO_BASE_URL
  ).href;
}

/* Checks whether the given JSON (typically returned by the Merriam Webster
  dictionary API) represents a json response for a valid word in the MW dictionary
  and contains all the necessary information (definition and TODO: audio data) */
function checkValidWordData(wordData) {
  // word data returned by the Merriam Webster dictionary is an array
  // containing JSON objects
  return (
    wordData instanceof Array &&
    wordData.length > 0 &&
    // check for whether wordData[0] is an object (because if the requested word
    // is not in the dictionary, the API returns a list of similar words)
    typeof wordData[0] === "object"
  );
}

async function getWordDefAndAudio(word) {
  let wordData = await getWordFullDataMW(word, "collegiate");
  let definition = "";
  let audioUrl = "";
  let validWord = false;
  let tempWordData = wordData;
  let tempWord = word;
  let tempWordObject = null;
  let retries = 0;

  console.log(`======= Word: ${word} =======`);

  while (!validWord) {
    retries++;
    console.log(`Try num : ${retries}`);
    console.log("Obtained data: ", tempWordData);

    if (checkValidWordData(tempWordData)) {
      tempWordObject = getValidWord(tempWordData);
      if (!!tempWordObject) {
        // the word is a valid word
        validWord = true;
      } else tempWordData = [];
    } else if (tempWordData instanceof Array && tempWordData.length > 0) {
      // the word is not a valid word but the dictionary has similar words

      console.log("Try: ", retries, tempWordData);
      for (var i = 0; i < tempWordData.length; i++) {
        // go through all similar words and choose one that is valid
        if (tempWordData[i].includes(" ")) continue;
        tempWord = tempWordData[i];
        let newData = await getWordFullDataMW(tempWord, "collegiate");
        if (checkValidWordData(newData)) {
          tempWordObject = getValidWord(newData);
          if (!!tempWordObject) {
            // the word is a valid word
            tempWordData = newData;
            validWord = true;
          }
        }
        if (validWord) break;
      }
      if (!validWord) tempWordData = [];
    } else {
      // the word is not a valid word and the dictionary does not have similar words
      tempWord = getRandomWord();
      tempWordData = await getWordFullDataMW(tempWord, "collegiate");
      if (checkValidWordData(tempWordData)) {
        tempWordObject = getValidWord(tempWordData);
        if (!!tempWordObject) {
          // the word is a valid word
          validWord = true;
        }
      }

      if (!validWord) tempWordData = [];
    }
  }

  let wordObject = tempWordObject;
  // set the word to be the word form in the MW API response
  // (because for different forms of a base word, it's the base word that is present in the audio)
  // Example: anthemic
  word = wordObject.meta.id;
  // meta.id sometimes contains ":1" or similar
  if (word.includes(":")) word = word.slice(0, word.indexOf(":"));

  definition = getWordDefinition(wordObject);
  // TODO: check if the audio file exists. If not, have a fallback (WebSpeech API)
  audioUrl = getAudioUrl(wordObject);
  console.log("\n Final wordData: ", tempWordData);
  console.log("\n Final wordObject: ", wordObject);

  return {
    word: word,
    definition: definition,
    audioUrl: audioUrl,
  };
}

/**
 * Checks for a valid spelling bee word in the (valid) json data returned by the
 * Merriam-Webster dictionary API.
 *
 * Invalid spelling bee words are:
 *  - Foreign words
 *  - Geographical words
 *  - Biographical words
 *  - Abbreviations
 *  - Offensive words
 *
 * The check for this is done by checking the meta -> section entry of a word object.
 * The section field value should be "alpha"
 * See https://www.dictionaryapi.com/products/json#sec-2.meta
 *
 * @param {Array} wordData  A valid JSON array returned by the Merriam Webster dictionary API
 *          That is, the array must first be checked for validity using checkValidWordData().
 *
 * @return {Object} Returns the data object for the first valid word in wordData that is found.
 *                  If wordData is invalid, or has no valid word is found, returns null.
 *
 * @throws If the given wordData is invalid according to checkValidWordData().
 */
function getValidWord(wordData) {
  // we filter out abbreviations,
  // fl: not abbreviation
  if (!checkValidWordData(wordData))
    throw new Error("The given wordData is invalid");

  let isValid = true;
  for (let i = 0; i < wordData.length; ++i) {
    let word = wordData[i];

    // check to see if the word object structure is valid
    if (
      !(
        !!word && // check that word is not null
        "meta" in word &&
        "shortdef" in word &&
        "hwi" in word &&
        // check if audio file exists
        "prs" in word.hwi &&
        word.hwi.prs instanceof Array &&
        word.hwi.prs.length > 0 &&
        typeof word.hwi.prs[0] === "object" &&
        "sound" in word.hwi.prs[0]
      )
    )
      continue;

    // filter out geographical, biographical, and foreign words
    if (!("section" in word.meta)) continue;
    if (word.meta.section !== "alpha") continue;

    // filter out offensive words
    if ("offensive" in word.meta && word.meta.offensive === true) continue;

    // filter out abbreviations
    if ("fl" in word && word.fl === "abbreviation") continue;

    return word;
  }

  return null;
}

/* ============ Exports =============== */

exports.getRandomWordFromAPI = getRandomWordFromAPI;
exports.getRandomWord = getRandomWord;
exports.constructMWAPIUrl = constructMWAPIUrl;
exports.getWordFullDataMW = getWordFullDataMW;
exports.getWordDefinition = getWordDefinition;
exports.getAudioUrl = getAudioUrl;
exports.checkValidWordData = checkValidWordData;
exports.getWordDefAndAudio = getWordDefAndAudio;
exports.getValidWord = getValidWord;
