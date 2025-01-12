let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let startGameBtn = document.querySelector("#start-game-btn");
let playerXNameInput = document.querySelector("#playerXName");
let playerONameInput = document.querySelector("#playerOName");

let turnO = true;
let count = 0;
let playerXName = "Player X";
let playerOName = "Player O";
let playAgainstAI = false;

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

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const startGame = () => {
  playerXName = playerXNameInput.value || "Player X";
  playerOName = playerONameInput.value || "Player O";
  playAgainstAI = confirm("Do you want to play against AI?");
  document.querySelector("main").classList.remove("hide");
  document.querySelector(".player-names").classList.add("hide");
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      if (playAgainstAI && !checkWinner() && count < 8) {
        setTimeout(aiMove, 500);
      }
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const aiMove = () => {
  let availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
  let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
  randomBox.innerText = "X";
  randomBox.disabled = true;
  turnO = true;
  count++;
  checkWinner();
};

const gameDraw = () => {
  msg.innerText = `Game Drawn`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  let winnerName = winner === "X" ? playerXName : playerOName;
  msg.innerText = `Congratulations!! ${winnerName} wins`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

startGameBtn.addEventListener("click", startGame);
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
