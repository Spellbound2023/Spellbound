exports.userStates = Object.freeze({
  READY: Symbol("ready"),
  NOT_READY: Symbol("not-ready"),
  REQUESTING: Symbol("requesting"),
  REQUESTED: Symbol("requested"),
  PLAYING: Symbol("playing"),
});

// Reference:
// https://www.geeksforgeeks.org/enums-in-javascript/
