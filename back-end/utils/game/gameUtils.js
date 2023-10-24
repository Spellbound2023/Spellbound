var _ = require("lodash");

const { getWords } = require("../dictionaryAPI");
const {
  gameStates,
  pointsModifiers,
  potions,
  pointsModifierPoints,
  gameEndReasons,
} = require("./enums");
const { Mutex } = require("async-mutex");

// constants
const WORDLIST_INITIAL_SIZE = 10;
const WORDLIST_INCREMENT_SIZE = 3;
const SLEEP_TIME_MS = 1000;
const DEFAULT_POINTS_TARGET = 30;
const DEFAULT_GAME_TIME_MS = 5 * 60 * 1000; // 5 minutes
// determines how often the players get awarded potions
const POTION_AWARD_MILESTONE = 3;

// The object that stores the data for all games
let games = {};

// The mutexes for each game, to prevent race conditions within a single game's socket.io event callbacks
let socketCallbackMutexes = {};
// The mutexes for each game, to prevent race conditions for the addWord function
let addWordMutexes = {};

function createGame(gameId, player1, player2) {
  if (gameId in games) return false;
  games[gameId] = {};
  socketCallbackMutexes[gameId] = new Mutex();
  addWordMutexes[gameId] = new Mutex();

  games[gameId].players = {};
  games[gameId].players[player1] = {
    connected: false,
    ready: false,
    curWordIndex: null,
    points: 0,
    streak: 0,
    potions: new Set(),
    activePotions: new Set(),
  };
  games[gameId].players[player2] = {
    connected: false,
    ready: false,
    curWordIndex: null,
    points: 0,
    streak: 0,
    potions: new Set(),
    activePotions: new Set(),
  };

  games[gameId].wordList = [];
  games[gameId].gameStatus = gameStates.NOT_STARTED;
  games[gameId].pointsTarget = DEFAULT_POINTS_TARGET;

  addWords(gameId, WORDLIST_INITIAL_SIZE);

  return true;
}

function getSocketCallbackMutex(gameId) {
  return socketCallbackMutexes[gameId];
}

function getAddWordMutex(gameId) {
  return addWordMutexes[gameId];
}

function getGameUrl(gameId) {
  return new URL(`/versus/${gameId}`, process.env.BASE_URL);
}

function checkGameValidity(gameId, username) {
  return (
    gameId in games &&
    games[gameId].gameStatus === gameStates.NOT_STARTED &&
    username in games[gameId].players &&
    games[gameId].players[username].connected === false
  );
}

function checkGameActive(gameId) {
  return gameId in games && games[gameId].gameStatus === gameStates.ACTIVE;
}

function checkGameExists(gameId) {
  return gameId in games;
}

function setUserConnected(gameId, socket) {
  if (!(socket.username in games[gameId].players)) {
    console.error("setting user ", socket.username, " as connected failed.");
    return false;
  }

  games[gameId].players[socket.username].connected = true;
  games[gameId].players[socket.username].socket = socket;
  return true;
}

function setUserDisconnected(gameId, username) {
  if (!(username in games[gameId].players)) {
    console.error("setting user ", username, " as disconnected failed.");
    return false;
  }

  games[gameId].players[username].connected = false;
  return true;
}

function setUserReady(gameId, socket) {
  let username = socket.username;
  if (
    !(username in games[gameId].players) ||
    games[gameId].players[username].connected === false
  ) {
    console.error("setting user ", username, " as ready failed.");
    return false;
  }

  console.log("Set user ", username, " as ready");

  games[gameId].players[username].ready = true;
}

function gameStartable(gameId) {
  let startable = true;
  for (let player in games[gameId].players) {
    console.log(
      `The user ${player} is ready: `,
      games[gameId].players[player].ready
    );
    if (
      !games[gameId].players[player].ready ||
      !games[gameId].players[player].socket
    )
      startable = false;
  }

  console.log("The game is startable: ", startable);
  return startable;
}

// returns the timestamp at which the game (timer) was started
function startGame(gameId) {
  games[gameId].gameStatus = gameStates.ACTIVE;

  // start a timer that ends the game
  setTimeout(() => {
    if (!checkGameActive(gameId)) return;
    endGame(gameId, gameEndReasons.TIMER_ENDED, null);
  }, DEFAULT_GAME_TIME_MS);

  return new Date();
}

