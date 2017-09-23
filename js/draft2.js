function main() {


  // Defines a variable for each player
  let playerOne = {
    turn: true,
    won: false,
    taken: [],
    letter: 'x'

  };

  let playerTwo = {
    turn: false,
    won: false,
    taken: [],
    letter: 'o'

  };

  // The game board object
  let board = {

    boardState: [],

    // Sets the boards' starting state
    init: function(arr) {
      this.boardState =[[null,null,null],
                        [null,null,null],
                        [null,null,null]];

      arr.forEach(item => {
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
  // console.log(cells);

  // Set up event listener for each cell
  cells.forEach(cell => {
    cell.addEventListener('click', function() {
      turn(cell);
    });
  });

  board.init(cells);
  resetBoard(cells);


  function turn(cell) {
    if (playerOne.turn) {
      if (cell.classList.contains('unplayed')) {
        cell.classList.remove('unplayed');
        cell.classList.add(playerOne.letter);
        playerOne.turn = false;
        playerTwo.turn = true;
      }


    } else {
      if (cell.classList.contains('unplayed')) {
        cell.classList.remove('unplayed');
        cell.classList.add(playerTwo.letter);
        playerOne.turn = true;
        playerTwo.turn = false;
      }



    }
  }

  function resetBoard(arr) {
    let button = document.querySelector('button');

    button.addEventListener('click', function() {
      board.init(arr);
    });
  }








}

main();
