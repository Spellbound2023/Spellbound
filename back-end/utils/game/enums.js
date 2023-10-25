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

exports.pointsModifiers = Object.freeze({
  SUCCESS_FIRST_ATTEMPT: Symbol("success_first_attempt"),
  SUCCESS_SECOND_ATTEMPT: Symbol("success_second_attempt"),
  SUCCESS_THIRD_ATTEMPT: Symbol("success_third_attempt"),
  UNSUCCESSFUL: Symbol("unsuccessful"),
  SKIP: Symbol("skip"),
});

exports.potions = Object.freeze({
  DOUBLE_POINTS: Symbol("double_points"),
  FREEZE: Symbol("freeze"),
  HINT: Symbol("hint"),
});

exports.gameEndReasons = Object.freeze({
  TIMER_ENDED: Symbol("timer_end"),
  TARGET_REACHED: Symbol("target_reached"),
  USER_QUIT: Symbol("user_quit"),
  USER_DISCONNECTED: Symbol("user_disconnected"),
});

// The number of milliseconds for which each potion is active
let potionActiveTimes = {};
potionActiveTimes[this.potions.DOUBLE_POINTS] = 10000;
potionActiveTimes[this.potions.FREEZE] = 10000;
potionActiveTimes[this.potions.HINT] = 10000;
exports.potionActiveTimes = Object.freeze(potionActiveTimes);

let pointsModifierPoints = {};
pointsModifierPoints[this.pointsModifiers.SUCCESS_FIRST_ATTEMPT] = 3;
pointsModifierPoints[this.pointsModifiers.SUCCESS_SECOND_ATTEMPT] = 2;
pointsModifierPoints[this.pointsModifiers.SUCCESS_THIRD_ATTEMPT] = 1;
pointsModifierPoints[this.pointsModifiers.UNSUCCESSFUL] = 0;
pointsModifierPoints[this.pointsModifiers.SKIP] = -1;
exports.pointsModifierPoints = Object.freeze(pointsModifierPoints);

// Reference:
// https://www.geeksforgeeks.org/enums-in-javascript/