// This function takes a gameId, a gameEndReason instance,
// and the username of the player connected with the gameEndReason
// (For example, the user that quit or disconnected)
function endGame(gameId, endReason, endingPlayer) {
  if (games[gameId].gameStatus !== gameStates.ENDED) {
    games[gameId].gameStatus = gameStates.ENDED;
    console.log(" ======== Ending the game ============== ");
    let player1 = Object.keys(games[gameId].players)[0];
    let player2 = Object.keys(games[gameId].players)[1];
    let player1Socket = getPlayerSocket(gameId, player1);
    let player2Socket = getPlayerSocket(gameId, player2);
    let player1Points = getPlayerPoints(gameId, player1);
    let player2Points = getPlayerPoints(gameId, player2);

    // get the winner based on points
    let winner = getWinner(gameId);
    // If a user has quit or disconnected, the other player wins
    // automatically
    if (
      endReason === gameEndReasons.USER_DISCONNECTED ||
      endReason === gameEndReasons.USER_QUIT
    ) {
      winner = getOpponentUsername(gameId, endingPlayer);
    }

    // get the key (name) of the gameEndReason
    for (let reason in gameEndReasons) {
      if (gameEndReasons[reason] === endReason) {
        endReason = reason;
        break;
      }
    }

    player1Socket.emit("gameEnded", {
      winner: winner,
      points: player1Points,
      opponentPoints: player2Points,
      endReason: endReason,
      endingPlayer: endingPlayer,
    });
    player2Socket.emit("gameEnded", {
      winner: winner,
      points: player2Points,
      opponentPoints: player1Points,
      endReason: endReason,
      endingPlayer: endingPlayer,
    });
  }

  // delete the game if both users have disconnected
  let bothPlayersDisconnected = true;
  for (let player in games[gameId].players) {
    if (games[gameId].players[player].connected)
      bothPlayersDisconnected = false;
  }
  if (bothPlayersDisconnected) delete games[gameId];
}

// Returns the username of the winner, or null if its a draw
function getWinner(gameId) {
  let players = Object.keys(games[gameId].players);
  let winner;
  if (
    games[gameId].players[players[0]].points >
    games[gameId].players[players[1]].points
  ) {
    winner = players[0];
  } else if (
    games[gameId].players[players[0]].points <
    games[gameId].players[players[1]].points
  ) {
    winner = players[1];
  } else {
    winner = null;
  }

  return winner;
}

function getPlayerSocket(gameId, username) {
  return games[gameId].players[username].socket;
}

function getOpponentSocket(gameId, username) {
  for (let player in games[gameId].players) {
    if (player === username) continue;
    return games[gameId].players[player].socket;
  }
}

function getOpponentUsername(gameId, username) {
  for (let player in games[gameId].players) {
    if (player === username) continue;
    return player;
  }
}

// checks for the game existing are done at multiple points
// since this function can lead to race conditions and also
// unnecessarily hold up the event loop
async function addWords(gameId, numWords) {
  // console.log(`Adding ${numWords} words to the wordList`);
  if (!checkGameExists(gameId)) return;

  for (let i = 0; i < numWords; ++i) {
    if (!checkGameExists(gameId)) return;
    let newWord = await getWords(1);
    const addWordMutex = getAddWordMutex(gameId);
    await addWordMutex.runExclusive(async () => {
      if (!checkGameExists(gameId)) return;
      games[gameId].wordList = games[gameId].wordList.concat(newWord);
      // console.log("Added a word!");
    });
  }

  if (!checkGameExists(gameId)) return;
  console.log(" --- new wordList ---");
  console.log(games[gameId].wordList.map((wordData) => wordData.word));
  console.log(" -----------------------");
}

async function getNextWord(gameId, username) {
  let curWordIndex;
  if (games[gameId].players[username].curWordIndex === null) {
    curWordIndex = -1;
  } else {
    curWordIndex = games[gameId].players[username].curWordIndex;
  }

  while (games[gameId].wordList.length <= curWordIndex + 1) {
    // the asynchronous add functions have not completed yet.
    // Sleep for some time to let these functions load some
    // words in

    // console.log(
    //   "The wordlist has only ",
    //   games[gameId].wordList.length,
    //   " words and we need ",
    //   curWordIndex + 2,
    //   " words. Waiting for words to be loaded..."
    // );

    // Reference: https://stackoverflow.com/a/49139664
    await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME_MS));
  }
  // console.log("Enough words have been loaded: ", games[gameId].wordList);

  let nextWord = games[gameId].wordList[++curWordIndex];
  games[gameId].players[username].curWordIndex = curWordIndex;
  console.log(` +++++ Next word for ${username}: `, nextWord.word);

  // if the remaining words is less than the preferred amount, trigger the
  // asynchronous call to add more words
  if (curWordIndex > games[gameId].wordList.length - WORDLIST_INCREMENT_SIZE) {
    console.log(
      `Current word index for ${username}: ${curWordIndex} but length of wordList is ${games[gameId].wordList.length}. Adding new words to the wordList`
    );
    addWords(gameId, WORDLIST_INCREMENT_SIZE);
  }

  return nextWord;
}

