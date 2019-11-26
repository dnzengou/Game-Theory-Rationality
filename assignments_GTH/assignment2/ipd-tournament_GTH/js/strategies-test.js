'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'nzengou';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    if (t <=150) // Defect from the start and until the 150th round
      return 0;
    return 1; // Cooperate from the 151th until the end
  }
  return chooseAction;
}


strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
    if (t <1){
      return 0; // defect round 0 and 1
      }
    if (opponent[t-3] == 0 && opponent[t-2] == 0 && opponent[t-1] == 0){
      return 1; // cooperate if last three opponents moves were defect
      }
    return 0; // Otherwise defect
  }
  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {

    if (t <=50){
      return 0; // defect the 50 first rounds
      }
    else
      if (opponent[t-1] == 1){
      return 0; // defect if opponent's previous move was cooperate
      }
    return 1; // otherwise cooperate
  }
  return chooseAction;
}


strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    // Cooperate initially, but always play defect if opponent has cooperated
    // more than 2 times in total. Otherwise, defect.

    var maxDefects = 2;
    var numDefects = 0;

    if (t < maxDefects) {
      return 1; // cooperate round 0 and 1
    }
    else {

    // Loop through all previous time steps
    for (var i = 0; i < t; i++) {
      if (opponent[i] == 0) { // if opponent defected in round i
        numDefects = numDefects + 1; // then add to counter
      }

      if (numDefects > maxDefects) {
        return 0; // Defect if opponent has defected at least 2 times
      }
      return 0;
    }
    }
  }

  return chooseAction;
  }


strategies[cid + '200b'] = function (){
  function chooseAction(me, opponent, t) {
    // Cooperate initially, but always play random if opponent has defected
    // more than 5 times in total. Otherwise, defect.

    var maxDefects = 5;
    if (t < maxDefects) {
      return 1;
    }

    var numDefects = 0;
    // Loop through all previous time steps
    for (var i = 0; i < t; i++) {
      if (opponent[i] == 0) { // if opponent defected in round i
        numDefects = numDefects + 1; // then add to counter
      }

      if (numDefects > maxDefects) {
        return Math.round(Math.random()); // Play random if opponent has defected at least 5 times
      } else {
        return 0; // Otherwise Defect
      }
    }
  }

  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    // This code does the exact same thing as the 200c strategy, but
    // implemented in another way.

    //Slice out the part of history between time 0 and time t.
    var maxDefects = 5;
    if (t < maxDefects) {
      return 1; // cooperate if there is no chance t >= maxDefects
    }

    function sum(array) {
      return array.reduce(function (a, b) { return a + b; });
    }

    // Each cooperate action contributes 1 to the sum
    var passedHistory = opponent.slice(0, t);
    var numCooperate = sum(passedHistory);
    var numDefects = passedHistory.length - numCooperate;

    if (numDefects >= maxDefects) {
        return Math.round(Math.random()); // Play random if opponent has defected at least 5 times
      } else {
        return 0; // Otherwise defect
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

    // If angel, cooperate
    if (angel) return 1;

    return 0; // Defect otherwise
  }
  return chooseAction;
}
