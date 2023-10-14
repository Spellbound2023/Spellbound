const { getRandomWord, getWordDefAndAudio } = require("../utils/dictionaryAPI");

/*
Returns the definition and audio URL of a randomly chosen
English word.
*/
exports.randword = async function (req, res, next) {
  const word = getRandomWord();
  const wordData = await getWordDefAndAudio(word);
  res.send(wordData);
};
