exports.userStates = Object.freeze({
  READY: Symbol("ready"),
  NOT_READY: Symbol("not-ready"),
  // REQUESTING: Symbol("requesting"),
  // REQUESTED: Symbol("requested"),
  ACCEPTED: Symbol("accepted"),
});

exports.gameStates = Object.freeze({
  NOT_STARTED: Symbol("not_started"),
  ACTIVE: Symbol("active"),
  ENDED: Symbol("ended"),
});

// Reference:
// https://www.geeksforgeeks.org/enums-in-javascript/
