'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'atienza';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {

    if (t <= 1) {
      return 1;
    }

    if (opponent[t-1] == 0) {
      return 0;
    }

    if(t==9) return 0;

    return 1;
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {

  function chooseAction(me, opponent, t) {

    if (t==0) return 1;

    if (opponent[t-1] ==0|| me[t-1]==0) return 0;

    if (t==8 || t==9) return 0;

    return 1;

  }
  return chooseAction;
}


strategies[cid + '10c'] = function () {

  function chooseAction(me, opponent, t) {

    if (t==0) return 1;
    if ((opponent[t-1]==0 &&  opponent[t-2]==0)||me[t-1]==0) return 0;

    return 1;

  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {

  // GRADUAL
  var noppdefets = 0;
  var cont = 0;
  var attack = false;

  function chooseAction(me, opponent, t) {

    if (t == 0) {
      return 1;
    }

    if(attack==false) {
      if(opponent[t-1]==1) return 1;
      else {
        attack = true;
        noppdefets++;
        cont++;
        return 0;
      }
    }
    else {
      if(cont<noppdefets) {
        cont++;
        return 0;
      }
      else if (cont==noppdefets) {
        cont++
        return 1;
      }
      else {
        attack = false;
        cont = 0;
        return 1;
      }
    }
  }
  return chooseAction;
}


strategies[cid + '200b'] = function () {

  // SOFT MAJO
  var nDefets = 0;
  var nCoop = 0;

  function chooseAction(me, opponent, t) {

    if (t == 0) return 1;

    if (opponent[t-1]==0) nDefets++;
    else nCoop++;

    if (nDefets>nCoop) return 0;

    return 1;
  }

  return chooseAction;
}


strategies[cid + '200c'] = function () {

  // PROBABILITIES

  function chooseAction(me, opponent, t) {

    if (t ==0) {
      return 1;
    }

    if (me[t-1]==1 && opponent[t-1]==1) {
      return 1;
    }
    else if (me[t-1]==1 && opponent[t-1]==0) {
      if (Math.random()<13/15) return 1;
      else return 0;
    }
    else if (me[t-1]==0 && opponent[t-1]==1) {
      if (Math.random()<1/5) return 1;
      else return 0;
    }
    else {
      if (Math.random()<2/5) return 1;
      else return 0;
    }

  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {

  // SOFT MAJO WITH CORRECTION
  var nDefets = 0;
  var nCoop = 0;

  function chooseAction(me, opponent, t) {

    if (t == 0) return 1;

    if (opponent[t-1]==0) nDefets++;
    else nCoop++;

    if (nDefets>nCoop+1) return 0;

    return 1;
  }

  return chooseAction;
}
'use strict';

if (strategies === undefined) {
    var strategies = {};
}

if (cid === undefined) {
    var cid;
}

// Exchange this for your own cid
cid = 'maitreya';

// Defect: action 0
// Cooperate: action 1

strategies[cid + '10a'] = function() {
	var defect = 0;

    function chooseAction(me, opponent, t) {
		if(t == 0)
			return 0;		// start with defect; secure urself; see what he does

		if(opponent[t-1] == 0) {
			defect++;
		}

		if(t == 1)
			return 1;

		if(t != 9) {
			if(defect >= 2) {
				defect--;
				return 0;
			}
			else {
				// return (Math.round(Math.random())); BAD PERFORMANCE
				return 1;
			}
		}
		if(t == 9)
			return 0;
    }
    return chooseAction;
}


strategies[cid + '10b'] = function() { // idea is to detect and beat strategy

	var me = new Array(3);
	me[0] = 1;
	var r = 0;
	var evil = false;

	function chooseAction(me, opponent, t) {
        if(t == 0)
			return me[0];

		if(t == 1) {
			if(opponent[t-1] == 0) {
				//most probably not using tit for tat; as it must cooperate at beginning; play random one round
				me[1] = Math.round(Math.random());
				return me[1];
			}
		}

		if(t == 2) {
			if(opponent[t-1] == me[0]) {
				//probably first action random and then mimic.
				me[2] = 1;
				return 1;
			}
		}

		if(evil == true) {
			me[2] = 0;
			return 0;
		}

		if(opponent[t-1] == 0 && opponent[t-2] == 0 && opponent[t-3] == 0) {
			// its defect 3 times in a row;
			// go evil
			evil = true;
			return 0;
		}
		else if(opponent[t-1] == me[1]) {
			// mimic confirmed ; or very lucky random strategy
			return 1;
		}
		else {
			return 0;	// always safe
		}
    }
    return chooseAction;
}


strategies[cid + '10c'] = function() {

	// stays evil for 0.5
	var evil = false;

    function chooseAction(me, opponent, t) {
        if (Math.random() < 0.5) {
            evil = true;
        }

        if (evil) return 0;

        return 1;
    }

	/*function chooseAction(me, opponent, t) {
		if (t == 0) return 1;
		return opponent[t-1];
	}*/


    return chooseAction;
}

strategies[cid + '200a'] = function() { // idea is to detect and beat strategy

	var me = new Array(3);
	me[0] = 1;
	var r = 0;
	var evil = false;

	function chooseAction(me, opponent, t) {
        if(t == 0)
			return me[0];

		if(t == 1) {
			if(opponent[t-1] == 0) {
				//most probably not using tit for tat; as it must cooperate at beginning; play random one round
				me[1] = Math.round(Math.random());
				return me[1];
			}
		}

		if(t == 2) {
			if(opponent[t-1] == me[0]) {
				//probably first action random and then mimic.
				me[2] = 1;
				return 1;
			}
		}

		if(evil == true) {
			me[2] = 0;
			return 0;
		}

		if(opponent[t-1] == 0 && opponent[t-2] == 0 && opponent[t-3] == 0) {
			// its defect 3 times in a row;
			// go evil
			evil = true;
			return 0;
		}
		else if(opponent[t-1] == me[1]) {
			// mimic confirmed ; or very lucky random strategy
			return 1;
		}
		else {
			return 0;	// always safe
		}
    }
    return chooseAction;
}

strategies[cid + '200b'] = function() {

	var defect = 0;

    function chooseAction(me, opponent, t) {
		if(t == 0)
			return 0;		// start with defect; secure urself; see what he does

		if(opponent[t-1] == 0) {
			defect++;
		}

		if(t == 1)
			return 1;

		if(t != 199) {
			if(defect >= 2) {
				defect--;
				return 0;
			}
			else {
				// return (Math.round(Math.random()));
				return 1;
			}
		}
		if(t == 199)
			return 0;
    }
    return chooseAction;
}

strategies[cid + '200c'] = function() {
    function chooseAction(me, opponent, t) {

        var maxDefects = 5;
        if (t < maxDefects) {
            return 1;
        }

        function sum(array) {
            return array.reduce(function(a, b) {
                return a + b;
            });
        }

        var passedHistory = opponent.slice(0, t);
        var numCooperate = sum(passedHistory);
        var numDefects = passedHistory.length - numCooperate;

        if (numDefects >= maxDefects) {
            return 0;
        }

        return 1;
    }

	/*function chooseAction(me, opponent, t) {
		if (t == 0) return 1;
		return opponent[t-1];
	}*/

    return chooseAction;
}



/*strategies[cid + '200d'] = function() {

	// cooperate on first move;

	var c = 0;
	var d = 0;

	function chooseAction(me, opponent, t) {

		if(t == 0)
			return 1;

		if(opponent[t-1] == 0)
			d++;
		else
			c++;

		if(c >= d)
			return 1;
		else
			return 0;

	}

	return chooseAction;
}*/

/*strategies[cid + '200e'] = function() {
	function chooseAction(me, opponent, t) {
        if (Math.random() < 0.15)
            return 0;
        else
			return 1;
    }
    return chooseAction;
}*/

/*strategies[cid + '200f'] = function() {
    function chooseAction(me, opponent, t) {
        // Cooperate initially, but always defect if opponent has defected
        // more than 10 times in total

        var maxDefects = 10;
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
                return 0; // Defect if opponent has defected at least 10 times
            } else {
                return 1; // Otherwise cooperate
            }
        }
    }

    return chooseAction;
}*/



strategies[cid + '200mistakes'] = function() {
    function chooseAction(me, opponent, t) {
        // This code does the exact same thing as the 200c strategy, but
        // implemented in another way, which might appeal more or less
        // to your style of thinking/programming.

        //Slice out the part of history between time 0 and time t.
        var maxDefects = 10;
        if (t < maxDefects) {
            return 1; // cooperate if there is no chance t >= maxDefects
        }

        function sum(array) {
            return array.reduce(function(a, b) {
                return a + b;
            });
        }

        // Each cooperate action contributes 1 to the sum
        var passedHistory = opponent.slice(0, t);
        var numCooperate = sum(passedHistory);
        var numDefects = passedHistory.length - numCooperate;

        if (numDefects >= maxDefects) {
            return 0; // Defect if opponent has defected at least maxDefect times
        }

        return 1; // Otherwise cooperate
    }

    return chooseAction;
}

'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'andelf';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
      if (t < 3) {
          return 1;
      }
       //hold a grudge, maybe
      if (opponent[t - 3] == 0 && Math.random < 0.4) {
          return 0;
      }
      if (opponent[t - 2] == 0 && Math.random < 0.4) {
          return 0;
      }
      if (opponent[t - 1] == 1 && Math.random < 0.4) {
          return 0;
      }

      return 1; // otherwise cooperate
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
      if (t < 3) {
          return 1;
      }//avg response
      if (opponent[t - 3] + opponent[t - 2] + opponent[t - 1] < 1.5) {
          return 0;
      }
      return 1; // otherwise cooperate
  }
  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat

      if (t <= 1) {
          return 1; // cooperate round 0 and 1
      }
      if (opponent[t - 2] == 0 && opponent[t - 1] == 0) {
          return 0; // defect if last two opponent moves were defect
      }
      if (t > 8) {
          return 0;
      }
      return 1;
  }
  return chooseAction;
}



strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
      if (t < 6) {
          return 1;
      }
      //hold a grudge, maybe
      if (opponent[t - 6] == 0 && Math.random < 0.2) {
          return 0;
      }
      if (opponent[t - 5] == 0 && Math.random < 0.2) {
          return 0;
      }
      if (opponent[t - 4] == 1 && Math.random < 0.2) {
          return 0;
      }
      if (opponent[t - 3] == 0 && Math.random < 0.2) {
          return 0;
      }
      if (opponent[t - 2] == 0 && Math.random < 0.2) {
          return 0;
      }
      if (opponent[t - 1] == 1 && Math.random < 0.2) {
          return 0;
      }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}


strategies[cid + '200b'] = function () {

  function chooseAction(me, opponent, t) {
      if (t < 3) {
          return 1;
      }
      if (t > 180) {
          if (Math.random < 0.05) {
              return 0;
          }
      }

      //avg response
      if (opponent[t - 3] + opponent[t - 2] + opponent[t - 1] < 1.5) {
          return 0;
      }

    return 1; // and cooperate otherwise
  }
  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    // Cooperate initially, but always defect if opponent has defected
    // more than 10 times in total

      if (t <= 1) {
          return 1; // cooperate round 0 and 1
      }
      if (opponent[t - 2] == 0 && opponent[t - 1] == 0) {
          return 0; // defect if last two opponent moves were defect
      }
      if (t > 188) {
          return 0;
      }
      return 1;
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {
      if (t < 3) {
          return 1;
      }
      if (t > 180) {
          if (Math.random < 0.10) {
              return 0;
          }
      }

      //avg response
      if (opponent[t - 3] + opponent[t - 2] + opponent[t - 1] < 1.5) {
          return 0;
      }

    return 1; // Otherwise cooperate
  }

  return chooseAction;
}
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'hedvin';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat-counter

    if (t<=8) {
      return 1; // Cooperate the first nine rounds
    }

    return 0; // Defect last round
  }

  return chooseAction;
}

strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for two tat-counter
    // Alternate between 0 and 1, except last two rounds when only 0 is played

    if (t<=8) {
      if (t % 2 == 0){
        return 0
      }
      else {
        return 1
      }
    }
    if (t>8){
      return 0
    }
 }

  return chooseAction;
}



strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
    // Defect the first 5 rounds
    // The last 5 rounds are based on the opponents' previous actions
    var T=0
    var p=0
    var random
    if (t<=4) {
      return 0
    }
    if (t>4){
      for (var i = 0; i <= t; i++){
        T+= opponent[i];
      }

    p=T/(t+1)
    random = Math.random();

    if (random>p){
      return 0
    }
    return 1
    }
  }

  return chooseAction;
}


strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    // Choosing actions depending on the opponents' previous actions
    var T=0
    var p=0
    var random
    if (t<=9) { //First 10 rounds always defect
      return 0
    }
      if (t>9){
        for (var i = 0; i <= t; i++){
          T+= opponent[i];
    	}

      p=T/(t+1) // p equals the ratio between the cooperate actions and the total amount of rounds that has been played at time t
      random = Math.random();

      if (random>p){ // Defect with probablity 1-p
        return 0
      }
      return 1
    }
  }

return chooseAction;
}

strategies[cid + '200b'] = function () {
  function chooseAction(me, opponent, t) {
    var T=0
    var p=0
    var random
    if (t<=8) {
      return 0
    }

    if (t>8){
      for (var i = 0; i <= 9; i++){
        T+= opponent[i];
    	}
    }
    p=T/10 // p equals the ratio between the cooperate actions and the total amount of rounds at time t=9

    if (p==0.1){ // If statement is true, assuming opponent is doing tic-for-tac
      return 0
  	}
    else if (p==0.2){ // If statement is true, assuming opponent is doing tic-for-2-tac
      if (t % 2 == 0){
        return 0
      }
      else {
        return 1
    	}
    }
    else if (p==0){ // If statement is true, assuming always defect strategy
      return 0
    }
    else if (p==1){ // If statement is true, assuming always cooperate strategy
      return 0
    }
    else { // Otherwise assume random strategy => defect is the best response
      return 0
    }
  }
  return chooseAction;
}



strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    // Probability strategy counter
    var T=0
    var p=0
    var random
    if (t<=18) { // Randomize action in the first 20 rounds
      random=Math.random()
      if (random <0.5){
      	return 0
      }
      else{
        return 1
      }
    }

    if (t>18){ // Base decision on the previous rounds
      for (var i = 0; i <= 9; i++){
        T+= opponent[i];
      }
      p=T/t
      random=Math.random()

      if (random>p){ // Defect with probability 1-p
        return 0
      }
      else{
        return 1 // Cooperate with probability p
      }

    }

  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {
    // Same as 200c but instead of randomizing the 20 first rounds, always defect those rounds
    var T=0
    var p=0
    var random
    if (t<=18) {
	return 0
    }

    if (t>18){
      for (var i = 0; i <= 9; i++){
        T+= opponent[i];
    }
    p=T/20
    random=Math.random()

    if (random>p){
      return 0
    }
    else{
      return 1
    }

    }

  }

  return chooseAction;
}
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'fannieh';

