const gameBoard = (() => {
  const generateGameboard = (board = []) => {
    for (let i = 0; i < 9; i += 1) {
      board.push('');
    }
    return board;
  };
  const isFull = (board) => {
    for (let i = 0; i < 9; i += 1) {
      if (board[i] === '') {
        return false;
      }
    }
    return true;
  };
  return {
    generateGameboard,
    isFull,
  };
})();

const gameFlow = (() => {
  const turn = 0;
  const match = 0;
  let actualBoard = gameBoard.generateGameboard();
  const isShotPossible = (n) => actualBoard[n] === '';
  const isWinning = (symbol) => {
    const combs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let counter = 0;
    for (let i = 0; i < combs.length; i += 1) {
      counter = 0;
      for (let j = 0; j < combs[i].length; j += 1) {
        if (actualBoard[combs[i][j]] === symbol) {
          counter += 1;
        } else {
          counter = 0;
        }
      }
      if (counter === 3) {
        break;
      }
    }
    return counter === 3;
  };
  const alterBoard = (n, player) => {
    if (!isShotPossible(n)) {
      return;
    }
    actualBoard[n] = player;
  };
  const resetGame = (isReset = false) => {
    if (
      gameBoard.isFull(actualBoard) ||
      isWinning('X') ||
      isWinning('O') ||
      isReset
    ) {
      actualBoard = gameBoard.generateGameboard();
    }
  };
  return {
    actualBoard,
    turn,
    match,
    isShotPossible,
    isWinning,
    alterBoard,
    resetGame,
  };
})();

const player = (whichPlayer) => {
  const board = gameFlow.actualBoard;
  const win = 0;
  const getPlayer = () => whichPlayer;
  return {
    board,
    win,
    getPlayer,
    // playerShot,
  };
};

const p1 = player('X');
const p2 = player('O');

const domRendering = (() => {
  const container = document.getElementById('container');
  const displayResult = () => {
    const tieGame = document.getElementById('tie-game');
    const oWin = document.getElementById('o-win');
    const xWin = document.getElementById('x-win');
    if (gameFlow.isWinning(p1.getPlayer())) {
      xWin.style.display = 'block';
      return true;
    }
    if (gameFlow.isWinning(p2.getPlayer())) {
      oWin.style.display = 'block';
      return true;
    }
    if (gameBoard.isFull(gameFlow.actualBoard)) {
      tieGame.style.display = 'block';
      return true;
    }
    tieGame.style.display = 'none';
    xWin.style.display = 'none';
    oWin.style.display = 'none';
    return false;
  };
  const displayBoard = () => {
    container.replaceChildren();
    gameFlow.actualBoard.forEach((grid, i) => {
      const button = document.createElement('button');
      container.appendChild(button);
      button.classList.add('case');
      button.value = i;
      switch (grid) {
        case 'X':
          button.textContent = 'X';
          button.style.color = '#1e549f';
          break;
        case 'O':
          button.textContent = 'O';
          button.style.color = '#c13131';
          break;
        default:
          button.textContent = '';
      }
    });
    listenerShot();
  };
  const resetGame = (isReset) => {
    if (displayResult() || isReset) {
      gameFlow.resetGame(isReset);
      gameFlow.actualBoard = gameBoard.generateGameboard();
      gameFlow.turn = 0;
    }
  };

  const listenerShot = () => {
    const buttons = document.querySelectorAll('.case');
    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        let randomVal;
        if (!gameFlow.isShotPossible(e.target.value)) {
          return;
        }
        // eslint-disable-next-line no-unused-expressions

        if (gameFlow.turn % 2 === 0) {
          gameFlow.alterBoard(e.target.value, 'X');
          gameFlow.actualBoard[e.target.value] = 'X';
        } else {
          gameFlow.alterBoard(e.target.value, 'O');
          gameFlow.actualBoard[e.target.value] = 'O';
        }

        AIMove();
        // do {
        //   randomVal = Math.floor(Math.random() * 9);
        // } while (
        //   !gameFlow.isShotPossible(randomVal) &&
        //   !gameBoard.isFull(gameFlow.actualBoard)
        // );
        gameFlow.turn += 2;

        displayBoard();
        resetGame();
      });
    });
  };
  const restartOption = () => {
    const button = document.createElement('button');
    button.textContent = 'Restart';
    button.setAttribute('id', 'restart-btn');
    document.body.appendChild(button);
    button.addEventListener('click', () => {
      resetGame(true);
      displayBoard();
    });
  };
  return {
    displayBoard,
    restartOption,
  };
})();

const newGame = domRendering.displayBoard();
const rstButton = domRendering.restartOption();

function AIMove() {
  console.log(gameFlow.actualBoard);
  let bestScore = -Infinity;
  let bestMove = null;
  for (let i = 0; i < 9; i += 1) {
    if (gameFlow.actualBoard[i] === '') {
      gameFlow.actualBoard[i] = 'O';
      const score = minimax(gameFlow.actualBoard, true);
      gameFlow.actualBoard[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  gameFlow.alterBoard(bestMove, 'O');
  gameFlow.actualBoard[bestMove] = 'O';
}

let score;

function minimax(board, isMax) {
  const resultX = gameFlow.isWinning('X');
  const resultO = gameFlow.isWinning('O');

  if (resultO) {
    const score = -1;
    return score;
  }
  if (resultX) {
    const score = 1;
    return score;
  }
  if (gameBoard.isFull(board)) {
    const score = 0;
    return score;
  }

  if (isMax) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i += 1) {
      if (board[i] === '') {
        board[i] = 'O';
        const score = minimax(board, false);
        board[i] = '';
        if (score > bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  }
  let bestScore = Infinity;
  for (let i = 0; i < 9; i += 1) {
    if (board[i] === '') {
      board[i] = 'X';
      const score = minimax(board, true);
      board[i] = '';
      if (score < bestScore) {
        bestScore = score;
      }
    }
  }
  return bestScore;
}
