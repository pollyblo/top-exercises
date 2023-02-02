const gameBoard = (() => {
  const generateGameboard = () => {
    const board = [];
    for (let i = 0; i < 9; i += 1) {
      const grid = [];
      board.push(grid);
    }
    return board;
  };

  return {
    generateGameboard,
  };
})();

const player = (whichPlayer) => {
  const getPlayer = () => whichPlayer;
  const playerShot = whichPlayer;

  return {
    getPlayer,
  };
};

const playerX = player('X');
const playerY = player('O');

const gameFlow = (() => {
  const playerTurn = (k) => (k % 2 === 0 ? 'X' : 'O');
  const alterBoard = () => {};
  const playerWin = () => {};
})();

const rendering = (() => {
  const container = document.getElementById('container');
  const modelBoard = gameBoard.generateGameboard();
  const displayBoard = () => {
    modelBoard.forEach((_, i) => {
      const button = document.createElement('button');
      container.appendChild(button);
      button.classList.add('case');
      button.value = i;
    });
  };

  return {
    displayBoard,
  };
})();

rendering.displayBoard();
