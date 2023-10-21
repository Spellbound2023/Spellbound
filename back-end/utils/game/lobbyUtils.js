const { userStates } = require("./enums");

let allConnectedUsers = {};

function newUser(socket) {
  let username = socket.username;
  if (username in allConnectedUsers) return;

  allConnectedUsers[username] = {};
  allConnectedUsers[username].state = userStates.NOT_READY;
  allConnectedUsers[username].socket = socket;
  allConnectedUsers[username].requestees = new Set();
  allConnectedUsers[username].requesters = new Set();
  allConnectedUsers[username].gameId = null;
}

function removeUser(username) {
  if (!(username in allConnectedUsers)) return;

  // reset all this user's requests and delete this user
  // as a requester from all other users
  cancelAllRequests(username);

  delete allConnectedUsers[username];
}

function cancelAllRequests(username) {
  let requestees = Array.from(getRequestees(username));
  console.log("Requestees of ", username, ": ", requestees);
  for (var i = 0; i < requestees.length; i++) {
    let requesteeUsername = requestees[i];
    console.log(
      "Removing ",
      username,
      " from the requesters of ",
      requesteeUsername
    );
    removeRequester(requesteeUsername, username);
  }

  let requesters = Array.from(getRequesters(username));
  console.log("Requesters of ", username, ": ", requesters);
  for (var i = 0; i < requesters.length; i++) {
    let requesterUsername = requesters[i];
    console.log(
      "Removing ",
      username,
      " from the requestees of ",
      requesterUsername
    );
    removeRequestee(requesterUsername, username);
  }
}

function getUserSocket(username) {
  if (username in allConnectedUsers) return allConnectedUsers[username].socket;
  return null;
}

// Returns true if the state transition succeeded, else false
function setUserState(username, state) {
  if (!(username in allConnectedUsers)) {
    console.error(
      "Erroneous game state: attempting to mark user ",
      username,
      " as ",
      state,
      " but is not present in lobby user pool"
    );
    return false;
  }

  let curUserState = getUserState(username);

  if (state === userStates.READY) {
    if (curUserState !== userStates.NOT_READY) return false;

    // update the state of the user to ready
    allConnectedUsers[username].state = userStates.READY;
    return true;
  } else if (state === userStates.NOT_READY) {
    if (curUserState !== userStates.READY) return false;

    // update the state of the user to ready
    allConnectedUsers[username].state = userStates.NOT_READY;

    // reset all this user's requests and delete this user
    // as a requester from all other users
    cancelAllRequests(username);
    allConnectedUsers[username].requestees = new Set();
    allConnectedUsers[username].requesters = new Set();

    return true;
  } else if (state === userStates.ACCEPTED) {
    if (curUserState === userStates.NOT_READY) return false;

    allConnectedUsers[username].state = userStates.ACCEPTED;
    return true;
  }

  // If none of the valid states were given
  return false;
}

function setUserGameId(username, gameId) {
  if (!(username in allConnectedUsers)) {
    console.error(
      "Erroneous game state: user ",
      username,
      " is not present in lobby user pool"
    );
    return false;
  }

  if (allConnectedUsers[username].gameId !== null) {
    console.error(
      "Erroneous game state: attempting to set user ",
      username,
      "'s gameId as ",
      gameId,
      " but the user already has a gameId assigned"
    );
    return false;
  }

  allConnectedUsers[username].gameId = gameId;
  return true;
}

function getUserState(username) {
  if (username in allConnectedUsers) return allConnectedUsers[username].state;
  return null;
}

function getRequestees(username) {
  if (username in allConnectedUsers)
    return allConnectedUsers[username].requestees;
  return null;
}

function getRequesters(username) {
  if (username in allConnectedUsers)
    return allConnectedUsers[username].requesters;
  return null;
}

function getReadyUsers() {
  let readyUsers = [];
  for (const username in allConnectedUsers) {
    if (allConnectedUsers[username].state === userStates.READY)
      readyUsers.push(username);
  }
  return readyUsers;
}

function getAllUsers() {
  return Object.keys(allConnectedUsers);
}

function addRequestee(requesterUsername, requesteeUsername) {
  if (getRequestees(requesterUsername).has(requesteeUsername)) return false;
  allConnectedUsers[requesterUsername].requestees.add(requesteeUsername);
  return true;
}

function addRequester(requesteeUsername, requesterUsername) {
  if (getRequesters(requesteeUsername).has(requesterUsername)) return false;
  allConnectedUsers[requesteeUsername].requesters.add(requesterUsername);
  return true;
}

function removeRequestee(requesterUsername, requesteeUsername) {
  if (!getRequestees(requesterUsername).has(requesteeUsername)) return false;
  allConnectedUsers[requesterUsername].requestees.delete(requesteeUsername);
  return true;
}

function removeRequester(requesteeUsername, requesterUsername) {
  if (!getRequesters(requesteeUsername).has(requesterUsername)) return false;
  allConnectedUsers[requesteeUsername].requesters.delete(requesterUsername);
  return true;
}

exports.newUser = newUser;
exports.removeUser = removeUser;
exports.getReadyUsers = getReadyUsers;
exports.getAllUsers = getAllUsers;
exports.setUserState = setUserState;
exports.getUserSocket = getUserSocket;
exports.getUserState = getUserState;
exports.getRequestees = getRequestees;
exports.getRequesters = getRequesters;
exports.addRequestee = addRequestee;
exports.addRequester = addRequester;
exports.removeRequestee = removeRequestee;
exports.removeRequester = removeRequester;
exports.setUserGameId = setUserGameId;
