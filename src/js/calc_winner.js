// todo: better generate random board mechanism for larger sizes
// todo: if there are only o's or x's - is it a valid board?

// http://stackoverflow.com/questions/10430279/javascript-object-extending
// Object.prototype.extend = function(obj) {
//   for (var i in obj) {
//     if (obj.hasOwnProperty(i)) {
//       this[i] = obj[i];
//     }
//   }
// };
/**
 * Given the parameters return the winner of the tictactoe game.
 *
 * @param length Number
 * @param boardString String representing the tic tac toe board Example: 'xxoooxooo'
 * @returns {String} Return one of the following results:
 *
 * WinnerX:  A winner X (there are N X’s in a row, where N is the length of a side -- can be on a row, column or diagonal)
 * WinnerO:  A winner O
 * CatsGame: A cats game (no winner and no spaces left) None of the above
 * null:     No result defined
 */
export default function findWinner(length, boardString) {

  var fillEnum = {x: 'x', o: 'o', space: ' '};
  var winnerEnum = {'x': 'X', 'o': '0', 'c': false};
  var hasSpace = false;
  var breakExpr = new RegExp('.{1,' + length + '}', 'g');
  var boardArray1d = boardString.match(breakExpr);
  var boardArray2d = populateArray(length, boardArray1d);

  var result = getWinner(boardArray2d);

  // console.log({
  //   params: arguments, 
  //   breakExpr: breakExpr, 
  //   boardArray1d: boardArray1d, 
  //   boardArray2d: boardArray2d, 
  //   result: result
  // });

  return result;

  /**
   * Get the winner for the board given as a parameter.
   *
   * @param board 2d array which will be analysed.
   * @returns {*} String containing the winner or catsgame if no winner defined; null otherwise.
   */
  function getWinner(board) {
    if (board.length === 1) {
      return {'winner': winnerEnum[board[0]] || winnerEnum['c'] };
    }

    /*
     Example: [0, 1, 2] => [2, 1, 0]
     */
    var reverseBoard = function(hLine) {
      return hLine.reverse();
    };

    var hWinner = hSearch(board);
    var vWinner = vSearch(board);
    var dWinner = dSearch(board);
    var dWinnerReverse = dSearch(board.map(reverseBoard));
    
    // console.log(hWinner, vWinner, dWinner, dWinnerReverse);

    // if (hWinner) {
    //   hWinner.extend({'type': 'h'});
    // } else if (vWinner) {
    //   vWinner.extend({'type': 'v'});
    // } else if (dWinner) {
    //   dWinner.extend({'type': 'd'});
    //   dWinner.extend({'reversed': 'y'});
    // }

    // Define result
    return hWinner
      || vWinner
      || dWinner
      || dWinnerReverse
      || (hasSpace ? {'winner': winnerEnum['c'], 'type': '', 'element': ''} : null);
  }

  /**
   * Horizontal search for the winner: for ex., the entire line is taken by X.
   *
   * @param board 2d array
   * @returns {*} String containing the winner name; undefined otherwise.
   */
  function hSearch(board) {
    begin:
      for (var i = 0; i < length; i++) {
        var hPrev = board[i][0];           // first: [0, 0] then: [1, 0], [2, 0], etc
        var hLineLength = 1;

        // Run through the line values vertically
        for (var j = 1; j < length; j++) {

          var hNext = board[i][j];        // then: [0, 1], [0, 2], [0, 3], etc

          if ((fillEnum.space === hPrev) || (fillEnum.space === hNext)) {
            hasSpace = true;
          }

          if (!(hPrev === hNext)) {
            continue begin;
          }

          if (!(fillEnum.space === hPrev) && ++hLineLength === length) { // the end of the line
            return {'winner': winnerEnum[hPrev], 'element': [i, j]};
          }

        }
      }
  }

  function vSearch(board) {
    /*
     [0], [1], [2],         [0], [3], [6],
     [3], [4], [5],    =>   [1], [4], [7],
     [6], [7], [6]          [2], [5], [8]
     */
    function TransMatrix(A) {
      var m = A.length, n = A[0].length, AT = [];
      for (var i = 0; i < n; i++)
      { AT[i] = [];
        for (var j = 0; j < m; j++) AT[i][j] = A[j][i];
      }
      return AT;
    }

    return hSearch(TransMatrix(board));
  }

  /**
   * Diagonal search for the winner: for ex., the entire diagonal line is taken by X.
   *
   * @param board 2d array
   * @returns {*} String containing the winner name; undefined otherwise.
   */
  function dSearch(board) {

    var dLineLength = 1;
    var dPrev = board[0][0];          // first: [0, 0] then: [1, 1], [2, 2], etc

    for (var i = 1; i < length; i++) {

      // Run through the line values diagonally
      var dNext = board[i][i];        // then: [1, 0], [2, 0], [3, 0], etc

      if ((fillEnum.space === dPrev) || (fillEnum.space === dNext)) {
        hasSpace = true;
      }

      if (!(dPrev === dNext)) {
        return;
      }

      if (!(fillEnum.space === dPrev) && ++dLineLength === length) {  // the end of the line
        return {'winner': winnerEnum[dPrev], 'element': [i, i]};
      }

    }
  }

};

/**
 * Public Functions
 * @type {string}
 */

/**
 *
 * @param boardArray1d 1-dimensional array to be converted to 2-dimensional.
 *    Example:
 *
 *  [
 *   ["x","x","o"], // line 0
 *   ["o","o","x"], // line 1
 *   ["o"," ","o"]  // line 2
 *  ]
 *
 * @returns {Array} 2-dimensional array converted from 1-dimensional.
 */
function populateArray(length, boardArray1d) {
  var boardArray2d = new Array(length);
  var hBoardLine   = new Array(length);

  for (var hLineNum = 0; hLineNum < boardArray1d.length; hLineNum++) {
    var hLineString = boardArray1d[hLineNum];
    for (var i = 0; i < hLineString.length; i++) {
      hBoardLine[i] = hLineString[i];
    }

    boardArray2d[hLineNum] = hBoardLine.splice(0); // copy array
  }
  return boardArray2d;
}

