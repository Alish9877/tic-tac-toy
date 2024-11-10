/*-------------------------------- Constants --------------------------------*/
const squareEls = Array.from(document.querySelectorAll('.sqr'))

/*---------------------------- Variables (state) ----------------------------*/
let board 
let turn 
let winner 
let tie 
/*------------------------ Cached Element References ------------------------*/
const messageEl = document.querySelector('#message') 
const resetBtnEl = document.querySelector('#reset')
/*-------------------------------- Functions --------------------------------*/
const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  render()
};

const updateBoard = () => {
  board.forEach((cell, index) => {
    const square = squareEls[index]
    square.textContent = cell
  })
}

const updateMessage = () => {
  if (winner) {
    messageEl.textContent = `${turn} wins!`
  } else if (tie) {
    messageEl.textContent = 'The game is a tie!'
  } else {
    messageEl.textContent = `${turn}'s turn`
  }
};

const checkForWinner = () => {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]
  winningCombos.forEach(combo => {
    const [a, b, c] = combo
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = true
    }
  })
}

const checkForTie = () => {
  if (winner) return
  if (!board.includes('')) {
    tie = true
  }
}

const switchPlayerTurn = () => {
  if (winner) return
  turn = turn === 'X' ? 'O' : 'X'
}

const handleClick = (event) => {
  const squareIndex = parseInt(event.target.id);
  if (board[squareIndex] === '' && !winner && !tie) {
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
  }
}

const placePiece = (index) => {
  board[index] = turn
}

const render = () => {
  updateBoard()
  updateMessage()
}

const resetGame = () => {
  init()
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
  square.addEventListener('click', handleClick)
})

resetBtnEl.addEventListener('click', resetGame)

init()


