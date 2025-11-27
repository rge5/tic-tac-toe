let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let turnContainer = document.querySelector(".turn-details");
let winModal = document.querySelector(".modal");
let winMessageContent = document.querySelector(".winMessageContent");
let playAgain = document.querySelector(".play-again");
const ting = new Audio("ting.mp3");
const winAudio = new Audio("gameover.mp3");
let turn = "X";
let isGameOver = false;

const changeTurn = () => {
  turn = turn === "X" ? "0" : "X";
};

const checkWin = () => {
  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < win.length; i++) {
    let indexes = win[i];
    if (
      boxes[indexes?.[0]].innerHTML === boxes[indexes?.[1]].innerHTML &&
      boxes[indexes?.[1]].innerHTML === boxes[indexes?.[2]].innerHTML &&
      boxes[indexes?.[0]].innerHTML !== ""
    ) {
      let winner = boxes[indexes?.[0]].innerHTML;
      turnContainer.innerText = `${winner} won`;
      isGameOver = true;
      winAudio.play();

      //open the win model
      winMessageContent.innerText = `Player ${winner} Wins! 🎉`;
      winModal.style.display = "flex";
      playAgain.addEventListener("click", resetFunction);
    }
  }
};

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", (e) => {
    if (e.target.innerHTML === "" && !isGameOver) {
      e.target.innerHTML = turn;
      changeTurn();
      turnContainer.innerText = `Turn for ${turn}`;
      ting.play();
      checkWin();
      checkForDraw();
    }
  });
}

const resetFunction = () => {
  for (let i = -0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
  }
  turn = "X";
  isGameOver = false;
  turnContainer.innerText = "Turn for X";
  winModal.style.display = "none";
};

reset.addEventListener("click", () => {
  resetFunction();
});

const checkForDraw = () => {
	let anyBlockSEmpty = false;
	for (let i = 0; i < boxes.length; i++) {
		if (boxes[i].innerHTML === '') {
			anyBlockSEmpty = true;
			break;
		}
	}

	if (anyBlockSEmpty) {
		return;
	}
	//anyBlockSEmpty = false
	if (!anyBlockSEmpty && !isGameOver) {
		winMessageContent.innerText = `It's a Draw! 🤝`;
		winModal.style.display = 'flex';
		playAgain.addEventListener('click', resetFunction);
		winAudio.play();
    winAudio.play();
	}
};