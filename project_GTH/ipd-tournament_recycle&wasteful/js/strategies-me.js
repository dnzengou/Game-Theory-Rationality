
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'nzengou';

// Waste: action 0
// Recycle: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    if (t <=150) // Waste from the start and until the 150th round
      return 0;
    return 1; // Recycle from the 151th until the end
  }
  return chooseAction;
}


strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
    if (t <1){
      return 0; // waste round 0 and 1
      }
    if (opponent[t-3] == 0 && opponent[t-2] == 0 && opponent[t-1] == 0){
      return 1; // recycle if last three opponents moves were 'waste'
      }
    return 0; // Otherwise waste
  }
  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {

    if (t <=50){
      return 0; // waste the 50 first rounds
      }
    else
      if (opponent[t-1] == 1){
      return 0; // waste if opponent's previous move was cooperate
      }
    return 1; // otherwise recycle
  }
  return chooseAction;
}


strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    // Recycle initially, but always play Waste if opponent has recycleed
    // more than 2 times in total. Otherwise, waste.

    var maxWastes = 2;
    var numWastes = 0;

    if (t < maxWastes) {
      return 1; // Recycle round 0 and 1
    }
    else {

    // Loop through all previous time steps
    for (var i = 0; i < t; i++) {
      if (opponent[i] == 0) { // if opponent wasted in round i
        numWastes = numWastes + 1; // then add to counter
      }

      if (numWastes > maxWastes) {
        return 0; // Waste if opponent has wasted at least 2 times
      }
      return 0;
    }
    }
  }

  return chooseAction;
  }


strategies[cid + '200b'] = function (){
  function chooseAction(me, opponent, t) {
    // Recycle initially, but always play random if opponent has wasted
    // more than 5 times in total. Otherwise, waste.

    var maxWastes = 5;
    if (t < maxWastes) {
      return 1;
    }

    var numWastes = 0;
    // Loop through all previous time steps
    for (var i = 0; i < t; i++) {
      if (opponent[i] == 0) { // if opponent wasted in round i
        numWastes = numWastes + 1; // then add to counter
      }

      if (numWastes > maxWastes) {
        return Math.round(Math.random()); // Play random if opponent has wasted at least 5 times
      } else {
        return 0; // Otherwise Waste
      }
    }
  }

  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    // Cooperate initially, but always defect if opponent has defected
    // more than 10 times in total

    var maxWastes = 10;
    if (t < maxWastes) {
      return 1;
    }

    var numWastes = 0;
    // Loop through all previous time steps
    for (var i = 0; i < t; i++) {
      if (opponent[i] == 0) { // if opponent defected in round i
        numWastes = numWastes + 1; // then add to counter
      }

      if (numWastes > maxWastes) {
        return 0; // Defect if opponent has defected at least 10 times
      } else {
        return 1; // Otherwise cooperate
      }
    }
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
  // angel is a state variable for this strategy.
  // The initialization code ('var angel = false;') will be run
  // before each game, so the variable angel will always equal
  // false when the game starts.

  var angel = false; // start out as 'not angel'

  function chooseAction(me, opponent, t) {
    // This strategy uses the state variable 'evil'.
    // In every round, turn 'not angel' with 10% probability.
    // (And remain this way until the 200 rounds are over.)
    if (Math.random() < 0.1) {
      angel = false;
    }

    // If angel, recycle
    if (angel) return 1;

    return 0; // Waste otherwise
  }
  return chooseAction;
}