// Defect: action 0
// Cooperate: action 1


//strategies[cid + '10a'] = function () {
//  function chooseAction(me, opponent, t) {
    // Always defect
//    return 0;
//  }
//  return chooseAction;
//}
strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    // We want that 'me' Cooperate and Defect equals times.
    // If Cooperate and Defect have been equals time, then random output.

    var numDefects = 0;
    var numCooperate = 0;
    // Loop through all previous time steps
    for (var i = 0; i < t+1; i++) {
      if (me[i] == 0) { // if me defected in round i
        numDefects = numDefects + 1; // then add to counter for defect
      } else {
        numCooperate = numCooperate + 1; //else add to counter for cooperate
      }

      if (numDefects == numCooperate) { //equal gives a random output
        return Math.round(Math.random());
      } else if (numDefects > numCooperate) { //if me have more defect than cooperate, then cooperate
        return 1;
      } else{
        return 0; //else me had more cooperate than defect, then defect
      }
    }
  }

  return chooseAction;
}


//strategies[cid + '10b'] = function () {
//  function chooseAction(me, opponent, t) {
    // Always cooperate
//    return 1;
//  }
//
//  return chooseAction;
//}
strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
    if (t <= 1) {
      return 1; // cooperate round 0 and 1
    }
    if ((opponent[t-2] == 0 && opponent[t-1] == 0) || (opponent[t-2] == 1 && opponent[t-1] == 1)) {
      return 0; // defect if last two opponent moves were defect or last two opponent moves were cooperate
    } else {
      return 1; // otherwise cooperate
    }
  }
  return chooseAction;
}


//strategies[cid + '10c'] = function () {
//  function chooseAction(me, opponent, t) {
    // Tit for tat

//    if (t == 0) {
//      return 1; // cooperate in first round
//    }
//    return opponent[t-1]; // otherwise copy opponent
//  }
//  return chooseAction;
//}
strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
    if (t==1) {	//if t equals 1-> defect
      return 0;
    } else if(t == 2) {	//if t equals 2 -> cooperate
      return 1;
    } else {
      for(var x = 2; x < t; x++) {
        if(t % x == 0) {		//if t is evenly divisible with x -> cooperate
          return 1;
        }
      }
      return 0; //otherwise defect
    }
  }
  return chooseAction;
}


//strategies[cid + '200a'] = function () {
//  function chooseAction(me, opponent, t) {
    // Tit for two tats
//    if (t <= 1) {
//      return 1; // cooperate round 0 and 1
//    }
//    if (opponent[t-2] == 0 && opponent[t-1] == 0) {
//      return 0; // defect if last two opponent moves were defect
//    }
//    return 1; // otherwise cooperate
//  }
//  return chooseAction;
//}
strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    if (t <= 1) {
      return 1; // cooperate round 0 and 1
    }

    if ((me[t-2] == 0 && me[t-1] == 0) || (me[t-2] == 1 && me[t-1] == 1)) {
      return 0; // defect if last two me moves were defect or last two me moves were cooperate
    } else {
      return 1; // otherwise cooperate
  	}
  }
  return chooseAction;
}


//strategies[cid + '200b'] = function () {
  // evil is a state variable for this strategy.
  // The initialization code ('var evil = false;'') will be run
  // before each game, so the variable evil will always equal
  // false when the game starts.
//  var evil = false; // start out as not evil
//  function chooseAction(me, opponent, t) {
    // This strategy uses the state variable 'evil'.
    // In every round, turn evil with 5% probability.
    // (And remain evil until the 200 rounds are over.)
//    if (Math.random() < 0.05) {
//      evil = true;
//    }

    // If evil, defect
//    if (evil) return 0;
//    return 1; // and cooperate otherwise
//  }
//  return chooseAction;
//}

strategies[cid + '200b'] = function () {
  // evil is a state variable for this strategy.
  // The initialization code ('var evil = false;'') will be run
  // before each game, so the variable evil will always equal
  // false when the game starts.

  var evil = false; // start out as not evil
  function chooseAction(me, opponent, t) {
    // This strategy uses the state variable 'evil'.
    // In every round, turn evil with 5% probability.
    // There is also kidness, and will turn the evil to false
    // with 2% probability.
    if (Math.random() < 0.05) {
      evil = true;

      if (Math.random() <0.02){
        evil = false;
      }
    }
    // If evil, defect
    if (evil) return 0;

    return 1; // and cooperate otherwise
  }
  return chooseAction;
}



//strategies[cid + '200c'] = function () {
//  function chooseAction(me, opponent, t) {
    // Cooperate initially, but always defect if opponent has defected
    // more than 10 times in total

//    var maxDefects = 10;
//    if (t < maxDefects) {
//      return 1;
//    }
//    var numDefects = 0;
    // Loop through all previous time steps
//    for (var i = 0; i < t; i++) {
//      if (opponent[i] == 0) { // if opponent defected in round i
//        numDefects = numDefects + 1; // then add to counter
//      }
//      if (numDefects > maxDefects) {
//        return 0; // Defect if opponent has defected at least 10 times
//      } else {
//        return 1; // Otherwise cooperate
//      }
//    }
//  }
//  return chooseAction;
//}
strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    if (t <= 80) {
      if ((opponent[t-2] == 0 && opponent[t-1] == 0) || (opponent[t-2] == 1 && opponent[t-1] == 1)) {
      	return 0; // defect if last two opponent moves were defect or last two opponent moves were cooperate, up to t = 80
    	} else {
      	return 1; // otherwise cooperate
  		}
  	} else {
      var x = Math.floor(Math.random() * 81); //Random between 0 to 80. use same defect/cooperate as the random number.
      if (opponent[x] == 1) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  return chooseAction;
}


//strategies[cid + '200mistakes'] = function () {
//  function chooseAction(me, opponent, t) {
    // This code does the exact same thing as the 200c strategy, but
    // implemented in another way, which might appeal more or less
    // to your style of thinking/programming.

    //Slice out the part of history between time 0 and time t.
//    var maxDefects = 10;
//    if (t < maxDefects) {
//      return 1; // cooperate if there is no chance t >= maxDefects
//    }
//    function sum(array) {
//      return array.reduce(function (a, b) { return a + b; });
//    }
    // Each cooperate action contributes 1 to the sum
//    var passedHistory = opponent.slice(0, t);
//    var numCooperate = sum(passedHistory);
//    var numDefects = passedHistory.length - numCooperate;
//    if (numDefects >= maxDefects) {
//      return 0; // Defect if opponent has defected at least maxDefect times
//    }
//    return 1; // Otherwise cooperate
//  }
//  return chooseAction;
//}


strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {
    // We want that 'me' Cooperate and Defect equals times.
    // If Cooperate and Defect have been equals time, then random output.

    var numDefects = 0;
    var numCooperate = 0;
    // Loop through all previous time steps
    for (var i = 0; i < t+1; i++) {
      if (me[i] == 0) { // if me defected in round i
        numDefects = numDefects + 1; // then add to counter for defect
      } else {
        numCooperate = numCooperate + 1; //else add to counter for cooperate
      }

      if (numDefects == numCooperate) { //equal gives a random output
        return Math.round(Math.random());
      } else if (numDefects > numCooperate) { //if me have more defect than cooperate, then cooperate
        return 1;
      } else{
        return 0; //else me had more cooperate than defect, then defect
      }
    }
  }

  return chooseAction;
}
'use strict';
if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'danhes';

// Defect: action 0
// Cooperate: action 1

function titForTatDefect(me, opponent, t, i) {
  if (t == 0) {
    return 1;
  }

  if (t>=i){
    return 0;
  }

  return opponent[t-1];
}


strategies[cid + '200a'] =  function () {
  return function (me, opponent, t) {
    var is_sandbagger = true
    if(t >= 1 && opponent[0] == 1) is_sandbagger = false
    for (let i = 1; i < t; i++){
        if(opponent[i] != 1) is_sandbagger = false
    }
    if(is_sandbagger && t > 0){
      return 0
    }
    return titForTatDefect(me, opponent,t, 198);
  }
}



// haha these are just always defecting against everyone else
// but always cooperating against the above one.

let sandbagger = function (me, opponent, t) {
  if(t == 0) return 0
  var is_winner = true
  if(t >= 1 && opponent[0] == 0) is_winner = false
  for (let i = 1; i < t; i++){
      if(opponent[i] != 0) is_winner = false
  }

  if(is_winner) return 1
  else return 0
}

strategies[cid + '200b'] =  function () {
  return sandbagger
}

strategies[cid + '200c'] =  function () {
  return sandbagger
}

strategies[cid + '10a'] =  function () {
  return function (me, opponent, t) {
    var is_sandbagger = true
    if(t >= 1 && opponent[0] == 1) is_sandbagger = false
    for (let i = 1; i < t; i++){
        if(opponent[i] != 1) is_sandbagger = false
    }
    if(is_sandbagger && t > 0){
      return 0
    }
    return titForTatDefect(me, opponent,t, 8);
  }
}


strategies[cid + '10b'] =  function () {
  return sandbagger
}

strategies[cid + '10c'] =  function () {
  return sandbagger
}



let d = [1,1,0,1,0,0,1,1,0,1,0,1,1,0,0,1]

function func_from_list_4_defect(me, opponent, t, i, list) {
  if (t < 4) {
    return 1;
  }

  if (t>=i){
    return 0;
  }


  let index = opponent[t-1] + me[t-1]*2 + opponent[t-2]*4 + me[t-2]*8
  return list[index];
}

strategies[cid + '200mistakes'] =  function () {
  return (me, opponent, t) => func_from_list_4_defect(me, opponent, t, 198, d)
}


'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'marso';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    return t < 8 ? 1: 0;
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
    return Math.random() < 0.61 ? 1: 0;
  }

  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
    return t == 0 ? 1: t < 9 ? opponent[t-1]: 0;
  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {
  var trust = true;

  function chooseAction(me, opponent, t) {

    if(t >= 3 && trust) {
      //var oppActions = opponent.slice(0, t);
      const actionSum = opponent.reduce( (a,b) => a+b, 0);
      trust = (actionSum/(t+1)) > 0.6;
    }

    if(trust) {
      // Play tit for tat
      if(t === 0){
      	return 1; //cooperate in first round
      }
      return opponent[t-1];
    }
    // Always defect if no trust exists
    return 0;
  }

  return chooseAction;
}


strategies[cid + '200b'] = function () {
  var tft = false;
  var tf2t = false;
  var itft = false; //Inverse TfT
  var alwaysDefect = false;
  var alwaysCooperate = false;

  const startActions = [1,0,0,0,1,1];

  function chooseAction(me, opponent, t) {
    if (t < startActions.length) {
      return startActions[t];
    } else if (t == startActions.length) {
      //Do analysis
      const oppResponse = opponent.slice(0,t);

      //From here is hardcoded for analysis of the first 6 moves
      if (oppResponse[1] == 1 && oppResponse[2] == 0 && oppResponse[3] == 0 && oppResponse[5] == 1) {
        tft = true;
      } else if (oppResponse[2] == 1 && oppResponse[3] == 0 && oppResponse[4] == 0 && oppResponse[5] == 1) {
        tf2t = true;
      } else if (oppResponse[1] == 0 && oppResponse[2] == 1 && oppResponse[3] == 1 && oppResponse[5] == 0) {
        itft = true;
      } else if (oppResponse[1] == 0 && oppResponse[2] == 0 && oppResponse[3] == 0 && oppResponse[5] == 0) {
        alwaysDefect = true;
      } else if (oppResponse[1] == 1 && oppResponse[2] == 1 && oppResponse[3] == 1 && oppResponse[4] == 1 && oppResponse[5] == 1) {
        alwaysCooperate = true;
      }
    }
    if (t >= startActions.length) {
      //Play strategy
      if (tft) {
        // TfT is the response
        return opponent[t-1];
      } else if (tf2t) {
        // Exploit tf2t
        return Math.abs(me[t-1] - 1);
      } else if (itft || alwaysDefect || alwaysCooperate) {
        //Respond with defecting
        return 0;
      } else {
        //Default to tft
        return opponent[t-1];
      }
    }
  }

  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    return t == 0 ? 1: t < 199 ? opponent[t-1]: 0;
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
  var trust = true;
  var reset = false;

  function chooseAction(me, opponent, t) {
    if(t >= 3 && trust) {
      const oppActionSum = opponent.reduce( (a,b) => a+b, 0);
      trust = (oppActionSum/(t+1)) > 0.6;
    } else if (t >= 4 && !trust){
      //Reestablish trust
      const oppLastMoves = opponent.slice(t-4,t);
      trust = (oppLastMoves[0] == 1 && oppLastMoves[1] == 1 && oppLastMoves[2] == 1 && oppLastMoves[3] == 1);
    }

    if(trust) {
      if(t === 0){
      	return 1; //cooperate in first round
      }
      //Do we have a problem?
      if(reset){
        reset = false;
        return 0;
      } else {
        reset = me[t-1] !== opponent[t-1] && me[t-2] !== opponent[t-2];
        if(reset){
          return 0;
        }
        return 1;
      }
    }
    // Always defect if no trust exists
    return 0;
  }

  return chooseAction;
}
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'klasho';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    // Always defect
    return 0;
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {
  var evil = false; // start out as not evil
  function chooseAction(me, opponent, t) {
    // Tit for tat

    if (t == 0) {
      return 1; // cooperate in first round
    }

    if (Math.random() < Math.exp(t-10)) {
      evil = true;
    }
    if (evil) return 0;

    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat

    if (t == 0) {
      return 1; // cooperate in first round
    }

    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for two tats

    if (t <= 1) {
      return 1; // cooperate round 0 and 1
    }

    if(Math.random() < 0.08) {
      return 0;
    }

    if (opponent[t-2] == 0 && opponent[t-1] == 0) {
      return 0; // defect if last two opponent moves were defect
    }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}


strategies[cid + '200b'] = function () {
  // evil is a state variable for this strategy.
  // The initialization code ('var evil = false;'') will be run
  // before each game, so the variable evil will always equal
  // false when the game starts.

  var evil = false; // start out as not evil

  function chooseAction(me, opponent, t) {
    // This strategy uses the state variable 'evil'.
    // In every round, turn evil with 5% probability.
    // (And remain evil until the 200 rounds are over.)
    if (Math.random() < 0.05) {
      evil = true;
    }

    // If evil, defect
    if (evil) return 0;

    return 1; // and cooperate otherwise
  }
  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    //Always Defect
    if (t == 0) {
      return 1;
    }
    return 0;
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {
    if(t == 0) {
      return 1;
    }

    if(Math.random() < 0.05){
      return 0;
    }

    return opponent[t-1];
  }

  return chooseAction;
}
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'markusi';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    // Alternate between cooperate and deflect
    if(t == 9) return 0;
    return (t + 1) % 2;
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat and deflect in the end
    if (t == 0) return 1; // cooperate in first round
    if (t == 9) return 0;
    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat and deflect in the end
    if (t == 0) return 1; // cooperate in first round
    if (t == 9) return 0;
    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat and deflect in the end
    if (t == 0) return 1; // cooperate in first round
    if (t == 199) return 0;
    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}


