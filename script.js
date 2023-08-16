"use strict";
//Factory Function
const player = (name, mark) => {
  let score = 0;

  // getters
  const getName = () => name;
  const getMark = () => mark;
  const getScore = () => score;

  // setters
  const setName = (input) => (name = input);
  const setMark = (input) => (mark = input);
  const setScore = (input) => (score = input);

  return { setName, getName, getMark, setMark, setScore, getScore };
};

// Module Pattern
const gameBoard = (() => {
  let board = new Array(9);

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };
  const setField = (index, mark) => {
    if (!board[index]) {
      board[index] = mark;
      return true;
    } else return false;
  };

  const getField = (index) => {
    return board[index];
  };

  const getBoard = () => {
    return board;
  };

  return { reset, setField, getField, getBoard, board };
})();

const gameController = (() => {
  let round = 1;
  let gameOver = false;
  let player1 = player("john", "X");
  let player2 = player("jacob", "O");
  let players = [player1, player2];
  let activePlayer = player1;
  let results;
  let winner;
  let message;

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => {
    return activePlayer.getName();
  };

  const checkGameStatus = (position) => {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    results = winCombinations
      .filter((combination) => combination.includes(position))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getField(index) === activePlayer.getMark()
        )
      );

    if (results) {
      gameOver = true;
      winner = activePlayer.getName();
      activePlayer.setScore(activePlayer.getScore() + 1);
    } else if (round === 9) {
      winner = "Tie";
      gameOver = true;
    }
  };

  const playRound = (position) => {
    if (!gameOver) {
      if (gameBoard.setField(position, activePlayer.getMark())) {
        checkGameStatus(position);
        switchActivePlayer();
        round++;
      }
    }
    if (gameOver) {
      message =
        winner === "Tie"
          ? `Game Over: It's a tie`
          : `Game Over: ${winner} wins`;
      displayController.displayScore();
      displayController.displayResults(message);
    }
  };

  const resetGame = () => {
    round = 1;
    gameOver = false;
    winner = "";
    results = "";
    switchActivePlayer();
    gameBoard.reset();
  };

  const resetScores = () => {
    players.forEach((player) => player.setScore(0));
  };

  return { playRound, resetGame, resetScores, players };
})();

const displayController = (() => {
  const gameBoardElement = document.querySelector(".game-board");
  const scores = document.querySelectorAll(".score");
  const [...boxes] = document.querySelectorAll(".box");
  const results = document.querySelector(".results");
  const newBtn = document.querySelector(".new-btn");
  const resetBtn = document.querySelector(".reset-btn");
  const submitBtn = document.querySelector(".submit-btn");
  const namesBtn = document.querySelector(".names-btn");
  const nameForm = document.querySelector("#names-form");
  const markForm = document.querySelector("#mark-form");
  const displayResults = (message) => {
    results.textContent = message;
    results.classList.remove("hidden");
  };
  const displayScore = () => {
    scores.forEach(
      (score, index) =>
        (score.textContent = gameController.players[index].getScore())
    );
  };

  const displayBoard = (board) => {
    boxes.forEach((box, index) => (box.textContent = gameBoard.board[index]));
  };

  const placeMarker = (() =>
    gameBoardElement.addEventListener("click", function (e) {
      let position = e.target.closest(".box");
      let index = Number.parseInt(position.dataset.index);
      gameController.playRound(index);
      displayBoard();
    }))();

  const resetBoard = (() => {
    newBtn.addEventListener("click", function () {
      gameController.resetGame();
      displayBoard();
      results.classList.add("hidden");
    });
  })();

  const resetScores = (() => {
    resetBtn.addEventListener("click", function () {
      gameController.resetScores();
      displayScore();
    });
  })();

  const changeNames = () => {
    const user1 = document.querySelector("#user-one");
    const user2 = document.querySelector("#user-two");
    const name1 = document.querySelector("#player-1-name");
    const name2 = document.querySelector("#player-2-name");
    const users = [user1, user2];
    const names = [name1, name2];

    users.forEach((user, index) => {
      if (user.value) {
        names[index].textContent = user.value;
      }
    });
    nameForm.classList.add("hidden");
  };

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    changeNames();
  });

  namesBtn.addEventListener("click", function () {
    nameForm.classList.remove("hidden");
  });

  markForm.addEventListener("click", function () {
    markForm.classList.toggle("hidden");
  });

  return { displayBoard, resetBoard, displayScore, displayResults };
})();