// Returns true if the user has reached the points target, else false.
// If the given points modifier event is not valid, log an error and return false
function modifyPoints(gameId, username, event) {
  if (Object.values(pointsModifiers).indexOf(event) === -1) {
    console.error("The points modifier event ", event, " is not valid");
    return null;
  }

  // get the points associated with the event and apply any potion effects
  games[gameId].players[username].points += potionPointsModifier(
    gameId,
    username,
    pointsModifierPoints[event]
  );

  if (games[gameId].players[username].points >= games[gameId].pointsTarget) {
    // the user has reached the points target
    games[gameId].players[username].points = games[gameId].pointsTarget;
    return true;
  } else if (games[gameId].players[username].points < 0) {
    games[gameId].players[username].points = 0;
  }
  return false;
}

function updatePlayerStreak(gameId, username, isCorrect) {
  if (!isCorrect) {
    games[gameId].players[username].streak = 0;
    return;
  }

  // add to the streak
  games[gameId].players[username].streak++;
}

function addPlayerPotion(gameId, username) {
  // If the player has all three potions in their bag, do nothing
  if (
    games[gameId].players[username].potions.size === Object.keys(potions).length
  )
    return;

  // Choose a random potion (that the player doesn't have) to add to the player's bag.
  let unownedPotions = Object.keys(potions).filter((potion) => {
    if (games[gameId].players[username].potions.has(potion)) return false;
    return true;
  });

  let newPotion = _.sampleSize(unownedPotions, 1)[0];
  games[gameId].players[username].potions.add(newPotion);
}

function getPlayerStreak(gameId, username) {
  return games[gameId].players[username].streak;
}

function getPlayerPoints(gameId, username) {
  return games[gameId].players[username].points;
}

function getPlayerPotions(gameId, username) {
  return Array.from(games[gameId].players[username].potions);
}

function playerGetsPotion(gameId, username) {
  let streak = getPlayerStreak(gameId, username);
  if (streak > 0 && streak % POTION_AWARD_MILESTONE === 0) {
    return true;
  }
  return false;
}

function playerHasPotion(gameId, username, potion) {
  return games[gameId].players[username].potions.has(potion);
}

function potionPointsModifier(gameId, username, points) {
  let modPoints = points;

  // iterate over each active potion and apply the effects if any
  // Warning: be careful of the order of potion effects applied
  // For now, since only one potion modifies points, this is okay
  for (let potion of games[gameId].players[username].activePotions) {
    if (potions[potion] === potions.DOUBLE_POINTS && modPoints > 0) {
      modPoints *= 2;
    }
  }

  return modPoints;
}

function activatePotion(gameId, username, potion) {
  if (!games[gameId].players[username].potions.has(potion)) return false;

  console.log("Setting potion ", potion, " as active");
  games[gameId].players[username].potions.delete(potion);
  games[gameId].players[username].activePotions.add(potion);
  console.log("Available potions: ", games[gameId].players[username].potions);
  console.log(
    "Active potions: ",
    games[gameId].players[username].activePotions
  );
  return true;
}

function deactivatePotion(gameId, username, potion) {
  if (!games[gameId].players[username].activePotions.has(potion)) return false;

  games[gameId].players[username].activePotions.delete(potion);
  return true;
}

exports.createGame = createGame;
exports.getSocketCallbackMutex = getSocketCallbackMutex;
exports.getGameUrl = getGameUrl;
exports.checkGameValidity = checkGameValidity;
exports.checkGameActive = checkGameActive;
exports.checkGameExists = checkGameExists;
exports.setUserConnected = setUserConnected;
exports.setUserDisconnected = setUserDisconnected;
exports.setUserReady = setUserReady;
exports.gameStartable = gameStartable;
exports.startGame = startGame;
exports.endGame = endGame;
exports.getOpponentSocket = getOpponentSocket;
exports.getOpponentUsername = getOpponentUsername;
exports.getNextWord = getNextWord;
exports.modifyPoints = modifyPoints;
exports.updatePlayerStreak = updatePlayerStreak;
exports.getPlayerStreak = getPlayerStreak;
exports.getPlayerPoints = getPlayerPoints;
exports.getPlayerPotions = getPlayerPotions;
exports.playerGetsPotion = playerGetsPotion;
exports.addPlayerPotion = addPlayerPotion;
exports.playerHasPotion = playerHasPotion;
exports.activatePotion = activatePotion;
exports.deactivatePotion = deactivatePotion;
