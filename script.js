const PLAYER_X_CLASS = "x";
const PLAYER_O_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const messageGame = document.getElementById("message-game");
const restartButton = document.getElementById("end");
const restartButton2 = document.getElementById("end2");
const exitBtn = document.getElementById("exit");
const midBtn = document.getElementById("mid-game");
const startBtn = document.getElementById("start-game");
let isPlayer_O_Turn = false;
console.log(cellElements);
const startGame = () => {
  console.log("game dimulai");
  isPlayer_O_Turn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(PLAYER_X_CLASS);
    cell.classList.remove(PLAYER_O_CLASS);
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
    // console.log("test");
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
};

const endGame = (draw) => {
  if (draw) {
    messageGame.innerText = "It's a draw!";
  } else {
    messageGame.innerText = `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`;
  }
  winningMessageElement.classList.add("show");
};

function placeMark(cell, currentClass) {
  console.log(currentClass);
  cell.classList.add(currentClass);
}

function swapTurns() {
  isPlayer_O_Turn = !isPlayer_O_Turn;
}

function setBoardHoverClass() {
  boardElement.classList.remove(PLAYER_X_CLASS);
  boardElement.classList.remove(PLAYER_O_CLASS);
  if (isPlayer_O_Turn) {
    boardElement.classList.add(PLAYER_O_CLASS);
  } else {
    boardElement.classList.add(PLAYER_X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS);
  });
}

const handleCellClick = (e) => {
  console.log("terclick");
  const cell = e.target;
  const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
};

// document.addEventListener("keypress", function (event) {
//   // keySound(event.key);
//   // buttonAnimation(event.key);
//   console.log(event);
// });

exitBtn.addEventListener("click", () => {
  startBtn.classList.remove("unshow");
  boardElement.classList.remove(PLAYER_X_CLASS);
  boardElement.classList.remove(PLAYER_O_CLASS);
  cellElements.forEach((cell) => {
    cell.classList.remove(PLAYER_X_CLASS);
    cell.classList.remove(PLAYER_O_CLASS);
    cell.removeEventListener("click", handleCellClick);
    // cell.addEventListener("click", handleCellClick, { once: true });
  });
  midBtn.classList.remove("show");
});

startBtn.addEventListener("click", () => {
  startGame();
  startBtn.classList.add("unshow");
  midBtn.classList.add("show");
});
restartButton.addEventListener("click", () => {
  startGame();
});

restartButton2.addEventListener("click", () => {
  winningMessageElement.classList.remove("show");
  startGame();
});