strategies[cid + '200b'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat and deflect in the end
    if (t == 0) return 1; // cooperate in first round
    if (t == 199) return 0;
    return opponent[t-1]; // otherwise copy opponent
  }
  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    if(t == 199) return 0;
    // Alternate between cooperate and deflect
    return (t + 1) % 2;
  }

  return chooseAction;
}


 strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {
    // Starts deflecting after repeated deflection from opponent.
    // Starts cooperating after repeated cooperation from opponent
    if(t < 2) return 1;
    if(t == 199) return 0;
    var points = 0;
    points = opponent[t-1] + opponent[t-2];
    switch(points) {
      case 0:
        return 0;
      case 1:
        return me[t-1];
      case 2:
        return 1;
    }
  }
  return chooseAction;
}
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'joajans';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    if (t == 0) {
	  return 0;
    }
	if (t >= 1 && t <= 8) {
	  return opponent[t-1];
	}
	if (t == 9) {
	  return 0;
	}
  }
  return chooseAction;
}


strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
	if (t == 0) {
      return 1;
	}
	if (t == 9) {
	  return 0;
	}
	if (opponent[t-1] == 1) {
	  return 1;
	}
	if (t == 1) {
	  return 0;
	}
	if (opponent[t-2] == 1) {
	  return 1;
	} else {
	  return 0;
	}
  }
  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
	if (t == 0) {
	  return 1;
	}
	if (t == 9) {
	  return 0;
	}
	if (t == 1 && opponent[t-1] == 0) {
	  return 0;
	}
	if (opponent[t-1] == 1) {
	  return 1;
	}
	if (opponent[t-1] == 0 && opponent[t-2] == 0) {
	  return 1;
	}
	return 0;
  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    if (t == 0) {
	  return 1;
	}
	if (t == 199) {
	  return 0;
	}
	if (t == 1 && opponent[t-1] == 0) {
	  return 0;
	}
	if (opponent[t-1] == 1) {
	  return 1;
	}
	if (opponent[t-1] == 0 && opponent[t-2] == 0) {
	  return 1;
	}
	return 0;
  }

  return chooseAction;
}


strategies[cid + '200b'] = function () {
  function chooseAction(me, opponent, t) {
    if (t == 0) {
	  return 1;
	}
	if (t <= 4) {
	  return opponent[t-1];
	}
	return opponent[t-5];
  }
  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    if (t == 0) {
	  return 1;
	}
	if (opponent[t-1] == 0) {
	  var choose = Math.random();
	  if (choose < 0.15) {
		return 1;
	  } else {
  	  return 0;
	  }
	}
	if (opponent[t-1] == 1) {
	  var choose = Math.random();
	  if (choose < 0.1) {
		return 0;
	  } else {
		return 1;
	  }
	}
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {
	if (t == 0) {
	  return 1;
	}
	if (t <= 9) {
	  return opponent[t-1]
	}
	var coop = 0;
	var def;
	var i;
	for (i=1; i <= 10; i++) {
	  coop = coop + opponent[t-i];
	}
	def = 10 - coop;
	var coopPercent = coop/10;
    if (Math.random() <= coopPercent) {
	  return 1;
	}
	var meDef;
	var meCoop = 0;
	for (i=1; i <= 10; i++) {
	  meCoop = meCoop + me[t-i];
	}
	meDef = 10 - meCoop;
	var totDef = meDef + def;
	var defPercent = def/totDef;
	if (Math.random() <= defPercent) {
	  return 0;
	} else {
	  return 1;
	}
  }

  return chooseAction;
}
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'rojohans';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
        // Tit for tat, with early defection.

    if (t == 0) {
      return 1; // Start with cooperation.
    }

    if (t == 9){
      return 0; // Defect the last round.
    }

    return opponent[t-1]; // Do as the opponent just did.
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat, with early defection.

    if (t == 0) {
      return 1; // Start with cooperation.
    }

    if (t >= 8){
      return 0; // Defect the two last rounds.
    }

    return opponent[t-1]; // Do as the opponent just did.
  }

  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat in beginning. Inverse tit for tat at end.

    if (t == 0) {
      return 1; // Start with cooperation.
    }

    if (t >= 5){
      return 1-opponent[t-1]; // Do the opposite of the opponent.
    }

    return opponent[t-1]; // Do as the opponent just did.
  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat, with early defection.

    if (t == 0) {
      return 1; // Start with cooperation.
    }

    if (t == 199){
      return 0; // Defect the last round.
    }

    return opponent[t-1]; // Do as the opponent just did.
  }

  return chooseAction;
}


strategies[cid + '200b'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat, with early defection.

    if (t == 0) {
      return 1; // Start with cooperation.
    }

    if (t >= 189){
      return 0; // Defect the last 10 round.
    }

    return opponent[t-1]; // Do as the opponent just did.
  }
  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat, with early defection.

    if (t == 0) {
      return 1; // Start with cooperation.
    }

    if (t >= 100){
      return 1-opponent[t-1]; // switch to an inverted tit for tat after half
                              // the game.
    }

    return opponent[t-1]; // Do as the opponent just did.
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {
  // One could create the look-up-table using a genetic algorithm, i have not done so.
  if (t<= 2){
    return 1 // Start with copperation
  }

  // Use a look-up-tree which maps previous opponent actions to actions to take.
  if (opponent[t-3] == 1){
    if (opponent[t-2] == 1){
        if (opponent[t-1] == 1){
            if (opponent[t] == 1){
                // 1111
                return 1;
            }
            // 1110
            return 1;
        }
        if (opponent[t] == 1){
            // 1101
            return 1;
        }
        // 1100
        return 0;
    }
    if (opponent[t-1] == 1){
        if (opponent[t] == 1){
            //1011
            return 1;
        }
        // 1010
        return 0;
    }
    if (opponent[t] == 1){
        // 1001
        return 0;
    }
    // 1000
    return 1;

  }
  if (opponent[t-2] == 1){
    if (opponent[t-1] == 1){
        if (opponent[t] == 1){
            // 0111
            return 1;
        }
        // 0110
        return 1;
    }
    if (opponent[t] == 1){
        // 0101
        return 0;
    }
    // 0100
    return 0;
  }
  if (opponent[t-1] == 1){
    if (opponent[t] == 1){
        // 0011
        return 1;
    }
    // 0010
    return 1;
  }
  if (opponent[t] == 1){
    // 0001
    return 1;
  }
  // 0000
  return 1;
  }

  return chooseAction;
}
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'landa';

// Defect: action 0
// Cooperate: action 1

strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {

    if (t == 0) {
      return 1; // cooperate round 0
    }

    if (opponent[t-2] == 0 && opponent[t-1] == 0) {
      return 0; // defect if last two opponent moves were defect
    }

    if (t > 8){
      return 0; // defect after 8
    }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
   // half cooperate

    if (t < 5) {
      return 1;
    }
    if (t > 5) {
      return 0; // cooperate round 0 and 1
    }


    return 0; // otherwise cooperate
  }

  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
   // Tit for two different tats

    if (t == 1) {
      return 1; // cooperate round 1
    }

    if (opponent[t-3] == 0 && opponent[t-1] == 0) {
      return 1; // cooperate if last two different moves were defect
    }

    if (opponent[t-2] == 0){
      return 0;
    }

    return 0; // otherwise defect
  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
      // Tit for two different tats

    if (t == 1) {
      return 1; // cooperate round 1
    }

    if (opponent[t-3] == 0 && opponent[t-1] == 0) {
      return 1; // cooperate if last two different moves were defect
    }

    if (opponent[t-2] == 0){
      return 0;
    }

    return 0; // otherwise defect
  }

  return chooseAction;
}


strategies[cid + '200b'] = function () {


   var good = false; // start out as evil

  function chooseAction(me, opponent, t) {
    // This strategy uses the state variable 'good'.
    // In every round, turn good with 1% probability.
    // (And remain good until the 200 rounds are over.)
    if (Math.random() < 0.01) {
      good = true;
    }

    // If good, cooperate
    if (good) return 1;

    return 0; // and defect otherwise
  }
  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
   if (t <= 4) {
      return 1; // cooperate until round 4
    }

    if ((opponent[t-3] == 0 && opponent[t-1] == 0) || (opponent[t-4] == 1 && opponent[t-2] == 1)) {
      return 0; // defect if last two different moves were defect or cooperate
    }

    if (opponent[t-5] == 0){
      return 0;
    }

    return 0; // otherwise defect
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {
    if (t <= 4) {
      return 1; // cooperate round 1
    }

    if (opponent[t-5] == 1 && opponent[t-1] == 1) {
      return 1; // cooperate if last first and fifth moves were cooperate
    }

    return 0; // otherwise defect
  }

  return chooseAction;
}
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'lyster';

// Defect: action 0
// Cooperate: action 1

