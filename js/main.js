// GLOBAL VARIABLES

  // Defines a variable for each player
  let playerOne = {
    turn: true,
    won: false,
    taken: [],
    letter: 'x',

    init: function() {
      this.won = false;
      this.taken = [];
      this.turn = true;
    }
  };

  let playerTwo = {
    turn: false,
    won: false,
    taken: [],
    letter: 'o',

    init: function() {
      this.won = false;
      this.taken = [];
      this.turn = false;
    }
  };

  // The game board object
  let board = {

    // Sets the boards' starting state
    init: function(arr) {
      arr.forEach(item => {
        item.classList.remove('no');
        item.classList.remove('x');
        item.classList.remove('o');
        item.classList.add('unplayed');
      });
    }
  };

  // Defines a variable that stores all possible win conditions as an array
  let winConditions = [['0','1','2'],['3','4','5'],
        ['6','7','8'],['0','3','6'],['1','4','7'],
        ['2','5','8'],['0','4','8'],['2','4','6']];

  // Makes an array of every cell on the board
  let cells = [...document.querySelectorAll('.cell')];

  let gameText = document.querySelector('.game-text');


  //----------------------------------------------------------------//


// MAIN FUNCTION

function main() {

  // Set up event listener for each cell
  cells.forEach(cell => {
    cell.addEventListener('click', function() {
      turn(cell);
    });
  });

  whoseTurn();
  board.init(cells);
  resetBoard(cells);

}


// OTHER FUNCTIONS

// This function is called by clicking on one of the boxes
function turn(cell) {

  // Decides which player will be taking the turn
  if (playerOne.turn) {
    turnProcess(playerOne, cell);
  } else {
    turnProcess(playerTwo, cell);
  }


}


// The steps taken for each players turn
function turnProcess(player, cell) {

  // Checks if box has been clicked, checks for a winner, switches turns
  if (cell.classList.contains('unplayed') &&
      !cell.classList.contains('no'))
  {
      cell.classList.remove('unplayed');
      cell.classList.add(player.letter);

      // gets the ID of the clicked square and adds it to the players array
      let squareTaken = cell.getAttribute('id');
      player.taken.push(squareTaken);

      // Swaps turns
      playerOne.turn = !playerOne.turn;
      playerTwo.turn = !playerTwo.turn;

      // Checks whose turn it is, then checks win conditions
      whoseTurn();
      stalemateCondition();
      afterTurn(player);
  }
}

// Checks if a player has a winning combination
function afterTurn(player) {

  for (let i=0; i<winConditions.length; i++) {
    if (arrayContainsArray(player.taken, winConditions[i])) {
      winMessage(player);
      cells.forEach(cell => {
        cell.classList.add('no');
      });
    }
  }
}


// Adds functionality to the reset button
function resetBoard(arr) {
  let button = document.querySelector('button');

  button.addEventListener('click', function() {
    // Resets the board to its initial state
    board.init(arr);
    // Resets the players
    playerOne.init();
    playerTwo.init();

    whoseTurn();
  });
}

// Displays a win message
function winMessage(player) {
  if (player === playerOne) {
    gameText.innerText = 'X Wins!';
  } else {
    gameText.innerText = 'O Wins!';
  }
}

// Checks whose turn it is and displays a message
function whoseTurn() {
  if (playerOne.turn) {
    gameText.innerText = "X's Turn";
  } else {
    gameText.innerText = "O's Turn";
  }
}

// Checks for a stalemate and displays a message
function stalemateCondition() {
  let isStalemate = true;
  cells.forEach(cell => {
    if (cell.classList.contains('unplayed')) {
      isStalemate = false;
    }
  });
  if (isStalemate) {
    gameText.innerText = 'Y\'all Tied.';
  }
}


// Checks if an array contains all elements of another array
function arrayContainsArray(current, reference) {
  let contains = false;
  for (let i=0; i<reference.length; i++) {
    if (current.indexOf(reference[i]) === -1) {
      return false;
    }
  }
  return true;
}


main();
