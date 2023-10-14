const { getWordDefAndAudio } = require("../utils/dictionaryAPI");

/* 
Gets the definition and audio URL for the requested word,
or if that word is not in the dictionary, gets the data for 
a similar word if possible, or a random word.
*/
exports.word = async function (req, res, next) {
  const word = req.params.word;
  const wordData = await getWordDefAndAudio(word);
  res.send(wordData);
};
