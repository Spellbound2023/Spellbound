const { userStates } = require("./userStates");

let allConnectedUsers = {};
// let readyUsers = {};

function newUser(socket) {
  let username = socket.username;
  if (username in allConnectedUsers) return;
  // if (username in readyUsers)
  //   throw new Error(
  //     "Erroneous game state: ",
  //     username,
  //     " is marked as ready but is not in lobby user pool"
  //   );

  allConnectedUsers[username] = {};
  allConnectedUsers[username].state = userStates.NOT_READY;
  allConnectedUsers[username].socket = socket;
  allConnectedUsers[username].requestees = new Set();
  allConnectedUsers[username].requesters = new Set();
}

function removeUser(username) {
  if (!(username in allConnectedUsers)) return;

  // remove this user from the requester lists of all their requestees
  for (const requesteeUsername in getRequestees(username)) {
    removeRequester(requesteeUsername, username);
  }

  delete allConnectedUsers[username];
}

function getUserSocket(username) {
  if (username in allConnectedUsers) return allConnectedUsers[username].socket;
  return null;
}

// function setUserReady(username) {
//   if (!(username in allConnectedUsers))
//     console.error(
//       "Erroneous game state: attempting to mark user ",
//       username,
//       " as ready but is not present in lobby user pool"
//     );
//   // if (username in readyUsers) return;

//   // update the state of the user to ready
//   allConnectedUsers[username].state = userStates.READY;

//   // readyUsers[username] = {};
// }

// function setUserNotReady(username) {
//   if (!(username in allConnectedUsers))
//     throw new Error(
//       "Erroneous game state: attempting to mark user ",
//       username,
//       " as ready but is not present in lobby user pool"
//     );
//   // if (!(username in readyUsers)) return;

//   // update the state of the user to ready
//   allConnectedUsers[username].state = userStates.NOT_READY;
//   delete readyUsers[username];
// }

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
    // if (username in readyUsers) return false;
    if (curUserState !== userStates.NOT_READY) return false;

    // update the state of the user to ready
    allConnectedUsers[username].state = userStates.READY;
    return true;
  } else if (state === userStates.NOT_READY) {
    // if (!(username in readyUsers)) return false;
    if (curUserState !== userStates.READY) return false;

    // update the state of the user to ready
    allConnectedUsers[username].state = userStates.NOT_READY;
    return true;
  } else if (state === userStates.ACCEPTED) {
    if (curUserState === userStates.NOT_READY) return false;

    allConnectedUsers[username].state = userStates.ACCEPTED;
    return true;
  }

  // If none of the valid states were given
  return false;

  /*
  It makes sense to have a user be able to request and receive requests
  at the same time. In this case, we only need the ready, not ready,
  and accepted states
  */

  // else if (state === userStates.REQUESTING) {
  //   if (!(curUserState === userStates.READY || curUserState === userStates.REQ)) {
  //     // remove user from ready user pool
  //     // delete readyUsers[username];

  //   allConnectedUsers[username].state = userStates.REQUESTING;
  //   return true;
  // } else if (state === userStates.REQUESTED) {
  //   if (allConnectedUsers[username].state === userStates.READY) {
  //     // remove user from ready user pool
  //     delete readyUsers[username];
  //   } else {
  //     return false;
  //   }

  //   allConnectedUsers[username].state = userStates.REQUESTED;
  //   return true;
  // }
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
  // return allConnectedUsers.filter((user) => user.state === userStates.READY);
  let readyUsers = [];
  for (const username in allConnectedUsers) {
    if (allConnectedUsers[username].state === userStates.READY)
      readyUsers.push(username);
  }
  return readyUsers;
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
// exports.setUserReady = setUserReady;
// exports.setUserNotReady = setUserNotReady;
exports.getReadyUsers = getReadyUsers;
exports.setUserState = setUserState;
exports.getUserSocket = getUserSocket;
exports.getUserState = getUserState;
exports.getRequestees = getRequestees;
exports.getRequesters = getRequesters;
exports.addRequestee = addRequestee;
exports.addRequester = addRequester;
exports.removeRequestee = removeRequestee;
exports.removeRequester = removeRequester;
