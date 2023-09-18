/*
 * Base API will fetch from Collegiate Dictionary
 */

/* word count = 102774 */

/* Source URL bases */
const MW_API_BASE_URL = "https://dictionaryapi.com/api/v3/references/";
const MW_API_AUDIO_BASE_URL =
  "https://media.merriam-webster.com/audio/prons/en/us/";

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
export async function getWordData(word, dictName) {
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