strategies[cid + '10a'] = function () {

  function chooseAction(me, opponent, t) {

    if (Math.random() < 0.2) { // defect randomly 20 % of the cases
      return 0;
    }

    // otherwise tit for tat

    else if (t < 1) {
      return 1; // cooperate round 0
    }

    else {
      return opponent[t-1]; // otherwise copy opponents strategy
    }
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {

  var patienceFedUp = false;

  function chooseAction(me, opponent, t) {

    if ( t == me.length-1)  {
      return 0;
    }

    if ( t == 0 ) {
      if (Math.random() < 0.50) {
        return 0;
      } else { 
        return 1;
      }
    } else if ( t < 3 ) {
      return opponent[t-1];
    }

  var threeLatest = opponent.slice(t-2, t);
  var nbrDefect = 0;

    for (var i=0; i<threeLatest.length; i++) {
      if (threeLatest[i] == 0) {
        nbrDefect++;
      }
    }

    if (nbrDefect == 3) {
      patienceFedUp = true;
    } else if (nbrDefect == 0) {
      patienceFedUp = false;
    }

    if ( nbrDefect >= 2 || patienceFedUp ){
      return 0;
    }
    else if ( nbrDefect == 0 ) {
      return 1;
    }
    else if (Math.random() < 0.3) { // if only one defect in three
      return 0;
    }
    else {
      return 1;
    }
  }

  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {

    if ( t == me.length-1)  {
      return 0;
    }

    // Defect and cooperate every second round

    if (t % 2 == 0) {
      return 1; // cooperate in first round
    } else {
      return 0;
    }

  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {
  // Slave strategy
  function chooseAction(me, opponent, t) {

    var patternForMaster = [0, 1, 1, 0, 0, 1, 1];
    var patternForSlave = [0, 0, 1, 0, 1, 1, 0];
    var patternFound = false;
    var startingArray = opponent.slice(0, 7);

    if ( t <= 6 ) {
      switch ( t ) {
        case 0: return 0;
        case 1: return 0;
        case 2: return 1;
        case 3: return 0;
        case 4: return 1;
        case 5: return 1;
        case 6: return 0;
      }
    }

    if ( t > 6 ) {
      for (var i=0; i <= 6; i++) {
        if ( startingArray[i] != patternForMaster[i] ) {
          patternFound =  false;
          break;
        } else {
          patternFound = true;
        }
      }

     if ( patternFound ) {
       return 1;
     } else {
       // otherwise play tit for tat
      return opponent[t-1];
     }
    }
  }
  return chooseAction;
}


strategies[cid + '200b'] = function () {
  // Master strategy
      function chooseAction(me, opponent, t) {

    var patternForMaster = [0, 1, 1, 0, 0, 1, 0];
    var patternForSlave = [0, 0, 1, 0, 1, 1, 1];
    var patternFound = false;
    var startingArray = opponent.slice(0, 7);

    if ( t <= 6  && t > 0 ) {

      for (var i=0; i < t; i++) {

        if ( startingArray[i] != patternForSlave[i] ) {
            return opponent[t-1];
        }
      }
    }

    if ( t <= 6  ) {
      switch ( t ) {
        case 0: return 0;
        case 1: return 1;
        case 2: return 1;
        case 3: return 0;
        case 4: return 0;
        case 5: return 1;
        case 6: return 1;
      }
    }

    if ( t > 6 ) {
      for (var i=0; i <= 6; i++) {
        if ( startingArray[i] != patternForSlave[i] ) {
          patternFound =  false;
          break;
        } else {
          patternFound = true;
        }
      }

     if ( patternFound ) { // defect slave
       return 0;
     }
     else {
      // otherwise play tit for tat
      if (t >= me.length -2) {
        // always defect last rounds
        return 0;
      } else {
        return opponent[t-1];
      }
     }
    }
  }
  return chooseAction;
}


strategies[cid + '200c'] = function () {
  // Slave strategy
    function chooseAction(me, opponent, t) {

    var patternForMaster = [0, 1, 1, 0, 0, 1, 1];
    var patternForSlave = [0, 0, 1, 0, 1, 1, 0];
    var patternFound = false;
    var startingArray = opponent.slice(0, 7);

    if ( t <= 6 ) {
      switch ( t ) {
        case 0: return 0;
        case 1: return 0;
        case 2: return 1;
        case 3: return 0;
        case 4: return 1;
        case 5: return 1;
        case 6: return 0;
      }
    }

    if ( t > 6 ) {
      for (var i=0; i <= 6; i++) {
        if ( startingArray[i] != patternForMaster[i] ) {
          patternFound =  false;
          break;
        } else {
          patternFound = true;
        }
      }

     if ( patternFound ) { // collaborate with master
       return 1;
     } else {
       // otherwise play tit for tat
      return opponent[t-1];
     }
    }
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {

  var defectNext = 0;
  function chooseAction(me, opponent, t) {
    // This code does the exact same thing as the 200c strategy, but
    // implemented in another way, which might appeal more or less
    // to your style of thinking/programming.

    if ( defectNext > 0 ) { // do not always defect
      if (Math.random() < 0.2){
        return 1;
      }
      else {
      defectNext -= 1;
      return 0;
      }
    }

    //Slice out the part of history between time 0 and time t.
    var maxDefects = 2;
    if (t < maxDefects) {
      return 1; // cooperate if there is no chance t >= maxDefects
    }

    function sum(array) {
      return array.reduce(function (a, b) { return a + b; });
    }

    // Each cooperate action contributes 1 to the sum
    if ( t >= 5 ) {
      var passedHistory = opponent.slice(t-5, t);
    } else {
      var passedHistory = opponent.slice(0, t);
    }
    var numCooperate = sum(passedHistory);
    var numDefects = passedHistory.length - numCooperate;

    if (numDefects >= maxDefects) {
      defectNext += numDefects;
      return 0; // Defect if opponent has defected at least maxDefect times
    }
    return 1; // Otherwise cooperate
  }

  return chooseAction;
}
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'felmatt';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat

    if (t == 0) {
      return 1; // cooperate in first round
    }

    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
     // Tit for tat w defect in end

    if (t == 0) {
      return 1; // cooperate in first round
    }
    if ( t > 9-3) {
      return 0; // defect in last three rounds
    }
    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
	//Alwayes defect, the "rational" choice
     return 0;
  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {
    var paired = false;
    var hostile = false;

  function chooseAction(me, opponent, t) {
     // Tit for tat w defect in end plus code. CODE: 101101111101 (winning one)
    var CODE = [1,0,1,1,0,1,1,1,1,1,0,1];
    if (t == 0) {
      return 1; // cooperate in first round
    }

    if (paired) return 0;  // winning one
	  if  (hostile == false) {
    ///*
    if (t == 1 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 1){
      hostile = true;
    }

    if (t == 2 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 2){
      hostile = true;
    }
    if (t == 3 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 3){
      hostile = true;
    }
    if (t == 4 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 4){
      hostile = true;
    }
    if (t == 5 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 5){
      hostile = true;
    }
    if (t == 6 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 6){
      hostile = true;
    }
    if (t == 7 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 7){
      hostile = true;
    }
    if (t == 8 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 8){
      hostile = true;
    }
    if (t == 9 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 9){
      hostile = true;
    }
    if (t == 10 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 10){
      hostile = true;
    }
    if (t == 11 && opponent[t-1] == CODE[t-1]) {
      paired=true;
      return CODE[t];
    } else if (t == 11){
      hostile = true;
    }

    if ( t > 199-5) {
      return 0; // defect in last five rounds
    }

    //*/
		}
    return opponent[t-1]; // otherwise copy opponent
   }
  return chooseAction;
}


strategies[cid + '200b'] = function () {
    var paired = false;
    var hostile = false;

  function chooseAction(me, opponent, t) {
     // Tit for tat w defect in end plus code. CODE: 101101111101 (Support one)
    var CODE = [1,0,1,1,0,1,1,1,1,1,0,1];
    if (t == 0) {
      return 1; // cooperate in first round
    }

    if (paired) return 1;
    if (hostile) return 0;
	  if  (hostile == false) {
    ///*
    if (t == 1 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 1){
      hostile = true;
    }

    if (t == 2 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 2){
      hostile = true;
    }
    if (t == 3 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 3){
      hostile = true;
    }
    if (t == 4 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 4){
      hostile = true;
    }
    if (t == 5 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 5){
      hostile = true;
    }
    if (t == 6 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 6){
      hostile = true;
    }
    if (t == 7 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 7){
      hostile = true;
    }
    if (t == 8 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 8){
      hostile = true;
    }
    if (t == 9 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 9){
      hostile = true;
    }
    if (t == 10 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 10){
      hostile = true;
    }
    if (t == 11 && opponent[t-1] == CODE[t-1]) {
      paired=true;
      return CODE[t];
    } else if (t == 11){
      hostile = true;
    }

    if ( t > 199-5) {
      return 0; // defect in last five rounds
    }

    //*/
		}
    return opponent[t-1]; // otherwise copy opponent
   }
  return chooseAction;
}


strategies[cid + '200c'] = function () {
    var paired = false;
    var hostile = false;

  function chooseAction(me, opponent, t) {
     // Tit for tat w defect in end plus code. CODE: 101101111101 (Support one)
    var CODE = [1,0,1,1,0,1,1,1,1,1,0,1];
    if (t == 0) {
      return 1; // cooperate in first round
    }

    if (paired) return 1;
    if (hostile) return 0;
	  if  (hostile == false) {
    ///*
    if (t == 1 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 1){
      hostile = true;
    }

    if (t == 2 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 2){
      hostile = true;
    }
    if (t == 3 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 3){
      hostile = true;
    }
    if (t == 4 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 4){
      hostile = true;
    }
    if (t == 5 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 5){
      hostile = true;
    }
    if (t == 6 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 6){
      hostile = true;
    }
    if (t == 7 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 7){
      hostile = true;
    }
    if (t == 8 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 8){
      hostile = true;
    }
    if (t == 9 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 9){
      hostile = true;
    }
    if (t == 10 && opponent[t-1] == CODE[t-1]) {
      return CODE[t];
    } else if (t == 10){
      hostile = true;
    }
    if (t == 11 && opponent[t-1] == CODE[t-1]) {
      paired=true;
      return CODE[t];
    } else if (t == 11){
      hostile = true;
    }

    if ( t > 199-5) {
      return 0; // defect in last five rounds
    }

    //*/
		}
    return opponent[t-1]; // otherwise copy opponent
   }
  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
function chooseAction(me, opponent, t) {
    // Tit for two tats

    if (t <= 1) {
      return 1; // cooperate round 0 and 1
    }

    if ( t > 199-5) {
      return 0; // defect in last five rounds
    }

    if (opponent[t-2] == 0 && opponent[t-1] == 0) {
      return 0; // defect if last two opponent moves were defect
    }

    return 1; // otherwise cooperate
  }
  return chooseAction;
}
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'nroman';

// Defect: action 0
// Cooperate: action 1

//tit with probability p, where p is the fraction of times other player defected, also taking into
//account the future plays which are always considered defected.
strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {

  	if(t==9) {
  		return 0;
  	}

    if (t==0) {
      return 0; // defect round 0
    }

    var coopAvg = opponent.reduce((a,b) => a + b, 0) / opponent.length
    var randNum = Math.random();

    if (randNum<coopAvg) {
      return 1;
    }

    return 0;
  }

  return chooseAction;
}

//3 tits for a tat
strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {

  	if(t==9) {
  		return 0;
  	}

    if (t <= 0) {
      return 0; // defect round 0
    }

    if (t==1){
      if (opponent[0] == 0) {
        return 0;
      }
      else {
        return 1
      }
    }

    if (t==2){
      if (opponent[0] == 0 || opponent[1] == 0) {
        return 0;
      }
      else {
        return 1
      }
    }

    if (t>2) {
      if (opponent[t-1] == 0 || opponent[t-2]==0 || opponent[t-3]==0) {
        return 0;
      }
      else {
        return 1
      }
    }

    return 0; // otherwise defect
  }

  return chooseAction;
}

//tit with probability p, where p is the fraction of times other player defected.
strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {

  	if (t == 9) {
      return 0; // defect round 0
    }

    if (t <= 0) {
      return 0; // defect round 0
    }

    var coopAvg = (opponent.slice(0,t).reduce((a,b) => a + b))/t;
    var randNum = Math.random();

    if (randNum<coopAvg) {
      return 1; // cooperate if random number is less than coopAvg
    }

    return 0; // otherwise defect
  }

  return chooseAction;
}

//tit with probability p, where p is the fraction of times other player defected, also taking into
//account the future plays which are always considered defected.
strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {

  	if(t==199) {
  		return 0;
  	}

    if (t <= 0) {
      return 0; // defect round 0
    }

    var coopAvg = opponent.reduce((a,b) => a + b, 0) / opponent.length
    var randNum = Math.random();

    if (randNum<coopAvg) {
      return 1;
    }

    return 0;
  }

  return chooseAction;
}

strategies[cid + '200b'] = function () {
  function chooseAction(me, opponent, t) {
    // Cooperate initially, but always defect if opponent has defected
    // more than 100 times in total

    if(t==199) {
  		return 0;
  	}

    var maxDefects = 100;
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
        return 0; // Defect if opponent has defected at least 10 times
      } else {
        return 1; // Otherwise cooperate
      }
    }
  }

  return chooseAction;
}

//3 tit for tat
strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {

  	if(t==199) {
  		return 0;
  	}

    if (t <= 0) {
      return 0; // defect round 0
    }

    if (t==1){
      if (opponent[0] == 0) {
        return 0;
      }
      else {
        return 1
      }
    }

    if (t==2){
      if (opponent[0] == 0 || opponent[1] == 0) {
        return 0;
      }
      else {
        return 1
      }
    }

    if (t>2) {
      if (opponent[t-1] == 0 || opponent[t-2]==0 || opponent[t-3]==0) {
        return 0;
      }
      else {
        return 1
      }
    }

    return 0; // otherwise defect
  }

  return chooseAction;
}

//tit with probability p, where p is the fraction of times other player defected, also taking into
//account the future plays which are always considered defected.
strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {

  	if (t == 199) {
      return 0; // defect round 0
    }

    if (t <= 0) {
      return 0; // defect round 0
    }

    var coopAvg = opponent.reduce((a,b) => a + b, 0) / 250
    var randNum = Math.random();

    if (randNum<coopAvg) {
      return 1;
    }

    return 0;
  }

  return chooseAction;
}
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'dez';

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


'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'daviols';

// Defect: action 0
// Cooperate: action 1

strategies[cid + '10a'] = function () {
    function chooseAction(me, opponent, t) {
    // Tit for tat, defect last round

    if (t <= 0) {
      return 1; // cooperate round 1
    }

    if (opponent[t-1] == 0) {
      return 0; // defect if last opponent move were defect
    }
    if (t >= 9){
      return 0;// defect if last round
    }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {
  	function chooseAction(me, opponent, t) {
    // Tit for tat, defect 2 last rounds

    if (t <= 0) {
      return 1; // cooperate round 1
    }

    if (opponent[t-1] == 0) {
      return 0; // defect if last opponent move were defect
    }
    if (t >= 8){
      return 0;// defect if second to last and last round
    }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {

	//Switch between c and d
    if (t % 2){
      return 0
    }

    return 1;
  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat, defect last round

    if (t <= 0) {
      return 1; // cooperate round 1
    }

    if (opponent[t-1] == 0) {
      return 0; // defect if last opponent move were defect
    }
    if (t >= 199){
      return 0;// defect if last round
    }

    return 1; // otherwise cooperate
  }
  return chooseAction;
}


strategies[cid + '200b'] = function () {
  	function chooseAction(me, opponent, t) {
    // Tit for tat, defect 2 last rounds

    if (t <= 0) {
      return 1; // cooperate round 1
    }

    if (opponent[t-1] == 0) {
      return 0; // defect if last opponent move were defect
    }
    if (t >= 198){
      return 0;// defect if second to last and last round
    }

    return 1; // otherwise cooperate
  }
  return chooseAction;
}


strategies[cid + '200c'] = function () {
	function chooseAction(me, opponent, t) {
 // Tit for tat, defect last rounds

    if (t <= 0) {
      return 1; // cooperate round 1
    }

    if (opponent[t-1] == 0) {
      return 0; // defect if last opponent move were defect
    }


	var maxDefects = 20;

    function sum(array) {
      return array.reduce(function (a, b) { return a + b; });
    }

    // Each cooperate action contributes 1 to the sum
    var passedHistory = opponent.slice(0, t);
    var numCooperate = sum(passedHistory);
    var numDefects = passedHistory.length - numCooperate;

    if (numDefects >= maxDefects) {
      return 0; // Defect if opponent has defected at least maxDefect times
    }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for 2 tats, defect last rounds

    if (t <= 0) {
      return 1; // cooperate round 1
    }

    if (opponent[t-2] == 0 && opponent[t-1] == 0) {
      return 0; // defect if last 2 opponent move were defect
    }

    if (!(me[t-1] == 0 || opponent[t-1] == 0) && ( Math . random () < (t-150)/50.0)){
      return 0;
    }


	var maxDefects = 20;

    function sum(array) {
      return array.reduce(function (a, b) { return a + b; });
    }

    // Each cooperate action contributes 1 to the sum
    var passedHistory = opponent.slice(0, t);
    var numCooperate = sum(passedHistory);
    var numDefects = passedHistory.length - numCooperate;

    if (numDefects >= maxDefects) {
      return 0; // Defect if opponent has defected at least maxDefect times
    }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}



'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'tommyph';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    var C = 0;
    var D = 0;
    if (t == 0) {
      return 0; // Deflect first round
    }

    if (opponent[t-1] == 1) {
      C = C + 1;
  	} else {
      D = D + 1;
    }
    if (C > D) {
      return 0; //If opponent cooperate more => deflect
    }
    if (C < D) {
      return 1; // If opponent deflected more => cooperate
    } else {
      return 0 // If tie, deflect
	}
}
  return chooseAction
}


strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
    var C = 0;
    var D = 0;
    if (t == 0) {
      return 1; // cooperate in first round
    }

    if (opponent[t-1] == 1) {
      C = C + 1;
  	} else {
      D = D + 1;
    }
    if (C > D) {
      return 0; // If opponent cooperate more => deflect
    }
    if (C < D) {
      return 1; // If opponent deflected more => cooperate
    } else {
      return 1 // If tie, cooperate
	}
}
  return chooseAction
}


strategies[cid + '10c'] = function () {
    function chooseAction(me, opponent, t) {
    // Tit for tate but deflect first and last round
    if (t == 0) {
      return 0;
    } else if (t == 9) {
      return 0;
    } else{
    	return opponent[t-1]; // otherwise copy opponent
    }
}

  return chooseAction;
}


strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    var C = 0;
    var D = 0;
    if (t == 0) {
      return 0; // deflect in first round
    }

    if (opponent[t-1] == 1) {
      C = C + 1;
  	} else {
      D = D + 1;
    }
    if (C > D) {
      return 1; // If opponent cooperate more => cooperate
    }
    if (C < D) {
      return 0; // If opponent deflected more => deflect
    } else {
      return 0 // If tie, deflect
	}
}
  return chooseAction
}


strategies[cid + '200b'] = function () {
  function chooseAction(me, opponent, t) {
    var C = 0;
    var D = 0;
    if (t == 0) {
      return 1; // Cooperate first round
    }

    if (opponent[t-1] == 1) {
      C = C + 1;
  	} else {
      D = D + 1;
    }
    if (C > D) {
      return 0; //If opponent cooperate more => deflect
    }
    if (C < D) {
      return 1; // If opponent deflected more => cooperate
    } else {
      return 0 // If tie, deflect
	}
}
  return chooseAction
}


