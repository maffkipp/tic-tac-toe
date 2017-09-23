let playerOne = {
  turn: true,
  won: false,
  taken: []
};

let playerTwo = {
  turn: false,
  won: false,
  taken: []
};

let boardState = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];

function winConditions(board) {

}

function fillCell(turnClass) {
  let cells = [...document.querySelectorAll('.cell')];

  cells.forEach(cell => {
    cell.addEventListener('click', function() {
        cell.classList.remove('x');
        cell.classList.remove('o');

        cell.classList.add(turnClass);
    });
  });
}

function clickBox() {
  let container = document.querySelector('.container');
  let counter = 1;
  document.addEventListener('click', function() {
    fillCell(whoseTurn(counter));
    counter++;
  });

}

function game() {
  fillCell(whoseTurn(0));
  clickBox();
}


function whoseTurn(counter) {
  let turn;
  if (counter % 2 === 0) {

    turn = 'x';
  } else {turn = 'o';}
  console.log(turn);
  return turn;
}


function resetBoard() {
  let cells = [...document.querySelectorAll('.cell')];
  let button = document.querySelector('button');

  button.addEventListener('click', function() {
    cells.forEach(cell => {
      cell.classList.remove('x');
      cell.classList.remove('o');
    });
  });
}


function main() {
  game();
  resetBoard();
}




main();

