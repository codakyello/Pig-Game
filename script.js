const getElement = identifier => document.querySelector(identifier);

const dealBtn = getElement('.btn--roll');
const holdBtn = getElement('.btn--hold');
const newBtn = getElement('.btn--new');

let playerNumber = 0;
let diceNumber,
  jackpot,
  playerCurrentScore,
  playersTotalScore,
  playerCurrentScoreEl,
  playerTotalScoreEl;

const initialize = function () {
  getElement('.dice').classList.add('hidden');
  getElement(`.player--${playerNumber}`).classList.remove('player--winner');
  jackpot = 100;
  playerNumber = 0;
  playersTotalScore = [0, 0];
  playerCurrentScore = 0;
  getElement(`.player--1`).classList.remove('player--active');
  getElement(`.player--0`).classList.add('player--active');
  for (let i = 0; i < playersTotalScore.length; i++) {
    playerTotalScoreEl = getElement(`#score--${i}`).textContent = `0`;
    playerCurrentScoreEl = getElement(`#current--${i}`).textContent = `0`;
  }
};

const changeDieFace = function () {
  getElement('.dice').classList.remove('hidden');
  diceNumber = Math.trunc(Math.random() * 6) + 1;
  getElement('.dice').src = `dice-${diceNumber}.png`;
};

const countScore = function () {
  if (diceNumber !== 1 && playersTotalScore[playerNumber] <= jackpot) {
    playerCurrentScore += diceNumber;
    playerCurrentScoreEl = getElement(`#current--${playerNumber}`).textContent =
      playerCurrentScore + '';
  } else {
    playerCurrentScore = 0;
    switchPlayer();
  }
};

const switchPlayer = function () {
  playersTotalScore[playerNumber] += playerCurrentScore;
  playerCurrentScore = 0;

  playerCurrentScoreEl = getElement(`#current--${playerNumber}`).textContent =
    '0';

  playerTotalScoreEl = getElement(
    `#score--${playerNumber}`
  ).textContent = `${playersTotalScore[playerNumber]}`;

  if (playersTotalScore[playerNumber] > jackpot) {
    getElement(`.player--${playerNumber}`).classList.add('player--winner');
    getElement('.dice').classList.add('hidden');
    getElement(`.player--${playerNumber}`).classList.remove('player--active');
  } else {
    getElement(`.player--${playerNumber}`).classList.toggle('player--active');
    playerNumber++;
    playerNumber = playerNumber > 1 ? 0 : playerNumber;
    getElement(`.player--${playerNumber}`).classList.toggle('player--active');
  }
};

dealBtn.addEventListener('click', function () {
  changeDieFace();
  countScore();
});

holdBtn.addEventListener('click', switchPlayer);

newBtn.addEventListener('click', initialize);

initialize();

// Old Code

// const btnNewEl = document.querySelector('.btn--new');
// const btnRollEl = document.querySelector('.btn--roll');
// const btnHoldEl = document.querySelector('.btn--hold');
// const dieFaceEl = document.querySelector('.dice');

// let playersScore, playerNumber, currentScore, totalScore, gameIsOn;

// function initialize() {
//   playersScore = [0, 0];
//   playerNumber = 0;
//   currentScore = 0;
//   totalScore = 0;
//   gameIsOn = true;

//   for (let player = 0; player < playersScore.length; player++) {
//     document.querySelector(`#current--${player}`).textContent = 0;
//     document.querySelector(`#score--${player}`).textContent = 0;

//     document
//       .querySelector(`.player--${player}`)
//       .classList.remove('player--winner');
//   }
//   dieFaceEl.classList.add('hidden');

//   document.querySelector(`.player--0`).classList.add('player--active');
//   document.querySelector(`.player--1`).classList.remove('player--active');
// }

// function changeDieFace() {
//   if (gameIsOn) {
//     dieFaceEl.classList.remove('hidden');
//     const diceNumber = Math.floor(Math.random() * 6) + 1;
//     dieFaceEl.src = `dice-${diceNumber}.png`;

//     gamble(diceNumber);
//   }
// }

// function changePlayer() {
//   if (gameIsOn === true) {
//     playersScore[playerNumber] += totalScore;
//     checkforWinner();
//     document.querySelector(`#current--${playerNumber}`).textContent = 0;
//     if (gameIsOn == true) {
//       document
//         .querySelectorAll('.player')
//         [playerNumber].classList.toggle('player--active');
//     } else {
//       document
//         .querySelectorAll('.player')[0]
//         .classList.remove('player--active');
//       document
//         .querySelectorAll('.player')[1]
//         .classList.remove('player--active');
//     }
//     document.querySelector(`#score--${playerNumber}`).textContent =
//       playersScore[playerNumber];
//     playerNumber = playerNumber === 0 ? 1 : 0;
//     if (gameIsOn == true) {
//       document
//         .querySelectorAll('.player')
//         [playerNumber].classList.toggle('player--active');
//     }

//     totalScore = 0;
//     currentScore = 0;
//   }
// }

// function gamble(diceNumber) {
//   currentScore = diceNumber;
//   totalScore += diceNumber;

//   const currentScoreEl = document.querySelector(`#current--${playerNumber}`);

//   if (currentScore === 1) {
//     totalScore = 0;
//     changePlayer();
//   }

//   currentScoreEl.textContent = totalScore;
// }

// function checkforWinner() {
//   if (playersScore[playerNumber] >= 10) {
//     gameIsOn = false;
//     dieFaceEl.classList.add('hidden');

//     document
//       .querySelectorAll('.player')
//       [playerNumber].classList.add('player--winner');
//   }
// }
// btnRollEl.addEventListener('click', changeDieFace);
// btnHoldEl.addEventListener('click', changePlayer);
// btnNewEl.addEventListener('click', initialize);
// initialize();