strategies[cid + '200c'] = function () {
    function chooseAction(me, opponent, t) {
        var C = 0;
        var D = 0;
        if (t < 5) {
            return 0; // deflect the first 5 rounds
        }

        if (opponent[t-1] == 1) {
            C = C + 1;
      	} else {
            D = D + 1;
        }

        if (C/(C+D) > 0.75) {
            // If opponent has cooperated more than 75% => cooperate else => deflect
            return 1;
        } else {
            return 0;
    	}
    }
    return chooseAction
}


strategies[cid + '200mistakes'] = function () {
    function chooseAction(me, opponent, t) {
    var C = 0;
    var D = 0;
    var i;
    if (t < 5) {
        return 0; // deflect the first 5 rounds
    } else {
    // If the last 5 rounds from your opponent has atleast been 3/5 cooperate => cooperate; otherwise deflect
    	var sum = 0;
    	var avg = 0;
  		for (i = t - 5; i < t - 1; i++) {
  			sum += opponent[i];
            avg = sum/5;
  		}
      if (avg >= 0.6){
        return 1
      } else {
        return 0
      }
    }
  }
  return chooseAction
}

'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}


cid = 'arao';



strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
     // defect in the last two

    if (t == 0) {
      return 1;
    }

    else if (t == 8 || t == 9) {
		return 0;
    }


    return opponent[t-1];
  }

  return chooseAction;
}

strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
     // defect in last round

    if (t == 0) {
      return 1;
    }

    else if (t == 9) {
		return 0;
    }


    return opponent[t-1];
  }

  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
     // defect in second round

    if (t == 0) {
      return 1;
    }

    else if (t == 1) {
		return 0;
    }


    return opponent[t-1];
  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
     // defect in the last two

    if (t == 0) {
      return 1;
    }

    else if (t == 198 || t == 199) {
		return 0;
    }


    return opponent[t-1];
  }

  return chooseAction;
}


strategies[cid + '200b'] = function () {
  function chooseAction(me, opponent, t) {
     // defect in last round

    if (t == 0) {
      return 1;
    }

    else if (t == 199) {
		return 0;
    }


    return opponent[t-1];
  }

  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
     // defect in second round

    if (t == 0) {
      return 1;
    }

    else if (t == 1) {
		return 0;
    }


    return opponent[t-1];
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {
     // defect in the last two

    if (t == 0) {
      return 1;
    }

    else if (t == 198 || t == 199) {
		return 0;
    }


    return opponent[t-1];
  }

  return chooseAction;
}

'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'vikren';

// Defect: action 0
// Cooperate: action 1


/*
strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    // Always defect
    return 0;
  }

  return chooseAction;
}
*/

strategies[cid + '10a'] = function () {
  var against_self_a;
  var against_self_b;
  var against_Tf2T;
  function chooseAction(me, opponent, t) {
    // Modified tit for tat

    // Start with defect
    if (t == 0) {
      against_self_a = false;
      against_self_b = false;
      against_Tf2T = false;
      return 0;
    }

    // If other start with defect check if mine strategy
    if (opponent[0] == 0){
      if (t == 1) {
        return 0;
      }
      // If other play same pattern assume playing against self
      if (t == 2 && opponent[t-1] == 0) {
        against_self_a = true;
        return 1;
      }
      if (against_self_a === true) {
        if (opponent[t-1] == 0) {
          against_self_a = false;  // Not against a
          return 0;
        }
        return 1;
      }
      // If other play known pattern assume playing against self
      if (t == 2 && opponent[t-1] == 1) {
        against_self_b = true;
        return 0;
      }
      if (against_self_b === true) {
        if (opponent[t-1] == 0) {
          against_self_b = false;  // Not against b or c
          return 0;
        }
        return 0;
      }
    }
    // If not first was defect
    if (t == 1) {
      return 1;
    }
    if (t == 2) {
      if (opponent[t-1] == 1) {
        against_Tf2T = true;
        return 0;
      }
      return 1;
    }
    // If not against self_a and near end
    if (t > 7) {
        return 0;
    }
    // If against Tf2T
    if (against_Tf2T === true) {
      //console.log('-------')
      //console.log(t)
      //console.log(opponent[t-1])
      //console.log(me[t-1])
      if (opponent[t-1] == 0 && (
        me[t-1] == 1 || me[t-2] == 1
      )) { // If seems not to be Tf2T
        against_Tf2T = false;
        return 0;
      } // Else exploit Tf2T
    return (me[t-1] == 1 ? 0 : 1);
    }

    // Else tit for tat
    if (opponent[t-1] == 0) {
      return 0;
    }
    return 1;
  }
  return chooseAction;
}

/*
strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
    // Always cooperate
    return 1;
  }

  return chooseAction;
}
*/

strategies[cid + '10b'] = function () {
  var against_self_a;
  function chooseAction(me, opponent, t) {
    // Modified tit for tat

    // Start with defect
    if (t == 0) {
      against_self_a = false;
      return 0;
    }

    // If other start with defect check if mine strategy
    if (opponent[0] == 0){
      if (t == 1) {
        return 1;
      }
      // If other play known pattern assume playing against self
      if (t == 2 && opponent[t-1] == 0) {
        against_self_a = true;
        return 1;
      }
      if (against_self_a === true) {
        if (opponent[t-1] == 1) {
          against_self_a = false;  // Not against a
          return 0;
        }
        return 1;  // Sucks against always defect
      }
    }
    // If not against a, defect
    return 0;
  }
  return chooseAction;
}

/*
strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat

    if (t == 0) {
      return 1; // cooperate in first round
    }

    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}
*/


strategies[cid + '10c'] = function () {
  var against_self_a;
  function chooseAction(me, opponent, t) {
    // Modified tit for tat

    // Start with defect
    if (t == 0) {
      against_self_a = false;
      return 0;
    }

    // If other start with defect check if mine strategy
    if (opponent[0] == 0){
      if (t == 1) {
        return 1;
      }
      // If other play known pattern assume playing against self
      if (t == 2 && opponent[t-1] == 0) {
        against_self_a = true;
        return 1;
      }
      if (against_self_a === true) {
        if (opponent[t-1] == 1) {
          against_self_a = false;  // Not against a
          return 0;
        }
        return 1;  // Sucks against always defect
      }
    }
    // If not against a, defect
    return 0;
  }
  return chooseAction;
}

/*
strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for two tats

    if (t <= 1) {
      return 1; // cooperate round 0 and 1
    }

    if (opponent[t-2] == 0 && opponent[t-1] == 0) {
      return 0; // defect if last two opponent moves were defect
    }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}


strategies[cid + '200b'] = function () {
  // evil is a state variable for this strategy.
  // The initialization code ('var evil = false;'') will be run
  // before each game, so the variable evil will always equal
  // false when the game starts.

  var evil = false; // start out as not evil

  function chooseAction(me, opponent, t) {
    // This strategy uses the state variable 'evil'.
    // In every round, turn evil with 5% probability.
    // (And remain evil until the 200 rounds are over.)
    if (Math.random() < 0.05) {
      evil = true;
    }

    // If evil, defect
    if (evil) return 0;

    return 1; // and cooperate otherwise
  }
  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    // Cooperate initially, but always defect if opponent has defected
    // more than 10 times in total

    var maxDefects = 10;
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
        return 0; // Defect if opponent has defected at least 10 times
      } else {
        return 1; // Otherwise cooperate
      }
    }
  }

  return chooseAction;
}
*/

strategies[cid + '200a'] = function () {
  var against_self_a;
  var against_self_b;
  var against_Tf2T;
  function chooseAction(me, opponent, t) {
    // Modified tit for tat

    // Start with defect
    if (t == 0) {
      against_self_a = false;
      against_self_b = false;
      against_Tf2T = false;
      return 0;
    }

    // If other start with defect check if mine strategy
    if (opponent[0] == 0){
      if (t == 1) {
        return 0;
      }
      // If other play same pattern assume playing against self
      if (t == 2 && opponent[t-1] == 0) {
        against_self_a = true;
        return 1;
      }
      if (against_self_a === true) {
        if (opponent[t-1] == 0) {
          against_self_a = false;  // Not against a
          return 0;
        }
        return 1;
      }
      // If other play known pattern assume playing against self
      if (t == 2 && opponent[t-1] == 1) {
        against_self_b = true;
        return 0;
      }
      if (against_self_b === true) {
        if (opponent[t-1] == 0) {
          against_self_b = false;  // Not against b or c
          return 0;
        }
        return 0;
      }
    }
    // If not first was defect
    if (t == 1) {
      return 1;
    }
    if (t == 2) {
      if (opponent[t-1] == 1) {
        against_Tf2T = true;
        return 0;
      }
      return 1;
    }
    // If not against self_a and near end
    if (t > 197) {
        return 0;
    }
    // If against Tf2T
    if (against_Tf2T === true) {
      if (opponent[t-1] == 0 && (
        me[t-1] == 1 || me[t-2] == 1
      )) { // If seems not to be Tf2T
        against_Tf2T = false;
        return 0;
      } // Else exploit Tf2T
    return (me[t-1] == 1 ? 0 : 1);
    }

    // Else tit for tat
    if (opponent[t-1] == 0) {
      return 0;
    }
    return 1;
  }
  return chooseAction;
}

strategies[cid + '200b'] = function () {
  var against_self_a;
  function chooseAction(me, opponent, t) {
    // Only nice against a

    // Start with defect
    if (t == 0) {
      against_self_a = false;
      return 0;
    }

    // If other start with defect check if mine strategy
    if (opponent[0] == 0){
      if (t == 1) {
        return 1;
      }
      // If other play known pattern assume playing against self
      if (t == 2 && opponent[t-1] == 0) {
        against_self_a = true;
        return 1;
      }
      if (against_self_a === true) {
        if (opponent[t-1] == 1) {
          against_self_a = false;  // Not against a
          return 0;
        }
        return 1;  // Sucks against always defect
      }
    }
    // If not against a, defect
    return 0;
  }
  return chooseAction;
}
strategies[cid + '200c'] = function () {
  var against_self_a;
  function chooseAction(me, opponent, t) {
    // Only nice against a

    // Start with defect
    if (t == 0) {
      against_self_a = false;
      return 0;
    }

    // If other start with defect check if mine strategy
    if (opponent[0] == 0){
      if (t == 1) {
        return 1;
      }
      // If other play known pattern assume playing against self
      if (t == 2 && opponent[t-1] == 0) {
        against_self_a = true;
        return 1;
      }
      if (against_self_a === true) {
        if (opponent[t-1] == 1) {
          against_self_a = false;  // Not against a
          return 0;
        }
        return 1;  // Sucks against always defect
      }
    }
    // If not against a, defect
    return 0;
  }
  return chooseAction;
}

strategies[cid + '200mistakes'] = function () {
  var against_self;
  var against_Tf2T;
  var show_log = false;
  function chooseAction(me, opponent, t) {
    function sum(previousValue, currentValue) {
      return previousValue + currentValue;
    }
    // Start of game play known pattern
    if (t == 0) {
      against_self = false;
      against_Tf2T = false;
      return 0;
    }
    if (t == 1) {
      return 1;
    }
    if (t == 2) {
        return 1;
    }
    if (t == 3) {
        return 0;
    }
    if (t == 4) {
        return 1;
    }
    // Evaluate opponents response to pattern
    if (t == 5 && (
      (opponent[t-5] == 0 && opponent[t-4] == 1 && opponent[t-3] == 1 && opponent[t-2] == 0) ||
      (opponent[t-5] == 0 && opponent[t-4] == 1 && opponent[t-3] == 1 && opponent[t-1] == 1) ||
      (opponent[t-5] == 0 && opponent[t-4] == 1 && opponent[t-2] == 0 && opponent[t-1] == 1) ||
      (opponent[t-5] == 0 && opponent[t-3] == 1 && opponent[t-2] == 0 && opponent[t-1] == 1) ||
      (opponent[t-4] == 1 && opponent[t-3] == 1 && opponent[t-2] == 0 && opponent[t-1] == 1)
    )) {
      against_self = true;
      return 1;
    }
    if (t == 5 && (
        (opponent[t-4] == 1 && opponent[t-3] == 1 && opponent[t-2] == 1) ||
      (opponent[t-4] == 1 && opponent[t-3] == 1 && opponent[t-1] == 1) ||
      (opponent[t-4] == 1 && opponent[t-2] == 1 && opponent[t-1] == 1) ||
      (opponent[t-3] == 1 && opponent[t-2] == 1 && opponent[t-1] == 1)
    )) {
      against_Tf2T = true;
    }
    if (show_log) {
      console.log(t)
      console.log(against_self)
    }
    // Playing against self?
    if (against_self && t > 10 && (
      opponent[t-5] + opponent[t-4] + opponent[t-3]
      + opponent[t-2] + opponent[t-1] < 4
    )) {
      against_self = false;
    }
    if (against_self) {
        return 1;
    }
    // If near end
    if (t > 197) {
        return 0;
    }
    // Against Tf2T?
    if (against_Tf2T && t > 10 && (
      (opponent[t-5] + opponent[t-4] + opponent[t-3]
       + opponent[t-2] + opponent[t-1] <= 3) && (
        (me[t-2] == 1 || me[t-3] == 1) &&
        (me[t-3] == 1 || me[t-4] == 1) &&
        (me[t-4] == 1 || me[t-5] == 1) &&
        (me[t-5] == 1 || me[t-6] == 1) &&
        (me[t-6] == 1 || me[t-7] == 1)
      )
    )){
      // If I follow pattern but opponent still plays atleast two defect
      against_Tf2T = false
    }
    if (against_Tf2T) {
      return (me[t-1] == 1 ? 0 : 1);
    }

    // If opponent almost always defects
    if (t > 20 && (
      opponent[t-8] + opponent[t-7] + opponent[t-6] + opponent[t-5]
      + opponent[t-4] + opponent[t-3] + opponent[t-2] + opponent[t-1] < 2
    )) {
        return 0;
    }

    // Strategy from lecture
    if ((opponent[t-1] == 0 ? me[t-1] == 1 : me[t-1] == 0)) {
      console.log("Strat")
      console.log(opponent[t-1])
      console.log(me[t-1])
      return 0; // defect if opponent xor me defected last round
    }
    if (
      (opponent[t-2] == 0 ? me[t-2] == 1 : me[t-2] == 0) && // opp xor me defect
      (opponent[t-1] == 0 && me[t-1] == 0)                  // opp and me defect
    ) {
      return 0;
    }
    if (
      (opponent[t-2] == 0 && me[t-2] == 0) && // opp and me defect
      (opponent[t-1] == 0 && me[t-1] == 0)    // opp and me defect
    ) {
      return 1;
    }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}

/*
strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {
    // This code does the exact same thing as the 200c strategy, but
    // implemented in another way, which might appeal more or less
    // to your style of thinking/programming.

    //Slice out the part of history between time 0 and time t.
    var maxDefects = 10;
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
      return 0; // Defect if opponent has defected at least maxDefect times
    }

    return 1; // Otherwise cooperate
  }

  return chooseAction;
}
*/
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'mattsjo';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    // Always defect
    return 0;
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {

  // Randomly select which round to start to defect (round 5 to 9)
  var roundToDefect = 5 + Math.floor((Math.random() * 5.0));
  function chooseAction(me, opponent, t) {
    if (t == 0) {
      return 1; // cooperate in first round
    }

    if (t < roundToDefect) {
      return opponent[t-1]; // otherwise copy opponent
    }

    return 0
  }

  return chooseAction;
}


strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat

    if (t == 0) {
      return 1; // cooperate in first round
    }

    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat

    if (t == 0) {
      return 1; // cooperate in first round
    }

    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}


