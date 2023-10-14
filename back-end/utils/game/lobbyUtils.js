const { userStates } = require("./userStates");

let allConnectedUsers = {};
let readyUsers = {};

function newUser(username) {
  if (username in allConnectedUsers) return;
  if (username in readyUsers)
    throw new Error(
      "Erroneous game state: ",
      username,
      " is marked as ready but is not in lobby user pool"
    );

  allConnectedUsers[username] = {};
  allConnectedUsers[username].state = userStates.NOT_READY;
}

function removeUser(username) {
  if (!(username in allConnectedUsers)) return;
  delete allConnectedUsers[username];
  if (username in readyUsers) delete readyUsers[username];
}

function setUserReady(username) {
  if (!(username in allConnectedUsers))
    throw new Error(
      "Erroneous game state: attempting to mark user ",
      username,
      " as ready but is not present in lobby user pool"
    );
  if (username in readyUsers) return;

  // update the state of the user to ready
  allConnectedUsers[username].state = userStates.READY;

  readyUsers[username] = {};
}

function setUserNotReady(username) {
  if (!(username in allConnectedUsers))
    throw new Error(
      "Erroneous game state: attempting to mark user ",
      username,
      " as ready but is not present in lobby user pool"
    );
  if (!(username in readyUsers)) return;

  // update the state of the user to ready
  allConnectedUsers[username].state = userStates.NOT_READY;
  delete readyUsers[username];
}

function getReadyUsers() {
  return readyUsers;
}

exports.newUser = newUser;
exports.removeUser = removeUser;
exports.setUserReady = setUserReady;
exports.setUserNotReady = setUserNotReady;
exports.getReadyUsers = getReadyUsers;
