"use strict";

const board = document.querySelector(".game-board");
const [...boxes] = document.querySelectorAll(".box");

const Player = (name) => {
  let score;
  let mark;
  const sayName = () => console.log(name);

  const add = () => score++;

  const chooseMark = (choice) => {
    mark = choice;
  };

  return { sayName, score, add, mark, chooseMark };
};

const Game = (() => {
  const board = ["s", "s", "s", "t", "t", "t", "r", "r", "r"];

  const getlength = () => {
    console.log(board.length);
  };

  const displayBoard = (array) => {
    array.forEach((cur, i) => (cur.textContent = board[i]));
  };

  const placeMarker = (element, playerMark) => {
    element.addEventListener("click", function (e) {
      let position = e.target.closest(".box");
      position.textContent = playerMark;
    });
  };

  return { board, getlength, displayBoard, placeMarker };
})();

let mark = "x";

// board.addEventListener("click", function (e) {
//   let position = e.target.closest(".box");
//   console.log(e.target);
//   console.log(this);
//   position.textContent = mark;
// });

Game.placeMarker(board, mark);