strategies[cid + '200b'] = function () {
  // Randomly select which round to start to defect (round 150 to 199)
  var roundToDefect = 150 + Math.floor((Math.random() * 50));
  function chooseAction(me, opponent, t) {
    if (t == 0) {
      return 1; // cooperate in first round
    }

    if (t < roundToDefect) {
      return opponent[t-1]; // otherwise copy opponent
    }

    return 0
  }

  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    // Always defect
    return 0;
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
  var timesToForgive = 4;
  function chooseAction(me, opponent, t) {
    // Tit for tat with forgiveness

    if (t == 0) {
      return 1; // cooperate in first round
    }


    if (me[t-1] == 0 && me[t-2] == 0 && opponent[t-1] == 0 && opponent[t-2] == 0 && timesToForgive > 0) {
      // Attempt to forgive
      timesToForgive -= 1;
      return 1;
    } else {
      return opponent[t-1]; // otherwise copy opponent
    }
  }

  return chooseAction;
}
'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'svar';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  // Tit for tats, betrayal in last two rounds

  function chooseAction(me, opponent, t) {

    if (t ==0 ) {
      return 1; // cooperate round 0
    }

    if (t >= 8 ) // defect in last two rounds
    {
      return 0;
    }

    if ( opponent[t-1] == 0) {
      return 0; // defect if last opponent move was defect
    }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {

  var lackeyFound = false;

  function chooseAction(me, opponent, t) {
    // Team for all

    if (t <= 2) // Signal lackey
    {
      switch(t)
      {
        case 0:
          return 0;
          break;
        case 1:
          return 0;
          break;
        case 2:
          return 1;
          break;
        default:
          // Should never reach this.
      }
    }

    if(t == 3)
    {
      if( (opponent[0] == 0) && (opponent[1] == 1) && (opponent[2] == 0) )
      {
        lackeyFound = true;
      }
    }

    if(lackeyFound)
    {
      // Found lackey, can be as selfish as possible.
      return 0;
    }
    else
    {
      // Playing with a regular player, tit for tat most optimal, betray in second to last round
      if(t < 8)
      {
        return opponent[t-1];
      }
      else
      {
        return 0;
      }
    }
  }

  return chooseAction;
}


strategies[cid + '10c'] = function () {

  var masterFound = false;

  function chooseAction(me, opponent, t) {
    // Lackey, Point giver

    if (t <= 2) // Signal master
    {
      switch(t)
      {
        case 0:
          return 0;
          break;
        case 1:
          return 1;
          break;
        case 2:
          return 0;
          break;
        default:
          // Should never reach this.
      }
    }

    if(t == 3)
    {
      if( (opponent[0] == 0) && (opponent[1] == 0) && (opponent[2] == 1) )
      {
        masterFound = true;
      }
    }

    if( masterFound ) // Only cooperate if master is found
    {
      return 1;
    }
    else
    {
      return 0;
    }
  }

  return chooseAction;
}


strategies[cid + '200a'] = function () {

  var masterFound = true;
  var lackeyFound = true;
  var arrayLength = 8;
  var masterPassword = [0, 0, 1, 1, 0, 1, 1, 1]; // Array of length 8
  var lackeyPassword = [0, 1, 0, 1, 1, 0, 0, 1];

  function chooseAction(me, opponent, t) {
    // This is lackey

    if (t < arrayLength) { // Enter the password
      return lackeyPassword[t];
    }

    if (t == arrayLength )
    {
      var i;
      for(i = 0; i < arrayLength; i++)
      {
        if (opponent[i] != masterPassword[i])
        {
          masterFound = false;
        }
        if (opponent[i] != lackeyPassword[i])
        {
          lackeyFound = false;
        }
      }
    }

    if( masterFound || lackeyFound)
    {
      return 1;
    }
    else
    {
      return 0;
    }
  }
  return chooseAction;
}


strategies[cid + '200b'] = function () {
  // This is master

  var lackeyFound = true;
  var arrayLength = 8;
  var masterPassword = [0, 0, 1, 1, 0, 1, 1, 1]; // Array of length 8
  var lackeyPassword = [0, 1, 0, 1, 1, 0, 0, 1];

  function chooseAction(me, opponent, t) {
    // Tit for two tats

    if (t < arrayLength) { // Enter the password
      return masterPassword[t];
    }

    if (t == arrayLength )
    {
      var i;
      for(i = 0; i < arrayLength; i++)
      {
        if (opponent[i] != lackeyPassword[i])
        {
          lackeyFound = false;
        }
      }
    }

    if(lackeyFound)
    {
      // Found lackey, can be as selfish as possible.
      return 0;
    }
    else
    {
      // Playing with a regular player, tit for tat most optimal
      if(t >= 198)
      {
        return 0; // Betray in last two rounds
      }

      return opponent[t-1];
    }
  }

  return chooseAction;
}

strategies[cid + '200c'] = function () {
  // This is lackey

  var masterFound = true;
  var lackeyFound = true;
  var arrayLength = 8;
  var masterPassword = [0, 0, 1, 1, 0, 1, 1, 1]; // Array of length 8
  var lackeyPassword = [0, 1, 0, 1, 1, 0, 0, 1];

  function chooseAction(me, opponent, t) {
    // This is lackey

    if (t < arrayLength) { // Enter the password
      return lackeyPassword[t];
    }

    if (t == arrayLength )
    {
      var i;
      for(i = 0; i < arrayLength; i++)
      {
        if (opponent[i] != masterPassword[i])
        {
          masterFound = false;
        }
        if (opponent[i] != lackeyPassword[i])
        {
          lackeyFound = false;
        }
      }
    }

    if( (t > arrayLength + 5) && (opponent[t-1] == 0) )
    {
      // Check if it fellow lackey is true lackey.
      // Curious if someone happens to do the correct sequence.
      // Only added to one of the lackeys because that is interesting.
      lackeyFound = false;
    }


    if( masterFound || lackeyFound)
    {
      return 1;
    }
    else
    {
      return 0;
    }
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {

  var trust = true;
  var brokenTrust = false;
  var numBreach = 0;
  var maxBreach = 25; // How often mistakes can occur before they become suspect

  function chooseAction(me, opponent, t) {

    if (t < 1)
    {
      return 1;
    }

    if (t >= 198)
    {
      return 0;
    }


    if(numBreach > maxBreach)
    {
      brokenTrust = true;
    }

    if (brokenTrust)
    {
      return 0;
    }


    if ( trust )
    {
      if( opponent[t-1] != 1 )
      {
        trust = false;
        numBreach++;
      }
    }
    else
    {
      if ( me[t-1] == 1 && opponent[t-1] == 1 )
      {
        trust = true;
      }

      if ( t >= 3 && opponent[t-1] == 0 && opponent[t-2] == 0 && opponent[t-3] == 0
        && me[t-1] == 1 && me[t-2] == 1 && me[t-3] == 1)
      {
        // Opponent defected for too long while I was tolerant, cannot trust him
        brokenTrust = true;
        return 0;
      }
    }

    return 1;
  }

  return chooseAction;
}

'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'baren';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
  var isResponding = false;
  var retaliations = 0;
  var betrayals = 0;	// keeps track of #betrayals
  var appeasements = 0;


  function chooseAction(me, opponent, t) {
    // Gradual retaliation. Yes, I totally copied this strategy from Beaufils & Delahaye, 1996.
   	// cooperate in round 0
    if (t <= 0) {
      return 1;
    }

    // if not responding to betrayal, check for one
		if (isResponding == false) {
      if (opponent[t-1] == 0) {						// if I was just betrayed, then setup my retaliation
        betrayals = betrayals + 1;				// keep track of opponent's betrayals
        retaliations = betrayals;					// retaliate as many times as ive been betrayed so far
        appeasements = 2									// setup two appeasement moves after I'm done to appease my opponent once I've retaliated.
        isResponding = true								// start retaliating (triggering next if-statement)
      }
    }

    // if retaliating
    if (isResponding == true) {
      if (retaliations > 0) {
        retaliations = retaliations - 1; 	// retaliate with defect as long as retaliations != 0
        return 0
      } else if (appeasements > 0) {
        appeasements = appeasements - 1;	// otherwise check if I've done my appeasement actions. if not, do one.
        return 1
      } else {
        isResponding = false;
      }
    }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}

strategies[cid + '10b'] = function () {
  var coops = 0;
  var betrayals = 0;
  var r = 0;
  var threshold = 0;

  function chooseAction(me, opponent, t) {
    //this function matches the betrayal rate of the opponent.
    r = Math.random();
    threshold = coops/(coops+betrayals);
  	if (r < threshold) {
      return 1
    } else {
      return 0
    }
  }

  return chooseAction;
}

strategies[cid + '10c'] = function () {
  var betrayals = 0;
  var rounds = 0;
  var threshold = 0.25;
  var ratio = 0;

  function chooseAction(me, opponent, t) {
    //this function plays defect when the betrayal ratio of the opponent crosses 0.25, but starts cooperating when it drops below.
    rounds = rounds + 1;
    if (opponent[t-1] == 0) {
      betrayals = betrayals + 1;
    }

		ratio = betrayals / rounds;

  	if (ratio < threshold) {
      return 1
    } else {
      return 0
    }
  }

  return chooseAction;
}

strategies[cid + '200a'] = function () {
var isResponding = false;
  var retaliations = 0;
  var betrayals = 0;											// keeps track of the # of times i've been betrayed (when not retaliating)
  var appeasements = 0;


  function chooseAction(me, opponent, t) {
    // Gradual retaliation. Yes, I totally copied this strategy from Beaufils & Delahaye, 1996.
   	// cooperate in round 0
    if (t <= 0) {
      return 1;
    }

    // if not responding to betrayal, check for one
		if (isResponding == false) {
      if (opponent[t-1] == 0) {						// if I was just betrayed, then setup my retaliation
        betrayals = betrayals + 1;				// keep track of opponent's betrayals
        retaliations = betrayals;					// retaliate as many times as ive been betrayed so far
        appeasements = 2									// setup two appeasement moves after I'm done to appease my opponent once I've retaliated.
        isResponding = true								// start retaliating (triggering next if-statement)
      }
    }

    // if retaliating
    if (isResponding == true) {
      if (retaliations > 0) {
        retaliations = retaliations - 1; 	// retaliate with defect as long as retaliations != 0
        return 0
      } else if (appeasements > 0) {
        appeasements = appeasements - 1;	// otherwise check if I've done my appeasement actions. if not, do one.
        return 1
      } else {
        isResponding = false;
      }
    }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}

strategies[cid + '200b'] = function () {
    var coops = 0;
  var betrayals = 0;
  var r = 0;
  var threshold = 0;

  function chooseAction(me, opponent, t) {
    //this function matches the betrayal rate of the opponent.
    r = Math.random();
    threshold = coops/(coops+betrayals);
  	if (r < threshold) {
      return 1
    } else {
      return 0
    }
  }

  return chooseAction;
}

strategies[cid + '200c'] = function () {
  var betrayals = 0;
  var rounds = 0;
  var threshold = 0.25;
  var ratio = 0;

  function chooseAction(me, opponent, t) {
    //this function plays defect when the betrayal ratio of the opponent crosses 0.25, but starts cooperating when it drops below.
    rounds = rounds + 1;
    if (opponent[t-1] == 0) {
      betrayals = betrayals + 1;
    }

		ratio = betrayals / rounds;

  	if (ratio < threshold) {
      return 1
    } else {
      return 0
    }
  }

  return chooseAction;
}

strategies[cid + '200mistakes'] = function () {
  var isResponding = false;
  var retaliations = 0;
  var betrayals = 0;	// keeps track of #betrayals
  var appeasements = 0;


  function chooseAction(me, opponent, t) {
    // Gradual retaliation. Yes, I totally copied this strategy from Beaufils & Delahaye, 1996.
   	// cooperate in round 0
    if (t <= 0) {
      return 1;
    }

    // if not responding to betrayal, check for one
		if (isResponding == false) {
      if (opponent[t-1] == 0) {						// if I was just betrayed, then setup my retaliation
        betrayals = betrayals + 1;				// keep track of opponent's betrayals
        retaliations = betrayals;					// retaliate as many times as ive been betrayed so far
        appeasements = 2									// setup two appeasement moves after I'm done to appease my opponent once I've retaliated.
        isResponding = true								// start retaliating (triggering next if-statement)
      }
    }

    // if retaliating
    if (isResponding == true) {
      if (retaliations > 0) {
        retaliations = retaliations - 1; 	// retaliate with defect as long as retaliations != 0
        return 0
      } else if (appeasements > 0) {
        appeasements = appeasements - 1;	// otherwise check if I've done my appeasement actions. if not, do one.
        return 1
      } else {
        isResponding = false;
      }
    }

    return 1; // otherwise cooperate
  }

  return chooseAction;
}

'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'danvik';

// Defect: action 0
// Cooperate: action 1


strategies[cid + '10a'] = function () {
    function multiply(a, b) {
        var aNumRows = a.length, aNumCols = a[0].length,
            bNumRows = b.length, bNumCols = b[0].length,
            m = new Array(aNumRows);  // initialize array of rows
        for (var r = 0; r < aNumRows; ++r) {
            m[r] = new Array(bNumCols); // initialize the current row
            for (var c = 0; c < bNumCols; ++c) {
                m[r][c] = 0;             // initialize the current cell
                for (var i = 0; i < aNumCols; ++i) {
                    m[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return m;
    }

    function add(a, b) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var r = 0; r < aNum; ++r) {
            m[r] = a[r] + b[r];
        }
        return m;
    }

    function relu(a) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var i = 0; i < aNum; ++i) {
            if (a[i] > 0) {
                m[i] = a[i];
            }
            else {
                m[i] = 0;
            }
        }
        return m
    }

    var w_i = [[-0.43114924, -0.68904835, -0.7493105, 0.59035844, -0.08409844],
         [0.8853383, -0.18242037, 0.6293054, 0.59547913, 0.04082204],
         [-0.830506, 0.10064453, -0.2410457, -0.06862295, 0.28393838]];
    var b_i = [0.16340812, 0., 0.31726614, -0.02857402, -0.00062121];

    var w_h = [[-0.2534273, -0.4125906, 0.3342737, -0.41930482, 0.7251139],
         [-0.28379044, -0.6259913, -0.6183428, 0.6976577, 0.05609012],
         [0.1576423, -0.1722346, 0.6092951, -0.03988516, 0.49990255],
         [-0.41008654, -0.5566756, 0.10345814, -0.03397975, -0.25001574],
         [0.5852867, 0.42669222, -0.7685275, 0.18136495, 0.2231927]];
    var b_h = [-0.0308113, -0.00506023, 0.04668283, -0.05261379, 0.17484848];

    var w_o = [[-0.3239136, -0.2997618],
         [-0.36314043, -0.56421983],
         [0.7582886, 0.11264236],
         [0.35379624, 0.1653563],
         [-0.5021472, -0.92206466]];
    var b_o = [-2.1605825, 2.1605825];
  function chooseAction(me, opponent, t) {
      if (t <= 3) {
          if (t <= 1) {
              return 1; // cooperate round 0 and 1
          }
          if (opponent[t - 2] == 0 && opponent[t - 1] == 0) {
              return 0; // defect if last two opponent moves were defect
          }

          return 1; // otherwise cooperate
      }
      else {
          var input = new Array(3);
          for (var i = 0; i < 3; ++i) {
              input[i] = opponent[t - 3 + i];
          }
          var x_0 = multiply(input, w_i);
          var x_1 = add(x_0, b_i);
          var x_2 = relu(x_1);
          var x_3 = multiply(x_2, w_h);
          var x_4 = add(x_3, b_h);
          var x_5 = relu(x_4);
          var x_6 = multiply(x_5, w_o);
          var x_7 = add(x_6, b_o);
      }
      if (x_7[0] > x_7[1]) return 1;
      else return 0;
  }

  return chooseAction;
}


strategies[cid + '10b'] = function () {
    function multiply(a, b) {
        var aNumRows = a.length, aNumCols = a[0].length,
            bNumRows = b.length, bNumCols = b[0].length,
            m = new Array(aNumRows);  // initialize array of rows
        for (var r = 0; r < aNumRows; ++r) {
            m[r] = new Array(bNumCols); // initialize the current row
            for (var c = 0; c < bNumCols; ++c) {
                m[r][c] = 0;             // initialize the current cell
                for (var i = 0; i < aNumCols; ++i) {
                    m[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return m;
    }

    function add(a, b) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var r = 0; r < aNum; ++r) {
            m[r] = a[r] + b[r];
        }
        return m;
    }

    function relu(a) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var i = 0; i < aNum; ++i) {
            if (a[i] > 0) {
                m[i] = a[i];
            }
            else {
                m[i] = 0;
            }
        }
        return m
    }

    var w_i = [[-0.3808658, -0.77546436, 0.09038719, -0.7885977, -0.71531796],
         [-0.4467883, -0.24855685, -0.3421106, -0.45065162, 0.78598285],
         [0.8607636, -0.30578083, 0.89565676, 0.47308815, 0.78243554]];
    var b_i = [-0.00096451, 0., 0.14890654, -0.01233928, 0.10294676];

    var w_h = [[0.19101396, -0.4578724, -0.63422, -0.6187764, 0.00484575],
         [-0.37660936, -0.00416064, 0.28786516, 0.16863948, 0.2510934],
         [0.1771092, -0.45590612, 0.03494754, 0.6957282, -0.27121633],
         [-0.5385939, -0.57696825, -0.59243786, -0.37214163, 0.75898105],
         [0.73100203, -0.10924238, -0.06889446, 0.79645956, -0.0906157]];
    var b_h = [0.09491813, 0., -0.02153948, 0.13141681, -0.01525748];

    var w_o = [[0.843356, -0.09472439],
         [0.7935103, 0.06604171],
         [0.23292537, -0.27830622],
         [0.35469887, 0.11123542],
         [0.6524895, 0.02552803]];
    var b_o = [0.10988428, -0.10988434];
  function chooseAction(me, opponent, t) {
      if (t <= 3) {
          if (t <= 1) {
              return 1; // cooperate round 0 and 1
          }
          if (opponent[t - 2] == 0 && opponent[t - 1] == 0) {
              return 0; // defect if last two opponent moves were defect
          }

          return 1; // otherwise cooperate
      }
      else {
          var input = new Array(3);
          for (var i = 0; i < 3; ++i) {
              input[i] = opponent[t - 3 + i];
          }
          var x_0 = multiply(input, w_i);
          var x_1 = add(x_0, b_i);
          var x_2 = relu(x_1);
          var x_3 = multiply(x_2, w_h);
          var x_4 = add(x_3, b_h);
          var x_5 = relu(x_4);
          var x_6 = multiply(x_5, w_o);
          var x_7 = add(x_6, b_o);
      }
      if (x_7[0] > x_7[1]) return 1;
      else return 0;
  }

  return chooseAction;
}


strategies[cid + '10c'] = function () {
    function multiply(a, b) {
        var aNumRows = a.length, aNumCols = a[0].length,
            bNumRows = b.length, bNumCols = b[0].length,
            m = new Array(aNumRows);  // initialize array of rows
        for (var r = 0; r < aNumRows; ++r) {
            m[r] = new Array(bNumCols); // initialize the current row
            for (var c = 0; c < bNumCols; ++c) {
                m[r][c] = 0;             // initialize the current cell
                for (var i = 0; i < aNumCols; ++i) {
                    m[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return m;
    }

    function add(a, b) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var r = 0; r < aNum; ++r) {
            m[r] = a[r] + b[r];
        }
        return m;
    }

    function relu(a) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var i = 0; i < aNum; ++i) {
            if (a[i] > 0) {
                m[i] = a[i];
            }
            else {
                m[i] = 0;
            }
        }
        return m
    }

    var w_i = [[-0.47215962, 0.45560056, 0.554664, -0.48781177, -0.28469595],
         [-0.00651569, -0.7204598, 0.107696, -0.45188692, 0.37716624],
         [0.23942804, -0.20095146, -0.34833494, -0.40109226, -0.8363035]];
    var b_i = [-0.01961475, -0.01240001, 0.00238691, 0., -0.01216262];

    var w_h = [[0.1705434, 0.411133, -0.52538985, -0.75282735, -0.44636306],
         [-0.279975, 0.20193714, -0.1367658, 0.7846535, 0.5013349],
         [-0.6602653, -0.5913857, 0.10695448, 0.46917292, -0.30012423],
         [0.5621234, 0.2948364, 0.7413819, 0.01523668, 0.21924704],
         [0.02137667, -0.60078216, 0.23667786, -0.7570835, 0.37892306]];
    var b_h = [-0.01990737, -0.01986573, -0.01856481, -0.00528801, -0.03633361];

    var w_o = [[-0.11482985, -0.80464846],
         [0.62656176, 0.00543218],
         [0.29695347, 0.3033119],
         [0.33930865, 0.37692797],
         [0.05242195, 0.01423564]];
    var b_o = [-0.0031684, 0.00316842];
  function chooseAction(me, opponent, t) {
    // Tit for tat

      if (t <= 3) {
          if (t <= 1) {
              return 1; // cooperate round 0 and 1
          }
          if (opponent[t - 2] == 0 && opponent[t - 1] == 0) {
              return 0; // defect if last two opponent moves were defect
          }

          return 1; // otherwise cooperate
      }
      else {
          var input = new Array(3);
          for (var i = 0; i < 3; ++i) {
              input[i] = opponent[t - 3 + i];
          }
          var x_0 = multiply(input, w_i);
          var x_1 = add(x_0, b_i);
          var x_2 = relu(x_1);
          var x_3 = multiply(x_2, w_h);
          var x_4 = add(x_3, b_h);
          var x_5 = relu(x_4);
          var x_6 = multiply(x_5, w_o);
          var x_7 = add(x_6, b_o);
      }
      if (x_7[0] > x_7[1]) return 1;
      else return 0;
  }

  return chooseAction;
}



strategies[cid + '200a'] = function () {
    function multiply(a, b) {
        var aNumRows = a.length, aNumCols = a[0].length,
            bNumRows = b.length, bNumCols = b[0].length,
            m = new Array(aNumRows);  // initialize array of rows
        for (var r = 0; r < aNumRows; ++r) {
            m[r] = new Array(bNumCols); // initialize the current row
            for (var c = 0; c < bNumCols; ++c) {
                m[r][c] = 0;             // initialize the current cell
                for (var i = 0; i < aNumCols; ++i) {
                    m[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return m;
    }

    function add(a, b) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var r = 0; r < aNum; ++r) {
            m[r] = a[r] + b[r];
        }
        return m;
    }

    function relu(a) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var i = 0; i < aNum; ++i) {
            if (a[i] > 0) {
                m[i] = a[i];
            }
            else {
                m[i] = 0;
            }
        }
        return m
    }

    var w_i = [[0.1503051, 0.7010221, -0.391387, -0.12588577, -0.6183309],
         [-0.4529406, -0.5732098, 0.56630737, -0.33726093, 0.21795602],
         [-0.22303279, 0.54003435, -0.7881026, 0.38957822, -0.6656378],
         [0.15152802, -0.48610714, -0.0479493, -0.46276417, -0.17708462],
         [-0.1930749, 0.42595574, -0.5906449, 0.48980433, -0.6126591],
         [0.61887383, -0.14693151, 0.45559323, 0.20507365, 0.01403424],
         [0.40851492, 0.45357648, -0.8631914, 0.55632323, 0.34069568],
         [0.32980806, -0.04823101, -0.3298261, 0.04061519, -0.36205232],
         [-0.11842149, 0.02022458, -0.40985534, 0.47224158, -0.14659084],
         [0.1048353, 0.48886824, 0.36296916, 0.34119585, -0.31836623]];
    var b_i = [-0.01908773, -0.07770282, -0.09102582, -0.0262818, 0.01499882];

    var w_h = [[0.04071271, 0.24491936, -0.4619673, 0.11342188, -0.6248678],
         [-0.15418229, 0.3960272, 0.31359568, -0.34757164, 0.05556708],
         [0.36790958, 0.68754923, 0.6550815, 0.41004682, 0.52433443],
         [0.474044, -0.38675806, -0.12073817, 0.40575397, 0.6856639],
         [-0.1768343, -0.5084912, 0.13670763, -0.05752854, -0.09701579]];
    var b_h = [-0.04859983, -0.14512926, 0.05348324, 0.00873801, -0.04663803];

    var w_o = [[0.44186485, -0.56676877],
         [-0.89489055, -0.23531741],
         [-0.491706, -0.566086],
         [-0.59506154, 0.8276314],
         [0.748695, -0.3562231]];
    var b_o = [0.02981707, -0.0298171];
  function chooseAction(me, opponent, t) {
    // Agent trained on mixed population of [NeuralAgent, Tit for Tat, randome], p = {1/3,1/3,1/3} N = 50

      if (t <= 10) {
          if (t <= 1) {
              return 1; // cooperate round 0 and 1
          }
          if (opponent[t - 2] == 0 && opponent[t - 1] == 0) {
              return 0; // defect if last two opponent moves were defect
          }

          return 1; // otherwise cooperate
      }
      else {
          var input = new Array(10);
          for (var i = 0; i < 10; ++i) {
              input[i] = opponent[t - 10 + i];
          }
          var x_0 = multiply(input, w_i);
          var x_1 = add(x_0, b_i);
          var x_2 = relu(x_1);
          var x_3 = multiply(x_2, w_h);
          var x_4 = add(x_3, b_h);
          var x_5 = relu(x_4);
          var x_6 = multiply(x_5, w_o);
          var x_7 = add(x_6, b_o);
      }
      if (x_7[0] > x_7[1]) return 1;
      else return 0;
  }

  return chooseAction;
}


strategies[cid + '200b'] = function () {
    function multiply(a, b) {
        var aNumRows = a.length, aNumCols = a[0].length,
            bNumRows = b.length, bNumCols = b[0].length,
            m = new Array(aNumRows);  // initialize array of rows
        for (var r = 0; r < aNumRows; ++r) {
            m[r] = new Array(bNumCols); // initialize the current row
            for (var c = 0; c < bNumCols; ++c) {
                m[r][c] = 0;             // initialize the current cell
                for (var i = 0; i < aNumCols; ++i) {
                    m[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return m;
    }

    function add(a, b) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var r = 0; r < aNum; ++r) {
            m[r] = a[r] + b[r];
        }
        return m;
    }

    function relu(a) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var i = 0; i < aNum; ++i) {
            if (a[i] > 0) {
                m[i] = a[i];
            }
            else {
                m[i] = 0;
            }
        }
        return m
    }

    var w_i = [[-0.6115401, -0.27269956, 0.34722072, -0.19551282, -0.28303885],
         [-0.54843944, -0.50007176, 1.0016644, 0.6982662, 0.19952548],
         [-0.44908187, 0.18905236, 0.6216559, 0.57248026, 0.37516484],
         [0.25727907, -0.36620435, 0.64834505, 0.322165, -0.6423712],
         [-0.45443597, 0.3014541, 0.8702821, 0.23169206, -0.5864333],
         [0.2276114, 0.26244506, 0.64609796, 0.14445002, 0.07450029],
         [-0.57564175, 0.0173884, 0.06614318, 0.2675176, -0.3628249],
         [0.04536336, -0.07453818, 0.2616222, 0.06214743, 0.51810133],
         [0.4821414, -0.27277657, 0.4155946, 0.15752415, 0.2220726],
         [0.5556183, 0.32245156, -0.3146539, 0.7553693, 0.12569715]];
    var b_i = [-0.03193535, 0.26865482, 0.33973992, 0.07248905, 0.2786859];

    var w_h = [[0.7567803, 0.50825393, 0.23546919, 0.327479, 0.14628604],
         [0.16146824, 0.75669676, -0.82429844, 0.6770406, 0.19009613],
         [0.905414, 0.23551153, 0.89902985, 0.18256891, 0.18442586],
         [0.8060397, -0.43922645, 0.2617422, -0.43830112, -0.35602266],
         [-0.7020581, 0.5963874, 0.206235, -0.00753205, 0.5667965]];
    var b_h = [0.11443227, 0.20167832, 0.11638897, 0.27986342, 0.19504991];

    var w_o = [[-0.5818503, 0.74067664],
         [0.28324777, -1.0625027],
         [-0.7506075, 0.5959802],
         [-0.4645772, -1.0432459],
         [0.9175505, -0.09791547]];
    var b_o = [0.13274564, -0.13274564];

    function chooseAction(me, opponent, t) {
        // NeuralAgent trained agenst itself  N = 2 2000 rounds
      if (t <= 10) {
          if (t <= 1) {
              return 1; // cooperate round 0 and 1
          }
          if (opponent[t - 2] == 0 && opponent[t - 1] == 0) {
              return 0; // defect if last two opponent moves were defect
          }

          return 1; // otherwise cooperate
      }
      else {
          var input = new Array(10);
          for (var i = 0; i < 10; ++i) {
              input[i] = opponent[t - 10 + i];
          }
          var x_0 = multiply(input, w_i);
          var x_1 = add(x_0, b_i);
          var x_2 = relu(x_1);
          var x_3 = multiply(x_2, w_h);
          var x_4 = add(x_3, b_h);
          var x_5 = relu(x_4);
          var x_6 = multiply(x_5, w_o);
          var x_7 = add(x_6, b_o);
      }
      if (x_7[0] > x_7[1]) return 1;
      else return 0;
  }
  return chooseAction;
}


strategies[cid + '200c'] = function () {
    function multiply(a, b) {
        var aNumRows = a.length, aNumCols = a[0].length,
            bNumRows = b.length, bNumCols = b[0].length,
            m = new Array(aNumRows);  // initialize array of rows
        for (var r = 0; r < aNumRows; ++r) {
            m[r] = new Array(bNumCols); // initialize the current row
            for (var c = 0; c < bNumCols; ++c) {
                m[r][c] = 0;             // initialize the current cell
                for (var i = 0; i < aNumCols; ++i) {
                    m[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return m;
    }

    function add(a, b) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var r = 0; r < aNum; ++r) {
            m[r] = a[r] + b[r];
        }
        return m;
    }

    function relu(a) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var i = 0; i < aNum; ++i) {
            if (a[i] > 0) {
                m[i] = a[i];
            }
            else {
                m[i] = 0;
            }
        }
        return m
    }

    var w_i = [[-0.6115401, -0.27269956, 0.34722072, -0.19551282, -0.28303885],
         [-0.54843944, -0.50007176, 1.0016644, 0.6982662, 0.19952548],
         [-0.44908187, 0.18905236, 0.6216559, 0.57248026, 0.37516484],
         [0.25727907, -0.36620435, 0.64834505, 0.322165, -0.6423712],
         [-0.45443597, 0.3014541, 0.8702821, 0.23169206, -0.5864333],
         [0.2276114, 0.26244506, 0.64609796, 0.14445002, 0.07450029],
         [-0.57564175, 0.0173884, 0.06614318, 0.2675176, -0.3628249],
         [0.04536336, -0.07453818, 0.2616222, 0.06214743, 0.51810133],
         [0.4821414, -0.27277657, 0.4155946, 0.15752415, 0.2220726],
         [0.5556183, 0.32245156, -0.3146539, 0.7553693, 0.12569715]];
    var b_i = [-0.03193535, 0.26865482, 0.33973992, 0.07248905, 0.2786859];

    var w_h = [[0.7567803, 0.50825393, 0.23546919, 0.327479, 0.14628604],
         [0.16146824, 0.75669676, -0.82429844, 0.6770406, 0.19009613],
         [0.905414, 0.23551153, 0.89902985, 0.18256891, 0.18442586],
         [0.8060397, -0.43922645, 0.2617422, -0.43830112, -0.35602266],
         [-0.7020581, 0.5963874, 0.206235, -0.00753205, 0.5667965]];
    var b_h = [0.11443227, 0.20167832, 0.11638897, 0.27986342, 0.19504991];

    var w_o = [[-0.5818503, 0.74067664],
         [0.28324777, -1.0625027],
         [-0.7506075, 0.5959802],
         [-0.4645772, -1.0432459],
         [0.9175505, -0.09791547]];
    var b_o = [0.13274564, -0.13274564];
  function chooseAction(me, opponent, t) {
      // Agent trained on mixed population of [Tit for Tat, Tit for 2Tat, Always defect, randome, NeuralAgent], p = {1/10,1/2,1/10,1/10,1/5} N = 50
      if (t <= 10) {
          if (t <= 1) {
              return 1; // cooperate round 0 and 1
          }
          if (opponent[t - 2] == 0 && opponent[t - 1] == 0) {
              return 0; // defect if last two opponent moves were defect
          }

          return 1; // otherwise cooperate
      }
      else {
          var input = new Array(10);
          for (var i = 0; i < 10; ++i) {
              input[i] = opponent[t - 10 + i];
          }
          var x_0 = multiply(input, w_i);
          var x_1 = add(x_0, b_i);
          var x_2 = relu(x_1);
          var x_3 = multiply(x_2, w_h);
          var x_4 = add(x_3, b_h);
          var x_5 = relu(x_4);
          var x_6 = multiply(x_5, w_o);
          var x_7 = add(x_6, b_o);
      }
      if (x_7[0] > x_7[1]) return 1;
      else return 0;
  }

  return chooseAction;
}


strategies[cid + '200mistakes'] = function () {
    function multiply(a, b) {
        var aNumRows = a.length, aNumCols = a[0].length,
            bNumRows = b.length, bNumCols = b[0].length,
            m = new Array(aNumRows);  // initialize array of rows
        for (var r = 0; r < aNumRows; ++r) {
            m[r] = new Array(bNumCols); // initialize the current row
            for (var c = 0; c < bNumCols; ++c) {
                m[r][c] = 0;             // initialize the current cell
                for (var i = 0; i < aNumCols; ++i) {
                    m[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return m;
    }

    function add(a, b) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var r = 0; r < aNum; ++r) {
            m[r] = a[r] + b[r];
        }
        return m;
    }

    function relu(a) {
        var aNum = a.length;
        var m = new Array(aNum);
        for (var i = 0; i < aNum; ++i) {
            if (a[i] > 0) {
                m[i] = a[i];
            }
            else {
                m[i] = 0;
            }
        }
        return m
    }

    var w_i = [[-0.6115401, -0.27269956, 0.34722072, -0.19551282, -0.28303885],
         [-0.54843944, -0.50007176, 1.0016644, 0.6982662, 0.19952548],
         [-0.44908187, 0.18905236, 0.6216559, 0.57248026, 0.37516484],
         [0.25727907, -0.36620435, 0.64834505, 0.322165, -0.6423712],
         [-0.45443597, 0.3014541, 0.8702821, 0.23169206, -0.5864333],
         [0.2276114, 0.26244506, 0.64609796, 0.14445002, 0.07450029],
         [-0.57564175, 0.0173884, 0.06614318, 0.2675176, -0.3628249],
         [0.04536336, -0.07453818, 0.2616222, 0.06214743, 0.51810133],
         [0.4821414, -0.27277657, 0.4155946, 0.15752415, 0.2220726],
         [0.5556183, 0.32245156, -0.3146539, 0.7553693, 0.12569715]];
    var b_i = [-0.03193535, 0.26865482, 0.33973992, 0.07248905, 0.2786859];

    var w_h = [[0.7567803, 0.50825393, 0.23546919, 0.327479, 0.14628604],
         [0.16146824, 0.75669676, -0.82429844, 0.6770406, 0.19009613],
         [0.905414, 0.23551153, 0.89902985, 0.18256891, 0.18442586],
         [0.8060397, -0.43922645, 0.2617422, -0.43830112, -0.35602266],
         [-0.7020581, 0.5963874, 0.206235, -0.00753205, 0.5667965]];
    var b_h = [0.11443227, 0.20167832, 0.11638897, 0.27986342, 0.19504991];

    var w_o = [[-0.5818503, 0.74067664],
         [0.28324777, -1.0625027],
         [-0.7506075, 0.5959802],
         [-0.4645772, -1.0432459],
         [0.9175505, -0.09791547]];
    var b_o = [0.13274564, -0.13274564];

  function chooseAction(me, opponent, t) {
      // Agent trained on mixed population of [Tit for Tat, Tit for 2Tat, Always defect, randome, NeuralAgent], p = {1/10,1/2,1/10,1/10,1/5} N = 50
      if (t <= 10) {
          if (t <= 1) {
              return 1; // cooperate round 0 and 1
          }
          if (opponent[t - 2] == 0 && opponent[t - 1] == 0) {
              return 0; // defect if last two opponent moves were defect
          }

          return 1; // otherwise cooperate
      }
      else {
          var input = new Array(10);
          for (var i = 0; i < 10; ++i) {
              input[i] = opponent[t - 10 + i];
          }
          var x_0 = multiply(input, w_i);
          var x_1 = add(x_0, b_i);
          var x_2 = relu(x_1);
          var x_3 = multiply(x_2, w_h);
          var x_4 = add(x_3, b_h);
          var x_5 = relu(x_4);
          var x_6 = multiply(x_5, w_o);
          var x_7 = add(x_6, b_o);
      }
      if (x_7[0] > x_7[1]) return 1;
      else return 0;
  }

  return chooseAction;
}

'use strict';

if (strategies === undefined) {
  var strategies = {};
}

if (cid === undefined) {
  var cid;
}

// Exchange this for your own cid
cid = 'amasjol';

// Defect: action 0
// Cooperate: action 1

strategies[cid + '10a'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat with betrayal at last round

    if (t == 0) {
      return 1; // cooperate in first round
    }
    if (t == 9) {
      return 0; // defect on last round
    }

    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}

strategies[cid + '10b'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat with betrayal at second to last round

    if (t == 0) {
      return 1; // cooperate in first round
    }
    if (t == 8) {
      return 0; // defect on second to last round
    }

    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}

strategies[cid + '10c'] = function () {
  function chooseAction(me, opponent, t) {
    // Gradual/ Soft majority
    // Cooperate initially, but always defect if opponent has defected,
    // defect n times in a row if opponent has defected n times in total
    // return to cooperate if opponent cooperates 2 times

    if (t == 0) {
      return 1; // cooperate in first round
    }

    var numDefects = 0;
    // Loop through all previous time steps
    for (var i = 0; i < t; i++) {
      if (opponent[i] == 0) { // if opponent defected in round i
        numDefects = numDefects + 1; // then add to counter
      }
    }
    var numCoop = 0;
    // Loop through previous timesteps starting at t, stop when opponent has defected
    if(opponent[t-1]==1 && opponent[t-2]==1){
      return 1;
    }

    var numDefectsMe = 0;
    // Loop through previous timesteps starrting at t, stop when I have cooporated
    for (var i = t; i>=0; i--) {
      if (me[i-1] == 0) {
        numDefectsMe = numDefectsMe + 1;
      }
      if (me[i-1]==1) {
        break;
      }
    }

      if (numDefects > numDefectsMe) {
        return 0; // Defect the number of times the opponent has defected in total
      } else {
        return 1; // Otherwise cooperate
      }
    return 1;

}
  return chooseAction;
}


strategies[cid + '200a'] = function () {
  function chooseAction(me, opponent, t) {
    // Tit for tat with betrayal at last round

    if (t == 0) {
      return 1; // cooperate in first round
    }
    if (t == 198) {
      return 0; // defect on second to last round
    }

    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}



strategies[cid + '200b'] = function () {
  function chooseAction(me, opponent, t) {
    // Gradual/ Soft majority
    // Cooperate initially, but always defect if opponent has defected,
    // defect n times in a row if opponent has defected n times in total
    // return to cooperate if opponent cooperates 1 time

    if (t == 0) {
      return 1; // cooperate in first round
    }

    var numDefects = 0;
    // Loop through all previous time steps
    for (var i = 0; i < t; i++) {
      if (opponent[i] == 0) { // if opponent defected in round i
        numDefects = numDefects + 1; // then add to counter
      }
    }
    var numCoop = 0;
    // Loop through previous timesteps starting at t, stop when opponent has defected
    if(opponent[t-1]==1){
      return 1;
    }

    var numDefectsMe = 0;
    // Loop through previous timesteps starrting at t, stop when I have cooporated
    for (var i = t; i>=0; i--) {
      if (me[i-1] == 0) {
        numDefectsMe = numDefectsMe + 1;
      }
      if (me[i-1]==1) {
        break;
      }
    }

      if (numDefects > numDefectsMe) {
        return 0; // Defect the number of times the opponent has defected in total
      } else {
        return 1; // Otherwise cooperate
      }
    return 1;

}
  return chooseAction;
}


strategies[cid + '200c'] = function () {
  function chooseAction(me, opponent, t) {
    // Gradual/ Soft majority
    // Cooperate initially, but always defect if opponent has defected,
    // defect n times in a row if opponent has defected n times in total
    // return to cooperate if opponent cooperates 2 times

    if (t == 0) {
      return 1; // cooperate in first round
    }

    var numDefects = 0;
    // Loop through all previous time steps
    for (var i = 0; i < t; i++) {
      if (opponent[i] == 0) { // if opponent defected in round i
        numDefects = numDefects + 1; // then add to counter
      }
    }
    var numCoop = 0;
    // Loop through previous timesteps starting at t, stop when opponent has defected
    if(opponent[t-1]==1 && opponent[t-2]==1){
      return 1;
    }

    var numDefectsMe = 0;
    // Loop through previous timesteps starrting at t, stop when I have cooporated
    for (var i = t; i>=0; i--) {
      if (me[i-1] == 0) {
        numDefectsMe = numDefectsMe + 1;
      }
      if (me[i-1]==1) {
        break;
      }
    }

      if (numDefects > numDefectsMe) {
        return 0; // Defect the number of times the opponent has defected in total
      } else {
        return 1; // Otherwise cooperate
      }
    return 1;

}
  return chooseAction;
}



strategies[cid + '200mistakes'] = function () {
  function chooseAction(me, opponent, t) {
    // Contrite tit-for-tat

    if (t == 0) {
      return 1; // cooperate in first round
    }
    if (opponent[t-2]!=me[t-1]) {
      return 1; // cooporate if I have made a mistake
    }

    return opponent[t-1]; // otherwise copy opponent
  }

  return chooseAction;
}
