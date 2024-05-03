const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (e) => {
  const index = parseInt(e.target.id.split('-')[1]);
  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();
  togglePlayer();
};

const checkWinner = () => {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      result.textContent = `${currentPlayer} wins!`;
      break;
    }
  }
  if (!gameState.includes('') && gameActive) {
    gameActive = false;
    result.textContent = "It's a tie!";
  }
};

const togglePlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const resetGame = () => {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  result.textContent = '';
  cells.forEach((cell) => {
    cell.textContent = '';
  });
};

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
