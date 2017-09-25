// VARIABLES
let playerOne = {
  turn: true,
  taken: [],
  letter: 'x',
  init: function() {
    this.taken = [];
    this.turn = true;
  }
};

let playerTwo = {
  turn: false,
  taken: [],
  letter: 'o',
  init: function() {
    this.taken = [];
    this.turn = false;
  }
};

let board = {
  init: function(arr) {
    arr.forEach(item => {
      item.classList.remove('no');
      item.classList.remove('x');
      item.classList.remove('o');
      item.classList.add('unplayed');
    });
  }
};

let winConditions = [['0','1','2'],['3','4','5'],
      ['6','7','8'],['0','3','6'],['1','4','7'],
      ['2','5','8'],['0','4','8'],['2','4','6']];

let cells = [...document.querySelectorAll('.cell')];

let gameText = document.querySelector('.game-text');

// GAME PROCESS
cells.forEach(cell => {
  cell.addEventListener('click', function() {
    turn(cell);
  });
});

whoseTurn();
board.init(cells);
resetBoard(cells);

// FUNCTIONS
// Called every time a box is clicked, decides whose turn it is
function turn(cell) {
  if (playerOne.turn) {
    turnProcess(playerOne, cell);
  } else {
    turnProcess(playerTwo, cell);
  }
}

// The steps taken for each players turn
function turnProcess(player, cell) {
  if (cell.classList.contains('unplayed') &&
      !cell.classList.contains('no'))
  {
      cell.classList.remove('unplayed');
      cell.classList.add(player.letter);

      let squareTaken = cell.getAttribute('id');
      player.taken.push(squareTaken);

      playerOne.turn = !playerOne.turn;
      playerTwo.turn = !playerTwo.turn;

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
    board.init(arr);
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



