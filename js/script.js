/*-------------------------------- Constants --------------------------------*/
const squareEls = Array.from(document.querySelectorAll('.sqr'));

/*---------------------------- Variables (state) ----------------------------*/
let board 
let turn 
let winner 
let tie 
/*------------------------ Cached Element References ------------------------*/
const messageEl = document.querySelector('#message') 
const resetBtnEl = document.querySelector('#reset');
/*-------------------------------- Functions --------------------------------*/
const init = () => {
  // console.log('init')
  board = ['' , '' , '' , '' , '', '' , '' , '' , '']
  turn = 'X'
  winner = false
  tie = false
  // console.log(board)
  render()
  }

  const render = () => {
updateBoard()
updateMessage()
  }

  const updateBoard = () => {
    board.forEach((cell, index) => {
      const square = squareEls[index];  
      square.textContent = cell;  
    });
  };


const updateMessage = () => {
  if (winner) {
    messageEl.textContent = `${turn} wins!`; 
  } else if (tie) {
    messageEl.textContent = 'The game is a tie!'; 
  } else {
    messageEl.textContent = `${turn}'s turn`;  
  }
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7],
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6]
]

const checkForTie = () => {
  if (winner) {
    return; 
  }
  if (!board.includes('')) {
    tie = true;
  }

  console.log(tie);  
};


const switchPlayerTurn = () => {
  
  if (winner) {
    return; 
  }
  turn = turn === 'X' ? 'O' : 'X';
  console.log(turn);  
};



const handleClick = (index) => {
  
  const squareIndex = parseInt(event.target.id);  

  if (board[squareIndex] === '' && !winner && !tie) {
    board[squareIndex] = turn;  
    render();
    placePiece(index)
    checkForWinner()
    switchPlayerTurn()

  }
};

const placePiece = (index) => {
  board[index] = turn; 
  console.log(board);
};

const checkForWinner = () => {
  
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = true; 
      return; 
    }
  }
};

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('DOMContentLoaded' , init)
document.addEventListener('click' ,handleClick)
resetBtnEl.addEventListener('click', init);



