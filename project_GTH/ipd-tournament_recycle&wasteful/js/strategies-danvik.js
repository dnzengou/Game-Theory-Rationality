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

