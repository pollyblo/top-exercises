const gameBoard = (() => {
  const generateGameboard = (board = []) => {
    for (let i = 0; i < 9; i += 1) {
      board.push('');
    }
    return board;
  };
  return {
    generateGameboard,
  };
})();

const gameFlow = (() => {
  const turn = 0;
  const actualBoard = gameBoard.generateGameboard();
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
  return {
    actualBoard,
    turn,
    isShotPossible,
    isWinning,
  };
})();

const player = (whichPlayer) => {
  const board = gameFlow.actualBoard;
  const getPlayer = () => whichPlayer;
  const playerShot = (n) => {
    if (!gameFlow.isShotPossible(n)) {
      return;
    }
    board[n] = getPlayer();
    gameFlow.actualBoard = board;
    gameFlow.turn += 1;
  };
  return {
    board,
    getPlayer,
    playerShot,
  };
};

const rendering = (() => {
  const container = document.getElementById('container');
  const modelBoard = gameFlow.actualBoard;
  const displayResult = () => {
    if (gameFlow.isWinning('X')) {
      console.log('Bravo X');
    } else if (gameFlow.isWinning('O')) {
      console.log('Bravo O');
    }
  };
  const displayBoard = () => {
    container.replaceChildren();
    modelBoard.forEach((grid, i) => {
      const button = document.createElement('button');
      container.appendChild(button);
      button.classList.add('case');
      button.value = i;
      switch (grid) {
        case 'X':
          button.textContent = 'X';
          break;
        case 'O':
          button.textContent = 'O';
          break;
        default:
          button.textContent = '';
      }
    });
    listenerShot();
  };
  const listenerShot = () => {
    const buttons = document.querySelectorAll('.case');
    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (gameFlow.turn % 2 === 0) {
          p1.playerShot(e.target.value);
        } else {
          p2.playerShot(e.target.value);
        }
        displayBoard();
        displayResult();
      });
    });
  };
  return {
    displayBoard,
    modelBoard,
  };
})();

const p1 = player('X');
const p2 = player('O');
rendering.displayBoard();
