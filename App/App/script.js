const board = document.getElementById("board");
const winnerText = document.getElementById("winnerText");
const restartBtn = document.getElementById("restartBtn");
const modeSelect = document.getElementById("modeSelect");

let cells;
let currentPlayer = "X";
let gameActive = true;
let mode = "friend";

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function startGame() {
  board.innerHTML = "";
  winnerText.textContent = "";
  restartBtn.style.display = "none";
  cells = Array(9).fill(null);
  currentPlayer = "X";
  gameActive = true;
  mode = modeSelect.value;

  for(let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", onCellClick);
    board.appendChild(cell);
  }
}

function onCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    winnerText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    restartBtn.style.display = "inline-block";
    return;
  }

  if (!cells.includes(null)) {
    winnerText.textContent = "It's a draw!";
    gameActive = false;
    restartBtn.style.display = "inline-block";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (mode === "bot" && currentPlayer === "O") {
    botMove();
  }
}

function checkWinner() {
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function botMove() {
  let available = cells.map((val, i) => val === null ? i : null).filter(i => i !== null);
  let move = available[Math.floor(Math.random() * available.length)];
  setTimeout(() => {
    document.querySelector(`.cell[data-index='${move}']`).click();
  }, 500);
}

restartBtn.addEventListener("click", startGame);
modeSelect.addEventListener("change", startGame);

startGame();
