// DOM Elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const startGameBtn = document.querySelector("#start-game-btn");
const playerXNameInput = document.querySelector("#playerXName");
const playerONameInput = document.querySelector("#playerOName");

// Game variables
let turnO = true; // Tracks whose turn it is (true for "O", false for "X")
let count = 0; // Tracks the number of moves made
let playerXName = "Player X"; // Default Player X name
let playerOName = "Player O"; // Default Player O name
let playAgainstAI = false; // Indicates if the game is against AI

// Winning patterns for Tic-Tac-Toe
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Resets the game to its initial state
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Initializes the game by setting player names and checking for AI mode
const startGame = () => {
  playerXName = playerXNameInput.value.trim() || "Player X";
  playerOName = playerONameInput.value.trim() || "Player O";
  playAgainstAI = confirm("Do you want to play against AI?");
  document.querySelector("main").classList.remove("hide");
  document.querySelector(".player-names").classList.add("hide");
};

// Adds click event listeners to all game boxes
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;

      // AI makes its move if enabled and the game is still ongoing
      if (playAgainstAI && !checkWinner() && count < 8) {
        setTimeout(aiMove, 500);
      }
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true; // Disable the box after a move
    count++;

    const isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// AI makes a move by randomly selecting an available box
const aiMove = () => {
  const availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
  const randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
  randomBox.innerText = "X";
  randomBox.disabled = true;
  turnO = true;
  count++;
  checkWinner();
};

// Displays a draw message
const gameDraw = () => {
  msg.innerText = "Game Drawn";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Disables all game boxes
const disableBoxes = () => {
  boxes.forEach(box => (box.disabled = true));
};

// Enables and clears all game boxes
const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Displays the winner message
const showWinner = (winner) => {
  const winnerName = winner === "X" ? playerXName : playerOName;
  msg.innerText = `Congratulations!! ${winnerName} wins`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Checks for a winner based on the current state of the game board
const checkWinner = () => {
  for (const pattern of winPatterns) {
    const [pos1, pos2, pos3] = pattern;
    const pos1Val = boxes[pos1].innerText;
    const pos2Val = boxes[pos2].innerText;
    const pos3Val = boxes[pos3].innerText;

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return true;
    }
  }
  return false;
};

// Event Listeners
startGameBtn.addEventListener("click", startGame);
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
